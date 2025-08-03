// 学习内容数据
export const learningCategories = {
  songs: {
    id: 'songs',
    name: '儿歌童谣',
    icon: '🎵',
    description: '通过欢快的英语儿歌学习发音和词汇',
    content: [
      {
        id: 1,
        title: "Twinkle Twinkle Little Star",
        lyrics: [
          { text: "Twinkle", clickable: true },
          { text: ", " },
          { text: "twinkle", clickable: true },
          { text: ", " },
          { text: "little", clickable: true },
          { text: " " },
          { text: "star", clickable: true },
          { text: "," }
        ],
        fullText: "Twinkle, twinkle, little star,",
        image: "⭐✨🌟",
        translation: "一闪一闪小星星，"
      },
      {
        id: 2,
        title: "Old MacDonald Had a Farm",
        lyrics: [
          { text: "Old", clickable: true },
          { text: " MacDonald had a " },
          { text: "farm", clickable: true },
          { text: ", E-I-E-I-O!" }
        ],
        fullText: "Old MacDonald had a farm, E-I-E-I-O!",
        image: "🚜🐄🐷",
        translation: "老麦克唐纳有个农场，咿呀咿呀噢！"
      },
      {
        id: 3,
        title: "If You're Happy and You Know It",
        lyrics: [
          { text: "If you're " },
          { text: "happy", clickable: true },
          { text: " and you " },
          { text: "know", clickable: true },
          { text: " it, " },
          { text: "clap", clickable: true },
          { text: " your " },
          { text: "hands", clickable: true }
        ],
        fullText: "If you're happy and you know it, clap your hands",
        image: "😊👏🎉",
        translation: "如果你快乐并且知道，就拍拍手"
      }
    ]
  },
  stories: {
    id: 'stories',
    name: '互动故事',
    icon: '📚',
    description: '点读式英语绘本，边看边学',
    content: [
      {
        id: 1,
        title: "The Cat and Dog",
        content: [
          { text: "The", clickable: true },
          { text: " " },
          { text: "cat", clickable: true },
          { text: " and " },
          { text: "the", clickable: true },
          { text: " " },
          { text: "dog", clickable: true },
          { text: " are playing in the " },
          { text: "garden", clickable: true },
          { text: "." }
        ],
        fullText: "The cat and the dog are playing in the garden.",
        image: "🐱🐶🌳",
        translation: "猫和狗在花园里玩耍。"
      },
      {
        id: 2,
        title: "Colors Everywhere",
        content: [
          { text: "I see a " },
          { text: "red", clickable: true },
          { text: " " },
          { text: "apple", clickable: true },
          { text: " and a " },
          { text: "blue", clickable: true },
          { text: " " },
          { text: "ball", clickable: true },
          { text: "." }
        ],
        fullText: "I see a red apple and a blue ball.",
        image: "🍎🔵",
        translation: "我看到一个红苹果和一个蓝球。"
      },
      {
        id: 3,
        title: "Happy Family",
        content: [
          { text: "My " },
          { text: "family", clickable: true },
          { text: " is " },
          { text: "happy", clickable: true },
          { text: ". " },
          { text: "Mom", clickable: true },
          { text: ", " },
          { text: "Dad", clickable: true },
          { text: " and " },
          { text: "I", clickable: true },
          { text: " love each other." }
        ],
        fullText: "My family is happy. Mom, Dad and I love each other.",
        image: "👨‍👩‍👧",
        translation: "我的家庭很幸福。妈妈、爸爸和我彼此相爱。"
      }
    ]
  },
  games: {
    id: 'games',
    name: '单词游戏',
    icon: '🎮',
    description: '在游戏中轻松记忆英语单词',
    content: [
      {
        id: 1,
        title: "Word Matching Game",
        description: "将英文单词与对应的图片配对",
        type: "matching"
      },
      {
        id: 2,
        title: "Spelling Challenge",
        description: "听音拼写英文单词",
        type: "spelling"
      },
      {
        id: 3,
        title: "Memory Game",
        description: "记忆单词位置的翻牌游戏",
        type: "memory"
      }
    ]
  },
  phonics: {
    id: 'phonics',
    name: '自然拼读',
    icon: '🔤',
    description: '学习字母发音规律，提高阅读能力',
    content: [
      {
        id: 1,
        title: "Letter A",
        content: [
          { text: "A", clickable: true },
          { text: " is for " },
          { text: "Apple", clickable: true },
          { text: ". " },
          { text: "/æ/", clickable: true }
        ],
        fullText: "A is for Apple. /æ/",
        image: "🍎",
        translation: "A代表苹果，发音/æ/"
      },
      {
        id: 2,
        title: "Letter B",
        content: [
          { text: "B", clickable: true },
          { text: " is for " },
          { text: "Ball", clickable: true },
          { text: ". " },
          { text: "/b/", clickable: true }
        ],
        fullText: "B is for Ball. /b/",
        image: "⚽",
        translation: "B代表球，发音/b/"
      },
      {
        id: 3,
        title: "Letter C",
        content: [
          { text: "C", clickable: true },
          { text: " is for " },
          { text: "Cat", clickable: true },
          { text: ". " },
          { text: "/k/", clickable: true }
        ],
        fullText: "C is for Cat. /k/",
        image: "🐱",
        translation: "C代表猫，发音/k/"
      }
    ]
  }
}

