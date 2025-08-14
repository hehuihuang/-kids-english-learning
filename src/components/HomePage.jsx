import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'

const HomePage = ({ onPageChange, onLearningModeChange }) => {
  const learningMethods = [
    {
      id: 'alphabet',
      title: '字母学习',
      description: '学习26个英文字母的发音和相关单词',
      icon: '🔤',
      color: 'bg-purple-100 hover:bg-purple-200'
    },
    {
      id: 'word-challenge',
      title: '英语单词闯关',
      description: '听音识图，通过关卡挑战学习英语单词',
      icon: '🎯',
      color: 'bg-green-100 hover:bg-green-200'
    },
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
    },
    {
      id: 'learning-methods',
      title: '学习方法推荐',
      description: '了解科学的学习方法，让学习更高效',
      icon: '🧠',
      color: 'bg-pink-100 hover:bg-pink-200'
    },
    {
      id: 'resources',
      title: '资料下载',
      description: '下载学习资料，随时随地学习',
      icon: '📁',
      color: 'bg-indigo-100 hover:bg-indigo-200'
    }
  ]

  const handleMethodClick = (methodId) => {
    if (methodId === 'resources') {
      // 滚动到资料下载部分
      document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' })
    } else if (methodId === 'learning-methods') {
      // 跳转到学习方法页面
      onPageChange('learning-methods')
    } else {
      if (onLearningModeChange) {
        onLearningModeChange(methodId)
      }
      onPageChange('learn')
    }
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
            onClick={() => window.open('/src/儿童英语启蒙单词卡片.html', '_blank')}
          >
            启蒙单词大全 📚
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
            {learningMethods.map((method) => (
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

      {/* Resources Download Section */}
      <section id="resources-section" className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 kid-friendly text-foreground">
            资料下载
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-shadow hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-2 kid-friendly">字母表卡片</h3>
                <p className="text-muted-foreground kid-friendly mb-4">
                  可打印的26个字母学习卡片
                </p>
                <Button className="fun-button">
                  下载 PDF 📄
                </Button>
              </CardContent>
            </Card>
            <Card className="card-shadow hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-2 kid-friendly">儿歌歌词集</h3>
                <p className="text-muted-foreground kid-friendly mb-4">
                  经典英语儿歌歌词合集
                </p>
                <Button className="fun-button">
                  下载 PDF 📄
                </Button>
              </CardContent>
            </Card>
            <Card className="card-shadow hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">🎮</div>
                <h3 className="text-xl font-bold mb-2 kid-friendly">练习册</h3>
                <p className="text-muted-foreground kid-friendly mb-4">
                  英语学习练习题和游戏
                </p>
                <Button className="fun-button">
                  下载 PDF 📄
                </Button>
              </CardContent>
            </Card>
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

