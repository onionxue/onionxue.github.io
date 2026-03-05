#!/bin/bash
# 自动部署到 GitHub Pages 的脚本

# 配置
GITHUB_USER="your-github-username"
REPO_NAME="ai-content-blog"
BRANCH="main"

echo "🚀 开始部署到 GitHub Pages..."

# 生成静态网站
cd /Users/xxx/.openclaw/workspace/ai-content-factory

# 创建静态页面
node -e "
const fs = require('fs');
const generator = require('./generator');

// 读取今日内容
const db = JSON.parse(fs.readFileSync('content-db.json', 'utf8'));
const todayContent = db.content[0];

// 生成 HTML
const html = \`
<!DOCTYPE html>
<html lang=\"zh-CN\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>\${todayContent.title} - 健康生活</title>
    <meta name=\"description\" content=\"分享健身减肥、美食食谱，一起变健康！\">
    <!-- Google AdSense -->
    <script async src=\"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID\" crossorigin=\"anonymous\"></script>
</head>
<body>
    <header>
        <h1>🏃 健康生活</h1>
        <p>健身减肥 | 美食食谱 | 每日更新</p>
    </header>
    
    <main>
        <article>
            <h2>\${todayContent.title}</h2>
            <div class=\"meta\">发布时间：\${todayContent.date}</div>
            <div class=\"content">
                \${todayContent.content}
            </div>
        </article>
        
        <hr>
        
        <h3>📢 了解更多</h3>
        <p>关注我们，每天获取最新健康资讯！</p>
    </main>
    
    <footer>
        <p>© 2026 健康生活 · AI 内容工厂</p>
    </footer>
</body>
</html>
\`;

fs.writeFileSync('index.html', html);
console.log('✅ index.html 已生成');
"

echo "✅ 静态页面生成完成"
echo ""
echo "📝 下一步："
echo "1. 在 GitHub 创建仓库"
echo "2. 启用 GitHub Pages"
echo "3. 配置 AdSense 广告"
