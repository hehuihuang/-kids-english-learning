import { useState, useCallback, useRef } from 'react'

export const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const utteranceRef = useRef(null)
  const lastSpeakTime = useRef(0)
  const speakTimeout = useRef(null)

  // 检查浏览器是否支持语音合成
  const checkSupport = useCallback(() => {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
    setIsSupported(supported)
    return supported
  }, [])

  // 停止当前播放
  const stopSpeech = useCallback(() => {
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()
        // 清理引用
        utteranceRef.current = null
        setIsPlaying(false)
      } catch (error) {
        console.warn('Error stopping speech:', error)
        setIsPlaying(false)
      }
    }
  }, [])

  // 播放文本
  const speak = useCallback((text, options = {}) => {
    if (!checkSupport()) {
      console.warn('Speech synthesis not supported')
      return Promise.reject(new Error('Speech synthesis not supported'))
    }

    const currentTime = Date.now()
    const timeSinceLastSpeak = currentTime - lastSpeakTime.current
    
    // 如果距离上次播放时间太短，延迟播放
    if (timeSinceLastSpeak < 200) {
      // 清除之前的延迟
      if (speakTimeout.current) {
        clearTimeout(speakTimeout.current)
      }
      
      return new Promise((resolve, reject) => {
        speakTimeout.current = setTimeout(() => {
          speak(text, options).then(resolve).catch(reject)
        }, 200 - timeSinceLastSpeak)
      })
    }

    // 停止当前播放并等待一小段时间
    stopSpeech()
    lastSpeakTime.current = currentTime
    
    return new Promise((resolve, reject) => {
      try {
        // 等待一小段时间确保语音合成已停止
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(text)
          utteranceRef.current = utterance

          // 设置语音参数
          utterance.lang = options.lang || 'en-US'
          utterance.rate = options.rate || 0.8 // 稍慢一些，适合儿童
          utterance.pitch = options.pitch || 1.1 // 稍高一些，更友好
          utterance.volume = options.volume || 1

          // 事件监听
          utterance.onstart = () => {
            setIsPlaying(true)
          }

          utterance.onend = () => {
            setIsPlaying(false)
            resolve()
          }

          utterance.onerror = (event) => {
            setIsPlaying(false)
            // 如果是中断错误，直接解决而不是拒绝
            if (event.error === 'interrupted') {
              resolve()
            } else {
              reject(new Error(`Speech synthesis error: ${event.error}`))
            }
          }

          // 开始播放
          try {
            window.speechSynthesis.speak(utterance)
          } catch (speakError) {
            setIsPlaying(false)
            // 如果是重复播放错误，直接解决
            if (speakError.message.includes('already speaking')) {
              resolve()
            } else {
              reject(speakError)
            }
          }
        }, 100) // 等待100ms
      } catch (error) {
        setIsPlaying(false)
        reject(error)
      }
    })
  }, [checkSupport, stopSpeech])

  // 播放单词（点读功能）
  const speakWord = useCallback((word) => {
    return speak(word, {
      lang: 'en-US',
      rate: 0.7, // 单词播放更慢
      pitch: 1.2
    })
  }, [speak])

  // 播放句子
  const speakSentence = useCallback((sentence) => {
    return speak(sentence, {
      lang: 'en-US',
      rate: 0.8,
      pitch: 1.0
    })
  }, [speak])

  // 获取可用的语音列表
  const getVoices = useCallback(() => {
    if (!checkSupport()) return []
    return window.speechSynthesis.getVoices()
  }, [checkSupport])

  // 选择最佳英语语音
  const getBestEnglishVoice = useCallback(() => {
    const voices = getVoices()
    
    // 优先选择英语语音
    const englishVoices = voices.filter(voice => 
      voice.lang.startsWith('en-') && voice.localService
    )
    
    if (englishVoices.length > 0) {
      // 优先选择美式英语
      const usVoice = englishVoices.find(voice => voice.lang === 'en-US')
      return usVoice || englishVoices[0]
    }
    
    return voices[0] || null
  }, [getVoices])

  // 清理函数
  const cleanup = useCallback(() => {
    if (speakTimeout.current) {
      clearTimeout(speakTimeout.current)
    }
    stopSpeech()
  }, [stopSpeech])

  return {
    isPlaying,
    isSupported,
    speak,
    speakWord,
    speakSentence,
    stopSpeech,
    getVoices,
    getBestEnglishVoice,
    cleanup
  }
}

