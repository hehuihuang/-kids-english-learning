import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Volume2, Play, RotateCcw, Home, BookOpen, Gamepad2 } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech.js'
import { phonicsData } from '../data/phonicsData.js'
import PhonicsGame from './PhonicsGame.jsx'

const PhonicsPage = () => {
  const [currentStage, setCurrentStage] = useState(1)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [selectedWord, setSelectedWord] = useState(null)
  const [showIntro, setShowIntro] = useState(true)
  const [gameMode, setGameMode] = useState(false)
  const [gameStage, setGameStage] = useState(1)
  const { isPlaying, speakWord, cleanup } = useSpeech()

  useEffect(() => {
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [cleanup])

  const stages = [
    {
      id: 1,
      title: "第一阶段：字母名与音",
      description: "学习26个字母的字母名(letter name)和字母音(letter sound)",
      icon: "🔤",
      color: "bg-blue-100",
      lessons: phonicsData.stage1
    },
    {
      id: 2,
      title: "第二阶段：CVC结构",
      description: "学习辅音-元音-辅音结构，如cat, dog, pig",
      icon: "📝",
      color: "bg-green-100",
      lessons: phonicsData.stage2
    },
    {
      id: 3,
      title: "第三阶段：短元音拓展",
      description: "学习短元音和辅音组合，如ck, sh, th",
      icon: "🔤",
      color: "bg-yellow-100",
      lessons: phonicsData.stage3
    },
    {
      id: 4,
      title: "第四阶段：长元音规则",
      description: "学习长元音发音规则，如magic E, ee, ea",
      icon: "🌟",
      color: "bg-purple-100",
      lessons: phonicsData.stage4
    },
    {
      id: 5,
      title: "第五阶段：复杂组合",
      description: "学习三元音、词根词缀等复杂组合",
      icon: "🎯",
      color: "bg-red-100",
      lessons: phonicsData.stage5
    }
  ]

  const currentStageData = stages[currentStage - 1]
  const currentLessonData = currentStageData.lessons[currentLesson]

  const handleWordClick = async (word) => {
    setSelectedWord(word)
    try {
      await speakWord(word)
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const handleSoundClick = async (sound) => {
    try {
      await speakWord(sound)
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const playWordSounds = async (word) => {
    try {
      // 逐个发音单词的每个字母音
      for (let i = 0; i < word.length; i++) {
        await speakWord(word[i])
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      // 最后完整发音整个单词
      await speakWord(word)
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const nextLesson = () => {
    if (currentLesson < currentStageData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
      setSelectedWord(null)
    }
  }

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
      setSelectedWord(null)
    }
  }

  const nextStage = () => {
    if (currentStage < stages.length) {
      setCurrentStage(currentStage + 1)
      setCurrentLesson(0)
      setSelectedWord(null)
    }
  }

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1)
      setCurrentLesson(0)
      setSelectedWord(null)
    }
  }

  const startGame = (stage) => {
    setGameStage(stage)
    setGameMode(true)
  }

  const exitGame = () => {
    setGameMode(false)
    setGameStage(1)
  }

  const playAll = async () => {
    try {
      if (currentStage === 1) {
        // 第一阶段：播放字母名和字母音
        await speakWord(currentLessonData.letter)
        await new Promise(resolve => setTimeout(resolve, 600))
        await speakWord(currentLessonData.letterName)
        await new Promise(resolve => setTimeout(resolve, 600))
        await speakWord(currentLessonData.letterSound)
      } else {
        // 其他阶段：播放例词
        for (const word of currentLessonData.words.slice(0, 3)) {
          await playWordSounds(word.word)
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const renderStageIntro = () => (
    <div className="text-center py-12">
      <div className={`w-24 h-24 ${currentStageData.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
        <span className="text-4xl">{currentStageData.icon}</span>
      </div>
      <h2 className="text-3xl font-bold mb-4 kid-friendly text-primary">
        {currentStageData.title}
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        {currentStageData.description}
      </p>
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => setShowIntro(false)}
          className="fun-button bg-primary text-primary-foreground px-8 py-3 text-lg"
        >
          开始学习 🚀
        </Button>
        <Button 
          onClick={() => startGame(currentStage)}
          className="fun-button bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
        >
          <Gamepad2 className="w-5 h-5 mr-2" />
          开始游戏 🎮
        </Button>
        {currentStage > 1 && (
          <Button 
            onClick={prevStage}
            variant="outline"
            className="fun-button px-6 py-3"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            上一阶段
          </Button>
        )}
      </div>
    </div>
  )

  const renderStage1Lesson = () => (
    <div className="space-y-6">
      {/* 字母展示 */}
      <div className="bg-secondary/10 rounded-lg p-8 text-center">
        <div className="flex items-center justify-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-8xl font-bold text-primary mb-2 cursor-pointer hover:scale-110 transition-transform"
                 onClick={() => handleSoundClick(currentLessonData.letter)}>
              {currentLessonData.letter}
            </div>
            <p className="text-sm text-muted-foreground">字母</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-primary">字母名 (Letter Name)</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSoundClick(currentLessonData.letterName)}
              disabled={isPlaying}
              className="fun-button w-full"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              {currentLessonData.letterName}
            </Button>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-primary">字母音 (Letter Sound)</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSoundClick(currentLessonData.letterSound)}
              disabled={isPlaying}
              className="fun-button w-full"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              {currentLessonData.letterSound}
            </Button>
          </div>
        </div>
      </div>

      {/* 例词 */}
      <div>
        <h3 className="text-xl font-bold mb-4 kid-friendly text-primary">
          例词 (以{currentLessonData.letter}开头)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentLessonData.words.map((wordData, index) => (
            <Card 
              key={index}
              className={`card-shadow cursor-pointer transition-all duration-300 ${
                selectedWord === wordData.word ? 'ring-2 ring-primary' : 'hover:shadow-lg'
              }`}
              onClick={() => handleWordClick(wordData.word)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">{wordData.image}</div>
                <div className="text-lg font-bold text-primary mb-1">
                  {wordData.word}
                </div>
                <div className="text-sm text-muted-foreground">
                  {wordData.translation}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    playWordSounds(wordData.word)
                  }}
                  disabled={isPlaying}
                  className="mt-2 fun-button text-xs"
                >
                  <Volume2 className="w-3 h-3 mr-1" />
                  逐音发音
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 练习提示 */}
      <div className="bg-accent/20 rounded-lg p-6">
        <h4 className="font-bold mb-2 text-accent-foreground">💡 练习建议</h4>
        <ul className="text-sm text-accent-foreground space-y-1">
          <li>• 先听字母名，再听字母音</li>
          <li>• 注意字母音和字母名的区别</li>
          <li>• 练习例词时，先逐个发音字母，再整体发音</li>
          <li>• 每天练习5-10个字母</li>
        </ul>
      </div>
    </div>
  )

  const renderCVCLesson = () => (
    <div className="space-y-6">
      {/* CVC模式说明 */}
      <div className="bg-secondary/10 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">CVC 单词结构</h3>
        <div className="flex items-center justify-center space-x-4 text-xl">
          <span className="bg-blue-100 px-4 py-2 rounded">C (辅音)</span>
          <span>+</span>
          <span className="bg-green-100 px-4 py-2 rounded">V (元音)</span>
          <span>+</span>
          <span className="bg-blue-100 px-4 py-2 rounded">C (辅音)</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          例如：{currentLessonData.pattern.join(', ')}
        </p>
      </div>

      {/* 例词 */}
      <div>
        <h3 className="text-xl font-bold mb-4 kid-friendly text-primary">
          例词练习
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentLessonData.words.map((wordData, index) => (
            <Card 
              key={index}
              className={`card-shadow cursor-pointer transition-all duration-300 ${
                selectedWord === wordData.word ? 'ring-2 ring-primary' : 'hover:shadow-lg'
              }`}
              onClick={() => handleWordClick(wordData.word)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{wordData.image}</div>
                <div className="text-lg font-bold text-primary mb-2">
                  {wordData.word}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {wordData.translation}
                </div>
                
                {/* 音素分解 */}
                <div className="bg-gray-50 rounded p-2 mb-3">
                  <div className="text-xs text-gray-600 mb-1">音素分解：</div>
                  <div className="flex justify-center space-x-1">
                    {wordData.word.split('').map((letter, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded text-xs font-mono">
                        {letter}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    playWordSounds(wordData.word)
                  }}
                  disabled={isPlaying}
                  className="fun-button text-xs w-full"
                >
                  <Volume2 className="w-3 h-3 mr-1" />
                  逐音发音
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 拼读练习 */}
      <div className="bg-accent/20 rounded-lg p-6">
        <h4 className="font-bold mb-3 text-accent-foreground">🎯 拼读练习</h4>
        <p className="text-sm text-accent-foreground mb-3">
          选择一个单词，按照以下步骤练习：
        </p>
        <ol className="text-sm text-accent-foreground space-y-2 list-decimal list-inside">
          <li>先逐个发音每个字母的字母音</li>
          <li>然后慢慢连在一起发音</li>
          <li>最后快速发音整个单词</li>
          <li>重复练习直到熟练</li>
        </ol>
      </div>
    </div>
  )

  const renderLesson = () => {
    if (currentStage === 1) {
      return renderStage1Lesson()
    } else if (currentStage === 2) {
      return renderCVCLesson()
    }
    // 其他阶段的渲染逻辑可以后续添加
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-xl font-bold mb-2">内容开发中</h3>
        <p className="text-muted-foreground">
          {currentStageData.title}的内容正在开发中，敬请期待！
        </p>
      </div>
    )
  }

  if (gameMode) {
    return (
      <PhonicsGame 
        stage={gameStage} 
        onGameComplete={exitGame}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* 阶段选择器 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowIntro(true)}
              className="fun-button"
            >
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
            <h1 className="text-2xl font-bold kid-friendly text-primary">
              自然拼读学习
            </h1>
            <div></div> {/* 占位符保持居中 */}
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {stages.map((stage) => (
              <Button
                key={stage.id}
                variant={currentStage === stage.id ? "default" : "outline"}
                size="sm"
                className={`fun-button ${stage.color} ${
                  currentStage === stage.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => {
                  setCurrentStage(stage.id)
                  setCurrentLesson(0)
                  setShowIntro(true)
                  setSelectedWord(null)
                }}
              >
                <span className="mr-2">{stage.icon}</span>
                {stage.title.split('：')[0]}
              </Button>
            ))}
          </div>
        </div>

        {showIntro ? (
          renderStageIntro()
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 侧边栏 - 课程列表 */}
            <div className="lg:col-span-1">
              <Card className="card-shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4 kid-friendly text-primary">
                    <BookOpen className="w-4 h-4 mr-2 inline" />
                    课程列表
                  </h3>
                  <div className="space-y-2">
                    {currentStageData.lessons.map((lesson, index) => (
                      <Button
                        key={index}
                        variant={index === currentLesson ? "default" : "ghost"}
                        size="sm"
                        className="fun-button w-full justify-start text-left"
                        onClick={() => {
                          setCurrentLesson(index)
                          setSelectedWord(null)
                        }}
                      >
                        {lesson.title || `第${index + 1}课`}
                      </Button>
                    ))}
                  </div>
                  
                  {/* 游戏按钮 */}
                  <div className="mt-4">
                    <Button
                      onClick={() => startGame(currentStage)}
                      className="fun-button w-full bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      开始游戏
                    </Button>
                  </div>
                  
                  {/* 进度 */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">学习进度</h4>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{width: `${((currentLesson + 1) / currentStageData.lessons.length) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentLesson + 1}/{currentStageData.lessons.length} 课完成
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 主内容区 */}
            <div className="lg:col-span-3">
              <Card className="card-shadow">
                <CardContent className="p-6">
                  {/* 课程标题 */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold kid-friendly text-primary">
                      {currentLessonData.title || `第${currentLesson + 1}课`}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {currentLesson + 1} / {currentStageData.lessons.length}
                      </span>
                    </div>
                  </div>

                  {/* 课程内容 */}
                  {renderLesson()}

                  {/* 控制按钮 */}
                  <div className="flex items-center justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={prevLesson}
                      disabled={currentLesson === 0}
                      className="fun-button"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      上一课
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
                    </div>

                    <Button
                      variant="outline"
                      onClick={nextLesson}
                      disabled={currentLesson === currentStageData.lessons.length - 1}
                      className="fun-button"
                    >
                      下一课
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 阶段完成提示 */}
              {currentLesson === currentStageData.lessons.length - 1 && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-accent/20 rounded-full px-6 py-3">
                    <span className="text-3xl">🎉</span>
                    <div className="text-left">
                      <div className="kid-friendly font-semibold text-accent-foreground">
                        恭喜完成{currentStageData.title}！
                      </div>
                      <Button
                        onClick={nextStage}
                        disabled={currentStage === stages.length}
                        className="fun-button mt-2 text-sm"
                      >
                        {currentStage === stages.length ? '全部完成！' : '进入下一阶段 →'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhonicsPage