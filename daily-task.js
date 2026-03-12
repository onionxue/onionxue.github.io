/**
 * AI 内容工厂 - 每日自动运行脚本
 * 定时任务：每天早上 8:00 自动生成并发布
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'content-db.json');
const LOG_PATH = path.join(__dirname, 'logs', `${new Date().toISOString().split('T')[0]}.log`);

// 引入生成器
const { generateTodayContent } = require('./generator');

/**
 * 加载数据库
 */
function loadDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return { content: [], stats: { total: 0, published: 0, draft: 0 } };
  }
}

/**
 * 保存数据库
 */
function saveDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

/**
 * 生成今日内容
 */
function generateDailyContent() {
  console.log('🚀 开始生成今日内容...');
  
  const article = generateTodayContent();
  article.id = `${article.date}-${Date.now()}`;
  article.status = 'draft';
  
  const db = loadDB();
  db.content.unshift(article);
  db.stats.total++;
  db.stats.draft++;
  saveDB(db);
  
  console.log(`✅ 已生成内容: ${article.title}`);
  console.log(`📝 保存到数据库，ID: ${article.id}`);
  
  return article;
}

/**
 * 模拟发布到平台（待接入真实API）
 */
async function publishToPlatform(article, platform) {
  console.log(`📤 准备发布到 ${platform}...`);
  
  // 这里预留平台发布接口
  // 1. 微信公众号 - 需要公众号API
  // 2. 博客 - 需要博客API  
  // 3. 小红书 - 需要小红书API
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ 已发布到 ${platform}`);
      resolve(true);
    }, 1000);
  });
}

/**
 * 自动运行每日任务
 */
async function dailyTask() {
  console.log('='.repeat(50));
  console.log(`🤖 AI 内容工厂 - 每日任务`);
  console.log(`📅 执行时间: ${new Date().toLocaleString()}`);
  console.log('='.repeat(50));
  
  try {
    // 1. 生成内容
    const article = generateDailyContent();
    
    // 2. 发布到平台（可选）
    // await publishToPlatform(article, '公众号');
    
    console.log('\n📊 任务完成！');
    console.log(`   今日生成: 1 篇`);
    console.log(`   待发布: 1 篇`);
    
    return article;
  } catch (e) {
    console.error('❌ 任务失败:', e);
  }
}

// 如果直接运行，执行每日任务
if (require.main === module) {
  dailyTask();
}

module.exports = { dailyTask, generateDailyContent };
