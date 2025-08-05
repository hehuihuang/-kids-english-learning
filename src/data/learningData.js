// 学习内容数据
export const learningCategories = {
  alphabet: {
    id: 'alphabet',
    name: '字母学习',
    icon: '🔤',
    description: '学习26个英文字母的发音和相关单词',
    content: [
      {
        id: 1,
        title: "Letter A",
        letter: "A",
        content: [
          { text: "A", clickable: true },
          { text: " is for " },
          { text: "Apple", clickable: true }
        ],
        fullText: "A is for Apple",
        image: "🍎",
        translation: "A代表苹果",
        phonetic: "/eɪ/",
        words: ["apple", "ant", "alligator"],
        wordImages: ["🍎", "🐜", "🐊"]
      },
      {
        id: 2,
        title: "Letter B",
        letter: "B",
        content: [
          { text: "B", clickable: true },
          { text: " is for " },
          { text: "Ball", clickable: true }
        ],
        fullText: "B is for Ball",
        image: "⚽",
        translation: "B代表球",
        phonetic: "/biː/",
        words: ["ball", "bear", "banana"],
        wordImages: ["⚽", "🐻", "🍌"]
      },
      {
        id: 3,
        title: "Letter C",
        letter: "C",
        content: [
          { text: "C", clickable: true },
          { text: " is for " },
          { text: "Cat", clickable: true }
        ],
        fullText: "C is for Cat",
        image: "🐱",
        translation: "C代表猫",
        phonetic: "/siː/",
        words: ["cat", "car", "cake"],
        wordImages: ["🐱", "🚗", "🎂"]
      },
      {
        id: 4,
        title: "Letter D",
        letter: "D",
        content: [
          { text: "D", clickable: true },
          { text: " is for " },
          { text: "Dog", clickable: true }
        ],
        fullText: "D is for Dog",
        image: "🐶",
        translation: "D代表狗",
        phonetic: "/diː/",
        words: ["dog", "duck", "door"],
        wordImages: ["🐶", "🦆", "🚪"]
      },
      {
        id: 5,
        title: "Letter E",
        letter: "E",
        content: [
          { text: "E", clickable: true },
          { text: " is for " },
          { text: "Elephant", clickable: true }
        ],
        fullText: "E is for Elephant",
        image: "🐘",
        translation: "E代表大象",
        phonetic: "/iː/",
        words: ["elephant", "egg", "eye"],
        wordImages: ["🐘", "🥚", "👁️"]
      },
      {
        id: 6,
        title: "Letter F",
        letter: "F",
        content: [
          { text: "F", clickable: true },
          { text: " is for " },
          { text: "Fish", clickable: true }
        ],
        fullText: "F is for Fish",
        image: "🐟",
        translation: "F代表鱼",
        phonetic: "/ɛf/",
        words: ["fish", "frog", "flower"],
        wordImages: ["🐟", "🐸", "🌸"]
      },
      {
        id: 7,
        title: "Letter G",
        letter: "G",
        content: [
          { text: "G", clickable: true },
          { text: " is for " },
          { text: "Grapes", clickable: true }
        ],
        fullText: "G is for Grapes",
        image: "🍇",
        translation: "G代表葡萄",
        phonetic: "/dʒiː/",
        words: ["grapes", "goat", "green"],
        wordImages: ["🍇", "🐐", "🟢"]
      },
      {
        id: 8,
        title: "Letter H",
        letter: "H",
        content: [
          { text: "H", clickable: true },
          { text: " is for " },
          { text: "Hat", clickable: true }
        ],
        fullText: "H is for Hat",
        image: "🎩",
        translation: "H代表帽子",
        phonetic: "/eɪtʃ/",
        words: ["hat", "house", "horse"],
        wordImages: ["🎩", "🏠", "🐴"]
      },
      {
        id: 9,
        title: "Letter I",
        letter: "I",
        content: [
          { text: "I", clickable: true },
          { text: " is for " },
          { text: "Ice Cream", clickable: true }
        ],
        fullText: "I is for Ice Cream",
        image: "🍦",
        translation: "I代表冰淇淋",
        phonetic: "/aɪ/",
        words: ["ice cream", "igloo", "island"],
        wordImages: ["🍦", "🏠", "🏝️"]
      },
      {
        id: 10,
        title: "Letter J",
        letter: "J",
        content: [
          { text: "J", clickable: true },
          { text: " is for " },
          { text: "Juice", clickable: true }
        ],
        fullText: "J is for Juice",
        image: "🧃",
        translation: "J代表果汁",
        phonetic: "/dʒeɪ/",
        words: ["juice", "jump", "jacket"],
        wordImages: ["🧃", "🤸", "🧥"]
      },
      {
        id: 11,
        title: "Letter K",
        letter: "K",
        content: [
          { text: "K", clickable: true },
          { text: " is for " },
          { text: "Kite", clickable: true }
        ],
        fullText: "K is for Kite",
        image: "🪁",
        translation: "K代表风筝",
        phonetic: "/keɪ/",
        words: ["kite", "key", "king"],
        wordImages: ["🪁", "🔑", "👑"]
      },
      {
        id: 12,
        title: "Letter L",
        letter: "L",
        content: [
          { text: "L", clickable: true },
          { text: " is for " },
          { text: "Lion", clickable: true }
        ],
        fullText: "L is for Lion",
        image: "🦁",
        translation: "L代表狮子",
        phonetic: "/ɛl/",
        words: ["lion", "leaf", "light"],
        wordImages: ["🦁", "🍃", "💡"]
      },
      {
        id: 13,
        title: "Letter M",
        letter: "M",
        content: [
          { text: "M", clickable: true },
          { text: " is for " },
          { text: "Moon", clickable: true }
        ],
        fullText: "M is for Moon",
        image: "🌙",
        translation: "M代表月亮",
        phonetic: "/ɛm/",
        words: ["moon", "mouse", "milk"],
        wordImages: ["🌙", "🐭", "🥛"]
      },
      {
        id: 14,
        title: "Letter N",
        letter: "N",
        content: [
          { text: "N", clickable: true },
          { text: " is for " },
          { text: "Nose", clickable: true }
        ],
        fullText: "N is for Nose",
        image: "👃",
        translation: "N代表鼻子",
        phonetic: "/ɛn/",
        words: ["nose", "nest", "net"],
        wordImages: ["👃", "🪺", "🥅"]
      },
      {
        id: 15,
        title: "Letter O",
        letter: "O",
        content: [
          { text: "O", clickable: true },
          { text: " is for " },
          { text: "Orange", clickable: true }
        ],
        fullText: "O is for Orange",
        image: "🍊",
        translation: "O代表橙子",
        phonetic: "/oʊ/",
        words: ["orange", "ocean", "owl"],
        wordImages: ["🍊", "🌊", "🦉"]
      },
      {
        id: 16,
        title: "Letter P",
        letter: "P",
        content: [
          { text: "P", clickable: true },
          { text: " is for " },
          { text: "Pig", clickable: true }
        ],
        fullText: "P is for Pig",
        image: "🐷",
        translation: "P代表猪",
        phonetic: "/piː/",
        words: ["pig", "pen", "pizza"],
        wordImages: ["🐷", "🖊️", "🍕"]
      },
      {
        id: 17,
        title: "Letter Q",
        letter: "Q",
        content: [
          { text: "Q", clickable: true },
          { text: " is for " },
          { text: "Queen", clickable: true }
        ],
        fullText: "Q is for Queen",
        image: "👑",
        translation: "Q代表女王",
        phonetic: "/kjuː/",
        words: ["queen", "question", "quilt"],
        wordImages: ["👑", "❓", "🧵"]
      },
      {
        id: 18,
        title: "Letter R",
        letter: "R",
        content: [
          { text: "R", clickable: true },
          { text: " is for " },
          { text: "Rabbit", clickable: true }
        ],
        fullText: "R is for Rabbit",
        image: "🐰",
        translation: "R代表兔子",
        phonetic: "/ɑr/",
        words: ["rabbit", "rain", "ring"],
        wordImages: ["🐰", "🌧️", "💍"]
      },
      {
        id: 19,
        title: "Letter S",
        letter: "S",
        content: [
          { text: "S", clickable: true },
          { text: " is for " },
          { text: "Sun", clickable: true }
        ],
        fullText: "S is for Sun",
        image: "☀️",
        translation: "S代表太阳",
        phonetic: "/ɛs/",
        words: ["sun", "star", "snake"],
        wordImages: ["☀️", "⭐", "🐍"]
      },
      {
        id: 20,
        title: "Letter T",
        letter: "T",
        content: [
          { text: "T", clickable: true },
          { text: " is for " },
          { text: "Tree", clickable: true }
        ],
        fullText: "T is for Tree",
        image: "🌳",
        translation: "T代表树",
        phonetic: "/tiː/",
        words: ["tree", "train", "tiger"],
        wordImages: ["🌳", "🚂", "🐯"]
      },
      {
        id: 21,
        title: "Letter U",
        letter: "U",
        content: [
          { text: "U", clickable: true },
          { text: " is for " },
          { text: "Umbrella", clickable: true }
        ],
        fullText: "U is for Umbrella",
        image: "☂️",
        translation: "U代表雨伞",
        phonetic: "/juː/",
        words: ["umbrella", "unicorn", "up"],
        wordImages: ["☂️", "🦄", "⬆️"]
      },
      {
        id: 22,
        title: "Letter V",
        letter: "V",
        content: [
          { text: "V", clickable: true },
          { text: " is for " },
          { text: "Violin", clickable: true }
        ],
        fullText: "V is for Violin",
        image: "🎻",
        translation: "V代表小提琴",
        phonetic: "/viː/",
        words: ["violin", "van", "violin"],
        wordImages: ["🎻", "🚐", "🎻"]
      },
      {
        id: 23,
        title: "Letter W",
        letter: "W",
        content: [
          { text: "W", clickable: true },
          { text: " is for " },
          { text: "Water", clickable: true }
        ],
        fullText: "W is for Water",
        image: "💧",
        translation: "W代表水",
        phonetic: "/dʌbəl.juː/",
        words: ["water", "whale", "window"],
        wordImages: ["💧", "🐋", "🪟"]
      },
      {
        id: 24,
        title: "Letter X",
        letter: "X",
        content: [
          { text: "X", clickable: true },
          { text: " is for " },
          { text: "Xylophone", clickable: true }
        ],
        fullText: "X is for Xylophone",
        image: "🎹",
        translation: "X代表木琴",
        phonetic: "/ɛks/",
        words: ["xylophone", "x-ray", "box"],
        wordImages: ["🎹", "🩻", "📦"]
      },
      {
        id: 25,
        title: "Letter Y",
        letter: "Y",
        content: [
          { text: "Y", clickable: true },
          { text: " is for " },
          { text: "Yellow", clickable: true }
        ],
        fullText: "Y is for Yellow",
        image: "🟡",
        translation: "Y代表黄色",
        phonetic: "/waɪ/",
        words: ["yellow", "yoga", "yacht"],
        wordImages: ["🟡", "🧘", "⛵"]
      },
      {
        id: 26,
        title: "Letter Z",
        letter: "Z",
        content: [
          { text: "Z", clickable: true },
          { text: " is for " },
          { text: "Zebra", clickable: true }
        ],
        fullText: "Z is for Zebra",
        image: "🦓",
        translation: "Z代表斑马",
        phonetic: "/ziː/",
        words: ["zebra", "zipper", "zoo"],
        wordImages: ["🦓", "🤐", "🦁"]
      }
    ]
  },
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
  alphabetEnhanced: {
    id: 'alphabet',
    name: '字母学习',
    icon: '🔤',
    description: '学习26个英文字母的发音和相关单词',
    content: [
      {
        id: 1,
        title: "Letter A",
        letter: "A",
        uppercase: "A",
        lowercase: "a",
        phonetic: "/eɪ/",
        words: [
          { word: 'Apple', image: '🍎', translation: '苹果' },
          { word: 'Ant', image: '🐜', translation: '蚂蚁' },
          { word: 'Airplane', image: '✈️', translation: '飞机' }
        ],
        sentence: "A is for Apple.",
        image: "🍎",
        translation: "A代表苹果，发音/eɪ/"
      },
      {
        id: 2,
        title: "Letter B",
        letter: "B",
        uppercase: "B",
        lowercase: "b",
        phonetic: "/biː/",
        words: [
          { word: 'Ball', image: '⚽', translation: '球' },
          { word: 'Banana', image: '🍌', translation: '香蕉' },
          { word: 'Bird', image: '🐦', translation: '鸟' }
        ],
        sentence: "B is for Ball.",
        image: "⚽",
        translation: "B代表球，发音/biː/"
      },
      {
        id: 3,
        title: "Letter C",
        letter: "C",
        uppercase: "C",
        lowercase: "c",
        phonetic: "/siː/",
        words: [
          { word: 'Cat', image: '🐱', translation: '猫' },
          { word: 'Cake', image: '🎂', translation: '蛋糕' },
          { word: 'Car', image: '🚗', translation: '汽车' }
        ],
        sentence: "C is for Cat.",
        image: "🐱",
        translation: "C代表猫，发音/siː/"
      },
      {
        id: 4,
        title: "Letter D",
        letter: "D",
        uppercase: "D",
        lowercase: "d",
        phonetic: "/diː/",
        words: [
          { word: 'Dog', image: '🐶', translation: '狗' },
          { word: 'Duck', image: '🦆', translation: '鸭子' },
          { word: 'Door', image: '🚪', translation: '门' }
        ],
        sentence: "D is for Dog.",
        image: "🐶",
        translation: "D代表狗，发音/diː/"
      },
      {
        id: 5,
        title: "Letter E",
        letter: "E",
        uppercase: "E",
        lowercase: "e",
        phonetic: "/iː/",
        words: [
          { word: 'Elephant', image: '🐘', translation: '大象' },
          { word: 'Egg', image: '🥚', translation: '鸡蛋' },
          { word: 'Eye', image: '👁️', translation: '眼睛' }
        ],
        sentence: "E is for Elephant.",
        image: "🐘",
        translation: "E代表大象，发音/iː/"
      },
      {
        id: 6,
        title: "Letter F",
        letter: "F",
        uppercase: "F",
        lowercase: "f",
        phonetic: "/ef/",
        words: [
          { word: 'Fish', image: '🐟', translation: '鱼' },
          { word: 'Flower', image: '🌸', translation: '花' },
          { word: 'Frog', image: '🐸', translation: '青蛙' }
        ],
        sentence: "F is for Fish.",
        image: "🐟",
        translation: "F代表鱼，发音/ef/"
      },
      {
        id: 7,
        title: "Letter G",
        letter: "G",
        uppercase: "G",
        lowercase: "g",
        phonetic: "/dʒiː/",
        words: [
          { word: 'Goat', image: '🐐', translation: '山羊' },
          { word: 'Grapes', image: '🍇', translation: '葡萄' },
          { word: 'Guitar', image: '🎸', translation: '吉他' }
        ],
        sentence: "G is for Goat.",
        image: "🐐",
        translation: "G代表山羊，发音/dʒiː/"
      },
      {
        id: 8,
        title: "Letter H",
        letter: "H",
        uppercase: "H",
        lowercase: "h",
        phonetic: "/eɪtʃ/",
        words: [
          { word: 'Hat', image: '🎩', translation: '帽子' },
          { word: 'House', image: '🏠', translation: '房子' },
          { word: 'Heart', image: '❤️', translation: '心' }
        ],
        sentence: "H is for Hat.",
        image: "🎩",
        translation: "H代表帽子，发音/eɪtʃ/"
      },
      {
        id: 9,
        title: "Letter I",
        letter: "I",
        uppercase: "I",
        lowercase: "i",
        phonetic: "/aɪ/",
        words: [
          { word: 'Ice cream', image: '🍦', translation: '冰淇淋' },
          { word: 'Island', image: '🏝️', translation: '岛屿' },
          { word: 'Insect', image: '🐛', translation: '昆虫' }
        ],
        sentence: "I is for Ice cream.",
        image: "🍦",
        translation: "I代表冰淇淋，发音/aɪ/"
      },
      {
        id: 10,
        title: "Letter J",
        letter: "J",
        uppercase: "J",
        lowercase: "j",
        phonetic: "/dʒeɪ/",
        words: [
          { word: 'Juice', image: '🧃', translation: '果汁' },
          { word: 'Jump', image: '🤸', translation: '跳' },
          { word: 'Jacket', image: '🧥', translation: '夹克' }
        ],
        sentence: "J is for Juice.",
        image: "🧃",
        translation: "J代表果汁，发音/dʒeɪ/"
      },
      {
        id: 11,
        title: "Letter K",
        letter: "K",
        uppercase: "K",
        lowercase: "k",
        phonetic: "/keɪ/",
        words: [
          { word: 'Kite', image: '🪁', translation: '风筝' },
          { word: 'Key', image: '🔑', translation: '钥匙' },
          { word: 'King', image: '👑', translation: '国王' }
        ],
        sentence: "K is for Kite.",
        image: "🪁",
        translation: "K代表风筝，发音/keɪ/"
      },
      {
        id: 12,
        title: "Letter L",
        letter: "L",
        uppercase: "L",
        lowercase: "l",
        phonetic: "/el/",
        words: [
          { word: 'Lion', image: '🦁', translation: '狮子' },
          { word: 'Leaf', image: '🍃', translation: '叶子' },
          { word: 'Light', image: '💡', translation: '灯' }
        ],
        sentence: "L is for Lion.",
        image: "🦁",
        translation: "L代表狮子，发音/el/"
      },
      {
        id: 13,
        title: "Letter M",
        letter: "M",
        uppercase: "M",
        lowercase: "m",
        phonetic: "/em/",
        words: [
          { word: 'Moon', image: '🌙', translation: '月亮' },
          { word: 'Milk', image: '🥛', translation: '牛奶' },
          { word: 'Mouse', image: '🐭', translation: '老鼠' }
        ],
        sentence: "M is for Moon.",
        image: "🌙",
        translation: "M代表月亮，发音/em/"
      },
      {
        id: 14,
        title: "Letter N",
        letter: "N",
        uppercase: "N",
        lowercase: "n",
        phonetic: "/en/",
        words: [
          { word: 'Nose', image: '👃', translation: '鼻子' },
          { word: 'Net', image: '🥅', translation: '网' },
          { word: 'Night', image: '🌃', translation: '夜晚' }
        ],
        sentence: "N is for Nose.",
        image: "👃",
        translation: "N代表鼻子，发音/en/"
      },
      {
        id: 15,
        title: "Letter O",
        letter: "O",
        uppercase: "O",
        lowercase: "o",
        phonetic: "/oʊ/",
        words: [
          { word: 'Orange', image: '🍊', translation: '橙子' },
          { word: 'Ocean', image: '🌊', translation: '海洋' },
          { word: 'Owl', image: '🦉', translation: '猫头鹰' }
        ],
        sentence: "O is for Orange.",
        image: "🍊",
        translation: "O代表橙子，发音/oʊ/"
      },
      {
        id: 16,
        title: "Letter P",
        letter: "P",
        uppercase: "P",
        lowercase: "p",
        phonetic: "/piː/",
        words: [
          { word: 'Pig', image: '🐷', translation: '猪' },
          { word: 'Pizza', image: '🍕', translation: '披萨' },
          { word: 'Pen', image: '🖊️', translation: '笔' }
        ],
        sentence: "P is for Pig.",
        image: "🐷",
        translation: "P代表猪，发音/piː/"
      },
      {
        id: 17,
        title: "Letter Q",
        letter: "Q",
        uppercase: "Q",
        lowercase: "q",
        phonetic: "/kjuː/",
        words: [
          { word: 'Queen', image: '👸', translation: '女王' },
          { word: 'Question', image: '❓', translation: '问题' },
          { word: 'Quick', image: '⚡', translation: '快速' }
        ],
        sentence: "Q is for Queen.",
        image: "👸",
        translation: "Q代表女王，发音/kjuː/"
      },
      {
        id: 18,
        title: "Letter R",
        letter: "R",
        uppercase: "R",
        lowercase: "r",
        phonetic: "/ɑːr/",
        words: [
          { word: 'Rabbit', image: '🐰', translation: '兔子' },
          { word: 'Rain', image: '🌧️', translation: '雨' },
          { word: 'Rose', image: '🌹', translation: '玫瑰' }
        ],
        sentence: "R is for Rabbit.",
        image: "🐰",
        translation: "R代表兔子，发音/ɑːr/"
      },
      {
        id: 19,
        title: "Letter S",
        letter: "S",
        uppercase: "S",
        lowercase: "s",
        phonetic: "/es/",
        words: [
          { word: 'Sun', image: '☀️', translation: '太阳' },
          { word: 'Star', image: '⭐', translation: '星星' },
          { word: 'Snake', image: '🐍', translation: '蛇' }
        ],
        sentence: "S is for Sun.",
        image: "☀️",
        translation: "S代表太阳，发音/es/"
      },
      {
        id: 20,
        title: "Letter T",
        letter: "T",
        uppercase: "T",
        lowercase: "t",
        phonetic: "/tiː/",
        words: [
          { word: 'Tiger', image: '🐯', translation: '老虎' },
          { word: 'Tree', image: '🌳', translation: '树' },
          { word: 'Train', image: '🚂', translation: '火车' }
        ],
        sentence: "T is for Tiger.",
        image: "🐯",
        translation: "T代表老虎，发音/tiː/"
      },
      {
        id: 21,
        title: "Letter U",
        letter: "U",
        uppercase: "U",
        lowercase: "u",
        phonetic: "/juː/",
        words: [
          { word: 'Umbrella', image: '☂️', translation: '雨伞' },
          { word: 'Unicorn', image: '🦄', translation: '独角兽' },
          { word: 'Up', image: '⬆️', translation: '向上' }
        ],
        sentence: "U is for Umbrella.",
        image: "☂️",
        translation: "U代表雨伞，发音/juː/"
      },
      {
        id: 22,
        title: "Letter V",
        letter: "V",
        uppercase: "V",
        lowercase: "v",
        phonetic: "/viː/",
        words: [
          { word: 'Violin', image: '🎻', translation: '小提琴' },
          { word: 'Vegetable', image: '🥬', translation: '蔬菜' },
          { word: 'Van', image: '🚐', translation: '面包车' }
        ],
        sentence: "V is for Violin.",
        image: "🎻",
        translation: "V代表小提琴，发音/viː/"
      },
      {
        id: 23,
        title: "Letter W",
        letter: "W",
        uppercase: "W",
        lowercase: "w",
        phonetic: "/ˈdʌbəl.juː/",
        words: [
          { word: 'Water', image: '💧', translation: '水' },
          { word: 'Whale', image: '🐋', translation: '鲸鱼' },
          { word: 'Watch', image: '⌚', translation: '手表' }
        ],
        sentence: "W is for Water.",
        image: "💧",
        translation: "W代表水，发音/ˈdʌbəl.juː/"
      },
      {
        id: 24,
        title: "Letter X",
        letter: "X",
        uppercase: "X",
        lowercase: "x",
        phonetic: "/eks/",
        words: [
          { word: 'Xylophone', image: '🎼', translation: '木琴' },
          { word: 'Box', image: '📦', translation: '盒子' },
          { word: 'Fox', image: '🦊', translation: '狐狸' }
        ],
        sentence: "X is for Xylophone.",
        image: "🎼",
        translation: "X代表木琴，发音/eks/"
      },
      {
        id: 25,
        title: "Letter Y",
        letter: "Y",
        uppercase: "Y",
        lowercase: "y",
        phonetic: "/waɪ/",
        words: [
          { word: 'Yellow', image: '🟡', translation: '黄色' },
          { word: 'Yoyo', image: '🪀', translation: '悠悠球' },
          { word: 'Yogurt', image: '🍶', translation: '酸奶' }
        ],
        sentence: "Y is for Yellow.",
        image: "🟡",
        translation: "Y代表黄色，发音/waɪ/"
      },
      {
        id: 26,
        title: "Letter Z",
        letter: "Z",
        uppercase: "Z",
        lowercase: "z",
        phonetic: "/ziː/",
        words: [
          { word: 'Zebra', image: '🦓', translation: '斑马' },
          { word: 'Zoo', image: '🦁', translation: '动物园' },
          { word: 'Zero', image: '0️⃣', translation: '零' }
        ],
        sentence: "Z is for Zebra.",
        image: "🦓",
        translation: "Z代表斑马，发音/ziː/"
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

