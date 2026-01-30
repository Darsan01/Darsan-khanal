import { motion } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useThemeStore, usePortfolioStore } from '../store/index'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { isDark, toggle: toggleTheme } = useThemeStore()
  const navItems = usePortfolioStore((state) => state.navItems)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [isDark])

  const defaultNavItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ]

  const displayNavItems = navItems?.length > 0 
    ? navItems.filter(item => item.visible !== false).map(item => ({ label: item.label, href: item.url }))
    : defaultNavItems

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-2xl gradient-text"
          >
            DK
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {displayNavItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:bg-sky-500/10 transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="text-yellow-500" size={20} />
              ) : (
                <FiMoon className="text-slate-600" size={20} />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline btn-primary text-sm"
            >
              Get In Touch
            </motion.a>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0
          }}
          className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
        >
          <div className="px-4 py-4 space-y-2">
            {displayNavItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:bg-sky-500/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-4 btn-primary">
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
