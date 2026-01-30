import { motion } from 'framer-motion'
import { usePortfolioStore } from '../store/index'

export default function CertificatesSection() {
  const certificates = usePortfolioStore((state) => state.certificates)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  if (!certificates || certificates.length === 0) return null

  return (
    <section id="certificates" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Professional certifications and credentials</p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="glassmorphism rounded-lg overflow-hidden hover-glow transition-all duration-300"
              >
                {cert.imagePath && (
                  <img
                    src={cert.imagePath}
                    alt={cert.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">{cert.issuer}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
                    Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      View Credential →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
