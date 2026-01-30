import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { usePortfolioStore, useThemeStore } from './store/index'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import CertificatesSection from './components/CertificatesSection'
import AchievementsSection from './components/AchievementsSection'
import ContactSection from './components/ContactSection'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'

function HomePage() {
  const appSettings = usePortfolioStore((state) => state.appSettings)

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificatesSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const fetchPublicContent = usePortfolioStore((state) => state.fetchPublicContent)
  const isDark = useThemeStore((state) => state.isDark)

  useEffect(() => {
    // Fetch all portfolio content
    fetchPublicContent()

    // Set theme
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [fetchPublicContent, isDark])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
