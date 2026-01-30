import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi'

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
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
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I'm Darsan Khanal, a passionate full-stack developer from <span className="font-semibold text-sky-500">Ilam, Nepal</span>.
                With a BSc (Hons) Computing degree from London Metropolitan University, I combine strong academic foundations with practical experience.
              </p>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I specialize in building scalable web applications and mobile apps using modern technologies.
                My expertise spans across frontend frameworks like React, backend technologies including .NET Core and Laravel, and mobile development with .NET MAUI.
              </p>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                As an AWS Certified Cloud Practitioner, I understand cloud architecture and deployment strategies.
                I'm passionate about clean code, performance optimization, and delivering solutions that make a real impact.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 pt-6">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <FiMapPin className="text-sky-500 text-xl" />
                  <span>Ilam, Nepal</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <FiMail className="text-sky-500 text-xl" />
                  <span>contact@darsan.dev</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <FiPhone className="text-sky-500 text-xl" />
                  <span>+977 XXXXXXXXXX</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="glassmorphism p-6 rounded-xl hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-sky-500 mb-2">Education</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  BSc (Hons) Computing<br />
                  <span className="text-sm text-slate-500">London Metropolitan University</span>
                </p>
              </div>

              <div className="glassmorphism p-6 rounded-xl hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-sky-500 mb-2">Certifications</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  AWS Certified Cloud Practitioner<br />
                  <span className="text-sm text-slate-500">Amazon Web Services</span>
                </p>
              </div>

              <div className="glassmorphism p-6 rounded-xl hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-sky-500 mb-2">Experience</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Full-Stack Developer Intern<br />
                  <span className="text-sm text-slate-500">Webbank Nepal</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
