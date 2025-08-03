import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'

const HomePage = ({ onPageChange, onLearningModeChange }) => {
  const learningMethods = [
    {
      id: 'songs',
      title: '儿歌童谣',
      description: '通过欢快的英语儿歌学习发音和词汇',
      icon: '🎵',
      color: 'bg-orange-100 hover:bg-orange-200'
    },
    {
      id: 'stories',
      title: '互动故事',
      description: '点读式英语绘本，边看边学',
      icon: '📚',
      color: 'bg-teal-100 hover:bg-teal-200'
    },
    {
      id: 'games',
      title: '单词游戏',
      description: '在游戏中轻松记忆英语单词',
      icon: '🎮',
      color: 'bg-yellow-100 hover:bg-yellow-200'
    },
    {
      id: 'phonics',
      title: '自然拼读',
      description: '学习字母发音规律，提高阅读能力',
      icon: '🔤',
      color: 'bg-red-100 hover:bg-red-200'
    }
  ]

  const handleMethodClick = (methodId) => {
    if (onLearningModeChange) {
      onLearningModeChange(methodId)
    }
    onPageChange('learn')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="text-6xl bounce-in">🐻</div>
            <div className="text-6xl bounce-in" style={{animationDelay: '0.2s'}}>🐰</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 kid-friendly">
            Learn English with Fun!
          </h1>
          <p className="text-xl md:text-2xl mb-8 kid-friendly">
            欢迎来到我们的英语学习平台，让孩子在快乐中学习英语！
          </p>
          <Button 
            size="lg" 
            className="fun-button bg-accent text-accent-foreground hover:bg-accent/90 text-xl px-8 py-4"
            onClick={() => onPageChange('learn')}
          >
            开始学习 🚀
          </Button>
        </div>
      </section>

      {/* Learning Modules */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 kid-friendly text-foreground">
            选择你喜欢的学习方式
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningMethods.map((method, index) => (
              <Card 
                key={method.id} 
                className="card-shadow hover:shadow-xl transition-all duration-300 cursor-pointer fun-button"
                onClick={() => handleMethodClick(method.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-3xl">{method.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 kid-friendly text-foreground">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground kid-friendly">
                    {method.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 kid-friendly text-foreground">
            为什么选择我们？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2 kid-friendly">点读功能</h3>
              <p className="text-muted-foreground kid-friendly">
                点击任何英文单词，立即听到标准发音
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-bold mb-2 kid-friendly">免费语音</h3>
              <p className="text-muted-foreground kid-friendly">
                所有内容都配有免费的语音播放功能
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2 kid-friendly">寓教于乐</h3>
              <p className="text-muted-foreground kid-friendly">
                通过游戏和互动让学习变得有趣
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

