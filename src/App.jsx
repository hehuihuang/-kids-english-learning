import { useState } from 'react'
import Header from './components/Header.jsx'
import HomePage from './components/HomePage.jsx'
import LearningPageEnhanced from './components/LearningPageEnhanced.jsx'
import AlphabetPage from './components/AlphabetPage.jsx'
import VocabularyPage from './components/VocabularyPage.jsx'
import EnglishWordChallenge from './components/EnglishWordChallenge.jsx'
import WordGamesPage from './components/WordGamesPage.jsx'
import GamesPageEnhanced from './components/GamesPageEnhanced.jsx'
import PhonicsPage from './components/PhonicsPage.jsx'
import ParentsPage from './components/ParentsPage.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [learningMode, setLearningMode] = useState('stories')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} onLearningModeChange={setLearningMode} />
      case 'learn':
        if (learningMode === 'alphabet') {
          return <AlphabetPage />
        }
        if (learningMode === 'vocabulary') {
          return <VocabularyPage />
        }
        if (learningMode === 'word-challenge') {
          return <EnglishWordChallenge />
        }
        if (learningMode === 'games') {
          return <WordGamesPage />
        }
        if (learningMode === 'phonics') {
          return <PhonicsPage />
        }
        return <LearningPageEnhanced learningMode={learningMode} />
      case 'games':
        return <GamesPageEnhanced />
      case 'parents':
        return <ParentsPage />
      default:
        return <HomePage onPageChange={setCurrentPage} onLearningModeChange={setLearningMode} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} onLearningModeChange={setLearningMode} />
      <main>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-lg">🐻</span>
                </div>
                <h3 className="text-lg font-bold kid-friendly">FunEnglish</h3>
              </div>
              <p className="text-sm text-muted-foreground kid-friendly">
                让孩子在快乐中学习英语，培养语言兴趣和能力。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 kid-friendly">学习内容</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 英语字母学习</li>
                <li>• 英语儿歌童谣</li>
                <li>• 互动故事绘本</li>
                <li>• 单词游戏</li>
                <li>• 自然拼读</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 kid-friendly">特色功能</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 免费语音播放</li>
                <li>• 点读功能</li>
                <li>• 学习进度跟踪</li>
                <li>• 家长指导建议</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground kid-friendly">
              © 2024 FunEnglish. 专为儿童英语启蒙设计 ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

