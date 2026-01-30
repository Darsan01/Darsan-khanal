import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function SkillsSection() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills')
      setSkills(response.data)
    } catch (error) {
      // Fallback data if API fails
      setSkills(DEFAULT_SKILLS)
    } finally {
      setLoading(false)
    }
  }

  const DEFAULT_SKILLS = [
    {
      category: 'Backend',
      items: ['C#', '.NET 8', 'ASP.NET Core', 'Web API', 'Laravel', 'RESTful API']
    },
    {
      category: 'Frontend',
      items: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Tailwind CSS']
    },
    {
      category: 'Mobile',
      items: ['.NET MAUI', 'Cross-Platform Development']
    },
    {
      category: 'Database',
      items: ['MySQL', 'SQL', 'SQLite', 'Database Design']
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'GitHub', 'Agile/Scrum', 'Stripe', 'AWS']
    }
  ]

  const displaySkills = skills.length > 0 ? skills : DEFAULT_SKILLS

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
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="skills" className="py-20">
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
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {displaySkills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glassmorphism p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <h3 className="text-2xl font-bold text-sky-500 mb-6 group-hover:text-sky-600 transition-colors">
                  {skillGroup.category}
                </h3>
                <div className="space-y-3">
                  {(skillGroup.items || []).map((skill, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Proficiency Level */}
          <motion.div variants={itemVariants} className="mt-16 space-y-8">
            <h3 className="text-2xl font-bold text-center mb-10">Proficiency Levels</h3>
            {[
              { name: '.NET & C#', level: 95 },
              { name: 'React & JavaScript', level: 90 },
              { name: 'Laravel & PHP', level: 85 },
              { name: 'Database Design', level: 88 },
              { name: 'Cloud & AWS', level: 80 }
            ].map((skill, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {skill.name}
                  </span>
                  <span className="text-sky-500 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
