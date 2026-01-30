import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/index'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLogOut, FiMenu, FiX, FiPlus, FiEdit, FiTrash2, FiUpload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import api from '../utils/api'
import { uploadFile } from '../utils/fileUpload'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [messages, setMessages] = useState([])
  const [appSettings, setAppSettings] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [achievements, setAchievements] = useState([])
  const [navItems, setNavItems] = useState([])
  const [socialLinks, setSocialLinks] = useState([])
  const [footerContent, setFooterContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState(null)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin/login')
      return
    }

    fetchData()
  }, [user, navigate])

  const fetchData = async () => {
    try {
      const [projectsRes, skillsRes, experienceRes, messagesRes, settingsRes, certificatesRes, achievementsRes, navRes, socialRes, footerRes] = await Promise.all([
        api.get('/projects'),
        api.get('/skills'),
        api.get('/experience'),
        api.get('/messages'),
        api.get('/settings').catch(() => ({ data: null })),
        api.get('/certificates').catch(() => ({ data: [] })),
        api.get('/achievements').catch(() => ({ data: [] })),
        api.get('/nav').catch(() => ({ data: [] })),
        api.get('/sociallinks').catch(() => ({ data: [] })),
        api.get('/footer').catch(() => ({ data: null }))
      ])

      setProjects(projectsRes.data || [])
      setSkills(skillsRes.data || [])
      setExperience(experienceRes.data || [])
      setMessages(messagesRes.data || [])
      setAppSettings(settingsRes.data)
      setCertificates(certificatesRes.data || [])
      setAchievements(achievementsRes.data || [])
      setNavItems(navRes.data || [])
      setSocialLinks(socialRes.data || [])
      setFooterContent(footerRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setConfirmDialog({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      onConfirm: () => {
        logout()
        navigate('/admin/login')
      },
      onCancel: () => setConfirmDialog(null)
    })
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setFormData({})
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setShowModal(true)
  }

  const handleEditConfirm = () => {
    setConfirmDialog({
      title: 'Confirm Changes',
      message: `Are you sure you want to update this ${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}?`,
      onConfirm: () => {
        handleSubmitConfirmed()
      },
      onCancel: () => setConfirmDialog(null)
    })
  }

  const handleSubmitConfirmed = async () => {
    try {
      const endpoints = {
        projects: 'projects',
        skills: 'skills',
        experience: 'experience',
        certificates: 'certificates',
        achievements: 'achievements',
        navItems: 'nav',
        socialLinks: 'sociallinks',
        settings: 'settings',
        footerContent: 'footer'
      }
      const endpoint = endpoints[activeTab]

      if (editingItem) {
        await api.put(`/${endpoint}/${editingItem.id}`, formData)
        showToast(`${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()} updated successfully!`, 'success')
      } else {
        await api.post(`/${endpoint}`, formData)
        showToast(`${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()} created successfully!`, 'success')
      }

      setShowModal(false)
      setConfirmDialog(null)
      fetchData()
    } catch (error) {
      console.error('Failed to save:', error)
      showToast('Failed to save: ' + (error.response?.data?.message || error.message), 'error')
    }
  }

  const handleDelete = async (id) => {
    setConfirmDialog({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete this ${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}? This action cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        try {
          const endpoints = {
            projects: 'projects',
            skills: 'skills',
            experience: 'experience',
            certificates: 'certificates',
            achievements: 'achievements',
            navItems: 'nav',
            socialLinks: 'sociallinks',
            messages: 'messages'
          }
          const endpoint = endpoints[activeTab]
          await api.delete(`/${endpoint}/${id}`)
          setConfirmDialog(null)
          showToast(`${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()} deleted successfully!`, 'success')
          fetchData()
        } catch (error) {
          console.error('Failed to delete:', error)
          showToast('Failed to delete: ' + (error.response?.data?.message || error.message), 'error')
          setConfirmDialog(null)
        }
      },
      onCancel: () => setConfirmDialog(null)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleEditConfirm()
  }

  const sidebarItems = [
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'skills', label: 'Skills', icon: '⚙️' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'achievements', label: 'Achievements', icon: '⭐' },
    { id: 'navItems', label: 'Navigation', icon: '🗺️' },
    { id: 'socialLinks', label: 'Social Links', icon: '🔗' },
    { id: 'settings', label: 'Settings', icon: '⚡' },
    { id: 'footerContent', label: 'Footer', icon: '📝' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="w-64 bg-slate-800 border-r border-slate-700 fixed h-screen z-40 md:relative md:translate-x-0"
      >
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold gradient-text">Admin</h2>
          <p className="text-sm text-slate-400">{user?.name}</p>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-3xl font-bold capitalize">{activeTab === 'socialLinks' ? 'Social Links' : activeTab === 'navItems' ? 'Navigation' : activeTab === 'footerContent' ? 'Footer' : activeTab}</h1>
          <div className="flex gap-4 items-center">
            {!['messages', 'settings', 'footerContent'].includes(activeTab) && (
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FiPlus /> Add New
              </button>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-700 rounded-lg"
            >
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : activeTab === 'projects' ? (
            <ProjectsList projects={projects} onEdit={handleEdit} onDelete={handleDelete} itemVariants={itemVariants} />
          ) : activeTab === 'skills' ? (
            <SkillsList skills={skills} onEdit={handleEdit} onDelete={handleDelete} itemVariants={itemVariants} />
          ) : activeTab === 'experience' ? (
            <ExperienceList experience={experience} onEdit={handleEdit} onDelete={handleDelete} itemVariants={itemVariants} />
          ) : activeTab === 'certificates' ? (
            <CertificatesList certificates={certificates} onEdit={handleEdit} onDelete={handleDelete} itemVariants={itemVariants} />
          ) : activeTab === 'achievements' ? (
            <AchievementsList achievements={achievements} onEdit={handleEdit} onDelete={handleDelete} itemVariants={itemVariants} />
          ) : activeTab === 'navItems' ? (
            <NavItemsList navItems={navItems} onEdit={handleEdit} onDelete={handleDelete} itemVariants={itemVariants} />
          ) : activeTab === 'socialLinks' ? (
            <SocialLinksList socialLinks={socialLinks} onEdit={handleEdit} onDelete={handleDelete} itemVariants={itemVariants} />
          ) : activeTab === 'settings' ? (
            <SettingsForm appSettings={appSettings} onEdit={handleEdit} itemVariants={itemVariants} />
          ) : activeTab === 'footerContent' ? (
            <FooterForm footerContent={footerContent} onEdit={handleEdit} itemVariants={itemVariants} />
          ) : (
            <MessagesList messages={messages} itemVariants={itemVariants} />
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AdminModal
          title={`${editingItem ? 'Edit' : 'Add'} ${activeTab}`}
          formData={formData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          setFormData={setFormData}
          activeTab={activeTab}
        />
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 p-4 rounded-lg flex items-center gap-3 z-50 ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <FiCheckCircle className="w-5 h-5" />
            ) : (
              <FiAlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Dialog */}
      <AnimatePresence>
        {confirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => confirmDialog.onCancel()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-lg p-6 max-w-sm w-full mx-4 border border-slate-700"
            >
              <h3 className="text-xl font-bold mb-2">{confirmDialog.title}</h3>
              <p className="text-slate-300 mb-6">{confirmDialog.message}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => confirmDialog.onCancel()}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDialog.onConfirm()}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    confirmDialog.type === 'danger'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-sky-600 hover:bg-sky-700'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectsList({ projects, onEdit, onDelete, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-slate-400 mb-4 text-sm line-clamp-2">{project.description}</p>
            <div className="flex gap-2">
              <button onClick={() => onEdit(project)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2">
                <FiEdit /> Edit
              </button>
              <button onClick={() => onDelete(project.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
                <FiTrash2 /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function SkillsList({ skills, onEdit, onDelete, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="space-y-4">
        {skills.map((skill) => (
          <motion.div key={skill.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
              <p className="text-slate-400 text-sm">{skill.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(skill)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2">
                <FiEdit />
              </button>
              <button onClick={() => onDelete(skill.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
                <FiTrash2 />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ExperienceList({ experience, onEdit, onDelete, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="space-y-4">
        {experience.map((exp) => (
          <motion.div key={exp.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold">{exp.position}</h3>
                <p className="text-sky-400">{exp.company}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(exp)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2">
                  <FiEdit />
                </button>
                <button onClick={() => onDelete(exp.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <p className="text-slate-400 text-sm">{exp.duration}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function MessagesList({ messages, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="space-y-4">
        {messages.map((msg) => (
          <motion.div key={msg.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold">{msg.name}</h3>
                <p className="text-sky-400">{msg.email}</p>
              </div>
              <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-slate-300 mb-2 font-semibold">{msg.subject}</p>
            <p className="text-slate-400">{msg.message}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function CertificatesList({ certificates, onEdit, onDelete, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="grid md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
            <p className="text-sky-400 text-sm mb-2">{cert.issuer}</p>
            <p className="text-slate-400 text-sm mb-4">Issued: {new Date(cert.issuedDate).toLocaleDateString()}</p>
            <div className="flex gap-2">
              <button onClick={() => onEdit(cert)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2">
                <FiEdit /> Edit
              </button>
              <button onClick={() => onDelete(cert.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
                <FiTrash2 /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function AchievementsList({ achievements, onEdit, onDelete, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="space-y-4">
        {achievements.map((ach) => (
          <motion.div key={ach.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold">{ach.title}</h3>
                <p className="text-slate-400 text-sm">{ach.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(ach)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2">
                  <FiEdit />
                </button>
                <button onClick={() => onDelete(ach.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function NavItemsList({ navItems, onEdit, onDelete, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="space-y-4">
        {navItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{item.label}</h3>
              <p className="text-slate-400 text-sm">{item.url}</p>
              <span className="text-xs text-slate-500">Order: {item.order}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(item)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2">
                <FiEdit />
              </button>
              <button onClick={() => onDelete(item.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
                <FiTrash2 />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function SocialLinksList({ socialLinks, onEdit, onDelete, itemVariants }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
      <div className="space-y-4">
        {socialLinks.map((link) => (
          <motion.div key={link.id} variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{link.platform}</h3>
              <p className="text-sky-400 text-sm">{link.url}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(link)} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2">
                <FiEdit />
              </button>
              <button onClick={() => onDelete(link.id)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
                <FiTrash2 />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function SettingsForm({ appSettings, onEdit, itemVariants }) {
  if (!appSettings) {
    return <div className="text-center py-12">No settings found. Create one first.</div>
  }
  
  return (
    <motion.div variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl">
      <h3 className="text-xl font-bold mb-4">Application Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">App Name</label>
          <p className="text-slate-300">{appSettings.appName}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Tagline</label>
          <p className="text-slate-300">{appSettings.appTagline}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">About Me</label>
          <p className="text-slate-300 line-clamp-3">{appSettings.aboutMe}</p>
        </div>
        <button
          onClick={() => onEdit(appSettings)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2 mt-6"
        >
          <FiEdit /> Edit Settings
        </button>
      </div>
    </motion.div>
  )
}

function FooterForm({ footerContent, onEdit, itemVariants }) {
  if (!footerContent) {
    return <div className="text-center py-12">No footer content found. Create one first.</div>
  }

  return (
    <motion.div variants={itemVariants} className="bg-slate-800 rounded-lg p-6 border border-slate-700 max-w-2xl">
      <h3 className="text-xl font-bold mb-4">Footer Content</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Company Name</label>
          <p className="text-slate-300">{footerContent.companyName}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <p className="text-slate-300 line-clamp-2">{footerContent.description}</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Copyright</label>
          <p className="text-slate-300">{footerContent.copyRight}</p>
        </div>
        <button
          onClick={() => onEdit(footerContent)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded flex items-center gap-2 mt-6"
        >
          <FiEdit /> Edit Footer
        </button>
      </div>
    </motion.div>
  )
}

function AdminModal({ title, formData, onSubmit, onClose, setFormData, activeTab }) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadFile(file)
      setFormData({ ...formData, [fieldName]: url })
    } catch (error) {
      alert(`Upload failed: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 rounded-lg p-8 max-w-md w-full border border-slate-700 my-8"
      >
        <h2 className="text-2xl font-bold mb-6">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {activeTab === 'projects' && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={(formData.technologies || []).join(', ')}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()) })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="text"
                placeholder="GitHub Link"
                value={formData.github || ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
            </>
          )}

          {activeTab === 'skills' && (
            <>
              <input
                type="text"
                placeholder="Skill Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="number"
                placeholder="Proficiency (1-5)"
                min="1"
                max="5"
                value={formData.proficiency || '3'}
                onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
            </>
          )}

          {activeTab === 'experience' && (
            <>
              <input
                type="text"
                placeholder="Position"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={formData.startDate ? formData.startDate.split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="date"
                placeholder="End Date"
                value={formData.endDate ? formData.endDate.split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
            </>
          )}

          {activeTab === 'certificates' && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="Issuer"
                value={formData.issuer || ''}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="date"
                placeholder="Issued Date"
                value={formData.issuedDate ? formData.issuedDate.split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, issuedDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="Credential URL"
                value={formData.credentialUrl || ''}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Certificate Image</label>
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors">
                  <FiUpload /> Upload Image
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'imagePath')}
                    accept="image/*"
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {formData.imagePath && <p className="text-xs text-sky-400 mt-1">✓ Image uploaded</p>}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.visible !== false}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Visible</span>
              </label>
            </>
          )}

          {activeTab === 'achievements' && (
            <>
              <input
                type="text"
                placeholder="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="date"
                placeholder="Achievement Date"
                value={formData.achievedDate ? formData.achievedDate.split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, achievedDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured !== false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Featured</span>
              </label>
            </>
          )}

          {activeTab === 'navItems' && (
            <>
              <input
                type="text"
                placeholder="Label"
                value={formData.label || ''}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="URL"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="number"
                placeholder="Order"
                value={formData.order || '0'}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.visible !== false}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Visible</span>
              </label>
            </>
          )}

          {activeTab === 'socialLinks' && (
            <>
              <input
                type="text"
                placeholder="Platform"
                value={formData.platform || ''}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="URL"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="Icon (icon-name)"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="number"
                placeholder="Order"
                value={formData.order || '0'}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <input
                type="text"
                placeholder="App Name"
                value={formData.appName || ''}
                onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <input
                type="text"
                placeholder="App Tagline"
                value={formData.appTagline || ''}
                onChange={(e) => setFormData({ ...formData, appTagline: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <textarea
                placeholder="About Me"
                value={formData.aboutMe || ''}
                onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white h-24"
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={formData.contactEmail || ''}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="tel"
                placeholder="Contact Phone"
                value={formData.contactPhone || ''}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Profile Image</label>
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors">
                  <FiUpload /> Upload Image
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'profileImage')}
                    accept="image/*"
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {formData.profileImage && <p className="text-xs text-sky-400 mt-1">✓ Image uploaded</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">CV/Resume (PDF)</label>
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 transition-colors">
                  <FiUpload /> Upload CV
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'cvPath')}
                    accept=".pdf,.doc,.docx"
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {formData.cvPath && <p className="text-xs text-sky-400 mt-1">✓ CV uploaded</p>}
              </div>
            </>
          )}

          {activeTab === 'footerContent' && (
            <>
              <input
                type="text"
                placeholder="Company Name"
                value={formData.companyName || ''}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
              <input
                type="text"
                placeholder="Copyright"
                value={formData.copyRight || ''}
                onChange={(e) => setFormData({ ...formData, copyRight: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
              />
            </>
          )}

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg font-semibold">
              Save
            </button>
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
