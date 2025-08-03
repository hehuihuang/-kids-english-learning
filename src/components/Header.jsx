import { Button } from '@/components/ui/button.jsx'
import { Home, BookOpen, Gamepad2, Users } from 'lucide-react'

const Header = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'learn', label: '学习', icon: BookOpen },
    { id: 'games', label: '游戏', icon: Gamepad2 },
    { id: 'parents', label: '家长', icon: Users },
  ]

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-2xl">🐻</span>
            </div>
            <h1 className="text-2xl font-bold kid-friendly">FunEnglish</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className="fun-button text-white hover:text-primary"
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => {/* TODO: Mobile menu */}}
          >
            <span className="text-xl">☰</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header

