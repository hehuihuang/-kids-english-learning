import { useState, useCallback, useRef } from 'react'

export const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const utteranceRef = useRef(null)

  // 检查浏览器是否支持语音合成
  const checkSupport = useCallback(() => {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
    setIsSupported(supported)
    return supported
  }, [])

  // 停止当前播放
  const stopSpeech = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    }
  }, [])

  // 播放文本
  const speak = useCallback((text, options = {}) => {
    if (!checkSupport()) {
      console.warn('Speech synthesis not supported')
      return Promise.reject(new Error('Speech synthesis not supported'))
    }

    // 停止当前播放
    stopSpeech()

    return new Promise((resolve, reject) => {
      try {
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
          reject(new Error(`Speech synthesis error: ${event.error}`))
        }

        // 开始播放
        window.speechSynthesis.speak(utterance)
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

  return {
    isPlaying,
    isSupported,
    speak,
    speakWord,
    speakSentence,
    stopSpeech,
    getVoices,
    getBestEnglishVoice
  }
}