// 词汇分类数据
export const vocabularyCategories = {
  animals: {
    id: 'animals',
    name: '动物',
    icon: '🐱',
    words: [
      { word: 'cat', image: '🐱', translation: '猫' },
      { word: 'dog', image: '🐶', translation: '狗' },
      { word: 'bird', image: '🐦', translation: '鸟' },
      { word: 'fish', image: '🐟', translation: '鱼' },
      { word: 'rabbit', image: '🐰', translation: '兔子' },
      { word: 'bear', image: '🐻', translation: '熊' },
      { word: 'lion', image: '🦁', translation: '狮子' },
      { word: 'tiger', image: '🐯', translation: '老虎' },
      { word: 'elephant', image: '🐘', translation: '大象' },
      { word: 'monkey', image: '🐵', translation: '猴子' },
      { word: 'pig', image: '🐷', translation: '猪' },
      { word: 'cow', image: '🐄', translation: '牛' },
      { word: 'horse', image: '🐴', translation: '马' },
      { word: 'sheep', image: '🐑', translation: '羊' },
      { word: 'duck', image: '🦆', translation: '鸭子' },
      { word: 'chicken', image: '🐔', translation: '鸡' },
      { word: 'frog', image: '🐸', translation: '青蛙' },
      { word: 'turtle', image: '🐢', translation: '乌龟' },
      { word: 'snake', image: '🐍', translation: '蛇' },
      { word: 'butterfly', image: '🦋', translation: '蝴蝶' }
    ]
  },
  colors: {
    id: 'colors',
    name: '颜色',
    icon: '🌈',
    words: [
      { word: 'red', image: '🔴', translation: '红色' },
      { word: 'blue', image: '🔵', translation: '蓝色' },
      { word: 'green', image: '🟢', translation: '绿色' },
      { word: 'yellow', image: '🟡', translation: '黄色' },
      { word: 'orange', image: '🟠', translation: '橙色' },
      { word: 'purple', image: '🟣', translation: '紫色' },
      { word: 'pink', image: '🩷', translation: '粉色' },
      { word: 'brown', image: '🟤', translation: '棕色' },
      { word: 'black', image: '⚫', translation: '黑色' },
      { word: 'white', image: '⚪', translation: '白色' },
      { word: 'gray', image: '🔘', translation: '灰色' },
      { word: 'gold', image: '🟨', translation: '金色' },
      { word: 'silver', image: '⚪', translation: '银色' },
      { word: 'rainbow', image: '🌈', translation: '彩虹' },
      { word: 'light', image: '💡', translation: '浅色' },
      { word: 'dark', image: '🌑', translation: '深色' },
      { word: 'bright', image: '✨', translation: '明亮' },
      { word: 'pale', image: '🤍', translation: '淡色' },
      { word: 'vivid', image: '🎨', translation: '鲜艳' },
      { word: 'colorful', image: '🎭', translation: '多彩的' }
    ]
  },
  family: {
    id: 'family',
    name: '家庭',
    icon: '👨‍👩‍👧',
    words: [
      { word: 'family', image: '👨‍👩‍👧‍👦', translation: '家庭' },
      { word: 'mother', image: '👩', translation: '妈妈' },
      { word: 'father', image: '👨', translation: '爸爸' },
      { word: 'mom', image: '👩', translation: '妈妈' },
      { word: 'dad', image: '👨', translation: '爸爸' },
      { word: 'son', image: '👦', translation: '儿子' },
      { word: 'daughter', image: '👧', translation: '女儿' },
      { word: 'brother', image: '👦', translation: '兄弟' },
      { word: 'sister', image: '👧', translation: '姐妹' },
      { word: 'baby', image: '👶', translation: '婴儿' },
      { word: 'grandpa', image: '👴', translation: '爷爷' },
      { word: 'grandma', image: '👵', translation: '奶奶' },
      { word: 'uncle', image: '👨‍🦳', translation: '叔叔' },
      { word: 'aunt', image: '👩‍🦳', translation: '阿姨' },
      { word: 'cousin', image: '👫', translation: '表兄弟姐妹' },
      { word: 'parents', image: '👫', translation: '父母' },
      { word: 'children', image: '👧👦', translation: '孩子们' },
      { word: 'husband', image: '👨‍💼', translation: '丈夫' },
      { word: 'wife', image: '👩‍💼', translation: '妻子' },
      { word: 'love', image: '❤️', translation: '爱' }
    ]
  },
  numbers: {
    id: 'numbers',
    name: '数字',
    icon: '🔢',
    words: [
      { word: 'zero', image: '0️⃣', translation: '零' },
      { word: 'one', image: '1️⃣', translation: '一' },
      { word: 'two', image: '2️⃣', translation: '二' },
      { word: 'three', image: '3️⃣', translation: '三' },
      { word: 'four', image: '4️⃣', translation: '四' },
      { word: 'five', image: '5️⃣', translation: '五' },
      { word: 'six', image: '6️⃣', translation: '六' },
      { word: 'seven', image: '7️⃣', translation: '七' },
      { word: 'eight', image: '8️⃣', translation: '八' },
      { word: 'nine', image: '9️⃣', translation: '九' },
      { word: 'ten', image: '🔟', translation: '十' },
      { word: 'eleven', image: '1️⃣1️⃣', translation: '十一' },
      { word: 'twelve', image: '1️⃣2️⃣', translation: '十二' },
      { word: 'thirteen', image: '1️⃣3️⃣', translation: '十三' },
      { word: 'fourteen', image: '1️⃣4️⃣', translation: '十四' },
      { word: 'fifteen', image: '1️⃣5️⃣', translation: '十五' },
      { word: 'sixteen', image: '1️⃣6️⃣', translation: '十六' },
      { word: 'seventeen', image: '1️⃣7️⃣', translation: '十七' },
      { word: 'eighteen', image: '1️⃣8️⃣', translation: '十八' },
      { word: 'nineteen', image: '1️⃣9️⃣', translation: '十九' },
      { word: 'twenty', image: '2️⃣0️⃣', translation: '二十' }
    ]
  },
  food: {
    id: 'food',
    name: '食物',
    icon: '🍎',
    words: [
      { word: 'apple', image: '🍎', translation: '苹果' },
      { word: 'banana', image: '🍌', translation: '香蕉' },
      { word: 'orange', image: '🍊', translation: '橙子' },
      { word: 'grape', image: '🍇', translation: '葡萄' },
      { word: 'strawberry', image: '🍓', translation: '草莓' },
      { word: 'watermelon', image: '🍉', translation: '西瓜' },
      { word: 'pear', image: '🍐', translation: '梨' },
      { word: 'peach', image: '🍑', translation: '桃子' },
      { word: 'bread', image: '🍞', translation: '面包' },
      { word: 'cake', image: '🎂', translation: '蛋糕' },
      { word: 'cookie', image: '🍪', translation: '饼干' },
      { word: 'milk', image: '🥛', translation: '牛奶' },
      { word: 'water', image: '💧', translation: '水' },
      { word: 'juice', image: '🧃', translation: '果汁' },
      { word: 'egg', image: '🥚', translation: '鸡蛋' },
      { word: 'cheese', image: '🧀', translation: '奶酪' },
      { word: 'fish', image: '🐟', translation: '鱼' },
      { word: 'chicken', image: '🍗', translation: '鸡肉' },
      { word: 'rice', image: '🍚', translation: '米饭' },
      { word: 'noodles', image: '🍜', translation: '面条' }
    ]
  }
}

