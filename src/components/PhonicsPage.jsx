import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { ChevronLeft, ChevronRight, Volume2, Play, RotateCcw, Home, BookOpen, Gamepad2, Trophy, Lock, Star } from 'lucide-react'
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
  const [isProcessing, setIsProcessing] = useState(false) // 添加处理状态
  const [progress, setProgress] = useState({
    stages: {},
    unlockedStages: [1, 2, 3, 4, 5],
    totalScore: 0,
    achievements: []
  })
  const { isPlaying, speakWord, cleanup } = useSpeech()

  useEffect(() => {
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [cleanup])

  // 加载进度
  useEffect(() => {
    const savedProgress = localStorage.getItem('phonicsProgress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // 保存进度
  const saveProgress = (newProgress) => {
    setProgress(newProgress)
    localStorage.setItem('phonicsProgress', JSON.stringify(newProgress))
  }

  // 更新学习进度
  const updateLessonProgress = (stage, lesson, completed = true) => {
    const newProgress = { ...progress }
    if (!newProgress.stages[stage]) {
      newProgress.stages[stage] = {}
    }
    newProgress.stages[stage][lesson] = completed
    
    // 检查是否解锁下一阶段
    const stageProgress = newProgress.stages[stage]
    const totalLessons = stages[stage - 1]?.lessons.length || 0
    const completedLessons = Object.values(stageProgress).filter(Boolean).length
    
    if (completedLessons >= totalLessons && stage < 5) {
      if (!newProgress.unlockedStages.includes(stage + 1)) {
        newProgress.unlockedStages.push(stage + 1)
      }
    }
    
    saveProgress(newProgress)
  }

  // 更新游戏分数
  const updateGameScore = (stage, score, totalQuestions) => {
    const newProgress = { ...progress }
    const percentage = (score / totalQuestions) * 100
    
    if (!newProgress.stages[stage]) {
      newProgress.stages[stage] = {}
    }
    
    newProgress.stages[stage].gameScore = score
    newProgress.stages[stage].gamePercentage = percentage
    
    // 更新总分
    newProgress.totalScore += score
    
    // 检查成就
    if (percentage >= 80) {
      if (!newProgress.achievements.includes(`stage${stage}_master`)) {
        newProgress.achievements.push(`stage${stage}_master`)
      }
    }
    
    saveProgress(newProgress)
  }

  // 检查阶段是否解锁
  const isStageUnlocked = (stageId) => {
    return progress.unlockedStages.includes(stageId)
  }

  // 获取阶段完成状态
  const getStageProgress = (stageId) => {
    const stageData = progress.stages[stageId]
    if (!stageData) return 0
    
    const totalLessons = stages[stageId - 1]?.lessons.length || 0
    const completedLessons = Object.values(stageData).filter(Boolean).length
    
    return Math.round((completedLessons / totalLessons) * 100)
  }

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

  // 处理字母点击 - 发音字母本身
  const handleLetterClick = async (letter) => {
    if (isProcessing) return // 防止重复点击
    
    setIsProcessing(true)
    setSelectedWord(letter)
    try {
      // 停止当前正在播放的语音
      if (cleanup) {
        cleanup()
      }
      // 等待一小段时间确保语音已停止
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 先发音字母本身
      await speakWord(letter)
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // 然后发音描述
      await speakWord('This is letter ' + letter)
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  // 处理字母名点击 - 发音字母名
  const handleLetterNameClick = async (letterName) => {
    if (isProcessing) return // 防止重复点击
    
    setIsProcessing(true)
    try {
      // 停止当前正在播放的语音
      if (cleanup) {
        cleanup()
      }
      // 等待一小段时间确保语音已停止
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 直接发音音标，不进行转换
      await speakWord(letterName)
      
      // 为了更好的学习体验，添加描述性发音
      await new Promise(resolve => setTimeout(resolve, 800))
      await speakWord('This is the letter name')
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  // 处理字母音点击 - 发音字母音
  const handleLetterSoundClick = async (letterSound) => {
    if (isProcessing) return // 防止重复点击
    
    setIsProcessing(true)
    try {
      // 停止当前正在播放的语音
      if (cleanup) {
        cleanup()
      }
      // 等待一小段时间确保语音已停止
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 字母音映射到更容易发音的单词
      const soundExamples = {
        '/æ/': 'apple',
        '/b/': 'ball',
        '/d/': 'dog',
        '/e/': 'elephant',
        '/f/': 'fish',
        '/ɡ/': 'go',
        '/h/': 'hat',
        '/ɪ/': 'igloo',
        '/dʒ/': 'jump',
        '/l/': 'lion',
        '/m/': 'moon',
        '/n/': 'nose',
        '/ɒ/': 'octopus',
        '/p/': 'pig',
        '/kw/': 'queen',
        '/r/': 'rabbit',
        '/s/': 'sun',
        '/t/': 'tiger',
        '/ʌ/': 'umbrella',
        '/v/': 'violin',
        '/w/': 'water',
        '/ks/': 'box',
        '/j/': 'yellow',
        '/z/': 'zebra'
      }
      
      // 先发音音标，再发音示例单词
      await speakWord(letterSound)
      await new Promise(resolve => setTimeout(resolve, 800))
      const exampleWord = soundExamples[letterSound] || letterSound
      if (exampleWord !== letterSound) {
        await speakWord(exampleWord)
      }
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleWordClick = async (word) => {
    if (isProcessing) return // 防止重复点击
    
    setIsProcessing(true)
    setSelectedWord(word)
    try {
      // 停止当前正在播放的语音
      if (cleanup) {
        cleanup()
      }
      // 等待一小段时间确保语音已停止
      await new Promise(resolve => setTimeout(resolve, 100))
      await speakWord(word)
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    } finally {
      setIsProcessing(false)
    }
  }


  const playWordSounds = async (word) => {
    if (isProcessing) return // 防止重复点击
    
    setIsProcessing(true)
    try {
      // 停止当前正在播放的语音
      if (cleanup) {
        cleanup()
      }
      // 等待一小段时间确保语音已停止
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // 逐个发音单词的每个字母音
      for (let i = 0; i < word.length; i++) {
        await speakWord(word[i])
        await new Promise(resolve => setTimeout(resolve, 600))
      }
      // 最后完整发音整个单词
      await new Promise(resolve => setTimeout(resolve, 200))
      await speakWord(word)
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const nextLesson = () => {
    // 更新当前课程的进度
    updateLessonProgress(currentStage, currentLesson, true)
    
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
    if (!isStageUnlocked(stage)) return
    setGameStage(stage)
    setGameMode(true)
  }

  const exitGame = () => {
    setGameMode(false)
    setGameStage(1)
  }

  const handleGameComplete = (score, totalQuestions) => {
    updateGameScore(gameStage, score, totalQuestions)
    exitGame()
  }

  const playAll = async () => {
    if (isProcessing) return // 防止重复点击
    
    setIsProcessing(true)
    try {
      // 停止当前正在播放的语音
      if (cleanup) {
        cleanup()
      }
      // 等待一小段时间确保语音已停止
      await new Promise(resolve => setTimeout(resolve, 100))
      
      if (currentStage === 1) {
        // 第一阶段：播放字母、字母名和字母音
        await handleLetterClick(currentLessonData.letter)
        await new Promise(resolve => setTimeout(resolve, 1200))
        await handleLetterNameClick(currentLessonData.letterName)
        await new Promise(resolve => setTimeout(resolve, 1200))
        await handleLetterSoundClick(currentLessonData.letterSound)
      } else {
        // 其他阶段：播放例词
        for (const word of currentLessonData.words.slice(0, 3)) {
          await playWordSounds(word.word)
          await new Promise(resolve => setTimeout(resolve, 1500))
        }
      }
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    } finally {
      setIsProcessing(false)
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
      
      {/* 进度显示 */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          阶段进度: {getStageProgress(currentStage)}%
        </div>
        <div className="w-64 bg-gray-200 rounded-full h-3 mx-auto">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-300" 
            style={{width: `${getStageProgress(currentStage)}%`}}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => setShowIntro(false)}
          className="fun-button bg-primary text-primary-foreground px-8 py-3 text-lg"
        >
          开始学习 🚀
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
      
      {/* 成就显示 */}
      {progress.achievements.includes(`stage${currentStage}_master`) && (
        <div className="mt-6 inline-flex items-center space-x-2 bg-yellow-100 rounded-full px-4 py-2">
          <Trophy className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-semibold text-yellow-800">阶段大师</span>
        </div>
      )}
    </div>
  )

  const renderStage1Lesson = () => (
    <div className="space-y-6">
      {/* 字母展示 */}
      <div className="bg-secondary/10 rounded-lg p-8 text-center">
        <div className="flex items-center justify-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-8xl font-bold text-primary mb-2 cursor-pointer hover:scale-110 transition-transform"
                 onClick={() => handleLetterClick(currentLessonData.letter)}>
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
              onClick={() => handleLetterNameClick(currentLessonData.letterName)}
              disabled={isPlaying || isProcessing}
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
              onClick={() => handleLetterSoundClick(currentLessonData.letterSound)}
              disabled={isPlaying || isProcessing}
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
                  disabled={isPlaying || isProcessing}
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
                  disabled={isPlaying || isProcessing}
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

  const renderStage3Lesson = () => (
    <div className="space-y-6">
      {/* 辅音组合说明 */}
      <div className="bg-secondary/10 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">辅音组合学习</h3>
        <div className="flex items-center justify-center space-x-4 text-xl">
          <span className="bg-purple-100 px-4 py-2 rounded">{currentLessonData.pattern}</span>
          <span className="text-lg">= {currentLessonData.sound}</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          {currentLessonData.description}
        </p>
      </div>

      {/* 例词 */}
      <div>
        <h3 className="text-xl font-bold mb-4 kid-friendly text-primary">
          例词练习 ({currentLessonData.pattern}组合)
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
                    {wordData.sounds && wordData.sounds.map((sound, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded text-xs font-mono">
                        {sound}
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
                  disabled={isPlaying || isProcessing}
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

      {/* 练习提示 */}
      <div className="bg-accent/20 rounded-lg p-6">
        <h4 className="font-bold mb-3 text-accent-foreground">🎯 练习建议</h4>
        <p className="text-sm text-accent-foreground mb-3">
          辅音组合练习要点：
        </p>
        <ul className="text-sm text-accent-foreground space-y-2 list-disc list-inside">
          <li>注意{currentLessonData.pattern}组合的发音</li>
          <li>区分单个字母发音和组合发音</li>
          <li>练习例词时，注意组合在单词中的位置</li>
          <li>通过游戏巩固记忆</li>
        </ul>
      </div>
    </div>
  )

  const renderStage4Lesson = () => (
    <div className="space-y-6">
      {/* 长元音规则说明 */}
      <div className="bg-secondary/10 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">长元音规则学习</h3>
        <div className="flex items-center justify-center space-x-4 text-xl">
          <span className="bg-indigo-100 px-4 py-2 rounded">{currentLessonData.pattern}</span>
          <span className="text-lg">= {currentLessonData.sound || '长元音'}</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          {currentLessonData.description}
        </p>
        {currentLessonData.examples && (
          <div className="mt-4 text-sm">
            <p className="font-semibold">例词变化：</p>
            <p>{currentLessonData.examples.join(' → ')}</p>
          </div>
        )}
      </div>

      {/* 例词 */}
      <div>
        <h3 className="text-xl font-bold mb-4 kid-friendly text-primary">
          例词练习 ({currentLessonData.pattern}规则)
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
                    {wordData.sounds && wordData.sounds.map((sound, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded text-xs font-mono">
                        {sound}
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
                  disabled={isPlaying || isProcessing}
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

      {/* 规则解释 */}
      <div className="bg-accent/20 rounded-lg p-6">
        <h4 className="font-bold mb-3 text-accent-foreground">🌟 规则解释</h4>
        <p className="text-sm text-accent-foreground mb-3">
          {currentLessonData.pattern}规则详解：
        </p>
        <ul className="text-sm text-accent-foreground space-y-2 list-disc list-inside">
          {currentLessonData.pattern === 'CVCe' && (
            <>
              <li>当单词以辅音-元音-辅音-e结尾时，元音发长音</li>
              <li>末尾的e不发音，只影响前面的元音</li>
              <li>例如：cake中的a发长音/eɪ/</li>
            </>
          )}
          {currentLessonData.pattern === 'ee' && (
            <>
              <li>ee组合发长音/iː/</li>
              <li>两个e在一起通常发长音</li>
              <li>例如：see中的ee发/iː/</li>
            </>
          )}
          {currentLessonData.pattern === 'ea' && (
            <>
              <li>ea组合通常发长音/iː/</li>
              <li>有时也发短音/æ/或/e/</li>
              <li>例如：read中的ea发/iː/</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )

  const renderStage5Lesson = () => (
    <div className="space-y-6">
      {/* 复杂组合说明 */}
      <div className="bg-secondary/10 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-4 text-primary">复杂组合学习</h3>
        <div className="flex items-center justify-center space-x-4 text-xl">
          <span className="bg-pink-100 px-4 py-2 rounded">{currentLessonData.pattern}</span>
          <span className="text-lg">= {currentLessonData.sound || '特殊发音'}</span>
        </div>
        <p className="mt-4 text-muted-foreground">
          {currentLessonData.description}
        </p>
        {currentLessonData.meaning && (
          <div className="mt-4 text-sm">
            <p className="font-semibold">含义：{currentLessonData.meaning}</p>
          </div>
        )}
      </div>

      {/* 例词 */}
      <div>
        <h3 className="text-xl font-bold mb-4 kid-friendly text-primary">
          例词练习 ({currentLessonData.pattern}组合)
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
                
                {/* 词根词缀分解 */}
                {(currentLessonData.pattern === 'un-' || currentLessonData.pattern === '-ing') && (
                  <div className="bg-gray-50 rounded p-2 mb-3">
                    <div className="text-xs text-gray-600 mb-1">词根词缀：</div>
                    <div className="flex justify-center space-x-1">
                      {currentLessonData.pattern === 'un-' && (
                        <>
                          <span className="bg-red-100 px-2 py-1 rounded text-xs">un-</span>
                          <span className="bg-white px-2 py-1 rounded text-xs">{wordData.root}</span>
                        </>
                      )}
                      {currentLessonData.pattern === '-ing' && (
                        <>
                          <span className="bg-white px-2 py-1 rounded text-xs">{wordData.root}</span>
                          <span className="bg-green-100 px-2 py-1 rounded text-xs">-ing</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {/* 音素分解 */}
                <div className="bg-gray-50 rounded p-2 mb-3">
                  <div className="text-xs text-gray-600 mb-1">音素分解：</div>
                  <div className="flex justify-center space-x-1">
                    {wordData.sounds && wordData.sounds.map((sound, i) => (
                      <span key={i} className="bg-white px-2 py-1 rounded text-xs font-mono">
                        {sound}
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
                  disabled={isPlaying || isProcessing}
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

      {/* 学习要点 */}
      <div className="bg-accent/20 rounded-lg p-6">
        <h4 className="font-bold mb-3 text-accent-foreground">🎯 学习要点</h4>
        <p className="text-sm text-accent-foreground mb-3">
          {currentLessonData.pattern}组合学习要点：
        </p>
        <ul className="text-sm text-accent-foreground space-y-2 list-disc list-inside">
          {currentLessonData.pattern === 'igh' && (
            <>
              <li>igh组合发长音/aɪ/</li>
              <li>这是三个字母组合的特殊发音</li>
              <li>例如：night中的igh发/aɪ/</li>
            </>
          )}
          {currentLessonData.pattern === 'un-' && (
            <>
              <li>前缀un-表示"不"或"相反"</li>
              <li>加在形容词前构成反义词</li>
              <li>例如：happy → unhappy</li>
            </>
          )}
          {currentLessonData.pattern === '-ing' && (
            <>
              <li>后缀-ing表示"正在做某事"</li>
              <li>加在动词后构成现在分词</li>
              <li>例如：jump → jumping</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )

  const renderLesson = () => {
    switch (currentStage) {
      case 1:
        return renderStage1Lesson()
      case 2:
        return renderCVCLesson()
      case 3:
        return renderStage3Lesson()
      case 4:
        return renderStage4Lesson()
      case 5:
        return renderStage5Lesson()
      default:
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
  }

  if (gameMode) {
    return (
      <PhonicsGame 
        stage={gameStage} 
        onGameComplete={handleGameComplete}
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
            {stages.map((stage) => {
              const stageProgress = getStageProgress(stage.id)
              const hasAchievement = progress.achievements.includes(`stage${stage.id}_master`)
              
              return (
                <div key={stage.id} className="relative">
                  <Button
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
                  
                  {/* 进度指示器 */}
                  {stageProgress > 0 && (
                    <div className="absolute -bottom-1 left-0 right-0">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-green-500 h-1 rounded-full transition-all duration-300" 
                          style={{width: `${stageProgress}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* 成就标记 */}
                  {hasAchievement && (
                    <div className="absolute -top-1 -right-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  )}
                </div>
              )
            })}
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
                        disabled={isPlaying || isProcessing}
                        className="fun-button bg-secondary hover:bg-secondary/90"
                      >
                        {isPlaying || isProcessing ? (
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