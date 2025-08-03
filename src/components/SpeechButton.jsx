import { Button } from '@/components/ui/button.jsx'
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react'
import { useSpeech } from '../hooks/useSpeech.js'

const SpeechButton = ({ 
  text, 
  variant = "default", 
  size = "default",
  className = "",
  children,
  type = "sentence", // "word" or "sentence"
  disabled = false
}) => {
  const { isPlaying, speakWord, speakSentence, stopSpeech, isSupported } = useSpeech()

  const handleClick = async () => {
    if (isPlaying) {
      stopSpeech()
      return
    }

    try {
      if (type === "word") {
        await speakWord(text)
      } else {
        await speakSentence(text)
      }
    } catch (error) {
      console.error('Speech error:', error)
    }
  }

  if (!isSupported) {
    return (
      <Button 
        variant="outline" 
        disabled 
        className={className}
        title="您的浏览器不支持语音功能"
      >
        <Volume2 className="w-4 h-4 mr-2" />
        不支持语音
      </Button>
    )
  }

  const getIcon = () => {
    if (isPlaying) {
      return <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
    }
    return <Play className="w-4 h-4 mr-2" />
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`fun-button ${className}`}
      onClick={handleClick}
      disabled={disabled}
      title={isPlaying ? "点击停止" : "点击播放"}
    >
      {getIcon()}
      {children || (isPlaying ? "播放中..." : "播放")}
    </Button>
  )
}

export default SpeechButton

