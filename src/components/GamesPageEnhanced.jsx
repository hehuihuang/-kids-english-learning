import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Trophy, Star, RotateCcw, Play, ArrowRight } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech.js'
import { gameLevel, shuffleArray, generateRandomPositions } from '../data/gameData.js'

const GamesPageEnhanced = () => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'completed', 'levelComplete'
  const [selectedWord, setSelectedWord] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [shuffledWords, setShuffledWords] = useState([])
  const [shuffledImages, setShuffledImages] = useState([])
  const [wordPositions, setWordPositions] = useState([])
  const [imagePositions, setImagePositions] = useState([])
  const [completedLevels, setCompletedLevels] = useState([])

  const { speakWord } = useSpeech()

  const currentLevelData = gameLevel.find(level => level.level === currentLevel)

  // 初始化游戏
  const initializeGame = () => {
    if (!currentLevelData) return

    const words = currentLevelData.words
    const shuffledWordsArray = shuffleArray(words)
    const shuffledImagesArray = shuffleArray(words)
    
    // 生成随机位置
    const wordPos = generateRandomPositions(words.length)
    const imagePos = generateRandomPositions(words.length)
    
    setShuffledWords(shuffledWordsArray)
    setShuffledImages(shuffledImagesArray)
    setWordPositions(wordPos)
    setImagePositions(imagePos)
    setSelectedWord(null)
    setSelectedImage(null)
    setMatchedPairs([])
    setAttempts(0)
  }

  // 开始游戏
  const startGame = () => {
    setGameState('playing')
    initializeGame()
  }

  // 重新开始当前关卡
  const restartLevel = () => {
    initializeGame()
    setScore(Math.max(0, score - 10)) // 重新开始扣10分
  }

  // 选择单词
  const handleWordClick = (wordData, index) => {
    if (matchedPairs.includes(wordData.word)) return
    
    speakWord(wordData.word)
    setSelectedWord({ ...wordData, index })
    
    // 如果已经选择了图片，检查是否匹配
    if (selectedImage) {
      checkMatch({ ...wordData, index }, selectedImage)
    }
  }

  // 选择图片
  const handleImageClick = (imageData, index) => {
    if (matchedPairs.includes(imageData.word)) return
    
    setSelectedImage({ ...imageData, index })
    
    // 如果已经选择了单词，检查是否匹配
    if (selectedWord) {
      checkMatch(selectedWord, { ...imageData, index })
    }
  }

  // 检查匹配
  const checkMatch = (word, image) => {
    setAttempts(attempts + 1)
    
    if (word.word === image.word) {
      // 匹配成功
      setMatchedPairs([...matchedPairs, word.word])
      setScore(score + 20)
      setSelectedWord(null)
      setSelectedImage(null)
      
      // 检查是否完成当前关卡
      if (matchedPairs.length + 1 === currentLevelData.words.length) {
        setTimeout(() => {
          setGameState('levelComplete')
          if (!completedLevels.includes(currentLevel)) {
            setCompletedLevels([...completedLevels, currentLevel])
          }
        }, 500)
      }
    } else {
      // 匹配失败
      setScore(Math.max(0, score - 5))
      setTimeout(() => {
        setSelectedWord(null)
        setSelectedImage(null)
      }, 1000)
    }
  }

  // 下一关
  const nextLevel = () => {
    if (currentLevel < gameLevel.length) {
      setCurrentLevel(currentLevel + 1)
      setGameState('playing')
      initializeGame()
    } else {
      setGameState('completed')
    }
  }

  // 选择关卡
  const selectLevel = (level) => {
    setCurrentLevel(level)
    setGameState('playing')
    initializeGame()
  }

  // 返回菜单
  const backToMenu = () => {
    setGameState('menu')
  }

  // 渲染游戏菜单
  const renderGameMenu = () => (
    <div className="text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold kid-friendly text-primary mb-4">
          🎮 英语游戏乐园
        </h1>
        <p className="text-lg text-muted-foreground kid-friendly">
          在游戏中快乐学习英语！
        </p>
      </div>

      {/* 关卡选择 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {gameLevel.map((level) => (
          <Card 
            key={level.level}
            className={`card-shadow cursor-pointer transition-all duration-300 hover:shadow-xl ${
              completedLevels.includes(level.level) ? 'border-green-500' : ''
            }`}
            onClick={() => selectLevel(level.level)}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-between mb-4">
                <Badge variant={level.level === currentLevel ? "default" : "secondary"}>
                  关卡 {level.level}
                </Badge>
                {completedLevels.includes(level.level) && (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <h3 className="text-lg font-bold kid-friendly mb-2">
                {level.title}
              </h3>
              <p className="text-sm text-muted-foreground kid-friendly mb-4">
                {level.description}
              </p>
              <div className="flex justify-center space-x-1">
                {level.words.map((word, index) => (
                  <span key={index} className="text-lg">{word.image}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        size="lg" 
        className="fun-button bg-primary text-primary-foreground"
        onClick={startGame}
      >
        <Play className="w-5 h-5 mr-2" />
        开始游戏
      </Button>
    </div>
  )

  // 渲染游戏界面
  const renderGamePlay = () => (
    <div>
      {/* 游戏头部 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Badge variant="default" className="text-lg px-3 py-1">
            关卡 {currentLevel}
          </Badge>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={restartLevel} className="fun-button">
            <RotateCcw className="w-4 h-4 mr-2" />
            重新开始
          </Button>
          <Button variant="outline" onClick={backToMenu} className="fun-button">
            返回菜单
          </Button>
        </div>
      </div>

      {/* 关卡信息 */}
      <Card className="card-shadow mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold kid-friendly">{currentLevelData?.title}</h3>
              <p className="text-sm text-muted-foreground">{currentLevelData?.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">进度</p>
              <Progress 
                value={(matchedPairs.length / currentLevelData?.words.length) * 100} 
                className="w-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 游戏区域 */}
      <div className="grid grid-cols-2 gap-8">
        {/* 英文单词区 */}
        <Card className="card-shadow">
          <CardContent className="p-4">
            <h4 className="text-lg font-bold mb-4 text-center kid-friendly">英文单词</h4>
            <div className="grid grid-cols-2 gap-3 min-h-[300px]">
              {shuffledWords.map((wordData, index) => {
                const isMatched = matchedPairs.includes(wordData.word)
                const isSelected = selectedWord?.word === wordData.word
                
                return (
                  <Button
                    key={`word-${index}`}
                    variant={isSelected ? "default" : isMatched ? "secondary" : "outline"}
                    className={`h-16 fun-button ${
                      isMatched ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleWordClick(wordData, index)}
                    disabled={isMatched}
                  >
                    <span className="text-lg font-bold">{wordData.word}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 图片区 */}
        <Card className="card-shadow">
          <CardContent className="p-4">
            <h4 className="text-lg font-bold mb-4 text-center kid-friendly">图片</h4>
            <div className="grid grid-cols-2 gap-3 min-h-[300px]">
              {shuffledImages.map((imageData, index) => {
                const isMatched = matchedPairs.includes(imageData.word)
                const isSelected = selectedImage?.word === imageData.word
                
                return (
                  <Button
                    key={`image-${index}`}
                    variant={isSelected ? "default" : isMatched ? "secondary" : "outline"}
                    className={`h-16 fun-button ${
                      isMatched ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleImageClick(imageData, index)}
                    disabled={isMatched}
                  >
                    <span className="text-3xl">{imageData.image}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 游戏提示 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground kid-friendly">
          点击英文单词和对应的图片进行配对！已尝试 {attempts} 次
        </p>
      </div>
    </div>
  )

  // 渲染关卡完成
  const renderLevelComplete = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold kid-friendly text-primary mb-4">
          恭喜完成关卡 {currentLevel}！
        </h2>
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-xl font-bold">得分: {score}</span>
          </div>
          <div className="text-lg text-muted-foreground">
            尝试次数: {attempts}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={backToMenu} className="fun-button">
          返回菜单
        </Button>
        {currentLevel < gameLevel.length ? (
          <Button onClick={nextLevel} className="fun-button">
            下一关
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={backToMenu} className="fun-button">
            查看所有关卡
          </Button>
        )}
      </div>
    </div>
  )

  // 渲染游戏完成
  const renderGameComplete = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-8xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold kid-friendly text-primary mb-4">
          恭喜完成所有关卡！
        </h2>
        <p className="text-lg text-muted-foreground kid-friendly mb-6">
          你真是太棒了！继续保持学习的热情吧！
        </p>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Star className="w-6 h-6 text-yellow-500" />
          <span className="text-xl font-bold">总得分: {score}</span>
        </div>
      </div>

      <Button onClick={backToMenu} className="fun-button">
        返回菜单
      </Button>
    </div>
  )

  useEffect(() => {
    if (gameState === 'playing') {
      initializeGame()
    }
  }, [currentLevel])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {gameState === 'menu' && renderGameMenu()}
        {gameState === 'playing' && renderGamePlay()}
        {gameState === 'levelComplete' && renderLevelComplete()}
        {gameState === 'completed' && renderGameComplete()}
      </div>
    </div>
  )
}

export default GamesPageEnhanced

