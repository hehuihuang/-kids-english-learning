import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import ClickableText from './ClickableText.jsx'
import SpeechButton from './SpeechButton.jsx'
import { vocabularyCategories } from '../data/learningData.js'

const VocabularyPage = () => {
  const [currentCategory, setCurrentCategory] = useState('animals')
  const [currentWord, setCurrentWord] = useState(0)

  const currentCategoryData = vocabularyCategories[currentCategory]
  const words = currentCategoryData?.words || []
  const currentWordData = words[currentWord]

  const handleWordClick = (word) => {
    console.log('Word clicked:', word)
  }

  const nextWord = () => {
    if (currentWord < words.length - 1) {
      setCurrentWord(currentWord + 1)
    }
  }

  const prevWord = () => {
    if (currentWord > 0) {
      setCurrentWord(currentWord - 1)
    }
  }

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId)
    setCurrentWord(0)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="card-shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-4 kid-friendly text-primary">
                  📚 词汇分类
                </h3>
                <div className="space-y-2">
                  {Object.values(vocabularyCategories).map((category) => (
                    <Button
                      key={category.id}
                      variant={currentCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start fun-button"
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
                
                {/* Progress */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">学习进度</h4>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{width: `${((currentWord + 1) / words.length) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentWord + 1}/{words.length} 单词
                  </p>
                </div>

                {/* Category Info */}
                <div className="mt-6 p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">{currentCategoryData?.icon}</span>
                    <span className="text-sm font-semibold">{currentCategoryData?.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    共 {words.length} 个单词
                  </p>
                </div>

                {/* Speech Support Info */}
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Volume2 className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm font-semibold">语音功能</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    点击单词听发音
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="card-shadow">
              <CardContent className="p-6">
                {/* Word Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold kid-friendly text-primary">
                    {currentCategoryData?.name} - 词汇学习
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {currentWord + 1} / {words.length}
                    </span>
                  </div>
                </div>

                {/* Word Display */}
                {currentWordData && (
                  <div className="text-center">
                    <div className="bg-secondary/10 rounded-lg p-8 mb-6">
                      <div className="text-8xl mb-4">{currentWordData.image}</div>
                      <div className="text-4xl font-bold kid-friendly text-primary mb-2">
                        <ClickableText
                          text={currentWordData.word}
                          clickable={true}
                          className="text-primary font-bold"
                          onWordClick={handleWordClick}
                        />
                      </div>
                      <div className="text-lg kid-friendly text-muted-foreground">
                        {currentWordData.translation}
                      </div>
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevWord}
                    disabled={currentWord === 0}
                    className="fun-button"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    上一个
                  </Button>

                  <div className="flex space-x-2">
                    {currentWordData && (
                      <>
                        <SpeechButton
                          text={currentWordData.word}
                          type="word"
                          className="bg-secondary hover:bg-secondary/90"
                        >
                          播放发音
                        </SpeechButton>
                        
                        <SpeechButton
                          text={currentWordData.word}
                          type="word"
                          variant="outline"
                        >
                          重复
                        </SpeechButton>
                      </>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={nextWord}
                    disabled={currentWord === words.length - 1}
                    className="fun-button"
                  >
                    下一个
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Word Grid Preview */}
            <Card className="card-shadow mt-6">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-4 kid-friendly text-primary">
                  {currentCategoryData?.name} 单词预览
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {words.map((word, index) => (
                    <Button
                      key={index}
                      variant={index === currentWord ? "default" : "ghost"}
                      className="h-16 p-2 fun-button flex flex-col items-center justify-center"
                      onClick={() => setCurrentWord(index)}
                    >
                      <span className="text-lg">{word.image}</span>
                      <span className="text-xs truncate w-full">{word.word}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Encouragement */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 bg-accent/20 rounded-full px-4 py-2">
                <span className="text-2xl">🎉</span>
                <span className="kid-friendly font-semibold text-accent-foreground">
                  做得很好！继续加油！
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VocabularyPage

