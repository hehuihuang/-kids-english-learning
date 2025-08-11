import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Volume2, Play, RotateCcw } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech.js'
import { learningCategories } from '../data/learningData.js'

const AlphabetPage = () => {
  const [currentLetter, setCurrentLetter] = useState(0)
  const [selectedWord, setSelectedWord] = useState(null)
  const { isPlaying, speakWord, speakSentence, cleanup } = useSpeech()

  // 组件卸载时清理语音资源
  useEffect(() => {
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [cleanup])
  
  const alphabetData = learningCategories.alphabet.content
  const currentLetterData = alphabetData[currentLetter]

  const handleLetterClick = async (letter) => {
    try {
      await speakWord(letter)
    } catch (error) {
      // 只在不是中断错误时才记录错误
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const handleWordClick = async (word) => {
    setSelectedWord(word)
    try {
      await speakWord(word)
    } catch (error) {
      // 只在不是中断错误时才记录错误
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const handleSentenceClick = async () => {
    try {
      await speakSentence(currentLetterData.sentence)
    } catch (error) {
      // 只在不是中断错误时才记录错误
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const handlePhoneticClick = async () => {
    try {
      await speakWord(currentLetterData.phonetic)
    } catch (error) {
      // 只在不是中断错误时才记录错误
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const nextLetter = () => {
    if (currentLetter < alphabetData.length - 1) {
      setCurrentLetter(currentLetter + 1)
      setSelectedWord(null)
    }
  }

  const prevLetter = () => {
    if (currentLetter > 0) {
      setCurrentLetter(currentLetter - 1)
      setSelectedWord(null)
    }
  }

  const playAll = async () => {
    try {
      await speakWord(currentLetterData.letter)
      await new Promise(resolve => setTimeout(resolve, 800))
      await speakWord(currentLetterData.phonetic)
      await new Promise(resolve => setTimeout(resolve, 800))
      await speakSentence(currentLetterData.sentence)
    } catch (error) {
      // 只在不是中断错误时才记录错误
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Alphabet Grid */}
          <div className="lg:col-span-1">
            <Card className="card-shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-4 kid-friendly text-primary">
                  🔤 字母表
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {alphabetData.map((letter, index) => (
                    <Button
                      key={letter.id}
                      variant={index === currentLetter ? "default" : "outline"}
                      size="sm"
                      className="fun-button h-12 text-lg font-bold"
                      onClick={() => {
                        setCurrentLetter(index)
                        setSelectedWord(null)
                      }}
                    >
                      {letter.letter}
                    </Button>
                  ))}
                </div>
                
                {/* Progress */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">学习进度</h4>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{width: `${((currentLetter + 1) / alphabetData.length) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentLetter + 1}/{alphabetData.length} 字母完成
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="card-shadow">
              <CardContent className="p-6">
                {/* Letter Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold kid-friendly text-primary">
                    {currentLetterData.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {currentLetter + 1} / {alphabetData.length}
                    </span>
                  </div>
                </div>

                {/* Letter Display */}
                <div className="bg-secondary/10 rounded-lg p-8 mb-6 text-center">
                  <div className="flex items-center justify-center space-x-8 mb-6">
                    <div className="text-center">
                      <div className="text-8xl font-bold text-primary mb-2 cursor-pointer hover:scale-110 transition-transform"
                           onClick={() => handleLetterClick(currentLetterData.uppercase)}>
                        {currentLetterData.uppercase}
                      </div>
                      <p className="text-sm text-muted-foreground">大写</p>
                    </div>
                    <div className="text-center">
                      <div className="text-8xl font-bold text-primary mb-2 cursor-pointer hover:scale-110 transition-transform"
                           onClick={() => handleLetterClick(currentLetterData.lowercase)}>
                        {currentLetterData.lowercase}
                      </div>
                      <p className="text-sm text-muted-foreground">小写</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-2xl font-semibold text-primary">
                      发音: 
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePhoneticClick}
                      disabled={isPlaying}
                      className="fun-button"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      {currentLetterData.phonetic}
                    </Button>
                  </div>
                </div>

                {/* Example Words */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4 kid-friendly text-primary">
                    相关单词
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentLetterData.words.map((wordData, index) => (
                      <Card 
                        key={index}
                        className={`card-shadow cursor-pointer transition-all duration-300 ${
                          selectedWord === wordData.word ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                        }`}
                        onClick={() => handleWordClick(wordData.word)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-6xl mb-2">{wordData.image}</div>
                          <div className="text-lg font-bold text-primary mb-1">
                            {wordData.word}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {wordData.translation}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Example Sentence */}
                <div className="bg-card border-2 border-accent/20 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-bold mb-3 kid-friendly text-primary">
                    例句
                  </h3>
                  <div className="text-xl leading-relaxed kid-friendly text-center">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handleSentenceClick}
                      disabled={isPlaying}
                      className="fun-button text-xl hover:bg-accent/10"
                    >
                      {currentLetterData.sentence}
                    </Button>
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-muted-foreground kid-friendly">
                      {currentLetterData.translation}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevLetter}
                    disabled={currentLetter === 0}
                    className="fun-button"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    上一个
                  </Button>

                  <div className="flex space-x-2">
                    <Button
                      onClick={playAll}
                      disabled={isPlaying}
                      className="fun-button bg-secondary hover:bg-secondary/90"
                    >
                      {isPlaying ? (
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      播放全部
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleLetterClick(currentLetterData.letter)}
                      disabled={isPlaying}
                      className="fun-button"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      重复字母
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    onClick={nextLetter}
                    disabled={currentLetter === alphabetData.length - 1}
                    className="fun-button"
                  >
                    下一个
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Encouragement */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 bg-accent/20 rounded-full px-4 py-2">
                <span className="text-2xl">🎉</span>
                <span className="kid-friendly font-semibold text-accent-foreground">
                  太棒了！继续学习下一个字母吧！
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlphabetPage