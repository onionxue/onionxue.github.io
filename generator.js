/**
 * AI 内容工厂 - 自动写作机器人
 * 方向：健身减肥 + 美食
 */

const TOPICS = {
  // 健身减肥话题库
  fitness: [
    "跳绳一个月瘦10斤",
    "居家健身动作",
    "减肥必吃的健康食谱",
    "提高代谢的方法",
    "大学生健身指南",
    "上班族如何坚持运动",
    "晨跑vs夜跑哪个好",
    "减肥瓶颈期怎么办"
  ],
  
  // 美食话题库
  food: [
    "懒人快手家常菜",
    "一人食食谱",
    "健康低脂餐",
    "早餐不重样",
    "简单又好吃的拌面",
    "宿舍党美食",
    "下饭神器家常菜"
  ]
};

// 标题模板
const TITLE_TEMPLATES = {
  fitness: [
    "震惊！{action}竟然{result}，亲身实测一个月后果断分享！",
    "坚持{time}后，我的身体发生了{change}变化...",
    "原来{secret}才是{goal}的正确方法，后悔没早知道！",
    "姐妹们！{action}真的有效，{time}轻松{result}！",
    "关于{topic}，我后悔没早点知道的{num}件事"
  ],
  food: [
    "救命！这个{food}的做法让我{reaction}，室友吃了都说绝！",
    "贫穷学生党必看！{time}做出{result}，成本不到{price}元！",
    "懒人必备！{time}搞定{meal}，{action}味道直接封神！",
    "男朋友吃了{num}碗！这{food}做法真的给我卷麻了",
    "宿舍党狂喜！不用锅不用电就能做{result}"
  ]
};

// 内容模板
const CONTENT_TEMPLATES = {
  fitness: `【前言】

姐妹们！今天必须跟你们分享我的{topic}经验！

之前我一直{problem}，直到后来{time}...真的彻底改变了！

【我的变化】

- {change1}
- {change2}  
- {change3}

【具体方法】

1. {step1}
2. {step2}
3. {step3}

【注意事项】

{caution}

【总结】

{summary}

姐妹们赶紧试试！有问题评论区问我～

#健身 #减肥 #健康生活`,

  food: `【开场】

家人们！今天分享一个{reaction}的{food}！

成本才{price}元，做法简单到哭，{person}吃了都说好！

【所需材料】

- {material1}
- {material2}
- {material3}

【步骤】

1. {step1}
2. {step2}
3. {step3}

【成品】

{result}

真的{reaction}！你们一定要试试！

#美食 #家常菜 #懒人食谱 #一人食`
};

/**
 * 随机选择数组中的一个元素
 */
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 填充模板
 */
function fillTemplate(template, data) {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

/**
 * 生成健身文章
 */
function generateFitnessArticle() {
  const topic = randomChoice(TOPICS.fitness);
  const title = fillTemplate(randomChoice(TITLE_TEMPLATES.fitness), {
    action: "每天跳绳",
    result: "瘦了8斤",
    time: "一个月",
    change: "天翻地覆",
    secret: "正确的运动顺序",
    goal: "减肥",
    topic: topic,
    num: "5"
  });
  
  const content = fillTemplate(CONTENT_TEMPLATES.fitness, {
    topic: topic,
    problem: "久坐不动，代谢很差",
    time: "开始每天运动1小时",
    change1: "体重降了8斤",
    change2: "精神状态明显变好",
    change3: "睡眠质量提高",
    step1: "热身5分钟",
    step2: "主要训练20-30分钟",
    step3: "拉伸5-10分钟",
    caution: "循序渐进，不要急于求成",
    summary: "坚持就是胜利！"
  });
  
  return { title, content, category: 'fitness' };
}

/**
 * 生成美食文章
 */
function generateFoodArticle() {
  const food = randomChoice(["拌面", "盖饭", "炒饭", "焖饭"]);
  const title = fillTemplate(randomChoice(TITLE_TEMPLATES.food), {
    food: food,
    reaction: "好吃到舔碗",
    time: "10分钟",
    result: "香喷喷的" + food,
    price: "5",
    meal: "午餐",
    action: "简单",
    num: "3",
    person: "男朋友"
  });
  
  const content = fillTemplate(CONTENT_TEMPLATES.food, {
    food: food,
    reaction: "香到停不下来",
    price: "5",
    person: "室友",
    material1: "米饭/面条",
    material2: "鸡蛋",
    material3: "调味料",
    step1: "准备食材",
    step2: "简单烹饪",
    step3: "出锅装盘",
    result: "香气扑鼻的" + food
  });
  
  return { title, content, category: 'food' };
}

/**
 * 生成今日内容
 */
function generateTodayContent() {
  // 随机选择健身或美食
  const isFitness = Math.random() > 0.5;
  const article = isFitness ? generateFitnessArticle() : generateFoodArticle();
  
  return {
    ...article,
    date: new Date().toISOString().split('T')[0],
    timestamp: new Date().toISOString()
  };
}

// 测试运行
const result = generateTodayContent();
console.log("=== 今日内容预览 ===");
console.log("标题:", result.title);
console.log("\n内容:", result.content.substring(0, 200) + "...");
console.log("\n分类:", result.category);
console.log("日期:", result.date);

module.exports = { generateTodayContent, generateFitnessArticle, generateFoodArticle };
