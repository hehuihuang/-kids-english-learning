import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'

const EnglishWordChallenge = () => {
  // 添加样式到head
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .level-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 15px 25px;
        margin: 8px;
        border-radius: 15px;
        cursor: pointer;
        font-size: 1em;
        font-weight: bold;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      
      .level-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      }
      
      .level-btn.completed {
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
      }
      
      .level-btn.locked {
        background: #ccc;
        cursor: not-allowed;
        transform: none;
      }
      
      .level-btn.locked::after {
        content: '🔒';
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  // 游戏状态
  const [gameState, setGameState] = useState({
    currentCategory: '',
    currentLevel: 1,
    currentWord: null,
    options: [],
    score: 0,
    levelScore: 0,
    isProcessing: false,
    showLevelComplete: false,
    levelWords: [],
    usedWords: [],
    canSelect: true,
    showResult: false,
    showCategorySelector: true,
    showLevelSelector: false,
    showGameArea: false,
    showLevelInfo: false,
    wrongWords: [], // 错题本数据
    completedLevels: [],
    showSuccess: false,
    showError: false,
    showWrongWords: false
  })

  const speechRef = useRef(null)

  // 游戏数据
  const gameData = {
    animals: [
      { word: 'cat', chinese: '猫', emoji: '🐱' },
      { word: 'dog', chinese: '狗', emoji: '🐶' },
      { word: 'elephant', chinese: '大象', emoji: '🐘' },
      { word: 'lion', chinese: '狮子', emoji: '🦁' },
      { word: 'tiger', chinese: '老虎', emoji: '🐯' },
      { word: 'rabbit', chinese: '兔子', emoji: '🐰' },
      { word: 'bird', chinese: '鸟', emoji: '🐦' },
      { word: 'fish', chinese: '鱼', emoji: '🐠' },
      { word: 'monkey', chinese: '猴子', emoji: '🐵' },
      { word: 'panda', chinese: '熊猫', emoji: '🐼' },
      { word: 'pig', chinese: '猪', emoji: '🐷' },
      { word: 'cow', chinese: '牛', emoji: '🐮' },
      { word: 'horse', chinese: '马', emoji: '🐴' },
      { word: 'sheep', chinese: '羊', emoji: '🐑' },
      { word: 'mouse', chinese: '老鼠', emoji: '🐭' },
      { word: 'bear', chinese: '熊', emoji: '🐻' },
      { word: 'wolf', chinese: '狼', emoji: '🐺' },
      { word: 'fox', chinese: '狐狸', emoji: '🦊' },
      { word: 'deer', chinese: '鹿', emoji: '🦌' },
      { word: 'zebra', chinese: '斑马', emoji: '🦓' }
    ],
    vehicles: [
      { word: 'car', chinese: '汽车', emoji: '🚗' },
      { word: 'bus', chinese: '公交车', emoji: '🚌' },
      { word: 'train', chinese: '火车', emoji: '🚂' },
      { word: 'airplane', chinese: '飞机', emoji: '✈️' },
      { word: 'boat', chinese: '船', emoji: '🚤' },
      { word: 'bicycle', chinese: '自行车', emoji: '🚲' },
      { word: 'motorcycle', chinese: '摩托车', emoji: '🏍️' },
      { word: 'truck', chinese: '卡车', emoji: '🚚' },
      { word: 'taxi', chinese: '出租车', emoji: '🚕' },
      { word: 'subway', chinese: '地铁', emoji: '🚇' },
      { word: 'helicopter', chinese: '直升机', emoji: '🚁' },
      { word: 'ship', chinese: '轮船', emoji: '🚢' },
      { word: 'rocket', chinese: '火箭', emoji: '🚀' },
      { word: 'ambulance', chinese: '救护车', emoji: '🚑' },
      { word: 'police', chinese: '警车', emoji: '🚓' },
      { word: 'fire', chinese: '消防车', emoji: '🚒' },
      { word: 'tractor', chinese: '拖拉机', emoji: '🚜' },
      { word: 'scooter', chinese: '滑板车', emoji: '🛴' },
      { word: 'tram', chinese: '有轨电车', emoji: '🚊' },
      { word: 'van', chinese: '面包车', emoji: '🚐' }
    ],
    fruits: [
      { word: 'apple', chinese: '苹果', emoji: '🍎' },
      { word: 'banana', chinese: '香蕉', emoji: '🍌' },
      { word: 'orange', chinese: '橙子', emoji: '🍊' },
      { word: 'grape', chinese: '葡萄', emoji: '🍇' },
      { word: 'strawberry', chinese: '草莓', emoji: '🍓' },
      { word: 'watermelon', chinese: '西瓜', emoji: '🍉' },
      { word: 'pineapple', chinese: '菠萝', emoji: '🍍' },
      { word: 'peach', chinese: '桃子', emoji: '🍑' },
      { word: 'cherry', chinese: '樱桃', emoji: '🍒' },
      { word: 'mango', chinese: '芒果', emoji: '🥭' },
      { word: 'coconut', chinese: '椰子', emoji: '🥥' },
      { word: 'lemon', chinese: '柠檬', emoji: '🍋' },
      { word: 'pear', chinese: '梨', emoji: '🍐' },
      { word: 'kiwi', chinese: '猕猴桃', emoji: '🥝' },
      { word: 'avocado', chinese: '牛油果', emoji: '🥑' },
      { word: 'tomato', chinese: '番茄', emoji: '🍅' },
      { word: 'cucumber', chinese: '黄瓜', emoji: '🥒' },
      { word: 'carrot', chinese: '胡萝卜', emoji: '🥕' },
      { word: 'corn', chinese: '玉米', emoji: '🌽' },
      { word: 'broccoli', chinese: '西兰花', emoji: '🥦' }
    ],
    colors: [
      { word: 'red', chinese: '红色', emoji: '🔴' },
      { word: 'blue', chinese: '蓝色', emoji: '🔵' },
      { word: 'green', chinese: '绿色', emoji: '🟢' },
      { word: 'yellow', chinese: '黄色', emoji: '🟡' },
      { word: 'purple', chinese: '紫色', emoji: '🟣' },
      { word: 'orange', chinese: '橙色', emoji: '🟠' },
      { word: 'black', chinese: '黑色', emoji: '⚫' },
      { word: 'white', chinese: '白色', emoji: '⚪' },
      { word: 'pink', chinese: '粉色', emoji: '🩷' },
      { word: 'brown', chinese: '棕色', emoji: '🤎' },
      { word: 'gray', chinese: '灰色', emoji: '⚫' },
      { word: 'gold', chinese: '金色', emoji: '🟡' },
      { word: 'silver', chinese: '银色', emoji: '⚪' },
      { word: 'cyan', chinese: '青色', emoji: '🔵' },
      { word: 'magenta', chinese: '洋红', emoji: '🟣' },
      { word: 'lime', chinese: '酸橙', emoji: '🟢' },
      { word: 'navy', chinese: '海军蓝', emoji: '🔵' },
      { word: 'teal', chinese: '蓝绿色', emoji: '🔵' },
      { word: 'maroon', chinese: '栗色', emoji: '🤎' },
      { word: 'olive', chinese: '橄榄色', emoji: '🟢' }
    ],
    numbers: [
      { word: 'one', chinese: '一', emoji: '1️⃣' },
      { word: 'two', chinese: '二', emoji: '2️⃣' },
      { word: 'three', chinese: '三', emoji: '3️⃣' },
      { word: 'four', chinese: '四', emoji: '4️⃣' },
      { word: 'five', chinese: '五', emoji: '5️⃣' },
      { word: 'six', chinese: '六', emoji: '6️⃣' },
      { word: 'seven', chinese: '七', emoji: '7️⃣' },
      { word: 'eight', chinese: '八', emoji: '8️⃣' },
      { word: 'nine', chinese: '九', emoji: '9️⃣' },
      { word: 'ten', chinese: '十', emoji: '🔟' },
      { word: 'zero', chinese: '零', emoji: '0️⃣' },
      { word: 'hundred', chinese: '百', emoji: '💯' },
      { word: 'thousand', chinese: '千', emoji: '🔢' },
      { word: 'million', chinese: '百万', emoji: '💰' },
      { word: 'billion', chinese: '十亿', emoji: '💵' },
      { word: 'first', chinese: '第一', emoji: '🥇' },
      { word: 'second', chinese: '第二', emoji: '🥈' },
      { word: 'third', chinese: '第三', emoji: '🥉' },
      { word: 'fourth', chinese: '第四', emoji: '4️⃣' },
      { word: 'fifth', chinese: '第五', emoji: '5️⃣' }
    ],
    family: [
      { word: 'father', chinese: '爸爸', emoji: '👨' },
      { word: 'mother', chinese: '妈妈', emoji: '👩' },
      { word: 'brother', chinese: '兄弟', emoji: '👦' },
      { word: 'sister', chinese: '姐妹', emoji: '👧' },
      { word: 'baby', chinese: '婴儿', emoji: '👶' },
      { word: 'grandpa', chinese: '爷爷', emoji: '👴' },
      { word: 'grandma', chinese: '奶奶', emoji: '👵' },
      { word: 'family', chinese: '家庭', emoji: '👨‍👩‍👧‍👦' },
      { word: 'boy', chinese: '男孩', emoji: '👦' },
      { word: 'girl', chinese: '女孩', emoji: '👧' },
      { word: 'man', chinese: '男人', emoji: '👨' },
      { word: 'woman', chinese: '女人', emoji: '👩' },
      { word: 'son', chinese: '儿子', emoji: '👦' },
      { word: 'daughter', chinese: '女儿', emoji: '👧' },
      { word: 'husband', chinese: '丈夫', emoji: '👨' },
      { word: 'wife', chinese: '妻子', emoji: '👩' },
      { word: 'uncle', chinese: '叔叔', emoji: '👨' },
      { word: 'aunt', chinese: '阿姨', emoji: '👩' },
      { word: 'cousin', chinese: '堂兄弟', emoji: '👦' },
      { word: 'nephew', chinese: '侄子', emoji: '👦' }
    ]
  }

  // 初始化语音
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechRef.current = window.speechSynthesis
      initSpeechSynthesis()
    }
  }, [])

  // 初始化语音合成
  const initSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices()
      console.log('Voices loaded:', voices.length)
    }
  }

  // 选择类别
  const selectCategory = (category) => {
    setGameState(prev => ({
      ...prev,
      currentCategory: category,
      currentLevel: 1,
      score: 0,
      completedLevels: [],
      showCategorySelector: false,
      showLevelSelector: true
    }))
  }

  // 生成关卡按钮
  const generateLevelButtons = () => {
    console.log('Generating level buttons for category:', gameState.currentCategory)
    
    if (!gameState.currentCategory || !gameData[gameState.currentCategory]) {
      console.error('Invalid category in generateLevelButtons:', gameState.currentCategory)
      return []
    }
    
    const maxLevels = Math.min(15, Math.floor(gameData[gameState.currentCategory].length / 5))
    const levelButtons = []
    
    for (let i = 1; i <= maxLevels; i++) {
      levelButtons.push(
        <button
          key={i}
          className={`level-btn ${gameState.completedLevels.includes(i) ? 'completed' : ''} ${i > 1 && !gameState.completedLevels.includes(i - 1) ? 'locked' : ''}`}
          onClick={() => !gameState.completedLevels.includes(i) && i === 1 || gameState.completedLevels.includes(i - 1) ? startLevel(i) : null}
          disabled={i > 1 && !gameState.completedLevels.includes(i - 1)}
        >
          第{i}关
        </button>
      )
    }
    
    return levelButtons
  }

  // 开始关卡
  const startLevel = (level) => {
    console.log('Starting level:', level, 'Category:', gameState.currentCategory)
    
    if (!gameState.currentCategory || !gameData[gameState.currentCategory]) {
      console.error('Invalid category:', gameState.currentCategory)
      return
    }
    
    const wordsInLevel = Math.min(5 + level, 10) // 限制每关最多10个单词
    const categoryWords = [...gameData[gameState.currentCategory]]
    
    if (!categoryWords || categoryWords.length === 0) {
      console.error('No category words available for category:', gameState.currentCategory)
      return
    }
    
    const levelWords = categoryWords
      .sort(() => Math.random() - 0.5)
      .slice(0, wordsInLevel)

    console.log('Starting level:', level, 'Words:', levelWords.length, 'Level words:', levelWords)

    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      levelScore: 0,
      usedWords: [],
      canSelect: true,
      levelWords,
      showLevelSelector: false,
      showGameArea: true,
      showLevelInfo: true
    }))

    // 直接调用nextWord，传递levelWords参数
    // 因为状态更新是异步的，我们直接传递生成的levelWords
    setTimeout(() => {
      console.log('Calling nextWord with levelWords')
      nextWord(levelWords)
    }, 100)
  }

  // 获取下一个单词
  const nextWord = (levelWords = null) => {
    // 使用传入的levelWords或者状态中的levelWords
    const wordsToUse = levelWords || gameState.levelWords
    
    // 确保有单词可以显示
    if (!wordsToUse || wordsToUse.length === 0) {
      console.error('No level words available')
      return
    }
    
    const availableWords = wordsToUse.filter(word => !gameState.usedWords.includes(word.word))
    
    console.log('Available words:', availableWords.length, 'Used words:', gameState.usedWords.length)
    
    if (availableWords.length === 0) {
      completeLevel()
      return
    }
    
    const randomIndex = Math.floor(Math.random() * availableWords.length)
    const currentWord = availableWords[randomIndex]
    
    // 生成选项
    const wrongOptions = gameData[gameState.currentCategory]
      .filter(word => word.word !== currentWord.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const options = [currentWord, ...wrongOptions]
    options.sort(() => Math.random() - 0.5)
    
    setGameState(prev => ({
      ...prev,
      currentWord,
      usedWords: [...prev.usedWords, currentWord.word],
      canSelect: true,
      showResult: false,
      showSuccess: false,
      showError: false,
      options
    }))
  }

  
  // 检查答案
  const checkAnswer = (selectedWord) => {
    if (!gameState.canSelect || !gameState.currentWord) return
    
    const isCorrect = selectedWord.word === gameState.currentWord.word
    
    // 立即禁用选择，防止重复点击
    setGameState(prev => ({
      ...prev,
      canSelect: false,
      showSuccess: false,
      showError: false
    }))
    
    if (isCorrect) {
      // 正确答案
      setGameState(prev => ({
        ...prev,
        levelScore: prev.levelScore + 1,
        score: prev.score + 1,
        showSuccess: true
      }))
      
      // 显示成功提示，然后显示结果
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showSuccess: false
        }))
        showResult()
      }, 1500)
    } else {
      // 错误答案
      setGameState(prev => ({
        ...prev,
        showError: true
      }))
      
      // 添加到错题本
      addToWrongWords()
      
      // 显示错误提示，2秒后允许重新选择
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showError: false,
          canSelect: true
        }))
      }, 2000)
    }
  }

  // 显示结果
  const showResult = () => {
    setGameState(prev => ({
      ...prev,
      showResult: true
    }))
  }

  // 下一个单词
  const nextWordHandler = () => {
    nextWord()
  }

  // 添加到错题本
  const addToWrongWords = () => {
    const exists = gameState.wrongWords.some(word => 
      word.word === gameState.currentWord.word && word.category === gameState.currentCategory
    )
    
    if (!exists) {
      setGameState(prev => ({
        ...prev,
        wrongWords: [...prev.wrongWords, {
          word: gameState.currentWord.word,
          chinese: gameState.currentWord.chinese,
          emoji: gameState.currentWord.emoji,
          category: gameState.currentCategory,
          timestamp: new Date().toLocaleString()
        }]
      }))
    }
  }

  // 完成关卡
  const completeLevel = () => {
    console.log('Completing level:', gameState.currentLevel, 'Words used:', gameState.usedWords.length)
    
    if (!gameState.completedLevels.includes(gameState.currentLevel)) {
      setGameState(prev => ({
        ...prev,
        completedLevels: [...prev.completedLevels, gameState.currentLevel]
      }))
    }
    
    setGameState(prev => ({
      ...prev,
      showLevelComplete: true
    }))
  }

  // 下一关
  const nextLevel = () => {
    setGameState(prev => ({
      ...prev,
      showLevelComplete: false,
      showGameArea: false,
      showLevelInfo: false,
      showLevelSelector: true
    }))
  }

  // 返回主菜单
  const returnToMainMenu = () => {
    setGameState(prev => ({
      ...prev,
      currentCategory: '',
      currentLevel: 1,
      score: 0,
      completedLevels: [],
      usedWords: [],
      levelWords: [],
      canSelect: true,
      showGameArea: false,
      showLevelInfo: false,
      showLevelSelector: false,
      showCategorySelector: true,
      showWrongWords: false
    }))
  }

  // 切换错题本显示
  const toggleWrongWords = () => {
    setGameState(prev => ({
      ...prev,
      showWrongWords: !prev.showWrongWords
    }))
  }

  // 清空错题本
  const clearWrongWords = () => {
    setGameState(prev => ({
      ...prev,
      wrongWords: []
    }))
  }

  // 从错题本中移除单词
  const removeFromWrongWords = (wordToRemove) => {
    setGameState(prev => ({
      ...prev,
      wrongWords: prev.wrongWords.filter(word => 
        !(word.word === wordToRemove.word && word.category === wordToRemove.category)
      )
    }))
  }

  // 播放当前单词
  const playCurrentWord = () => {
    if (speechRef.current && gameState.currentWord) {
      playWord(gameState.currentWord.word)
    }
  }

  // 播放指定单词
  const playWord = (word) => {
    if (speechRef.current) {
      try {
        speechRef.current.cancel()
        
        const utterance = new SpeechSynthesisUtterance(word)
        utterance.lang = 'en-US'
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 1
        
        speechRef.current.speak(utterance)
      } catch (error) {
        console.error('Error playing speech:', error)
      }
    }
  }

  // 获取类别中文名
  const getCategoryName = (category) => {
    const categoryNames = {
      animals: '🐱 动物',
      vehicles: '🚗 交通工具',
      fruits: '🍎 水果',
      colors: '🎨 颜色',
      numbers: '🔢 数字',
      family: '👨‍👩‍👧‍👦 家庭'
    }
    return categoryNames[category] || category
  }

  // 计算进度
  const progress = gameState.levelWords.length > 0 ? (gameState.usedWords.length / gameState.levelWords.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full">
        {/* 导航按钮 */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={returnToMainMenu}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
          >
            🏠 主菜单
          </button>
          <h1 className="text-2xl font-bold text-purple-600">🎯 单词图标闯关游戏</h1>
          <button 
            onClick={toggleWrongWords}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
          >
            📚 错题本 ({gameState.wrongWords.length})
          </button>
        </div>

        {/* 类别选择器 */}
        {gameState.showCategorySelector && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">选择类别:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.keys(gameData).map(category => (
                <button
                  key={category}
                  onClick={() => selectCategory(category)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
                >
                  {category === 'animals' && '🐱 动物'}
                  {category === 'vehicles' && '🚗 交通工具'}
                  {category === 'fruits' && '🍎 水果'}
                  {category === 'colors' && '🎨 颜色'}
                  {category === 'numbers' && '🔢 数字'}
                  {category === 'family' && '👨‍👩‍👧‍👦 家庭'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 关卡选择器 */}
        {gameState.showLevelSelector && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">选择关卡:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {generateLevelButtons()}
            </div>
          </div>
        )}

        {/* 关卡信息 */}
        {gameState.showLevelInfo && (
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 rounded-xl mb-6 flex justify-between items-center">
            <div className="text-lg font-bold">第 {gameState.currentLevel} 关</div>
            <div className="text-lg">进度: {gameState.usedWords.length} / {gameState.levelWords.length}</div>
            <div className="text-lg">得分: {gameState.score}</div>
          </div>
        )}

        {/* 游戏区域 */}
        {gameState.showGameArea && (
          <div>
            {/* 音频控制 */}
            <div className="text-center mb-6">
              <button
                onClick={playCurrentWord}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                🔊 播放单词
              </button>
            </div>

            {/* 选项网格 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {gameState.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => gameState.canSelect && checkAnswer(option)}
                  className={`border-3 border-gray-300 rounded-xl p-6 text-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                    !gameState.canSelect ? 'pointer-events-none opacity-60' : ''
                  }`}
                >
                  <div className="text-6xl mb-2">{option.emoji}</div>
                  <div className="text-lg font-semibold text-gray-700">{option.chinese}</div>
                </div>
              ))}
            </div>

            {/* 结果显示 */}
            {gameState.showResult && (
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-xl border-l-4 border-green-500 mb-6">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {gameState.currentWord.emoji} {gameState.currentWord.word}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {gameState.currentWord.chinese}
                </div>
                <button
                  onClick={nextWordHandler}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
                >
                  下一个单词
                </button>
              </div>
            )}
          </div>
        )}

        {/* 关卡完成弹窗 */}
        {gameState.showLevelComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
              <h2 className="text-4xl font-bold text-green-500 mb-4">
                🎉 关卡完成!
              </h2>
              <div className="text-lg text-gray-600 mb-6">
                <div>第 {gameState.currentLevel} 关</div>
                <div>得分: {gameState.levelScore} / {gameState.levelWords.length}</div>
                <div>正确率: {Math.round((gameState.levelScore / gameState.levelWords.length) * 100)}%</div>
              </div>
              <button
                onClick={nextLevel}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all"
              >
                继续下一关
              </button>
            </div>
          </div>
        )}

        {/* 错误提示 */}
        {gameState.showError && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-bold z-50">
            ❌ 选择错误，请重新选择！
          </div>
        )}

        {/* 成功提示 */}
        {gameState.showSuccess && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl text-xl font-bold z-50">
            🎉 选择正确！太棒了！
          </div>
        )}

        {/* 错题本弹窗 */}
        {gameState.showWrongWords && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-purple-600">📚 错题本</h2>
                <button 
                  onClick={toggleWrongWords}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕ 关闭
                </button>
              </div>
              
              {gameState.wrongWords.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-xl text-gray-600">太棒了！错题本是空的，说明你都答对了！</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">共有 {gameState.wrongWords.length} 个错题</p>
                    <button 
                      onClick={clearWrongWords}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors text-sm"
                    >
                      🗑️ 清空错题本
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gameState.wrongWords.map((word, index) => (
                      <div key={index} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border-l-4 border-red-400">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-2xl">{word.emoji}</div>
                          <button 
                            onClick={() => removeFromWrongWords(word)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="font-bold text-lg text-gray-800">{word.word}</div>
                        <div className="text-gray-600 mb-2">{word.chinese}</div>
                        <div className="text-sm text-gray-500">
                          类别: {getCategoryName(word.category)}
                        </div>
                        <div className="text-xs text-gray-400">
                          时间: {word.timestamp}
                        </div>
                        <button
                          onClick={() => playWord(word.word)}
                          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
                        >
                          🔊 播放发音
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EnglishWordChallenge