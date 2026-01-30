import { motion } from 'framer-motion'
import { usePortfolioStore } from '../store/index'

export default function AchievementsSection() {
  const achievements = usePortfolioStore((state) => state.achievements)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  if (!achievements || achievements.length === 0) return null

  const featured = achievements.filter((a) => a.featured)
  const regular = achievements.filter((a) => !a.featured)

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Achievements & Badges</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Milestones and accomplishments</p>
          </motion.div>

          {/* Featured Achievements */}
          {featured.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Featured</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    variants={itemVariants}
                    className="glassmorphism rounded-lg p-6 hover-glow transition-all duration-300 flex flex-col items-center text-center"
                  >
                    {achievement.badgeImage && (
                      <img
                        src={achievement.badgeImage}
                        alt={achievement.title}
                        className="w-20 h-20 mb-4 rounded-full object-cover"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">{achievement.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      {new Date(achievement.achievedDate).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Achievements */}
          {regular.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Other Achievements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {regular.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    variants={itemVariants}
                    className="glassmorphism rounded-lg p-6 hover-glow transition-all duration-300 flex items-center gap-4"
                  >
                    {achievement.badgeImage && (
                      <img
                        src={achievement.badgeImage}
                        alt={achievement.title}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div>
                      <h4 className="font-bold">{achievement.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
