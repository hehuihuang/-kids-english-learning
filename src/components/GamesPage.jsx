import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { RotateCcw, Star, Trophy } from 'lucide-react'

const GamesPage = () => {
  const [currentGame, setCurrentGame] = useState('word-match')
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('playing') // playing, won, lost

  const games = [
    {
      id: 'word-match',
      name: '单词配对',
      description: '将英文单词与对应的图片配对',
      icon: '🎯',
      difficulty: '简单'
    },
    {
      id: 'spelling',
      name: '拼写练习',
      description: '听音拼写英文单词',
      icon: '✏️',
      difficulty: '中等'
    },
    {
      id: 'listening',
      name: '听力游戏',
      description: '听英文选择正确答案',
      icon: '👂',
      difficulty: '简单'
    }
  ]

  // Word Match Game Data
  const wordMatchData = [
    { id: 1, word: 'cat', image: '🐱', matched: false },
    { id: 2, word: 'dog', image: '🐶', matched: false },
    { id: 3, word: 'apple', image: '🍎', matched: false },
    { id: 4, word: 'ball', image: '⚽', matched: false }
  ]

  const [gameData, setGameData] = useState(wordMatchData)
  const [selectedWord, setSelectedWord] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleWordClick = (item) => {
    if (item.matched) return
    
    setSelectedWord(item)
    if (selectedImage) {
      checkMatch(item, selectedImage)
    }
  }

  const handleImageClick = (item) => {
    if (item.matched) return
    
    setSelectedImage(item)
    if (selectedWord) {
      checkMatch(selectedWord, item)
    }
  }

  const checkMatch = (word, image) => {
    if (word.id === image.id) {
      // Correct match
      setGameData(prev => prev.map(item => 
        item.id === word.id ? { ...item, matched: true } : item
      ))
      setScore(prev => prev + 10)
      
      // Check if game is won
      const newGameData = gameData.map(item => 
        item.id === word.id ? { ...item, matched: true } : item
      )
      if (newGameData.every(item => item.matched)) {
        setGameState('won')
      }
    } else {
      // Wrong match - add visual feedback
      setTimeout(() => {
        setSelectedWord(null)
        setSelectedImage(null)
      }, 1000)
    }
    
    setSelectedWord(null)
    setSelectedImage(null)
  }

  const resetGame = () => {
    setGameData(wordMatchData.map(item => ({ ...item, matched: false })))
    setScore(0)
    setGameState('playing')
    setSelectedWord(null)
    setSelectedImage(null)
  }

  const WordMatchGame = () => (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold kid-friendly">🎯 单词配对游戏</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-accent" />
            <span className="font-bold">{score}</span>
          </div>
          <Button onClick={resetGame} variant="outline" size="sm" className="fun-button">
            <RotateCcw className="w-4 h-4 mr-1" />
            重新开始
          </Button>
        </div>
      </div>

      {/* Game Instructions */}
      <div className="bg-accent/10 rounded-lg p-4">
        <p className="kid-friendly text-center">
          点击英文单词，然后点击对应的图片进行配对！
        </p>
      </div>

      {/* Game Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Words Column */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold kid-friendly text-center">英文单词</h4>
          {gameData.map((item) => (
            <Button
              key={`word-${item.id}`}
              variant={item.matched ? "secondary" : selectedWord?.id === item.id ? "default" : "outline"}
              className={`w-full h-16 text-lg fun-button ${item.matched ? 'opacity-50' : ''}`}
              onClick={() => handleWordClick(item)}
              disabled={item.matched}
            >
              {item.word}
            </Button>
          ))}
        </div>

        {/* Images Column */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold kid-friendly text-center">图片</h4>
          {gameData.map((item) => (
            <Button
              key={`image-${item.id}`}
              variant={item.matched ? "secondary" : selectedImage?.id === item.id ? "default" : "outline"}
              className={`w-full h-16 text-4xl fun-button ${item.matched ? 'opacity-50' : ''}`}
              onClick={() => handleImageClick(item)}
              disabled={item.matched}
            >
              {item.image}
            </Button>
          ))}
        </div>
      </div>

      {/* Game Won Message */}
      {gameState === 'won' && (
        <div className="text-center space-y-4 bounce-in">
          <div className="text-6xl">🎉</div>
          <h3 className="text-2xl font-bold kid-friendly text-primary">
            恭喜你！游戏完成！
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <Trophy className="w-6 h-6 text-accent" />
            <span className="text-lg font-semibold">最终得分: {score}</span>
          </div>
          <Button onClick={resetGame} className="fun-button bg-primary">
            再玩一次
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold kid-friendly text-primary mb-4">
            🎮 英语游戏乐园
          </h1>
          <p className="text-lg kid-friendly text-muted-foreground">
            在游戏中快乐学习英语！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-4 kid-friendly text-primary">
                  🎯 选择游戏
                </h3>
                <div className="space-y-2">
                  {games.map((game) => (
                    <Button
                      key={game.id}
                      variant={currentGame === game.id ? "default" : "ghost"}
                      className="w-full justify-start fun-button text-left"
                      onClick={() => setCurrentGame(game.id)}
                    >
                      <div>
                        <div className="flex items-center">
                          <span className="mr-2">{game.icon}</span>
                          <span className="font-semibold">{game.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {game.description}
                        </div>
                        <div className="text-xs text-accent mt-1">
                          难度: {game.difficulty}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Area */}
          <div className="lg:col-span-3">
            <Card className="card-shadow">
              <CardContent className="p-6">
                {currentGame === 'word-match' && <WordMatchGame />}
                {currentGame === 'spelling' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-bold kid-friendly mb-2">拼写游戏</h3>
                    <p className="text-muted-foreground">即将推出，敬请期待！</p>
                  </div>
                )}
                {currentGame === 'listening' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-bold kid-friendly mb-2">听力游戏</h3>
                    <p className="text-muted-foreground">即将推出，敬请期待！</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesPage

