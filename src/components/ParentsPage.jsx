import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { BookOpen, Clock, Trophy, TrendingUp, Heart, Users } from 'lucide-react'

const ParentsPage = () => {
  const learningStats = {
    totalTime: 45, // minutes
    wordsLearned: 28,
    gamesCompleted: 5,
    currentStreak: 3 // days
  }

  const weeklyProgress = [
    { day: '周一', time: 15, words: 8 },
    { day: '周二', time: 20, words: 12 },
    { day: '周三', time: 0, words: 0 },
    { day: '周四', time: 10, words: 8 },
    { day: '周五', time: 0, words: 0 },
    { day: '周六', time: 0, words: 0 },
    { day: '周日', time: 0, words: 0 }
  ]

  const tips = [
    {
      title: "建立学习习惯",
      content: "每天固定时间学习15-20分钟，比长时间偶尔学习更有效。",
      icon: "⏰"
    },
    {
      title: "鼓励和表扬",
      content: "及时表扬孩子的进步，增强学习的积极性和自信心。",
      icon: "👏"
    },
    {
      title: "亲子互动",
      content: "和孩子一起学习，用英语进行简单的日常对话。",
      icon: "💬"
    },
    {
      title: "创造语言环境",
      content: "在家播放英语儿歌，看英语动画片，营造英语学习氛围。",
      icon: "🎵"
    }
  ]

  const achievements = [
    { name: "首次学习", icon: "🌟", unlocked: true, description: "完成第一次学习" },
    { name: "单词达人", icon: "📚", unlocked: true, description: "学会20个单词" },
    { name: "游戏高手", icon: "🎮", unlocked: true, description: "完成5个游戏" },
    { name: "坚持学习", icon: "💪", unlocked: false, description: "连续学习7天" },
    { name: "英语小能手", icon: "🏆", unlocked: false, description: "学会100个单词" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold kid-friendly text-primary mb-4">
            👨‍👩‍👧 家长中心
          </h1>
          <p className="text-lg kid-friendly text-muted-foreground">
            了解孩子的学习进度，获取教育建议
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Statistics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="card-shadow">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{learningStats.totalTime}</div>
                  <div className="text-sm text-muted-foreground">学习分钟</div>
                </CardContent>
              </Card>
              
              <Card className="card-shadow">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{learningStats.wordsLearned}</div>
                  <div className="text-sm text-muted-foreground">学会单词</div>
                </CardContent>
              </Card>
              
              <Card className="card-shadow">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold">{learningStats.gamesCompleted}</div>
                  <div className="text-sm text-muted-foreground">完成游戏</div>
                </CardContent>
              </Card>
              
              <Card className="card-shadow">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{learningStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">连续天数</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="kid-friendly">📊 本周学习情况</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">学习时间</span>
                          <span className="text-sm font-medium">{day.time}分钟</span>
                        </div>
                        <Progress value={(day.time / 30) * 100} className="h-2" />
                      </div>
                      <div className="w-16 text-sm text-muted-foreground">
                        {day.words > 0 ? `${day.words}词` : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="kid-friendly">🏆 成就徽章</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`text-center p-4 rounded-lg border-2 ${
                        achievement.unlocked 
                          ? 'border-accent bg-accent/10' 
                          : 'border-muted bg-muted/10 opacity-50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="font-semibold text-sm kid-friendly">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {achievement.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Tips */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="kid-friendly flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-primary" />
                  教育小贴士
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="border-l-4 border-accent pl-4">
                    <div className="flex items-center mb-1">
                      <span className="mr-2">{tip.icon}</span>
                      <h4 className="font-semibold text-sm">{tip.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="kid-friendly flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  快速操作
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full fun-button" variant="outline">
                  📧 发送学习报告
                </Button>
                <Button className="w-full fun-button" variant="outline">
                  ⚙️ 学习设置
                </Button>
                <Button className="w-full fun-button" variant="outline">
                  📞 联系客服
                </Button>
                <Button className="w-full fun-button" variant="outline">
                  💡 更多建议
                </Button>
              </CardContent>
            </Card>

            {/* Encouragement */}
            <Card className="card-shadow bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🌟</div>
                <h3 className="font-bold kid-friendly mb-2">继续加油！</h3>
                <p className="text-sm text-muted-foreground">
                  您的孩子这周表现很棒！坚持每天学习，进步会更明显。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParentsPage

