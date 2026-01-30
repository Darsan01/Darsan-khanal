import { create } from 'zustand'
import api from '../utils/api'

// AUTH STORE
export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  setAuth: (user, token) => {
    localStorage.setItem('token', token)
    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  setUser: (user) => set({ user })
}))

// THEME STORE
export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',
  toggle: () => {
    set((state) => {
      const newDark = !state.isDark
      localStorage.setItem('theme', newDark ? 'dark' : 'light')
      if (newDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { isDark: newDark }
    })
  }
}))

// PORTFOLIO STORE - All portfolio content
export const usePortfolioStore = create((set) => ({
  // Settings
  appSettings: null,
  navItems: [],
  footerContent: null,
  socialLinks: [],
  
  // Content
  projects: [],
  skills: [],
  experience: [],
  certificates: [],
  achievements: [],
  messages: [],
  
  // Loading states
  loading: false,
  error: null,

  // Fetch all public content
  fetchPublicContent: async () => {
    set({ loading: true })
    try {
      const [settings, nav, footer, social, projects, skills, exp, certs, achievements] = await Promise.all([
        api.get('/settings').catch(() => ({ data: null })),
        api.get('/nav').catch(() => ({ data: [] })),
        api.get('/footer').catch(() => ({ data: null })),
        api.get('/sociallinks').catch(() => ({ data: [] })),
        api.get('/projects').catch(() => ({ data: [] })),
        api.get('/skills').catch(() => ({ data: [] })),
        api.get('/experience').catch(() => ({ data: [] })),
        api.get('/certificates').catch(() => ({ data: [] })),
        api.get('/achievements').catch(() => ({ data: [] }))
      ])

      set({
        appSettings: settings.data,
        navItems: nav.data || [],
        footerContent: footer.data,
        socialLinks: social.data || [],
        projects: projects.data || [],
        skills: skills.data || [],
        experience: exp.data || [],
        certificates: certs.data || [],
        achievements: achievements.data || [],
        loading: false
      })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // Settings management
  updateSettings: async (data) => {
    try {
      const response = await api.put('/settings', data)
      set({ appSettings: response.data })
      return response.data
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  }
}))
