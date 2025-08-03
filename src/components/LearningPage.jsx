import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Play, Volume2, RotateCcw } from 'lucide-react'

const LearningPage = () => {
  const [currentStory, setCurrentStory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const stories = [
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
      image: "👨‍👩‍👧",
      translation: "我的家庭很幸福。妈妈、爸爸和我彼此相爱。"
    }
  ]

  const lessons = [
    { id: 'animals', name: '动物', icon: '🐱', active: true },
    { id: 'colors', name: '颜色', icon: '🌈', active: false },
    { id: 'family', name: '家庭', icon: '👨‍👩‍👧', active: false },
    { id: 'numbers', name: '数字', icon: '🔢', active: false },
    { id: 'food', name: '食物', icon: '🍎', active: false }
  ]

  const handleWordClick = (word) => {
    // 语音播放功能将在下一阶段实现
    console.log('Playing word:', word)
    
    // 添加视觉反馈
    const element = document.activeElement
    if (element) {
      element.classList.add('reading-highlight')
      setTimeout(() => {
        element.classList.remove('reading-highlight')
      }, 1000)
    }
  }

  const playFullSentence = () => {
    setIsPlaying(true)
    // 语音播放功能将在下一阶段实现
    console.log('Playing full sentence')
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1)
    }
  }

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1)
    }
  }

  const currentStoryData = stories[currentStory]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Lessons */}
          <div className="lg:col-span-1">
            <Card className="card-shadow">
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-4 kid-friendly text-primary">
                  📚 课程目录
                </h3>
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <Button
                      key={lesson.id}
                      variant={lesson.active ? "default" : "ghost"}
                      className="w-full justify-start fun-button"
                      onClick={() => {/* TODO: Switch lesson */}}
                    >
                      <span className="mr-2">{lesson.icon}</span>
                      {lesson.name}
                    </Button>
                  ))}
                </div>
                
                {/* Progress */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">学习进度</h4>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">1/5 课程完成</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="card-shadow">
              <CardContent className="p-6">
                {/* Story Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold kid-friendly text-primary">
                    {currentStoryData.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {currentStory + 1} / {stories.length}
                    </span>
                  </div>
                </div>

                {/* Story Image */}
                <div className="bg-secondary/10 rounded-lg p-8 mb-6 text-center">
                  <div className="text-8xl mb-4">{currentStoryData.image}</div>
                  <div className="text-lg kid-friendly text-muted-foreground">
                    {currentStoryData.translation}
                  </div>
                </div>

                {/* Interactive Text */}
                <div className="bg-card border-2 border-accent/20 rounded-lg p-6 mb-6">
                  <div className="text-xl leading-relaxed kid-friendly">
                    {currentStoryData.content.map((part, index) => (
                      part.clickable ? (
                        <span
                          key={index}
                          className="clickable-word text-primary font-semibold"
                          onClick={() => handleWordClick(part.text)}
                          title="点击听发音"
                        >
                          {part.text}
                        </span>
                      ) : (
                        <span key={index}>{part.text}</span>
                      )
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevStory}
                    disabled={currentStory === 0}
                    className="fun-button"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    上一个
                  </Button>

                  <div className="flex space-x-2">
                    <Button
                      onClick={playFullSentence}
                      disabled={isPlaying}
                      className="fun-button bg-secondary hover:bg-secondary/90"
                    >
                      {isPlaying ? (
                        <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      播放整句
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleWordClick('repeat')}
                      className="fun-button"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      重复
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    onClick={nextStory}
                    disabled={currentStory === stories.length - 1}
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

export default LearningPage

