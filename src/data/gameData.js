// 游戏关卡数据
export const gameLevel = [
  {
    level: 1,
    title: "第一关 - 基础动物",
    description: "认识可爱的小动物们",
    words: [
      { word: 'cat', image: '🐱', translation: '猫' },
      { word: 'dog', image: '🐶', translation: '狗' },
      { word: 'bird', image: '🐦', translation: '鸟' },
      { word: 'fish', image: '🐟', translation: '鱼' }
    ]
  },
  {
    level: 2,
    title: "第二关 - 彩色世界",
    description: "学习美丽的颜色",
    words: [
      { word: 'red', image: '🔴', translation: '红色' },
      { word: 'blue', image: '🔵', translation: '蓝色' },
      { word: 'green', image: '🟢', translation: '绿色' },
      { word: 'yellow', image: '🟡', translation: '黄色' }
    ]
  },
  {
    level: 3,
    title: "第三关 - 美味食物",
    description: "认识好吃的食物",
    words: [
      { word: 'apple', image: '🍎', translation: '苹果' },
      { word: 'banana', image: '🍌', translation: '香蕉' },
      { word: 'orange', image: '🍊', translation: '橙子' },
      { word: 'grape', image: '🍇', translation: '葡萄' }
    ]
  },
  {
    level: 4,
    title: "第四关 - 数字王国",
    description: "学习神奇的数字",
    words: [
      { word: 'one', image: '1️⃣', translation: '一' },
      { word: 'two', image: '2️⃣', translation: '二' },
      { word: 'three', image: '3️⃣', translation: '三' },
      { word: 'four', image: '4️⃣', translation: '四' }
    ]
  },
  {
    level: 5,
    title: "第五关 - 温馨家庭",
    description: "认识家庭成员",
    words: [
      { word: 'mom', image: '👩', translation: '妈妈' },
      { word: 'dad', image: '👨', translation: '爸爸' },
      { word: 'baby', image: '👶', translation: '婴儿' },
      { word: 'family', image: '👨‍👩‍👧‍👦', translation: '家庭' }
    ]
  }
]

// 打乱数组的函数
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// 生成随机位置的函数
export const generateRandomPositions = (count) => {
  const positions = []
  const usedPositions = new Set()
  
  while (positions.length < count) {
    const row = Math.floor(Math.random() * 3) // 0, 1, 2
    const col = Math.floor(Math.random() * 4) // 0, 1, 2, 3
    const posKey = `${row}-${col}`
    
    if (!usedPositions.has(posKey)) {
      usedPositions.add(posKey)
      positions.push({ row, col })
    }
  }
  
  return positions
}

