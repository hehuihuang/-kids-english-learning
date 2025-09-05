import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'

const WordGamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameState, setGameState] = useState({
    score: 0,
    currentWord: null,
    options: [],
    isPlaying: false,
    showResult: false,
    isCorrect: null
  })

  const speechRef = useRef(null)
  const canvasRef = useRef(null)
  const [gameActive, setGameActive] = useState(false)
  const [gameScore, setGameScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [levelTargets, setLevelTargets] = useState(10)
  const [hitCount, setHitCount] = useState(0)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [powerUps, setPowerUps] = useState([])
  const [activePowerUp, setActivePowerUp] = useState(null)
  const [specialAttack, setSpecialAttack] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bossActive, setBossActive] = useState(false)
  const [bossHealth, setBossHealth] = useState(0)

  // 游戏数据 - 从启蒙单词.md提取并按难度分级
  const gameWordsByLevel = {
    1: [ // Starter - 字母和基础单词
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'CAT', 'DOG', 'FISH', 'BIRD', 'DUCK', 'COW', 'PIG', 'BEAR', 'RED', 'BLUE', 'GREEN', 'YELLOW', 'BLACK', 'WHITE', 'PINK', 'ORANGE',
      'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'BALL', 'CAR', 'BOOK', 'DOLL', 'CUP', 'BAG'
    ],
    2: [ // Level 1 - 简单单词
      'APPLE', 'BANANA', 'PEAR', 'ORANGE', 'GRAPE', 'HAPPY', 'SAD', 'ANGRY', 'TIRED', 'BIG', 'SMALL', 'HOT', 'COLD', 'FAST', 'SLOW',
      'JUMP', 'RUN', 'WALK', 'EAT', 'DRINK', 'SING', 'DANCE', 'PLAY', 'SLEEP', 'SWIM', 'MILK', 'BREAD', 'EGG', 'CAKE', 'JUICE', 'WATER',
      'FATHER', 'MOTHER', 'SISTER', 'BROTHER', 'HOUSE', 'DOOR', 'WINDOW', 'BED', 'CHAIR', 'TABLE', 'SUNNY', 'RAINY', 'WINDY', 'SNOW'
    ],
    3: [ // Level 2 - 中等难度单词
      'SCHOOL', 'TEACHER', 'STUDENT', 'FRIEND', 'FAMILY', 'KITCHEN', 'BATHROOM', 'BEDROOM', 'LIBRARY', 'HOSPITAL',
      'SHIRT', 'PANTS', 'SKIRT', 'DRESS', 'SHOES', 'HAT', 'COAT', 'SWEATER', 'JACKET', 'SOCKS', 'GLOVES', 'SCARF',
      'BUS', 'CAR', 'BIKE', 'TRAIN', 'BOAT', 'AIRPLANE', 'TAXI', 'TRUCK', 'BIRTHDAY', 'CHRISTMAS', 'PARTY', 'GIFT',
      'PIZZA', 'HAMBURGER', 'SANDWICH', 'SALAD', 'SOUP', 'RICE', 'NOODLES', 'CHICKEN', 'BEEF', 'FISH', 'VEGETABLE'
    ],
    4: [ // Level 3 - 较难单词
      'DOCTOR', 'NURSE', 'FARMER', 'DRIVER', 'COOK', 'POLICE', 'FIREMAN', 'ARTIST', 'MUSICIAN', 'SINGER', 'DANCER',
      'WRITER', 'ENGINEER', 'SCIENTIST', 'PILOT', 'ASTRONAUT', 'BAKER', 'DENTIST', 'LAWYER', 'BUSINESSMAN', 'ACTOR',
      'EXCITED', 'BORED', 'WORRIED', 'SURPRISED', 'NERVOUS', 'CONFUSED', 'PROUD', 'SHY', 'LONELY', 'GRATEFUL',
      'MORNING', 'AFTERNOON', 'EVENING', 'TOMORROW', 'YESTERDAY', 'WEEK', 'MONTH', 'YEAR', 'MONDAY', 'TUESDAY', 'WEDNESDAY'
    ]
  }

  // 道具类型
  const powerUpTypes = {
    SHIELD: { emoji: '🛡️', color: '#00ffff', duration: 5000, name: '护盾' },
    DOUBLE_SCORE: { emoji: '💎', color: '#ffff00', duration: 8000, name: '双倍分数' },
    RAPID_FIRE: { emoji: '⚡', color: '#ff8800', duration: 6000, name: '连发' },
    SLOW_TIME: { emoji: '⏰', color: '#8800ff', duration: 4000, name: '时间减缓' }
  }

  // 听力挑战游戏数据
  const gameWords = [
    { word: 'cat', chinese: '猫', emoji: '🐱' },
    { word: 'dog', chinese: '狗', emoji: '🐶' },
    { word: 'apple', chinese: '苹果', emoji: '🍎' },
    { word: 'banana', chinese: '香蕉', emoji: '🍌' },
    { word: 'red', chinese: '红色', emoji: '🔴' },
    { word: 'blue', chinese: '蓝色', emoji: '🔵' },
    { word: 'happy', chinese: '开心', emoji: '😊' },
    { word: 'sad', chinese: '难过', emoji: '😢' },
    { word: 'big', chinese: '大', emoji: '🐘' },
    { word: 'small', chinese: '小', emoji: '🐭' },
    { word: 'run', chinese: '跑', emoji: '🏃' },
    { word: 'jump', chinese: '跳', emoji: '🦘' },
    { word: 'eat', chinese: '吃', emoji: '🍽️' },
    { word: 'drink', chinese: '喝', emoji: '🥤' },
    { word: 'book', chinese: '书', emoji: '📚' },
    { word: 'ball', chinese: '球', emoji: '⚽' },
    { word: 'house', chinese: '房子', emoji: '🏠' },
    { word: 'tree', chinese: '树', emoji: '🌳' },
    { word: 'sun', chinese: '太阳', emoji: '☀️' },
    { word: 'moon', chinese: '月亮', emoji: '🌙' }
  ]

  // 初始化语音
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechRef.current = window.speechSynthesis
    }
  }, [])

  // 飞机大战游戏逻辑
  useEffect(() => {
    if (!gameActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // 游戏状态变量
    let currentGameScore = gameScore
    let currentHitCount = hitCount
    let currentLives = lives
    let currentSpecialAttack = specialAttack
    let currentCombo = combo
    let currentBossHealth = bossHealth
    let isBossActive = bossActive
    let currentActivePowerUp = activePowerUp
    let powerUpEndTime = 0
    
    // 游戏对象
    const player = {
      x: canvas.width / 2 - 25,
      y: canvas.height - 80,
      width: 50,
      height: 50,
      speed: 5,
      shield: false
    }

    const bullets = []
    const enemies = []
    const particles = []
    const powerUpItems = []
    const stars = []

    // 初始化星空背景
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 1
      })
    }

    // 根据当前关卡获取单词
    const targets = gameWordsByLevel[currentLevel] || gameWordsByLevel[1]

    // 键盘控制
    const keys = {}
    const handleKeyDown = (e) => {
      keys[e.key] = true
      // 特殊攻击 - X键
      if (e.key === 'x' || e.key === 'X') {
        if (currentSpecialAttack >= 100) {
          activateSpecialAttack()
        }
      }
    }
    const handleKeyUp = (e) => keys[e.key] = false
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    // 创建敌人
    const createEnemy = () => {
      const target = targets[Math.floor(Math.random() * targets.length)]
      const baseSpeed = 1 + (currentLevel - 1) * 0.3
      enemies.push({
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        speed: baseSpeed + Math.random() * 2,
        target: target,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        type: 'normal'
      })
    }

    // 创建Boss敌人
    const createBoss = () => {
      const bossWords = targets.slice(0, 5)
      isBossActive = true
      setBossActive(true)
      currentBossHealth = 50
      setBossHealth(50)
      
      enemies.push({
        x: canvas.width / 2 - 60,
        y: -100,
        width: 120,
        height: 80,
        speed: 0.5,
        target: 'BOSS',
        color: '#ff0000',
        type: 'boss',
        health: 50,
        maxHealth: 50,
        words: bossWords
      })
    }

    // 创建道具
    const createPowerUp = () => {
      const types = Object.keys(powerUpTypes)
      const type = types[Math.floor(Math.random() * types.length)]
      const powerUp = powerUpTypes[type]
      
      powerUpItems.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        speed: 2,
        type: type,
        ...powerUp
      })
    }

    // 创建子弹
    const createBullet = () => {
      const bulletCount = currentActivePowerUp === 'RAPID_FIRE' ? 3 : 1
      const spread = currentActivePowerUp === 'RAPID_FIRE' ? 15 : 0
      
      for (let i = 0; i < bulletCount; i++) {
        bullets.push({
          x: player.x + player.width / 2 - 2 + (i - 1) * spread,
          y: player.y,
          width: 4,
          height: 10,
          speed: 7
        })
      }
    }

    // 特殊攻击
    const activateSpecialAttack = () => {
      currentSpecialAttack = 0
      setSpecialAttack(0)
      
      // 清屏激光
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          bullets.push({
            x: i * 40,
            y: 0,
            width: 4,
            height: canvas.height,
            speed: 15,
            special: true
          })
        }, i * 50)
      }
    }

    // 创建粒子效果
    const createParticles = (x, y, color, count = 8) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 40,
          color: color,
          size: Math.random() * 4 + 2
        })
      }
    }

    // 碰撞检测
    const checkCollision = (rect1, rect2) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y
    }

    // 游戏循环
    const gameLoop = () => {
      if (!gameActive) return

      // 清空画布
      ctx.fillStyle = '#000011'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制星空背景
      ctx.fillStyle = 'white'
      stars.forEach(star => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = -star.size
          star.x = Math.random() * canvas.width
        }
        ctx.globalAlpha = Math.random() * 0.8 + 0.2
        ctx.fillRect(star.x, star.y, star.size, star.size)
      })
      ctx.globalAlpha = 1

      // 玩家移动
      if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed
      }
      if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed
      }
      if (keys[' ']) {
        if (bullets.length < (currentActivePowerUp === 'RAPID_FIRE' ? 15 : 5)) {
          createBullet()
        }
      }

      // 绘制玩家
      if (player.shield) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)'
        ctx.beginPath()
        ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 35, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.fillStyle = currentActivePowerUp ? '#ffff00' : '#00ff00'
      ctx.fillRect(player.x, player.y, player.width, player.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('🚀', player.x + player.width / 2, player.y + player.height / 2 + 8)

      // 更新和绘制子弹
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i]
        bullet.y -= bullet.speed
        
        ctx.fillStyle = bullet.special ? '#ff00ff' : '#ffff00'
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
        
        if (bullet.y < -bullet.height) {
          bullets.splice(i, 1)
        }
      }

      // 更新和绘制敌人
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        const speedMultiplier = currentActivePowerUp === 'SLOW_TIME' ? 0.3 : 1
        enemy.y += enemy.speed * speedMultiplier
        
        // 绘制敌人
        if (enemy.type === 'boss') {
          // Boss绘制
          ctx.fillStyle = enemy.color
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
          
          // Boss血条
          ctx.fillStyle = '#ff0000'
          ctx.fillRect(enemy.x, enemy.y - 20, enemy.width, 10)
          ctx.fillStyle = '#00ff00'
          ctx.fillRect(enemy.x, enemy.y - 20, enemy.width * (enemy.health / enemy.maxHealth), 10)
          
          // Boss单词
          ctx.fillStyle = '#ffffff'
          ctx.font = '20px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(enemy.target, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2 + 5)
          
          // 显示Boss要考验的单词
          ctx.font = '14px Arial'
          enemy.words.forEach((word, index) => {
            ctx.fillText(word, enemy.x + 20 + index * 20, enemy.y + enemy.height + 20)
          })
        } else {
          // 普通敌人
          ctx.fillStyle = enemy.color
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
          ctx.fillStyle = '#ffffff'
          ctx.font = '16px Arial'
          ctx.textAlign = 'center'
          ctx.fillText(enemy.target, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2 + 5)
        }
        
        // 检查是否与玩家碰撞
        if (checkCollision(player, enemy)) {
          if (!player.shield) {
            createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color, 12)
            enemies.splice(i, 1)
            currentLives -= 1
            currentCombo = 0
            setCombo(currentCombo)
            setLives(currentLives)
            
            if (currentLives <= 0) {
              setGameOver(true)
              setGameActive(false)
            }
          } else {
            createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#00ffff', 6)
            enemies.splice(i, 1)
            currentGameScore += 5
            setGameScore(currentGameScore)
          }
        }
        
        if (enemy.y > canvas.height) {
          enemies.splice(i, 1)
          if (enemy.type !== 'boss') {
            currentCombo = 0
            setCombo(currentCombo)
          }
        }
      }

      // 更新和绘制道具
      for (let i = powerUpItems.length - 1; i >= 0; i--) {
        const powerUp = powerUpItems[i]
        powerUp.y += powerUp.speed
        
        // 绘制道具
        ctx.fillStyle = powerUp.color
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height)
        ctx.fillStyle = '#ffffff'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(powerUp.emoji, powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2 + 6)
        
        // 检查是否与玩家碰撞
        if (checkCollision(player, powerUp)) {
          activatePowerUp(powerUp.type)
          powerUpItems.splice(i, 1)
          createParticles(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2, powerUp.color, 10)
        }
        
        if (powerUp.y > canvas.height) {
          powerUpItems.splice(i, 1)
        }
      }

      // 激活道具效果
      const activatePowerUp = (type) => {
        currentActivePowerUp = type
        setActivePowerUp(type)
        powerUpEndTime = Date.now() + powerUpTypes[type].duration
        
        if (type === 'SHIELD') {
          player.shield = true
          setTimeout(() => {
            player.shield = false
          }, powerUpTypes[type].duration)
        }
      }

      // 碰撞检测
      for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
          if (checkCollision(bullets[i], enemies[j])) {
            const enemy = enemies[j]
            createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color, 10)
            bullets.splice(i, 1)
            
            if (enemy.type === 'boss') {
              enemy.health -= 1
              currentBossHealth = enemy.health
              setBossHealth(currentBossHealth)
              
              if (enemy.health <= 0) {
                enemies.splice(j, 1)
                currentGameScore += 100
                currentHitCount += 10
                isBossActive = false
                setBossActive(false)
                setGameScore(currentGameScore)
                setHitCount(currentHitCount)
                
                // Boss被击败，完成关卡
                setShowLevelComplete(true)
                setGameActive(false)
              }
            } else {
              enemies.splice(j, 1)
              const scoreGain = currentActivePowerUp === 'DOUBLE_SCORE' ? 20 : 10
              currentGameScore += scoreGain
              currentHitCount += 1
              currentCombo += 1
              currentSpecialAttack = Math.min(100, currentSpecialAttack + 5)
              
              // 连击奖励
              if (currentCombo >= 5) {
                currentGameScore += currentCombo
              }
              
              setGameScore(currentGameScore)
              setHitCount(currentHitCount)
              setCombo(currentCombo)
              setSpecialAttack(currentSpecialAttack)
              
              // 检查是否完成关卡（击中10架飞机或击败Boss）
              if (currentHitCount >= 8 && !isBossActive) {
                createBoss()
              }
            }
            break
          }
        }
      }

      // 更新和绘制粒子
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--
        
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life / 40
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
        ctx.globalAlpha = 1
        
        if (particle.life <= 0) {
          particles.splice(i, 1)
        }
      }

      // 检查道具效果时间
      if (currentActivePowerUp && Date.now() > powerUpEndTime) {
        currentActivePowerUp = null
        setActivePowerUp(null)
      }

      // 绘制UI
      ctx.fillStyle = '#ffffff'
      ctx.font = '18px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(`分数: ${currentGameScore}`, 10, 30)
      ctx.fillText(`第 ${currentLevel} 关`, 10, 55)
      ctx.fillText(`击中: ${currentHitCount}/8`, 10, 80)
      
      // 绘制连击
      if (currentCombo > 0) {
        ctx.fillStyle = '#ffff00'
        ctx.fillText(`连击: ${currentCombo}`, 10, 105)
      }
      
      // 绘制生命值
      ctx.fillStyle = '#ff4444'
      ctx.fillText(`生命: ${'❤️'.repeat(Math.max(0, currentLives))}`, 10, 130)
      
      // 绘制特殊攻击能量
      ctx.fillStyle = '#ff00ff'
      ctx.fillRect(10, 145, 100, 10)
      ctx.fillStyle = '#00ffff'
      ctx.fillRect(10, 145, currentSpecialAttack, 10)
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px Arial'
      ctx.fillText('特殊攻击 (X)', 10, 170)
      
      // 绘制当前道具效果
      if (currentActivePowerUp) {
        ctx.fillStyle = powerUpTypes[currentActivePowerUp].color
        ctx.font = '16px Arial'
        ctx.fillText(`${powerUpTypes[currentActivePowerUp].emoji} ${powerUpTypes[currentActivePowerUp].name}`, 10, 195)
      }

      // 随机生成敌人和道具
      const spawnRate = isBossActive ? 0 : 0.015 + (currentLevel - 1) * 0.005
      if (Math.random() < spawnRate) {
        createEnemy()
      }
      
      const powerUpSpawnRate = 0.003
      if (Math.random() < powerUpSpawnRate) {
        createPowerUp()
      }

      requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      setGameActive(false)
    }
  }, [gameActive, currentLevel, levelTargets, gameScore, hitCount, lives, specialAttack, combo, bossActive, bossHealth, activePowerUp])

  // 游戏选择界面
  const renderGameSelection = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-8 text-purple-600">选择游戏</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl cursor-pointer hover:shadow-xl transition-all"
          onClick={() => setSelectedGame('listening')}
        >
          <div className="text-6xl mb-4">🎧</div>
          <h3 className="text-2xl font-bold mb-2">听力挑战</h3>
          <p className="text-lg">听英语单词，选择正确的中文意思</p>
          <div className="mt-4 text-sm opacity-80">答对得5分</div>
        </div>
        
        <div 
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-2xl cursor-pointer hover:shadow-xl transition-all"
          onClick={() => setSelectedGame('shooting')}
        >
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-2xl font-bold mb-2">飞机大战</h3>
          <p className="text-lg">射击字母和单词，保卫天空</p>
          <div className="mt-4 text-sm opacity-80">经典射击游戏</div>
        </div>
      </div>
    </div>
  )

  // 听力挑战游戏
  const renderListeningGame = () => {
    const startGame = () => {
      const randomWord = gameWords[Math.floor(Math.random() * gameWords.length)]
      const wrongOptions = gameWords
        .filter(w => w.word !== randomWord.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      
      const options = [randomWord, ...wrongOptions].sort(() => Math.random() - 0.5)
      
      setGameState(prev => ({
        ...prev,
        currentWord: randomWord,
        options,
        isPlaying: true,
        showResult: false,
        isCorrect: null
      }))
      
      // 自动播放单词
      setTimeout(() => playWord(randomWord.word), 500)
    }

    const checkAnswer = (selectedWord) => {
      const isCorrect = selectedWord.word === gameState.currentWord.word
      setGameState(prev => ({
        ...prev,
        showResult: true,
        isCorrect,
        score: isCorrect ? prev.score + 5 : prev.score
      }))
    }

    const nextWord = () => {
      startGame()
    }

    const playWord = (word) => {
      if (speechRef.current) {
        try {
          speechRef.current.cancel()
          const utterance = new SpeechSynthesisUtterance(word)
          utterance.lang = 'en-US'
          utterance.rate = 0.8
          utterance.pitch = 1
          speechRef.current.speak(utterance)
        } catch (error) {
          console.error('Error playing speech:', error)
        }
      }
    }

    if (!gameState.isPlaying) {
      return (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">听力挑战</h2>
          <p className="text-lg mb-8 text-gray-600">听英语单词，选择正确的中文意思</p>
          <Button 
            onClick={startGame}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 text-xl"
          >
            开始游戏
          </Button>
        </div>
      )
    }

    return (
      <div className="text-center">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={() => {
              setSelectedGame(null)
              setGameState(prev => ({ ...prev, isPlaying: false }))
            }}
            className="bg-gray-500 text-white"
          >
            返回
          </Button>
          <div className="text-xl font-bold">得分: {gameState.score}</div>
        </div>

        {!gameState.showResult ? (
          <div>
            <div className="mb-8">
              <button
                onClick={() => playWord(gameState.currentWord.word)}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                🔊 再次播放
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {gameState.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200"
                >
                  <div className="text-4xl mb-2">{option.emoji}</div>
                  <div className="text-lg font-semibold text-gray-700">{option.chinese}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className={`text-6xl mb-4 ${gameState.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {gameState.isCorrect ? '🎉' : '❌'}
            </div>
            <div className="text-2xl font-bold mb-4">
              {gameState.currentWord.word} - {gameState.currentWord.chinese}
            </div>
            <div className="text-lg mb-6">
              {gameState.isCorrect ? '答对了！+5分' : '答错了，再试一次！'}
            </div>
            <Button 
              onClick={nextWord}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3"
            >
              下一个单词
            </Button>
          </div>
        )}
      </div>
    )
  }

  // 飞机大战游戏
  const renderShootingGame = () => {
    const startGame = () => {
      setGameActive(true)
      setGameScore(0)
      setHitCount(0)
      setShowLevelComplete(false)
      setGameComplete(false)
      setLives(3)
      setGameOver(false)
      setPowerUps([])
      setActivePowerUp(null)
      setSpecialAttack(0)
      setCombo(0)
      setBossActive(false)
      setBossHealth(0)
    }

    const nextLevel = () => {
      if (currentLevel >= 4) {
        setGameComplete(true)
        setShowLevelComplete(false)
      } else {
        setCurrentLevel(prev => prev + 1)
        setHitCount(0)
        setShowLevelComplete(false)
        setBossActive(false)
        setBossHealth(0)
        setGameActive(true)
      }
    }

    const resetGame = () => {
      setGameActive(false)
      setCurrentLevel(1)
      setHitCount(0)
      setLevelTargets(10)
      setShowLevelComplete(false)
      setGameComplete(false)
      setLives(3)
      setGameOver(false)
      setPowerUps([])
      setActivePowerUp(null)
      setSpecialAttack(0)
      setCombo(0)
      setBossActive(false)
      setBossHealth(0)
    }

    return (
      <div className="text-center">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={() => {
              setSelectedGame(null)
              resetGame()
            }}
            className="bg-gray-500 text-white"
          >
            返回
          </Button>
          <div className="text-center">
            <div className="text-xl font-bold">分数: {gameScore}</div>
            <div className="text-sm text-gray-600">第 {currentLevel} 关 - 击中: {hitCount}/10</div>
            <div className="text-sm text-red-600">生命: {'❤️'.repeat(Math.max(0, lives))}</div>
          </div>
        </div>

        {!gameActive ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-green-600">飞机大战 - 超级增强版</h2>
            <p className="text-lg mb-4 text-gray-600">使用方向键移动，空格键射击，X键释放特殊攻击</p>
            <p className="text-md mb-4 text-blue-600 font-semibold">第 {currentLevel} 关 - 击中8架飞机后挑战Boss！</p>
            <p className="text-md mb-8 text-red-600 font-semibold">目标：完成四关通关，成为真正的飞行英雄！</p>
            <Button 
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 text-xl"
            >
              开始游戏
            </Button>
            <div className="mt-8 text-left max-w-2xl mx-auto">
              <h3 className="font-bold mb-3 text-lg">🎮 游戏说明：</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold mb-2">基本操作：</h4>
                  <ul className="space-y-1">
                    <li>• ← → 方向键：控制飞机移动</li>
                    <li>• 空格键：发射子弹</li>
                    <li>• X键：释放特殊攻击（需要能量满）</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">游戏目标：</h4>
                  <ul className="space-y-1">
                    <li>• 击中8架飞机后挑战Boss</li>
                    <li>• 击败Boss完成关卡</li>
                    <li>• 完成四关通关</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">道具系统：</h4>
                  <ul className="space-y-1">
                    <li>• 🛡️ 护盾：保护你免受伤害</li>
                    <li>• 💎 双倍分数：获得双倍分数</li>
                    <li>• ⚡ 连发：一次发射3颗子弹</li>
                    <li>• ⏰ 时间减缓：敌人移动变慢</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">特色功能：</h4>
                  <ul className="space-y-1">
                    <li>• 连击系统：连续击中获得额外分数</li>
                    <li>• 特殊攻击：积累能量释放清屏激光</li>
                    <li>• Boss战：每关最终挑战</li>
                    <li>• 生命值：3次生命机会</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border-2 border-gray-300 rounded-lg mx-auto"
            />
          </div>
        )}

        {/* 关卡完成弹窗 */}
        {showLevelComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
              <h2 className="text-4xl font-bold text-green-500 mb-4">
                🎉 关卡完成!
              </h2>
              <div className="text-lg text-gray-600 mb-6">
                <div>🎉 第 {currentLevel} 关完成！</div>
                <div>🎯 击败Boss，成功通关</div>
                <div>⭐ 总分: {gameScore}</div>
                <div>🔥 连击记录: {combo}</div>
              </div>
              {currentLevel < 4 ? (
                <Button
                  onClick={nextLevel}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all"
                >
                  下一关 🚀
                </Button>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-4">
                    🏆 恭喜通关！
                  </div>
                  <div className="text-lg text-gray-600 mb-4">
                    你已经完成了所有四关！<br/>
                    总分: {gameScore}
                  </div>
                  <Button
                    onClick={resetGame}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all"
                  >
                    重新开始
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 游戏结束弹窗 */}
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
              <h2 className="text-4xl font-bold text-red-600 mb-4">
                💥 游戏结束！
              </h2>
              <div className="text-lg text-gray-600 mb-6">
                <div>你的生命值用完了！</div>
                <div>最终得分: {gameScore}</div>
                <div>达到第 {currentLevel} 关</div>
                <div>再接再厉，你一定能做到！</div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all w-full"
                >
                  重新开始
                </Button>
                <Button
                  onClick={() => {
                    setSelectedGame(null)
                    resetGame()
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all w-full"
                >
                  返回游戏选择
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 游戏完成弹窗 */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
              <h2 className="text-4xl font-bold text-purple-600 mb-4">
                🏆 游戏通关！
              </h2>
              <div className="text-lg text-gray-600 mb-6">
                <div>恭喜你完成了所有四关！</div>
                <div>最终得分: {gameScore}</div>
                <div>你是真正的飞行英雄！</div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all w-full"
                >
                  重新开始
                </Button>
                <Button
                  onClick={() => {
                    setSelectedGame(null)
                    resetGame()
                  }}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all w-full"
                >
                  返回游戏选择
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        {/* 导航 */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
          >
            🏠 返回
          </button>
          <h1 className="text-3xl font-bold text-purple-600">🎮 单词游戏</h1>
          <div className="w-20"></div>
        </div>

        {/* 游戏内容 */}
        {selectedGame === null && renderGameSelection()}
        {selectedGame === 'listening' && renderListeningGame()}
        {selectedGame === 'shooting' && renderShootingGame()}
      </div>
    </div>
  )
}

export default WordGamesPage