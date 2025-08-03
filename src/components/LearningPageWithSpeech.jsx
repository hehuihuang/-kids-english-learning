import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react'
import ClickableText from './ClickableText.jsx'
import SpeechButton from './SpeechButton.jsx'

const LearningPageWithSpeech = () => {
  const [currentStory, setCurrentStory] = useState(0)

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
      fullText: "The cat and the dog are playing in the garden.",
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
      fullText: "I see a red apple and a blue ball.",
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
      fullText: "My family is happy. Mom, Dad and I love each other.",
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
    console.log('Word clicked:', word)
    // 这里可以添加额外的逻辑，比如显示单词释义等
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
                    <SpeechButton
                      text={currentStoryData.fullText}
                      type="sentence"
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      播放整句
                    </SpeechButton>
                    
                    <SpeechButton
                      text={currentStoryData.fullText}
                      type="sentence"
                      variant="outline"
                    >
                      重复
                    </SpeechButton>
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

export default LearningPageWithSpeech

