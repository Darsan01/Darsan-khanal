import { motion } from 'framer-motion'
import { FiHeart, FiGithub } from 'react-icons/fi'
import { usePortfolioStore } from '../store/index'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerContent = usePortfolioStore((state) => state.footerContent)
  const socialLinks = usePortfolioStore((state) => state.socialLinks)
  const navItems = usePortfolioStore((state) => state.navItems)

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12 mb-8"
        >
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">{footerContent?.companyName || 'Darsan Khanal'}</h3>
            <p className="text-slate-400">
              {footerContent?.description || 'Full-Stack Developer from Nepal. Building scalable web and mobile applications.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              {navItems?.length > 0 ? (
                navItems.filter(item => item.visible !== false).map((item) => (
                  <li key={item.id}>
                    <a href={item.url} className="hover:text-sky-400 transition-colors">{item.label}</a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="#home" className="hover:text-sky-400 transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-sky-400 transition-colors">About</a></li>
                  <li><a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a></li>
                  <li><a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {socialLinks?.length > 0 ? (
                socialLinks.filter(link => link.visible !== false).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-sky-400 transition-colors"
                    title={link.platform}
                  >
                    <span className="text-sm">{link.platform}</span>
                  </a>
                ))
              ) : (
                <>
                  <a href="https://github.com/Darsan01" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                    <FiGithub size={24} />
                  </a>
                  <a href="mailto:contact@darsan.dev" className="text-slate-400 hover:text-sky-400 transition-colors">
                    <span className="text-sm">Email</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 pt-8 text-center text-slate-400"
        >
          <p className="flex items-center justify-center gap-1">
            {footerContent?.copyRight || `Made with `} <FiHeart className="text-red-500 inline" /> {footerContent?.copyRight ? '' : `by Darsan Khanal © ${currentYear}`}
          </p>
          <p className="text-sm mt-2">
            Designed & Built with React, Tailwind CSS & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
