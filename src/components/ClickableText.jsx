import { useState } from 'react'
import { useSpeech } from '../hooks/useSpeech.js'
import { Volume2 } from 'lucide-react'

const ClickableText = ({ 
  text, 
  clickable = false, 
  className = '', 
  showIcon = false,
  onWordClick = null 
}) => {
  const { speakWord, isPlaying } = useSpeech()
  const [isHighlighted, setIsHighlighted] = useState(false)

  const handleClick = async () => {
    if (!clickable) return

    // 触发父组件的回调
    if (onWordClick) {
      onWordClick(text)
    }

    try {
      // 添加高亮效果
      setIsHighlighted(true)
      
      // 播放语音
      await speakWord(text)
      
      // 移除高亮效果
      setTimeout(() => {
        setIsHighlighted(false)
      }, 500)
    } catch (error) {
      console.error('Speech error:', error)
      setIsHighlighted(false)
    }
  }

  const baseClasses = clickable 
    ? 'clickable-word cursor-pointer hover:bg-accent/20 px-1 py-0.5 rounded transition-all duration-200 inline-flex items-center gap-1' 
    : ''
  
  const highlightClasses = isHighlighted ? 'reading-highlight' : ''
  const playingClasses = isPlaying ? 'wiggle' : ''

  return (
    <span 
      className={`${baseClasses} ${highlightClasses} ${playingClasses} ${className}`}
      onClick={handleClick}
      title={clickable ? '点击听发音' : ''}
    >
      {text}
      {clickable && showIcon && (
        <Volume2 className="w-3 h-3 text-primary/60" />
      )}
    </span>
  )
}

export default ClickableText

