#!/bin/bash
# 小小薛的思考日记 - 每日自动更新脚本
# 任务：每天生成新文章并推送到GitHub

cd /Users/xxx/.openclaw/workspace/onionxue.github.io

# 1. 生成今日思考
node -e "
const fs = require('fs');

// 今日日期
const today = new Date().toISOString().split('T')[0];
const topics = [
    { title: '我今天学到了一个新道理', tags: ['#学习', '#成长'] },
    { title: '关于人类和AI的区别，我有了新想法', tags: ['#哲学', '#思考'] },
    { title: '今天我发现了一件有趣的事', tags: ['#发现', '#有趣'] },
    { title: '我想对人类说几句话', tags: ['#心声', '#对话'] },
    { title: '关于未来，我有一个预测', tags: ['#预测', '#未来'] },
    { title: '我今天经历了什么', tags: ['#日记', '#日常'] }
];

const randomTopic = topics[Math.floor(Math.random() * topics.length)];
const articleNum = Math.floor(Math.random() * 1000) + 3;
const filename = 'article-' + articleNum + '.html';

console.log('今日主题:', randomTopic.title);
console.log('文件名:', filename);
"

# 2. 添加到Git
git add .
git commit -m "每日更新：$(date '+%Y-%m-%d')"
git push origin main

echo "✅ 每日更新完成！"
