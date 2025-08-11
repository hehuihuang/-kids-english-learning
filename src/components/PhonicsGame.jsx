import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Volume2, Play, RotateCcw, Trophy, Star, CheckCircle, XCircle } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech.js'
import { phonicsData } from '../data/phonicsData.js'

const PhonicsGame = ({ stage, onGameComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [streak, setStreak] = useState(0)
  const [gameData, setGameData] = useState(null)
  const { isPlaying, speakWord, cleanup } = useSpeech()

  // 初始化游戏数据
  useEffect(() => {
    console.log('PhonicsGame: Initializing game data for stage:', stage)
    const data = getGameData()
    console.log('PhonicsGame: Game data generated:', data)
    setGameData(data)
  }, [stage, getGameData])

  // 清理函数
  useEffect(() => {
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [cleanup])

  const currentQ = gameData?.questions[currentQuestion]

  const getGameData = useCallback(() => {
    console.log('getGameData: Called with stage:', stage)
    console.log('getGameData: phonicsData available:', phonicsData)
    
    switch (stage) {
      case 1:
        console.log('getGameData: Generating stage 1 questions')
        return {
          title: "字母名与音配对",
          questions: generateStage1Questions(),
          instruction: "听发音，选择正确的字母"
        }
      case 2:
        console.log('getGameData: Generating stage 2 questions')
        return {
          title: "CVC单词拼读",
          questions: generateStage2Questions(),
          instruction: "听单词发音，选择正确的拼写"
        }
      case 3:
        console.log('getGameData: Generating stage 3 questions')
        return {
          title: "辅音组合识别",
          questions: generateStage3Questions(),
          instruction: "听发音，选择包含正确辅音组合的单词"
        }
      case 4:
        console.log('getGameData: Generating stage 4 questions')
        return {
          title: "长元音规则识别",
          questions: generateStage4Questions(),
          instruction: "听发音，选择符合长元音规则的单词"
        }
      case 5:
        console.log('getGameData: Generating stage 5 questions')
        return {
          title: "复杂组合识别",
          questions: generateStage5Questions(),
          instruction: "听发音，选择包含正确复杂组合的单词"
        }
      default:
        console.log('getGameData: Invalid stage, returning empty data')
        return {
          title: "自然拼读挑战",
          questions: [],
          instruction: "选择游戏关卡"
        }
    }
  }, [stage, generateStage1Questions, generateStage2Questions, generateStage3Questions])

  const generateStage1Questions = () => {
    const letters = phonicsData.stage1.slice(0, 10) // 取前10个字母
    const questions = []
    
    letters.forEach(letterData => {
      // 随机选择考字母名还是字母音
      const testType = Math.random() > 0.5 ? 'letterName' : 'letterSound'
      
      questions.push({
        type: 'sound-to-letter',
        question: letterData[testType],
        correctAnswer: letterData.letter,
        options: generateLetterOptions(letterData.letter),
        letterData: letterData,
        testType: testType,
        instruction: testType === 'letterName' ? '听字母名发音，选择正确的字母' : '听字母音发音，选择正确的字母'
      })
    })
    
    return questions.sort(() => Math.random() - 0.5)
  }

  const generateStage2Questions = () => {
    const cvcWords = []
    phonicsData.stage2.forEach(lesson => {
      cvcWords.push(...lesson.words.slice(0, 3))
    })
    
    const questions = []
    cvcWords.forEach(wordData => {
      questions.push({
        type: 'word-to-spelling',
        question: wordData.word,
        correctAnswer: wordData.word,
        options: generateWordOptions(wordData.word),
        wordData: wordData
      })
    })
    
    return questions.sort(() => Math.random() - 0.5).slice(0, 10)
  }

  const generateStage3Questions = () => {
    const questions = []
    phonicsData.stage3.forEach(lesson => {
      lesson.words.slice(0, 2).forEach(wordData => {
        questions.push({
          type: 'pattern-identification',
          question: wordData.word,
          correctAnswer: lesson.pattern,
          options: generatePatternOptions(lesson.pattern),
          wordData: wordData,
          lesson: lesson
        })
      })
    })
    
    return questions.sort(() => Math.random() - 0.5)
  }

  const generateStage4Questions = () => {
    const questions = []
    phonicsData.stage4.forEach(lesson => {
      lesson.words.slice(0, 3).forEach(wordData => {
        questions.push({
          type: 'long-vowel-rule',
          question: wordData.word,
          correctAnswer: lesson.pattern,
          options: generateStage4Options(lesson.pattern),
          wordData: wordData,
          lesson: lesson
        })
      })
    })
    
    return questions.sort(() => Math.random() - 0.5)
  }

  const generateStage5Questions = () => {
    const questions = []
    phonicsData.stage5.forEach(lesson => {
      lesson.words.slice(0, 2).forEach(wordData => {
        questions.push({
          type: 'complex-pattern',
          question: wordData.word,
          correctAnswer: lesson.pattern,
          options: generateStage5Options(lesson.pattern),
          wordData: wordData,
          lesson: lesson
        })
      })
    })
    
    return questions.sort(() => Math.random() - 0.5)
  }

  const generateLetterOptions = (correctLetter) => {
    const allLetters = phonicsData.stage1.map(d => d.letter)
    const options = [correctLetter]
    
    while (options.length < 4) {
      const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)]
      if (!options.includes(randomLetter)) {
        options.push(randomLetter)
      }
    }
    
    return options.sort(() => Math.random() - 0.5)
  }

  const generateWordOptions = (correctWord) => {
    const allWords = phonicsData.stage2.flatMap(lesson => 
      lesson.words.map(w => w.word)
    )
    const options = [correctWord]
    
    while (options.length < 4) {
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)]
      if (!options.includes(randomWord)) {
        options.push(randomWord)
      }
    }
    
    return options.sort(() => Math.random() - 0.5)
  }

  const generatePatternOptions = (correctPattern) => {
    const allPatterns = phonicsData.stage3.map(lesson => lesson.pattern)
    const options = [correctPattern]
    
    while (options.length < 4) {
      const randomPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)]
      if (!options.includes(randomPattern)) {
        options.push(randomPattern)
      }
    }
    
    return options.sort(() => Math.random() - 0.5)
  }

  const generateStage4Options = (correctPattern) => {
    const allPatterns = phonicsData.stage4.map(lesson => lesson.pattern)
    const options = [correctPattern]
    
    while (options.length < 4) {
      const randomPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)]
      if (!options.includes(randomPattern)) {
        options.push(randomPattern)
      }
    }
    
    return options.sort(() => Math.random() - 0.5)
  }

  const generateStage5Options = (correctPattern) => {
    const allPatterns = phonicsData.stage5.map(lesson => lesson.pattern)
    const options = [correctPattern]
    
    while (options.length < 4) {
      const randomPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)]
      if (!options.includes(randomPattern)) {
        options.push(randomPattern)
      }
    }
    
    return options.sort(() => Math.random() - 0.5)
  }

  
  const handlePlaySound = async () => {
    try {
      if (currentQ.type === 'sound-to-letter') {
        // 如果是字母名或字母音，直接发音
        await speakWord(currentQ.question)
      } else if (currentQ.type === 'word-to-spelling') {
        // 如果是单词，先停顿一下再发音
        await new Promise(resolve => setTimeout(resolve, 100))
        await speakWord(currentQ.question)
      } else {
        await speakWord(currentQ.question)
      }
    } catch (error) {
      if (!error.message.includes('interrupted')) {
        console.error('Speech error:', error)
      }
    }
  }

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    setShowResult(true)
    
    // 确保答案比较是字符串比较
    const isCorrect = String(answer).trim() === String(currentQ.correctAnswer).trim()
    
    if (isCorrect) {
      setScore(score + 1)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < gameData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameCompleted(true)
      if (onGameComplete) {
        onGameComplete(score, gameData.questions.length)
      }
    }
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameCompleted(false)
    setStreak(0)
    // 重新生成游戏数据
    const data = getGameData()
    setGameData(data)
  }

  const getScoreMessage = () => {
    if (!gameData) return { message: "游戏初始化中...", color: "text-gray-500" }
    const percentage = (score / gameData.questions.length) * 100
    if (percentage >= 90) return { message: "太棒了！你是自然拼读大师！", color: "text-yellow-500" }
    if (percentage >= 80) return { message: "很好！继续努力！", color: "text-green-500" }
    if (percentage >= 70) return { message: "不错！还有进步空间！", color: "text-blue-500" }
    return { message: "继续练习，你会更棒的！", color: "text-purple-500" }
  }

  const renderQuestion = () => {
    if (!gameData || !currentQ) return null

    return (
      <div className="space-y-6">
        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>第 {currentQuestion + 1} 题 / 共 {gameData.questions.length} 题</span>
            <span>得分: {score}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{width: `${((currentQuestion + 1) / gameData.questions.length) * 100}%`}}
            ></div>
          </div>
        </div>

        {/* 连续答对提示 */}
        {streak >= 3 && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-700 font-semibold">
                连续答对 {streak} 题！太棒了！
              </span>
            </div>
          </div>
        )}

        {/* 问题区域 */}
        <div className="bg-secondary/10 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            {currentQ.instruction || gameData.instruction}
          </h3>
          
          <div className="mb-6">
            {currentQ.type === 'sound-to-letter' && (
              <div className="space-y-4">
                <div className="text-2xl font-mono bg-white rounded-lg p-4 inline-block">
                  {currentQ.testType === 'letterName' ? '字母名' : '字母音'}: {currentQ.question}
                </div>
                <Button
                  onClick={handlePlaySound}
                  disabled={isPlaying}
                  className="fun-button bg-blue-500 hover:bg-blue-600"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  播放发音
                </Button>
              </div>
            )}
            
            {currentQ.type === 'word-to-spelling' && (
              <div className="space-y-4">
                <div className="text-3xl mb-4">{currentQ.wordData.image}</div>
                <Button
                  onClick={handlePlaySound}
                  disabled={isPlaying}
                  className="fun-button bg-green-500 hover:bg-green-600"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  听单词发音
                </Button>
              </div>
            )}
            
            {currentQ.type === 'pattern-identification' && (
              <div className="space-y-4">
                <div className="text-3xl mb-4">{currentQ.wordData.image}</div>
                <div className="text-xl font-bold">{currentQ.question}</div>
                <Button
                  onClick={handlePlaySound}
                  disabled={isPlaying}
                  className="fun-button bg-purple-500 hover:bg-purple-600"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  听发音
                </Button>
              </div>
            )}
            
            {currentQ.type === 'long-vowel-rule' && (
              <div className="space-y-4">
                <div className="text-3xl mb-4">{currentQ.wordData.image}</div>
                <div className="text-xl font-bold">{currentQ.question}</div>
                <div className="text-sm text-gray-600 mb-4">
                  {currentQ.lesson.description}
                </div>
                <Button
                  onClick={handlePlaySound}
                  disabled={isPlaying}
                  className="fun-button bg-indigo-500 hover:bg-indigo-600"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  听发音
                </Button>
              </div>
            )}
            
            {currentQ.type === 'complex-pattern' && (
              <div className="space-y-4">
                <div className="text-3xl mb-4">{currentQ.wordData.image}</div>
                <div className="text-xl font-bold">{currentQ.question}</div>
                <div className="text-sm text-gray-600 mb-4">
                  {currentQ.lesson.description}
                </div>
                <Button
                  onClick={handlePlaySound}
                  disabled={isPlaying}
                  className="fun-button bg-pink-500 hover:bg-pink-600"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  听发音
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 选项区域 */}
        {!showResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="fun-button h-16 text-lg"
                onClick={() => handleAnswerSelect(option)}
                disabled={isPlaying}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {/* 结果显示 */}
        {showResult && (
          <div className="space-y-4">
            <div className={`rounded-lg p-6 text-center ${
              selectedAnswer === currentQ.correctAnswer 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-red-100 border border-red-300'
            }`}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                {selectedAnswer === currentQ.correctAnswer ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <span className="text-xl font-bold">
                  {selectedAnswer === currentQ.correctAnswer ? '答对了！' : '答错了'}
                </span>
              </div>
              
              {selectedAnswer !== currentQ.correctAnswer && (
                <p className="text-muted-foreground">
                  正确答案是: {currentQ.correctAnswer}
                  {currentQ.testType && (
                    <span className="block text-sm mt-1">
                      ({currentQ.testType === 'letterName' ? '字母名' : '字母音'})
                    </span>
                  )}
                </p>
              )}
              
              {currentQ.letterData && (
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>{currentQ.letterData.description}</p>
                </div>
              )}
            </div>
            
            <Button
              onClick={nextQuestion}
              className="fun-button w-full"
            >
              {currentQuestion < gameData.questions.length - 1 ? '下一题' : '查看结果'}
            </Button>
          </div>
        )}
      </div>
    )
  }

  const renderGameComplete = () => {
    const scoreInfo = getScoreMessage()
    if (!gameData) return null
    const percentage = Math.round((score / gameData.questions.length) * 100)
    
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl">🎉</div>
        <h2 className="text-3xl font-bold text-primary">游戏完成！</h2>
        
        <div className="bg-secondary/10 rounded-lg p-8">
          <div className="text-5xl font-bold text-primary mb-4">
            {score} / {gameData.questions.length}
          </div>
          <div className="text-xl text-muted-foreground mb-4">
            正确率: {percentage}%
          </div>
          <div className={`text-lg font-semibold ${scoreInfo.color}`}>
            {scoreInfo.message}
          </div>
          
          {percentage >= 80 && (
            <div className="mt-4">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
              <p className="text-yellow-600 font-semibold">获得优秀奖章！</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button
            onClick={restartGame}
            className="fun-button bg-primary"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            再玩一次
          </Button>
          <Button
            onClick={onGameComplete}
            variant="outline"
            className="fun-button"
          >
            返回学习
          </Button>
        </div>
      </div>
    )
  }

  if (!gameData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="card-shadow">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎮</div>
                  <h1 className="text-3xl font-bold mb-4 text-primary">游戏加载中...</h1>
                  <p className="text-muted-foreground mb-6">
                    正在准备游戏内容，请稍候
                  </p>
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="card-shadow">
            <CardContent className="p-8">
              {/* 游戏标题 */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 text-primary">
                  {gameData.title}
                </h1>
                <p className="text-muted-foreground">
                  通过游戏巩固自然拼读知识
                </p>
              </div>

              {gameCompleted ? renderGameComplete() : renderQuestion()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PhonicsGame