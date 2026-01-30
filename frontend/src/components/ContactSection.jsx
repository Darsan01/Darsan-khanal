import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { useState } from 'react'
import api from '../utils/api'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/messages', formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const socialLinks = [
    { icon: FiGithub, label: 'GitHub', url: 'https://github.com/Darsan01', color: 'hover:text-slate-700 dark:hover:text-slate-300' },
    { icon: FiMail, label: 'Email', url: 'mailto:contact@darsan.dev', color: 'hover:text-red-500' },
    { icon: FiLinkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-600' },
    { icon: FiTwitter, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-sky-500' }
  ]

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Have a project in mind? Let's discuss how I can help you build it.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <div className="glassmorphism p-6 rounded-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <FiMail className="text-sky-500 text-2xl" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Email</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">contact@darsan.dev</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="glassmorphism p-6 rounded-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <FiPhone className="text-sky-500 text-2xl" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Phone</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">+977 XXXXXXXXXX</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="glassmorphism p-6 rounded-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <FiMapPin className="text-sky-500 text-2xl" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Location</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Ilam, Nepal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form & Social */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Connect With Me
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Follow me on social media or check out my GitHub to see more of my work.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="glassmorphism p-6 rounded-xl flex flex-col items-center justify-center text-center hover:shadow-lg transition-all group"
                      >
                        <Icon className={`text-4xl text-slate-600 dark:text-slate-400 mb-3 ${social.color} transition-colors`} />
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {social.label}
                        </span>
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              {/* Fun Fact */}
              <div className="glassmorphism p-6 rounded-xl border-l-4 border-sky-500">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Quick Response</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  I typically respond to inquiries within 24 hours. For urgent matters, feel free to email me directly.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
