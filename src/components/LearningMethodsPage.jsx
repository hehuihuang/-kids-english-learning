import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ArrowLeft, BookOpen } from 'lucide-react'

const LearningMethodsPage = ({ onBack, onLearningModeChange }) => {
  const learningMethods = [
    {
      id: 'feynman',
      title: '费曼学习法',
      description: '讲给别人听，发现自己的盲点！',
      icon: '🎤',
      color: 'bg-[#FFD7D5] hover:bg-[#FFC7C5]',
      borderColor: 'border-[#FFD7D5]',
      details: [
        '选择一个概念学习',
        '尝试用自己的话解释给别人听',
        '发现不理解的地方重新学习',
        '简化解释，使用类比和例子'
      ]
    },
    {
      id: 'spaced-repetition',
      title: '间隔重复法',
      description: '科学复习计划，让记忆更牢。',
      icon: '⏳',
      color: 'bg-[#FFF1B6] hover:bg-[#FFE9A6]',
      borderColor: 'border-[#FFF1B6]',
      details: [
        '学习新知识后立即复习',
        '1天后再次复习',
        '3天后第三次复习',
        '7天后第四次复习',
        '15天后最后复习'
      ]
    },
    {
      id: 'contextual',
      title: '情境学习法',
      description: '在故事和动画中自然学会。',
      icon: '🌳',
      color: 'bg-[#D6F5E0] hover:bg-[#C6E5D0]',
      borderColor: 'border-[#D6F5E0]',
      details: [
        '在有趣的故事中学习单词',
        '通过动画情境理解语法',
        '角色扮演练习对话',
        '在实际场景中应用所学'
      ]
    },
    {
      id: 'multi-sensory',
      title: '多感官学习法',
      description: '边看边听边动，学习更高效！',
      icon: '👀👂✋',
      color: 'bg-[#D9E8FF] hover:bg-[#C9D8EF]',
      borderColor: 'border-[#D9E8FF]',
      details: [
        '视觉：看图片、动画、文字',
        '听觉：听发音、歌曲、对话',
        '动觉：做动作、玩游戏、写画',
        '多种感官结合，记忆更深刻'
      ]
    },
    {
      id: 'association',
      title: '联想记忆法',
      description: '用趣味画面帮你记牢单词。',
      icon: '💡',
      color: 'bg-[#EAD9FF] hover:bg-[#DAC9EF]',
      borderColor: 'border-[#EAD9FF]',
      details: [
        '创建有趣的联想画面',
        '把新单词和已知事物联系',
        '使用夸张、搞笑的想象',
        '构建个人化的记忆网络'
      ]
    }
  ]

  const [selectedMethod, setSelectedMethod] = useState(null)

  const handleMethodClick = (method) => {
    setSelectedMethod(method)
  }

  const handleStartLearning = () => {
    if (selectedMethod && onLearningModeChange) {
      onLearningModeChange(selectedMethod.id)
      onBack()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#FFFFFF]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="fun-button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
              <h1 className="text-2xl font-bold kid-friendly text-foreground">
                学习方法推荐
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground kid-friendly">
                选择适合你的学习方法
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 kid-friendly text-foreground">
            科学的学习方法，让英语学习更高效！
          </h2>
          <p className="text-lg text-muted-foreground kid-friendly max-w-2xl mx-auto">
            每种学习方法都有其独特的优势，找到最适合你的方式，让英语学习变得轻松有趣！
          </p>
        </div>

        {/* Learning Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {learningMethods.map((method) => (
            <Card 
              key={method.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
                selectedMethod?.id === method.id 
                  ? `${method.borderColor} shadow-lg ring-2 ring-offset-2` 
                  : 'border-transparent'
              }`}
              onClick={() => handleMethodClick(method)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-20 h-20 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300`}>
                  <span className="text-4xl">{method.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 kid-friendly text-foreground">
                  {method.title}
                </h3>
                <p className="text-muted-foreground kid-friendly mb-4">
                  {method.description}
                </p>
                <div className={`text-sm text-muted-foreground kid-friendly ${
                  selectedMethod?.id === method.id ? 'block' : 'hidden md:block'
                }`}>
                  <div className="space-y-1">
                    {method.details.slice(0, 2).map((detail, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Method Details */}
        {selectedMethod && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 ${selectedMethod.color} rounded-full flex items-center justify-center`}>
                  <span className="text-3xl">{selectedMethod.icon}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold kid-friendly text-foreground">
                    {selectedMethod.title}
                  </h3>
                  <p className="text-muted-foreground kid-friendly">
                    {selectedMethod.description}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleStartLearning}
                className="fun-button bg-primary text-primary-foreground hover:bg-primary/90"
              >
                开始学习
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedMethod.details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground kid-friendly">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 kid-friendly text-foreground">
            💡 学习小贴士
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2 kid-friendly">坚持每天学习</h4>
              <p className="text-sm text-muted-foreground kid-friendly">
                每天坚持15-30分钟，比周末学习几小时效果更好
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎮</div>
              <h4 className="font-semibold mb-2 kid-friendly">游戏化学习</h4>
              <p className="text-sm text-muted-foreground kid-friendly">
                把学习变成游戏，让过程更有趣更持久
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h4 className="font-semibold mb-2 kid-friendly">及时奖励</h4>
              <p className="text-sm text-muted-foreground kid-friendly">
                完成学习目标后给自己小奖励，增强学习动力
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningMethodsPage