import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight } from 'react-icons/fi'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
      </div>

      <motion.div
        className="container mx-auto px-4 max-w-4xl text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg md:text-xl font-semibold text-sky-500 mb-4 tracking-wider">
            Hey, I'm
          </h2>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Darsan Khanal</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Full-Stack Developer
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Building scalable, high-performance web & mobile applications with modern technologies.
          Passionate about creating beautiful user experiences and robust backends.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto mb-12"
        >
          <div className="glassmorphism p-4 rounded-lg">
            <p className="text-3xl font-bold gradient-text">5+</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
          </div>
          <div className="glassmorphism p-4 rounded-lg">
            <p className="text-3xl font-bold gradient-text">2+</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Years</p>
          </div>
          <div className="glassmorphism p-4 rounded-lg">
            <p className="text-3xl font-bold gradient-text">10+</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Tech Stack</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button className="btn-primary group">
            View Projects
            <FiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="btn-outline group">
            <FiDownload className="inline-block mr-2" />
            Download CV
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            Scroll to explore
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
