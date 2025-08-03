import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import ClickableText from './ClickableText.jsx'
import SpeechButton from './SpeechButton.jsx'
import { learningCategories, vocabularyCategories } from '../data/learningData.js'

const LearningPageEnhanced = ({ learningMode = 'stories' }) => {
  const [currentContent, setCurrentContent] = useState(0)
  const [currentCategory, setCurrentCategory] = useState('animals')
  const [currentWord, setCurrentWord] = useState(0)

  // 根据学习模式获取内容
  const getLearningContent = () => {
    if (learningMode === 'vocabulary') {
      return vocabularyCategories[currentCategory]?.words || []
    }
    return learningCategories[learningMode]?.content || []
  }

  const content = getLearningContent()
  const currentData = content[learningMode === 'vocabulary' ? currentWord : currentContent]

  const handleWordClick = (word) => {
    console.log('Word clicked:', word)
  }

  const nextContent = () => {
    const maxIndex = content.length - 1
    if (learningMode === 'vocabulary') {
      if (currentWord < maxIndex) {
        setCurrentWord(currentWord + 1)
      }
    } else {
      if (currentContent < maxIndex) {
        setCurrentContent(currentContent + 1)
      }
    }
  }

  const prevContent = () => {
    if (learningMode === 'vocabulary') {
      if (currentWord > 0) {
        setCurrentWord(currentWord - 1)
      }
    } else {
      if (currentContent > 0) {
        setCurrentContent(currentContent - 1)
      }
    }
  }

  const handleCategoryChange = (categoryId) => {
    setCurrentCategory(categoryId)
    setCurrentWord(0)
  }

  // 渲染词汇学习内容
  const renderVocabularyContent = () => {
    if (!currentData) return null

    return (
      <div className="text-center">
        <div className="bg-secondary/10 rounded-lg p-8 mb-6">
          <div className="text-8xl mb-4">{currentData.image}</div>
          <div className="text-4xl font-bold kid-friendly text-primary mb-2">
            <ClickableText
              text={currentData.word}
              clickable={true}
              className="text-primary font-bold"
              onWordClick={handleWordClick}
            />
          </div>
          <div className="text-lg kid-friendly text-muted-foreground">
            {currentData.translation}
          </div>
        </div>
      </div>
    )
  }

  // 渲染故事/儿歌内容
  const renderStoryContent = () => {
    if (!currentData) return null

    return (
      <>
        {/* Content Image */}
        <div className="bg-secondary/10 rounded-lg p-8 mb-6 text-center">
          <div className="text-8xl mb-4">{currentData.image}</div>
          <div className="text-lg kid-friendly text-muted-foreground">
            {currentData.translation}
          </div>
        </div>

        {/* Interactive Text */}
        <div className="bg-card border-2 border-accent/20 rounded-lg p-6 mb-6">
          <div className="text-xl leading-relaxed kid-friendly">
            {(currentData.content || currentData.lyrics)?.map((part, index) => (
              <ClickableText
                key={index}
                text={part.text}
                clickable={part.clickable}
                className={part.clickable ? "text-primary font-semibold" : ""}
                showIcon={false}
                onWordClick={handleWordClick}
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  // 渲染自然拼读内容
  const renderPhonicsContent = () => {
    if (!currentData) return null

    return (
      <>
        <div className="bg-secondary/10 rounded-lg p-8 mb-6 text-center">
          <div className="text-8xl mb-4">{currentData.image}</div>
          <div className="text-lg kid-friendly text-muted-foreground">
            {currentData.translation}
          </div>
        </div>

        <div className="bg-card border-2 border-accent/20 rounded-lg p-6 mb-6">
          <div className="text-2xl leading-relaxed kid-friendly text-center">
            {currentData.content?.map((part, index) => (
              <ClickableText
                key={index}
                text={part.text}
                clickable={part.clickable}
                className={part.clickable ? "text-primary font-bold text-3xl" : ""}
                showIcon={false}
                onWordClick={handleWordClick}
              />
            ))}
          </div>
        </div>
      </>
    )
  }

  const renderContent = () => {
    switch (learningMode) {
      case 'vocabulary':
        return renderVocabularyContent()
      case 'phonics':
        return renderPhonicsContent()
      default:
        return renderStoryContent()
    }
  }

  const getCurrentIndex = () => {
    return learningMode === 'vocabulary' ? currentWord : currentContent
  }

  const getMaxIndex = () => {
    return content.length
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-4 kid-friendly text-primary">
                  {learningMode === 'vocabulary' ? '📚 词汇分类' : '📚 课程目录'}
                </h3>
                
                {learningMode === 'vocabulary' ? (
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
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="default"
                      className="w-full justify-start fun-button"
                    >
                      <span className="mr-2">{learningCategories[learningMode]?.icon}</span>
                      {learningCategories[learningMode]?.name}
                    </Button>
                  </div>
                )}
                
                {/* Progress */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">学习进度</h4>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{width: `${((getCurrentIndex() + 1) / getMaxIndex()) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getCurrentIndex() + 1}/{getMaxIndex()} 完成
                  </p>
                </div>

                {/* Speech Support Info */}
                <div className="mt-6 p-3 bg-accent/10 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Volume2 className="w-4 h-4 text-primary mr-2" />
                    <span className="text-sm font-semibold">语音功能</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    点击橙色单词听发音，使用播放按钮听完整句子
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="card-shadow">
              <CardContent className="p-6">
                {/* Content Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold kid-friendly text-primary">
                    {currentData?.title || currentData?.word || '学习内容'}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {getCurrentIndex() + 1} / {getMaxIndex()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                {renderContent()}

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevContent}
                    disabled={getCurrentIndex() === 0}
                    className="fun-button"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    上一个
                  </Button>

                  <div className="flex space-x-2">
                    {currentData?.fullText && (
                      <SpeechButton
                        text={currentData.fullText}
                        type="sentence"
                        className="bg-secondary hover:bg-secondary/90"
                      >
                        播放整句
                      </SpeechButton>
                    )}
                    
                    {currentData?.word && (
                      <SpeechButton
                        text={currentData.word}
                        type="word"
                        variant="outline"
                      >
                        重复
                      </SpeechButton>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={nextContent}
                    disabled={getCurrentIndex() === getMaxIndex() - 1}
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

export default LearningPageEnhanced

