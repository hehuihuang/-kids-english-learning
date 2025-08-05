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

  // 游戏数据
  const gameWords = [
    { word: 'apple', chinese: '苹果', emoji: '🍎' },
    { word: 'banana', chinese: '香蕉', emoji: '🍌' },
    { word: 'cat', chinese: '猫', emoji: '🐱' },
    { word: 'dog', chinese: '狗', emoji: '🐶' },
    { word: 'elephant', chinese: '大象', emoji: '🐘' },
    { word: 'fish', chinese: '鱼', emoji: '🐠' },
    { word: 'grape', chinese: '葡萄', emoji: '🍇' },
    { word: 'house', chinese: '房子', emoji: '🏠' },
    { word: 'ice', chinese: '冰', emoji: '🧊' },
    { word: 'juice', chinese: '果汁', emoji: '🧃' },
    { word: 'king', chinese: '国王', emoji: '👑' },
    { word: 'lion', chinese: '狮子', emoji: '🦁' },
    { word: 'moon', chinese: '月亮', emoji: '🌙' },
    { word: 'nest', chinese: '鸟巢', emoji: '🪺' },
    { word: 'orange', chinese: '橙子', emoji: '🍊' },
    { word: 'pig', chinese: '猪', emoji: '🐷' },
    { word: 'queen', chinese: '女王', emoji: '👸' },
    { word: 'rabbit', chinese: '兔子', emoji: '🐰' },
    { word: 'sun', chinese: '太阳', emoji: '☀️' },
    { word: 'tree', chinese: '树', emoji: '🌳' }
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
    
    // 游戏对象
    const player = {
      x: canvas.width / 2 - 25,
      y: canvas.height - 80,
      width: 50,
      height: 50,
      speed: 5
    }

    const bullets = []
    const enemies = []
    const particles = []

    // 字母和单词
    const targets = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'CAT', 'DOG', 'SUN', 'MOON', 'STAR', 'TREE', 'FISH', 'BIRD', 'BOOK', 'CAKE'
    ]

    // 键盘控制
    const keys = {}
    const handleKeyDown = (e) => keys[e.key] = true
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
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      })
    }

    // 创建子弹
    const createBullet = () => {
      bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 10,
        speed: 7
      })
    }

    // 创建粒子效果
    const createParticles = (x, y, color) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 30,
          color: color
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
      ctx.fillStyle = '#001122'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制星空背景
      ctx.fillStyle = 'white'
      for (let i = 0; i < 50; i++) {
        const x = (i * 37) % canvas.width
        const y = (i * 43 + Date.now() * 0.1) % canvas.height
        ctx.fillRect(x, y, 1, 1)
      }

      // 玩家移动
      if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed
      }
      if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed
      }
      if (keys[' ']) {
        if (bullets.length < 5) {
          createBullet()
        }
      }

      // 绘制玩家
      ctx.fillStyle = '#00ff00'
      ctx.fillRect(player.x, player.y, player.width, player.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = '20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('🚀', player.x + player.width / 2, player.y + player.height / 2 + 7)

      // 更新和绘制子弹
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i]
        bullet.y -= bullet.speed
        
        ctx.fillStyle = '#ffff00'
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
        
        if (bullet.y < 0) {
          bullets.splice(i, 1)
        }
      }

      // 更新和绘制敌人
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.y += enemy.speed
        
        // 绘制敌人
        ctx.fillStyle = enemy.color
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
        ctx.fillStyle = '#ffffff'
        ctx.font = '16px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(enemy.target, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2 + 5)
        
        // 检查是否与玩家碰撞
        if (checkCollision(player, enemy)) {
          createParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color)
          enemies.splice(i, 1)
          currentLives -= 1
          setLives(currentLives)
          
          if (currentLives <= 0) {
            setGameOver(true)
            setGameActive(false)
          }
        }
        
        if (enemy.y > canvas.height) {
          enemies.splice(i, 1)
        }
      }

      // 碰撞检测
      for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
          if (checkCollision(bullets[i], enemies[j])) {
            createParticles(enemies[j].x + enemies[j].width / 2, enemies[j].y + enemies[j].height / 2, enemies[j].color)
            bullets.splice(i, 1)
            enemies.splice(j, 1)
            currentGameScore += 10
            currentHitCount += 1
            
            // 更新状态
            setGameScore(currentGameScore)
            setHitCount(currentHitCount)
            
            // 检查是否达到100分
            if (currentGameScore >= 100) {
              setGameComplete(true)
              setGameActive(false)
            }
            
            // 检查是否完成关卡
            if (currentHitCount >= levelTargets) {
              setShowLevelComplete(true)
              setGameActive(false)
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
        ctx.globalAlpha = particle.life / 30
        ctx.fillRect(particle.x, particle.y, 3, 3)
        ctx.globalAlpha = 1
        
        if (particle.life <= 0) {
          particles.splice(i, 1)
        }
      }

      // 绘制分数和关卡信息
      ctx.fillStyle = '#ffffff'
      ctx.font = '20px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(`分数: ${currentGameScore}`, 10, 30)
      ctx.fillText(`第 ${currentLevel} 关`, 10, 60)
      ctx.fillText(`击中: ${currentHitCount}/${levelTargets}`, 10, 90)
      
      // 绘制生命值
      ctx.fillStyle = '#ff4444'
      ctx.fillText(`生命: ${'❤️'.repeat(currentLives)}`, 10, 120)

      // 随机生成敌人（难度随关卡增加）
      const spawnRate = 0.02 + (currentLevel - 1) * 0.005
      if (Math.random() < spawnRate) {
        createEnemy()
      }

      requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      setGameActive(false)
    }
  }, [gameActive, currentLevel, levelTargets])

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
      setLevelTargets(10 + (currentLevel - 1))
      setShowLevelComplete(false)
      setGameComplete(false)
      setLives(3)
      setGameOver(false)
    }

    const nextLevel = () => {
      if (currentLevel >= 5) {
        setGameComplete(true)
        setShowLevelComplete(false)
      } else {
        setCurrentLevel(prev => prev + 1)
        setHitCount(0)
        setLevelTargets(10 + currentLevel)
        setShowLevelComplete(false)
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
            <div className="text-sm text-gray-600">第 {currentLevel} 关 - 击中: {hitCount}/{levelTargets}</div>
            <div className="text-sm text-red-600">生命: {'❤️'.repeat(lives)}</div>
          </div>
        </div>

        {!gameActive ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-green-600">飞机大战 - 闯关模式</h2>
            <p className="text-lg mb-4 text-gray-600">使用方向键移动，空格键射击</p>
            <p className="text-md mb-4 text-blue-600 font-semibold">第 {currentLevel} 关 - 需要击中 {levelTargets} 架飞机</p>
            <p className="text-md mb-8 text-red-600 font-semibold">目标：累计100分通关！</p>
            <Button 
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 text-xl"
            >
              开始游戏
            </Button>
            <div className="mt-8 text-left max-w-md mx-auto">
              <h3 className="font-bold mb-2">游戏说明：</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 使用 ← → 方向键控制飞机移动</li>
                <li>• 按空格键发射子弹</li>
                <li>• 射击字母和单词获得分数</li>
                <li>• 每击中一个目标得10分</li>
                <li>• 不要让敌人飞到底部</li>
                <li>• 避免与敌人碰撞，你有3次生命机会</li>
                <li>• 累计100分即可通关！</li>
              </ul>
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
                <div>第 {currentLevel} 关完成</div>
                <div>击中目标: {hitCount}/{levelTargets}</div>
                <div>总分: {gameScore}</div>
              </div>
              {currentLevel < 5 ? (
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
                <div>恭喜你达到了100分！</div>
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