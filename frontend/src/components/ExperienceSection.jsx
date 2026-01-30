import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

export default function ExperienceSection() {
  const experiences = [
    {
      company: 'Webbank Nepal',
      position: 'Full-Stack Developer (Intern)',
      duration: '6 months',
      description: 'Developed e-commerce features using Laravel, integrated Stripe payment gateway, optimized database queries for 40% performance improvement.',
      highlights: [
        'Laravel e-commerce development',
        'Stripe payment integration',
        'Performance optimization (40% improvement)',
        'Database query optimization',
        'REST API development',
        'Team collaboration & Agile practices'
      ],
      technologies: ['Laravel', 'MySQL', 'Stripe', 'PHP', 'REST API']
    }
  ]

  const certifications = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      credentialId: 'AWS-CP-2024'
    },
    {
      title: 'Internship Completion Certificate',
      issuer: 'Webbank Nepal',
      date: '2024',
      credentialId: 'WBN-2024'
    },
    {
      title: 'Performance Optimization Achievement',
      issuer: 'Webbank Nepal',
      date: '2024',
      credentialId: 'PO-2024'
    }
  ]

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

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experience & <span className="gradient-text">Certifications</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Experience */}
          <div className="mb-16">
            <motion.h3 variants={itemVariants} className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
              Work Experience
            </motion.h3>

            <motion.div variants={itemVariants} className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="glassmorphism p-8 rounded-xl hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {exp.position}
                      </h4>
                      <p className="text-sky-500 font-semibold">{exp.company}</p>
                    </div>
                    <span className="px-4 py-2 bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full font-semibold text-sm">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FiCheckCircle className="text-sky-500 flex-shrink-0 mt-1" />
                        <span className="text-slate-600 dark:text-slate-300">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              Certifications & Achievements
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glassmorphism p-6 rounded-xl hover:scale-105 transition-transform text-center"
                >
                  <FiCheckCircle className="text-sky-500 text-4xl mx-auto mb-4" />
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-xs font-semibold text-sky-500">
                    {cert.date}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    ID: {cert.credentialId}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
