import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects')
      setProjects(response.data)
    } catch (error) {
      setProjects(DEFAULT_PROJECTS)
    } finally {
      setLoading(false)
    }
  }

  const DEFAULT_PROJECTS = [
    {
      id: 1,
      title: 'EduFlow',
      description: 'A comprehensive school management system built with Laravel. Features include student enrollment, attendance tracking, grade management, and parent-teacher communication.',
      image: 'https://via.placeholder.com/400x250?text=EduFlow',
      technologies: ['Laravel', 'MySQL', 'Bootstrap', 'PHP'],
      github: 'https://github.com/Darsan01/eduflow',
      liveDemo: 'https://eduflow-demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'BookHive',
      description: 'Library management system built with .NET MVC and SQL Server. Includes book cataloging, member management, lending system, and reporting features.',
      image: 'https://via.placeholder.com/400x250?text=BookHive',
      technologies: ['ASP.NET Core', 'MVC', 'SQL Server', 'C#'],
      github: 'https://github.com/Darsan01/bookhive',
      liveDemo: null,
      featured: true
    },
    {
      id: 3,
      title: 'Expense Tracker App',
      description: 'Cross-platform mobile expense tracking application built with .NET MAUI. Features include transaction logging, categorization, analytics, and data export.',
      image: 'https://via.placeholder.com/400x250?text=ExpenseTracker',
      technologies: ['.NET MAUI', 'SQLite', 'C#', 'XAML'],
      github: 'https://github.com/Darsan01/expense-tracker',
      liveDemo: null,
      featured: true
    },
    {
      id: 4,
      title: 'Tinjure Tea E-commerce',
      description: 'E-commerce demo platform for selling specialty tea products. Includes product catalog, shopping cart, payment integration, and order management.',
      image: 'https://via.placeholder.com/400x250?text=TinjureTea',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/Darsan01/tinjure-tea',
      liveDemo: 'https://tinjure-tea.demo.com',
      featured: false
    }
  ]

  const displayProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-800/50">
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
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {displayProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="glassmorphism rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-sky-400 to-blue-600">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full hover:bg-sky-500 hover:text-white transition-all"
                      title="View on GitHub"
                    >
                      <FiGithub size={20} />
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full hover:bg-sky-500 hover:text-white transition-all"
                        title="View Live Demo"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-xs font-bold px-3 py-1 bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-secondary text-center group"
                    >
                      <FiGithub className="inline mr-2" />
                      GitHub
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary text-center group"
                      >
                        <FiExternalLink className="inline mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <a href="/projects" className="btn-outline">
              View All Projects
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
