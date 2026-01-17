'use client'

import { useState, FormEvent } from 'react'
import { Send, Mail, Phone, User, ExternalLink, Instagram, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', projectType: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 1000)

    // TODO: Replace with actual form submission
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            For booking inquiries, collaboration opportunities, or project discussions, please reach
            out via the form below or contact my agent directly.
          </p>
        </div>

        {/* Professional Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="relative w-full overflow-hidden rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.2)]">
            <img
              src="/images/suit.JPEG"
              alt="Kaleb Bishop - Professional Headshot"
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <h3 className="text-xl font-display font-bold mb-6 text-accent-blue">
                Contact Information
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="flex items-start gap-3 text-gray-300 hover:text-accent-blue transition-colors"
                >
                  <Mail className="w-5 h-5 mt-1 text-accent-blue" />
                  <span>{profile.contact.email}</span>
                </a>

                <div className="flex items-start gap-3 text-gray-300">
                  <Phone className="w-5 h-5 mt-1 text-accent-blue" />
                  <span>{profile.contact.phone}</span>
                </div>

                {profile.contact.agent && (
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-500 text-sm mb-2">Agent:</p>
                    <p className="text-white font-semibold mb-1">
                      {profile.contact.agent.name}
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                      {profile.contact.agent.company}
                    </p>
                    <a
                      href={`mailto:${profile.contact.agent.email}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-accent-blue transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{profile.contact.agent.email}</span>
                    </a>
                    <a
                      href={`tel:${profile.contact.agent.phone}`}
                      className="flex items-center gap-2 text-gray-300 hover:text-accent-blue transition-colors text-sm mt-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{profile.contact.agent.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6"
            >
              <h3 className="text-xl font-display font-bold mb-6 text-accent-blue">Connect</h3>
              <div className="space-y-3">
                {profile.contact.social.instagram && (
                  <a
                    href={profile.contact.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-accent-blue transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {profile.contact.social.imdb && (
                  <a
                    href={profile.contact.social.imdb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-accent-blue transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>IMDb</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {profile.contact.social.twitter && (
                  <a
                    href={profile.contact.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-accent-blue transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-gray-900 border border-gray-800 rounded-lg p-8"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:border-accent-blue transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:border-accent-blue transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-accent-blue transition-colors"
                  >
                    <option value="">Select project type</option>
                    <option value="feature">Feature Film</option>
                    <option value="tv">TV Series</option>
                    <option value="commercial">Commercial</option>
                    <option value="2nd-unit">2nd Unit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-accent-blue transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent. I&apos;ll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                    Something went wrong. Please try again or contact me directly via email.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-blue text-black font-bold py-3 px-6 rounded-lg hover:bg-accent-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  )
}