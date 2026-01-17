'use client'

import { motion } from 'framer-motion'
import { skills, certifications, martialArtsStyles } from '@/data/profile'
import { Award, Shield } from 'lucide-react'

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white text-center">
            Skills & Specialties
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Trained in a comprehensive range of stunt disciplines, with expertise in high-impact
            action sequences and precision work.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 border border-gray-800 px-6 py-3 rounded-full text-white hover:border-accent-blue hover:bg-gray-800 transition-all cursor-default"
              >
                {skill.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Martial Arts Styles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white text-center">
            Martial Arts Training
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {martialArtsStyles.map((style, index) => (
              <motion.div
                key={style}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 border border-gray-800 px-6 py-3 rounded-full text-white hover:border-accent-blue hover:bg-gray-800 transition-all cursor-default"
              >
                {style}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Training & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-accent-blue" />
              <h3 className="text-2xl font-display font-bold text-white">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <motion.li
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="text-accent-blue mt-1">•</span>
                  <span>{cert}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-accent-blue" />
              <h3 className="text-2xl font-display font-bold text-white">Safety & Training</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-accent-blue mt-1">•</span>
                <span>8+ years of professional stunt experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue mt-1">•</span>
                <span>Continuous training in latest safety protocols</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue mt-1">•</span>
                <span>Regular certification renewals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue mt-1">•</span>
                <span>Zero safety incidents on set</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-blue mt-1">•</span>
                <span>Industry-leading precision and reliability</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}