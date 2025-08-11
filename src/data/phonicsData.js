// 自然拼读学习数据
export const phonicsData = {
  // 第一阶段：26个字母的字母名和字母音
  stage1: [
    {
      id: 1,
      title: "Letter A",
      letter: "A",
      letterName: "/eɪ/",
      letterSound: "/æ/",
      words: [
        { word: 'Apple', image: '🍎', translation: '苹果', sentence: 'I eat an apple every day.', sentenceTranslation: '我每天吃一个苹果。' },
        { word: 'Ant', image: '🐜', translation: '蚂蚁', sentence: 'The ant is carrying food.', sentenceTranslation: '蚂蚁正在搬运食物。' },
        { word: 'Alligator', image: '🐊', translation: '鳄鱼', sentence: 'The alligator lives in the water.', sentenceTranslation: '鳄鱼生活在水里。' }
      ],
      description: "A的字母名是/eɪ/，字母音是/æ/"
    },
    {
      id: 2,
      title: "Letter B",
      letter: "B",
      letterName: "/biː/",
      letterSound: "/b/",
      words: [
        { word: 'Ball', image: '⚽', translation: '球', sentence: 'The ball is red and round.', sentenceTranslation: '这个球是红色的和圆的。' },
        { word: 'Bear', image: '🐻', translation: '熊', sentence: 'The brown bear is sleeping.', sentenceTranslation: '棕熊正在睡觉。' },
        { word: 'Banana', image: '🍌', translation: '香蕉', sentence: 'I like to eat yellow bananas.', sentenceTranslation: '我喜欢吃黄色的香蕉。' }
      ],
      description: "B的字母名是/biː/，字母音是/b/"
    },
    {
      id: 3,
      title: "Letter C",
      letter: "C",
      letterName: "/siː/",
      letterSound: "/k/",
      words: [
        { word: 'Cat', image: '🐱', translation: '猫', sentence: 'The cat is playing with a ball.', sentenceTranslation: '猫正在玩球。' },
        { word: 'Car', image: '🚗', translation: '汽车', sentence: 'My father drives a blue car.', sentenceTranslation: '我爸爸开一辆蓝色的车。' },
        { word: 'Cake', image: '🎂', translation: '蛋糕', sentence: 'I want to eat chocolate cake.', sentenceTranslation: '我想吃巧克力蛋糕。' }
      ],
      description: "C的字母名是/siː/，字母音是/k/"
    },
    {
      id: 4,
      title: "Letter D",
      letter: "D",
      letterName: "/diː/",
      letterSound: "/d/",
      words: [
        { word: 'Dog', image: '🐶', translation: '狗', sentence: 'The dog is running in the park.', sentenceTranslation: '狗正在公园里跑。' },
        { word: 'Duck', image: '🦆', translation: '鸭子', sentence: 'The yellow duck is swimming.', sentenceTranslation: '黄色的鸭子正在游泳。' },
        { word: 'Door', image: '🚪', translation: '门', sentence: 'Please close the door quietly.', sentenceTranslation: '请轻轻地关上门。' }
      ],
      description: "D的字母名是/diː/，字母音是/d/"
    },
    {
      id: 5,
      title: "Letter E",
      letter: "E",
      letterName: "/iː/",
      letterSound: "/e/",
      words: [
        { word: 'Elephant', image: '🐘', translation: '大象', sentence: 'The elephant has a long trunk.', sentenceTranslation: '大象有一个长长的鼻子。' },
        { word: 'Egg', image: '🥚', translation: '鸡蛋', sentence: 'I eat eggs for breakfast.', sentenceTranslation: '我早餐吃鸡蛋。' },
        { word: 'Envelope', image: '✉️', translation: '信封', sentence: 'The letter is in the envelope.', sentenceTranslation: '信在信封里。' }
      ],
      description: "E的字母名是/iː/，字母音是/e/"
    },
    {
      id: 6,
      title: "Letter F",
      letter: "F",
      letterName: "/ɛf/",
      letterSound: "/f/",
      words: [
        { word: 'Fish', image: '🐟', translation: '鱼', sentence: 'The fish swims in the water.', sentenceTranslation: '鱼在水里游泳。' },
        { word: 'Frog', image: '🐸', translation: '青蛙', sentence: 'The green frog can jump high.', sentenceTranslation: '绿色的青蛙可以跳得很高。' },
        { word: 'Flower', image: '🌸', translation: '花', sentence: 'The flower is beautiful and colorful.', sentenceTranslation: '这朵花很漂亮而且色彩丰富。' }
      ],
      description: "F的字母名是/ɛf/，字母音是/f/"
    },
    {
      id: 7,
      title: "Letter G",
      letter: "G",
      letterName: "/dʒiː/",
      letterSound: "/ɡ/",
      words: [
        { word: 'Goat', image: '🐐', translation: '山羊', sentence: 'The goat eats grass on the hill.', sentenceTranslation: '山羊在山坡上吃草。' },
        { word: 'Grapes', image: '🍇', translation: '葡萄', sentence: 'I like to eat purple grapes.', sentenceTranslation: '我喜欢吃紫色的葡萄。' },
        { word: 'Guitar', image: '🎸', translation: '吉他', sentence: 'My brother plays the guitar well.', sentenceTranslation: '我哥哥吉他弹得很好。' }
      ],
      description: "G的字母名是/dʒiː/，字母音是/ɡ/"
    },
    {
      id: 8,
      title: "Letter H",
      letter: "H",
      letterName: "/eɪtʃ/",
      letterSound: "/h/",
      words: [
        { word: 'Hat', image: '🎩', translation: '帽子', sentence: 'I wear a hat when it\'s sunny.', sentenceTranslation: '当天气晴朗时我戴帽子。' },
        { word: 'House', image: '🏠', translation: '房子', sentence: 'My family lives in a big house.', sentenceTranslation: '我的家人住在一个大房子里。' },
        { word: 'Heart', image: '❤️', translation: '心', sentence: 'I love you with all my heart.', sentenceTranslation: '我全心全意地爱你。' }
      ],
      description: "H的字母名是/eɪtʃ/，字母音是/h/"
    },
    {
      id: 9,
      title: "Letter I",
      letter: "I",
      letterName: "/aɪ/",
      letterSound: "/ɪ/",
      words: [
        { word: 'Igloo', image: '🏠', translation: '冰屋', sentence: 'The igloo is made of snow blocks.', sentenceTranslation: '冰屋是由雪块建造的。' },
        { word: 'Inch', image: '📏', translation: '英寸', sentence: 'One inch is about 2.5 centimeters.', sentenceTranslation: '一英寸大约等于2.5厘米。' },
        { word: 'Ink', image: '🖋️', translation: '墨水', sentence: 'I use black ink for my pen.', sentenceTranslation: '我用黑色的墨水写字。' }
      ],
      description: "I的字母名是/aɪ/，字母音是/ɪ/"
    },
    {
      id: 10,
      title: "Letter J",
      letter: "J",
      letterName: "/dʒeɪ/",
      letterSound: "/dʒ/",
      words: [
        { word: 'Jam', image: '🍓', translation: '果酱', sentence: 'I like strawberry jam on toast.', sentenceTranslation: '我喜欢在吐司上涂草莓果酱。' },
        { word: 'Jump', image: '🤸', translation: '跳', sentence: 'The frog can jump very high.', sentenceTranslation: '青蛙可以跳得很高。' },
        { word: 'Jug', image: '🏺', translation: '水壶', sentence: 'The jug is full of fresh water.', sentenceTranslation: '水壶里装满了新鲜的水。' }
      ],
      description: "J的字母名是/dʒeɪ/，字母音是/dʒ/"
    },
    {
      id: 11,
      title: "Letter K",
      letter: "K",
      letterName: "/keɪ/",
      letterSound: "/k/",
      words: [
        { word: 'Kite', image: '🪁', translation: '风筝', sentence: 'I fly my kite in the park.', sentenceTranslation: '我在公园里放风筝。' },
        { word: 'Key', image: '🔑', translation: '钥匙', sentence: 'I use the key to open the door.', sentenceTranslation: '我用钥匙开门。' },
        { word: 'King', image: '👑', translation: '国王', sentence: 'The king wears a golden crown.', sentenceTranslation: '国王戴着金色的皇冠。' }
      ],
      description: "K的字母名是/keɪ/，字母音是/k/"
    },
    {
      id: 12,
      title: "Letter L",
      letter: "L",
      letterName: "/ɛl/",
      letterSound: "/l/",
      words: [
        { word: 'Lion', image: '🦁', translation: '狮子', sentence: 'The lion is the king of the jungle.', sentenceTranslation: '狮子是丛林之王。' },
        { word: 'Leaf', image: '🍃', translation: '叶子', sentence: 'The green leaf falls from the tree.', sentenceTranslation: '绿色的叶子从树上掉下来。' },
        { word: 'Light', image: '💡', translation: '灯', sentence: 'Turn on the light when it\'s dark.', sentenceTranslation: '天黑时请开灯。' }
      ],
      description: "L的字母名是/ɛl/，字母音是/l/"
    },
    {
      id: 13,
      title: "Letter M",
      letter: "M",
      letterName: "/ɛm/",
      letterSound: "/m/",
      words: [
        { word: 'Moon', image: '🌙', translation: '月亮', sentence: 'The moon shines brightly at night.', sentenceTranslation: '月亮在夜晚明亮地照耀。' },
        { word: 'Milk', image: '🥛', translation: '牛奶', sentence: 'I drink milk every morning.', sentenceTranslation: '我每天早上喝牛奶。' },
        { word: 'Mouse', image: '🐭', translation: '老鼠', sentence: 'The little mouse loves cheese.', sentenceTranslation: '小老鼠喜欢吃奶酪。' }
      ],
      description: "M的字母名是/ɛm/，字母音是/m/"
    },
    {
      id: 14,
      title: "Letter N",
      letter: "N",
      letterName: "/ɛn/",
      letterSound: "/n/",
      words: [
        { word: 'Nose', image: '👃', translation: '鼻子', sentence: 'I can smell flowers with my nose.', sentenceTranslation: '我可以用鼻子闻花香。' },
        { word: 'Net', image: '🥅', translation: '网', sentence: 'The fisherman catches fish with a net.', sentenceTranslation: '渔夫用网捕鱼。' },
        { word: 'Nest', image: '🪺', translation: '鸟巢', sentence: 'The birds build a nest in the tree.', sentenceTranslation: '鸟儿在树上筑巢。' }
      ],
      description: "N的字母名是/ɛn/，字母音是/n/"
    },
    {
      id: 15,
      title: "Letter O",
      letter: "O",
      letterName: "/oʊ/",
      letterSound: "/ɒ/",
      words: [
        { word: 'Octopus', image: '🐙', translation: '章鱼', sentence: 'The octopus has eight long arms.', sentenceTranslation: '章鱼有八条长长的手臂。' },
        { word: 'Ox', image: '🐂', translation: '牛', sentence: 'The strong ox pulls the heavy cart.', sentenceTranslation: '强壮的牛拉着沉重的车。' },
        { word: 'Ostrich', image: '🦓', translation: '鸵鸟', sentence: 'The ostrich cannot fly but runs fast.', sentenceTranslation: '鸵鸟不会飞但跑得很快。' }
      ],
      description: "O的字母名是/oʊ/，字母音是/ɒ/"
    },
    {
      id: 16,
      title: "Letter P",
      letter: "P",
      letterName: "/piː/",
      letterSound: "/p/",
      words: [
        { word: 'Pig', image: '🐷', translation: '猪', sentence: 'The pink pig loves to play in mud.', sentenceTranslation: '粉色的小猪喜欢在泥里玩。' },
        { word: 'Pen', image: '🖊️', translation: '笔', sentence: 'I use a blue pen to write my homework.', sentenceTranslation: '我用蓝色的笔写作业。' },
        { word: 'Pizza', image: '🍕', translation: '披萨', sentence: 'We eat pizza for dinner on Friday.', sentenceTranslation: '我们周五晚上吃披萨当晚餐。' }
      ],
      description: "P的字母名是/piː/，字母音是/p/"
    },
    {
      id: 17,
      title: "Letter Q",
      letter: "Q",
      letterName: "/kjuː/",
      letterSound: "/kw/",
      words: [
        { word: 'Queen', image: '👸', translation: '女王', sentence: 'The queen wears a beautiful crown.', sentenceTranslation: '女王戴着美丽的皇冠。' },
        { word: 'Quick', image: '⚡', translation: '快速', sentence: 'Be quick so we won\'t be late.', sentenceTranslation: '快点，这样我们就不会迟到了。' },
        { word: 'Quack', image: '🦆', translation: '鸭叫声', sentence: 'The duck says quack quack quack.', sentenceTranslation: '鸭子发出嘎嘎嘎的叫声。' }
      ],
      description: "Q的字母名是/kjuː/，字母音是/kw/"
    },
    {
      id: 18,
      title: "Letter R",
      letter: "R",
      letterName: "/ɑr/",
      letterSound: "/r/",
      words: [
        { word: 'Rabbit', image: '🐰', translation: '兔子', sentence: 'The white rabbit has long ears.', sentenceTranslation: '白兔子有长长的耳朵。' },
        { word: 'Rain', image: '🌧️', translation: '雨', sentence: 'I like to play in the warm rain.', sentenceTranslation: '我喜欢在温暖的雨中玩耍。' },
        { word: 'Rose', image: '🌹', translation: '玫瑰', sentence: 'The red rose smells very sweet.', sentenceTranslation: '红色的玫瑰闻起来很香。' }
      ],
      description: "R的字母名是/ɑr/，字母音是/r/"
    },
    {
      id: 19,
      title: "Letter S",
      letter: "S",
      letterName: "/ɛs/",
      letterSound: "/s/",
      words: [
        { word: 'Sun', image: '☀️', translation: '太阳', sentence: 'The sun gives us light and warmth.', sentenceTranslation: '太阳给我们光和温暖。' },
        { word: 'Snake', image: '🐍', translation: '蛇', sentence: 'The green snake slithers through grass.', sentenceTranslation: '绿色的蛇在草中滑行。' },
        { word: 'Star', image: '⭐', translation: '星星', sentence: 'I can see stars in the night sky.', sentenceTranslation: '我能在夜空中看到星星。' }
      ],
      description: "S的字母名是/ɛs/，字母音是/s/"
    },
    {
      id: 20,
      title: "Letter T",
      letter: "T",
      letterName: "/tiː/",
      letterSound: "/t/",
      words: [
        { word: 'Tiger', image: '🐯', translation: '老虎', sentence: 'The tiger has orange and black stripes.', sentenceTranslation: '老虎有橙色和黑色的条纹。' },
        { word: 'Tree', image: '🌳', translation: '树', sentence: 'The tall tree provides shade in summer.', sentenceTranslation: '高大的树在夏天提供阴凉。' },
        { word: 'Train', image: '🚂', translation: '火车', sentence: 'The train travels on the railway tracks.', sentenceTranslation: '火车在铁轨上行驶。' }
      ],
      description: "T的字母名是/tiː/，字母音是/t/"
    },
    {
      id: 21,
      title: "Letter U",
      letter: "U",
      letterName: "/juː/",
      letterSound: "/ʌ/",
      words: [
        { word: 'Umbrella', image: '☂️', translation: '雨伞', sentence: 'I use my umbrella when it rains.', sentenceTranslation: '下雨时我用雨伞。' },
        { word: 'Up', image: '⬆️', translation: '向上', sentence: 'Look up at the birds in the sky.', sentenceTranslation: '抬头看天空中的鸟儿。' },
        { word: 'Uncle', image: '👨', translation: '叔叔', sentence: 'My uncle tells funny stories.', sentenceTranslation: '我叔叔讲有趣的故事。' }
      ],
      description: "U的字母名是/juː/，字母音是/ʌ/"
    },
    {
      id: 22,
      title: "Letter V",
      letter: "V",
      letterName: "/viː/",
      letterSound: "/v/",
      words: [
        { word: 'Violin', image: '🎻', translation: '小提琴', sentence: 'She plays the violin beautifully.', sentenceTranslation: '她小提琴拉得很美。' },
        { word: 'Van', image: '🚐', translation: '面包车', sentence: 'The delivery van brings packages.', sentenceTranslation: '送货车送来包裹。' },
        { word: 'Vase', image: '🏺', translation: '花瓶', sentence: 'The vase holds fresh red roses.', sentenceTranslation: '花瓶里插着新鲜的玫瑰花。' }
      ],
      description: "V的字母名是/viː/，字母音是/v/"
    },
    {
      id: 23,
      title: "Letter W",
      letter: "W",
      letterName: "/ˈdʌbəl.juː/",
      letterSound: "/w/",
      words: [
        { word: 'Water', image: '💧', translation: '水', sentence: 'I drink water when I am thirsty.', sentenceTranslation: '我口渴时喝水。' },
        { word: 'Whale', image: '🐋', translation: '鲸鱼', sentence: 'The blue whale is the largest animal.', sentenceTranslation: '蓝鲸是最大的动物。' },
        { word: 'Watch', image: '⌚', translation: '手表', sentence: 'My watch tells me the time.', sentenceTranslation: '我的手表告诉我时间。' }
      ],
      description: "W的字母名是/ˈdʌbəl.juː/，字母音是/w/"
    },
    {
      id: 24,
      title: "Letter X",
      letter: "X",
      letterName: "/ɛks/",
      letterSound: "/ks/",
      words: [
        { word: 'Box', image: '📦', translation: '盒子', sentence: 'I put my toys in the box.', sentenceTranslation: '我把玩具放在盒子里。' },
        { word: 'Fox', image: '🦊', translation: '狐狸', sentence: 'The clever fox has a big tail.', sentenceTranslation: '聪明的狐狸有一条大尾巴。' },
        { word: 'Six', image: '6️⃣', translation: '六', sentence: 'I have six colorful pencils.', sentenceTranslation: '我有六支彩色铅笔。' }
      ],
      description: "X的字母名是/ɛks/，字母音是/ks/"
    },
    {
      id: 25,
      title: "Letter Y",
      letter: "Y",
      letterName: "/waɪ/",
      letterSound: "/j/",
      words: [
        { word: 'Yellow', image: '🟡', translation: '黄色', sentence: 'The sun is bright and yellow.', sentenceTranslation: '太阳明亮而黄色。' },
        { word: 'Yes', image: '✅', translation: '是的', sentence: 'Yes, I would like some ice cream.', sentenceTranslation: '是的，我想要一些冰淇淋。' },
        { word: 'Yoyo', image: '🪀', translation: '悠悠球', sentence: 'I can make my yoyo go up and down.', sentenceTranslation: '我能让我的悠悠球上下运动。' }
      ],
      description: "Y的字母名是/waɪ/，字母音是/j/"
    },
    {
      id: 26,
      title: "Letter Z",
      letter: "Z",
      letterName: "/ziː/",
      letterSound: "/z/",
      words: [
        { word: 'Zebra', image: '🦓', translation: '斑马', sentence: 'The zebra has black and white stripes.', sentenceTranslation: '斑马有黑白相间的条纹。' },
        { word: 'Zoo', image: '🦁', translation: '动物园', sentence: 'We see many animals at the zoo.', sentenceTranslation: '我们在动物园看到很多动物。' },
        { word: 'Zero', image: '0️⃣', translation: '零', sentence: 'Zero comes before one in counting.', sentenceTranslation: '在数数时零在前面。' }
      ],
      description: "Z的字母名是/ziː/，字母音是/z/"
    }
  ],

  // 第二阶段：CVC结构学习
  stage2: [
    {
      id: 1,
      title: "短元音 a 的 CVC 单词",
      vowel: "a",
      vowelSound: "/æ/",
      pattern: ["cat", "hat", "mat"],
      words: [
        { word: 'cat', image: '🐱', translation: '猫', sounds: ['/k/', '/æ/', '/t/'] },
        { word: 'hat', image: '🎩', translation: '帽子', sounds: ['/h/', '/æ/', '/t/'] },
        { word: 'mat', image: '🏠', translation: '垫子', sounds: ['/m/', '/æ/', '/t/'] },
        { word: 'bat', image: '🦇', translation: '蝙蝠', sounds: ['/b/', '/æ/', '/t/'] },
        { word: 'rat', image: '🐀', translation: '老鼠', sounds: ['/r/', '/æ/', '/t/'] },
        { word: 'fat', image: '🍔', translation: '胖的', sounds: ['/f/', '/æ/', '/t/'] }
      ],
      description: "练习短元音a的CVC单词"
    },
    {
      id: 2,
      title: "短元音 e 的 CVC 单词",
      vowel: "e",
      vowelSound: "/e/",
      pattern: ["bed", "red", "pen"],
      words: [
        { word: 'bed', image: '🛏️', translation: '床', sounds: ['/b/', '/e/', '/d/'] },
        { word: 'red', image: '🔴', translation: '红色', sounds: ['/r/', '/e/', '/d/'] },
        { word: 'pen', image: '🖊️', translation: '笔', sounds: ['/p/', '/e/', '/n/'] },
        { word: 'hen', image: '🐔', translation: '母鸡', sounds: ['/h/', '/e/', '/n/'] },
        { word: 'ten', image: '🔟', translation: '十', sounds: ['/t/', '/e/', '/n/'] },
        { word: 'wet', image: '💧', translation: '湿的', sounds: ['/w/', '/e/', '/t/'] }
      ],
      description: "练习短元音e的CVC单词"
    },
    {
      id: 3,
      title: "短元音 i 的 CVC 单词",
      vowel: "i",
      vowelSound: "/ɪ/",
      pattern: ["pig", "sit", "lip"],
      words: [
        { word: 'pig', image: '🐷', translation: '猪', sounds: ['/p/', '/ɪ/', '/ɡ/'] },
        { word: 'sit', image: '🪑', translation: '坐', sounds: ['/s/', '/ɪ/', '/t/'] },
        { word: 'lip', image: '👄', translation: '嘴唇', sounds: ['/l/', '/ɪ/', '/p/'] },
        { word: 'big', image: '🐘', translation: '大的', sounds: ['/b/', '/ɪ/', '/ɡ/'] },
        { word: 'fin', image: '🐟', translation: '鱼鳍', sounds: ['/f/', '/ɪ/', '/n/'] },
        { word: 'dig', image: '🏗️', translation: '挖', sounds: ['/d/', '/ɪ/', '/ɡ/'] }
      ],
      description: "练习短元音i的CVC单词"
    },
    {
      id: 4,
      title: "短元音 o 的 CVC 单词",
      vowel: "o",
      vowelSound: "/ɒ/",
      pattern: ["dog", "hot", "top"],
      words: [
        { word: 'dog', image: '🐶', translation: '狗', sounds: ['/d/', '/ɒ/', '/ɡ/'] },
        { word: 'hot', image: '🔥', translation: '热的', sounds: ['/h/', '/ɒ/', '/t/'] },
        { word: 'top', image: '🔝', translation: '顶部', sounds: ['/t/', '/ɒ/', '/p/'] },
        { word: 'log', image: '🪵', translation: '木头', sounds: ['/l/', '/ɒ/', '/ɡ/'] },
        { word: 'hop', image: '🐰', translation: '跳', sounds: ['/h/', '/ɒ/', '/p/'] },
        { word: 'pot', image: '🍲', translation: '锅', sounds: ['/p/', '/ɒ/', '/t/'] }
      ],
      description: "练习短元音o的CVC单词"
    },
    {
      id: 5,
      title: "短元音 u 的 CVC 单词",
      vowel: "u",
      vowelSound: "/ʌ/",
      pattern: ["sun", "run", "cup"],
      words: [
        { word: 'sun', image: '☀️', translation: '太阳', sounds: ['/s/', '/ʌ/', '/n/'] },
        { word: 'run', image: '🏃', translation: '跑', sounds: ['/r/', '/ʌ/', '/n/'] },
        { word: 'cup', image: '☕', translation: '杯子', sounds: ['/k/', '/ʌ/', '/p/'] },
        { word: 'bug', image: '🐛', translation: '虫子', sounds: ['/b/', '/ʌ/', '/ɡ/'] },
        { word: 'mug', image: '🥤 mug', translation: '马克杯', sounds: ['/m/', '/ʌ/', '/ɡ/'] },
        { word: 'hug', image: '🤗', translation: '拥抱', sounds: ['/h/', '/ʌ/', '/ɡ/'] }
      ],
      description: "练习短元音u的CVC单词"
    }
  ],

  // 第三阶段：短元音拓展和辅音组合
  stage3: [
    {
      id: 1,
      title: "辅音组合 ck",
      pattern: "ck",
      sound: "/k/",
      words: [
        { word: 'duck', image: '🦆', translation: '鸭子', sounds: ['/d/', '/ʌ/', '/k/'] },
        { word: 'clock', image: '🕐', translation: '时钟', sounds: ['/kl/', '/ɒ/', '/k/'] },
        { word: 'black', image: '⚫', translation: '黑色', sounds: ['/bl/', '/æ/', '/k/'] },
        { word: 'back', image: '⬅️', translation: '后面', sounds: ['/b/', '/æ/', '/k/'] },
        { word: 'neck', image: '👃', translation: '脖子', sounds: ['/n/', '/e/', '/k/'] },
        { word: 'kick', image: '⚽', translation: '踢', sounds: ['/k/', '/ɪ/', '/k/'] }
      ],
      description: "ck发/k/音，通常在短元音后"
    },
    {
      id: 2,
      title: "辅音组合 sh",
      pattern: "sh",
      sound: "/ʃ/",
      words: [
        { word: 'ship', image: '🚢', translation: '船', sounds: ['/ʃ/', '/ɪ/', '/p/'] },
        { word: 'fish', image: '🐟', translation: '鱼', sounds: ['/f/', '/ɪ/', '/ʃ/'] },
        { word: 'shop', image: '🏪', translation: '商店', sounds: ['/ʃ/', '/ɒ/', '/p/'] },
        { word: 'shut', image: '🚪', translation: '关闭', sounds: ['/ʃ/', '/ʌ/', '/t/'] },
        { word: 'wash', image: '🧼', translation: '洗', sounds: ['/w/', '/ɒ/', '/ʃ/'] },
        { word: 'wish', image: '⭐', translation: '愿望', sounds: ['/w/', '/ɪ/', '/ʃ/'] }
      ],
      description: "sh发/ʃ/音，像中文的'嘘'"
    },
    {
      id: 3,
      title: "辅音组合 th",
      pattern: "th",
      sound: "/θ/",
      words: [
        { word: 'thin', image: '🥬', translation: '瘦的', sounds: ['/θ/', '/ɪ/', '/n/'] },
        { word: 'thick', image: '📚', translation: '厚的', sounds: ['/θ/', '/ɪ/', '/k/'] },
        { word: 'bath', image: '🛁', translation: '洗澡', sounds: ['/b/', '/ɑː/', '/θ/'] },
        { word: 'moth', image: '🦋', translation: '飞蛾', sounds: ['/m/', '/ɒ/', '/θ/'] },
        { word: 'cloth', image: '👕', translation: '布', sounds: ['/kl/', '/ɒ/', '/θ/'] },
        { word: 'teeth', image: '🦷', translation: '牙齿', sounds: ['/t/', '/iː/', '/θ/'] }
      ],
      description: "th发/θ/音，舌尖轻触上齿"
    },
    {
      id: 4,
      title: "辅音组合 ch",
      pattern: "ch",
      sound: "/tʃ/",
      words: [
        { word: 'chip', image: '🍟', translation: '薯片', sounds: ['/tʃ/', '/ɪ/', '/p/'] },
        { word: 'chat', image: '💬', translation: '聊天', sounds: ['/tʃ/', '/æ/', '/t/'] },
        { word: 'rich', image: '💰', translation: '富有的', sounds: ['/r/', '/ɪ/', '/tʃ/'] },
        { word: 'much', image: '📊', translation: '很多', sounds: ['/m/', '/ʌ/', '/tʃ/'] },
        { word: 'beach', image: '🏖️', translation: '海滩', sounds: ['/b/', '/iː/', '/tʃ/'] },
        { word: 'bench', image: '🪑', translation: '长椅', sounds: ['/b/', '/e/', '/ntʃ/'] }
      ],
      description: "ch发/tʃ/音，像中文的'吃'"
    }
  ],

  // 第四阶段：长元音发音规则
  stage4: [
    {
      id: 1,
      title: "Magic E 规则",
      pattern: "CVCe",
      description: "当单词以辅音-元音-辅音-e结尾时，元音发长音",
      words: [
        { word: 'cake', image: '🎂', translation: '蛋糕', sounds: ['/k/', '/eɪ/', '/k/'] },
        { word: 'bike', image: '🚲', translation: '自行车', sounds: ['/b/', '/aɪ/', '/k/'] },
        { word: 'home', image: '🏠', translation: '家', sounds: ['/h/', '/oʊ/', '/m/'] },
        { word: 'rose', image: '🌹', translation: '玫瑰', sounds: ['/r/', '/oʊ/', '/z/'] },
        { word: 'cute', image: '🐰', translation: '可爱的', sounds: ['/k/', '/juː/', '/t/'] },
        { word: 'nose', image: '👃', translation: '鼻子', sounds: ['/n/', '/oʊ/', '/z/'] }
      ],
      examples: ["cap → cape", "kit → kite", "hop → hope", "cub → cube"]
    },
    {
      id: 2,
      title: "长元音 ee",
      pattern: "ee",
      sound: "/iː/",
      words: [
        { word: 'see', image: '👁️', translation: '看见', sounds: ['/s/', '/iː/'] },
        { word: 'tree', image: '🌳', translation: '树', sounds: ['/tr/', '/iː/'] },
        { word: 'feet', image: '👣', translation: '脚', sounds: ['/f/', '/iː/', '/t/'] },
        { word: 'sleep', image: '😴', translation: '睡觉', sounds: ['/sl/', '/iː/', '/p/'] },
        { word: 'green', image: '🟢', translation: '绿色', sounds: ['/ɡr/', '/iː/', '/n/'] },
        { word: 'deep', image: '🌊', translation: '深的', sounds: ['/d/', '/iː/', '/p/'] }
      ],
      description: "ee发长音/iː/"
    },
    {
      id: 3,
      title: "长元音 ea",
      pattern: "ea",
      sound: "/iː/",
      words: [
        { word: 'read', image: '📚', translation: '阅读', sounds: ['/r/', '/iː/', '/d/'] },
        { word: 'eat', image: '🍽️', translation: '吃', sounds: ['/iː/', '/t/'] },
        { word: 'tea', image: '🍵', translation: '茶', sounds: ['/t/', '/iː/'] },
        { word: 'beach', image: '🏖️', translation: '海滩', sounds: ['/b/', '/iː/', '/tʃ/'] },
        { word: 'clean', image: '🧼', translation: '干净的', sounds: ['/kl/', '/iː/', '/n/'] },
        { word: 'dream', image: '💭', translation: '梦想', sounds: ['/dr/', '/iː/', '/m/'] }
      ],
      description: "ea通常发长音/iː/"
    }
  ],

  // 第五阶段：复杂组合及词根词缀
  stage5: [
    {
      id: 1,
      title: "三元音组合 igh",
      pattern: "igh",
      sound: "/aɪ/",
      words: [
        { word: 'night', image: '🌙', translation: '夜晚', sounds: ['/n/', '/aɪ/', '/t/'] },
        { word: 'light', image: '💡', translation: '光', sounds: ['/l/', '/aɪ/', '/t/'] },
        { word: 'right', image: '✅', translation: '正确的', sounds: ['/r/', '/aɪ/', '/t/'] },
        { word: 'high', image: '⬆️', translation: '高的', sounds: ['/h/', '/aɪ/'] },
        { word: 'bright', image: '✨', translation: '明亮的', sounds: ['/br/', '/aɪ/', '/t/'] },
        { word: 'fight', image: '🥊', translation: '打架', sounds: ['/f/', '/aɪ/', '/t/'] }
      ],
      description: "igh发长音/aɪ/"
    },
    {
      id: 2,
      title: "词缀 un- (不)",
      pattern: "un-",
      meaning: "不，相反",
      words: [
        { word: 'unhappy', image: '😢', translation: '不高兴的', root: 'happy', rootTranslation: '高兴的' },
        { word: 'unzip', image: '🤐 zipper', translation: '拉开', root: 'zip', rootTranslation: '拉上' },
        { word: 'unlock', image: '🔓', translation: '开锁', root: 'lock', rootTranslation: '锁' },
        { word: 'untie', image: '🔗', translation: '解开', root: 'tie', rootTranslation: '系' },
        { word: 'unclean', image: '🧹', translation: '不干净的', root: 'clean', rootTranslation: '干净的' }
      ],
      description: "前缀un-表示'不'或'相反'"
    },
    {
      id: 3,
      title: "词缀 -ing (进行时)",
      pattern: "-ing",
      meaning: "正在做...",
      words: [
        { word: 'jumping', image: '🤸', translation: '正在跳', root: 'jump', rootTranslation: '跳' },
        { word: 'running', image: '🏃', translation: '正在跑', root: 'run', rootTranslation: '跑' },
        { word: 'swimming', image: '🏊', translation: '正在游泳', root: 'swim', rootTranslation: '游泳' },
        { word: 'reading', image: '📚', translation: '正在阅读', root: 'read', rootTranslation: '阅读' },
        { word: 'singing', image: '🎤', translation: '正在唱歌', root: 'sing', rootTranslation: '唱歌' }
      ],
      description: "后缀-ing表示'正在做某事'"
    }
  ]
}