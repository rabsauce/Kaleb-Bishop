'use client'

import { useState, useMemo } from 'react'
import { Credit, getUniqueYears, getUniqueTypes } from '@/data/credits'
import { Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CreditsTable({ credits }: { credits: Credit[] }) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const years = getUniqueYears()
  const types = getUniqueTypes()
  const roles = [...new Set(credits.map((c) => c.role))]

  const filteredCredits = useMemo(() => {
    return credits.filter((credit) => {
      if (selectedYear && credit.year !== selectedYear) return false
      if (selectedType && credit.type !== selectedType) return false
      if (selectedRole && credit.role !== selectedRole) return false
      return true
    })
  }, [credits, selectedYear, selectedType, selectedRole])

  const clearFilters = () => {
    setSelectedYear(null)
    setSelectedType(null)
    setSelectedRole(null)
  }

  const hasActiveFilters = selectedYear !== null || selectedType !== null || selectedRole !== null

  // Separate highlighted credits for featured section
  const highlightedCredits = filteredCredits.filter((c) => c.highlight)
  // All credits (including featured) for the main table
  const allCredits = filteredCredits

  // Group credits by category
  const stuntRoles = ['Stunt Performer', 'Stunt Double', 'Stunt Coordinator', 'Stunt Driver', 'Specialty Stunt', 'Stunt Previs', 'Utility Stunts']
  const stuntsCredits = allCredits.filter((c) => {
    const role = c.role as string
    return stuntRoles.some((sr) => role.startsWith(sr) || role.includes(sr))
  })
  const locationCredits = allCredits.filter((c) => {
    const role = c.role as string
    return role === 'Location Management' || role === 'Location Manager' || role === 'Assistant Location Manager'
  })
  const actorCredits = allCredits.filter((c) => c.role === 'Actor')

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <Filter className="w-5 h-5 text-accent-blue" />
        
        <select
          value={selectedYear || ''}
          onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
          className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-accent-blue"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedType || ''}
          onChange={(e) => setSelectedType(e.target.value || null)}
          className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-accent-blue"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={selectedRole || ''}
          onChange={(e) => setSelectedRole(e.target.value || null)}
          className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-accent-blue"
        >
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-gray-400 hover:text-accent-blue transition-colors text-sm"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}

        <div className="ml-auto text-gray-400 text-sm">
          Showing {filteredCredits.length} of {credits.length} credits
        </div>
      </div>

      {/* Highlighted Credits */}
      {highlightedCredits.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-display font-bold mb-3 text-accent-blue">Featured Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[85%] mx-auto">
            {highlightedCredits.map((credit, index) => (
              <motion.div
                key={`${credit.year}-${credit.project}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-accent-blue/50 rounded-lg overflow-hidden hover:border-accent-blue transition-colors hover:scale-105 transition-transform duration-200 flex flex-col h-full"
              >
                {credit.image && (
                  <div className="relative w-full bg-black overflow-hidden h-[380px]">
                    <img
                      src={credit.image}
                      alt={credit.project}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-accent-blue font-bold text-sm">{credit.year}</span>
                    <span className="text-[10px] bg-accent-blue/20 text-accent-blue px-1 py-0.5 rounded">
                      {credit.type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1 leading-tight">{credit.project}</h4>
                  <p className="text-accent-blue text-xs mb-1.5">{credit.role}</p>
                  {credit.coordinator && (
                    <div className="space-y-0.5 mb-1.5">
                      <p className="text-gray-400 text-[10px] leading-tight">Coord: {credit.coordinator}</p>
                    </div>
                  )}
                  {credit.notes && (
                    <p className="text-gray-300 text-[10px] mt-1.5 border-t border-gray-800 pt-1.5 leading-tight">
                      {credit.notes}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Credits - Separated by Category */}
      <div className="space-y-12">
        {/* Stunts Section */}
        {stuntsCredits.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-6 text-white border-b border-accent-blue/30 pb-3">
              Stunts
            </h3>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Year</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Project</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Role</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Coordinator</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {stuntsCredits.map((credit, index) => (
                      <motion.tr
                        key={`${credit.year}-${credit.project}-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-accent-blue font-bold">{credit.year}</td>
                        <td className="py-4 px-4 text-white font-semibold">{credit.project}</td>
                        <td className="py-4 px-4 text-gray-300">{credit.role}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {credit.coordinator || '-'}
                        </td>
                        <td className="py-4 px-4 text-gray-300 text-sm">{credit.notes || '-'}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              <AnimatePresence>
                {stuntsCredits.map((credit, index) => (
                  <motion.div
                    key={`${credit.year}-${credit.project}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-accent-blue font-bold text-lg">{credit.year}</span>
                      <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded">
                        {credit.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{credit.project}</h4>
                    <p className="text-accent-blue mb-2">{credit.role}</p>
                    {credit.coordinator && (
                      <p className="text-gray-400 text-sm mb-1">
                        Coordinator: {credit.coordinator}
                      </p>
                    )}
                    {credit.notes && (
                      <p className="text-gray-300 text-sm mt-3 border-t border-gray-800 pt-3">
                        {credit.notes}
                      </p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Location Management Section */}
        {locationCredits.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-6 text-white border-b border-accent-blue/30 pb-3">
              Location Management
            </h3>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Year</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Project</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Role</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Location Manager</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {locationCredits.map((credit, index) => (
                      <motion.tr
                        key={`${credit.year}-${credit.project}-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-accent-blue font-bold">{credit.year}</td>
                        <td className="py-4 px-4 text-white font-semibold">{credit.project}</td>
                        <td className="py-4 px-4 text-gray-300">{credit.role}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {credit.coordinator || '-'}
                        </td>
                        <td className="py-4 px-4 text-gray-300 text-sm">{credit.notes || '-'}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              <AnimatePresence>
                {locationCredits.map((credit, index) => (
                  <motion.div
                    key={`${credit.year}-${credit.project}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-accent-blue font-bold text-lg">{credit.year}</span>
                      <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded">
                        {credit.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{credit.project}</h4>
                    <p className="text-accent-blue mb-2">{credit.role}</p>
                    {credit.coordinator && (
                      <p className="text-gray-400 text-sm mb-1">
                        Location Manager: {credit.coordinator}
                      </p>
                    )}
                    {credit.notes && (
                      <p className="text-gray-300 text-sm mt-3 border-t border-gray-800 pt-3">
                        {credit.notes}
                      </p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Actor Section */}
        {actorCredits.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-6 text-white border-b border-accent-blue/30 pb-3">
              Actor
            </h3>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Year</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Project</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Role</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Coordinator</th>
                    <th className="text-left py-4 px-4 text-accent-blue font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {actorCredits.map((credit, index) => (
                      <motion.tr
                        key={`${credit.year}-${credit.project}-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors"
                      >
                        <td className="py-4 px-4 text-accent-blue font-bold">{credit.year}</td>
                        <td className="py-4 px-4 text-white font-semibold">{credit.project}</td>
                        <td className="py-4 px-4 text-gray-300">{credit.role}</td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {credit.coordinator || '-'}
                        </td>
                        <td className="py-4 px-4 text-gray-300 text-sm">{credit.notes || '-'}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              <AnimatePresence>
                {actorCredits.map((credit, index) => (
                  <motion.div
                    key={`${credit.year}-${credit.project}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-accent-blue font-bold text-lg">{credit.year}</span>
                      <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded">
                        {credit.type}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{credit.project}</h4>
                    <p className="text-accent-blue mb-2">{credit.role}</p>
                    {credit.coordinator && (
                      <p className="text-gray-400 text-sm mb-1">
                        Coordinator: {credit.coordinator}
                      </p>
                    )}
                    {credit.notes && (
                      <p className="text-gray-300 text-sm mt-3 border-t border-gray-800 pt-3">
                        {credit.notes}
                      </p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {filteredCredits.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No credits match the selected filters.
        </div>
      )}
    </div>
  )
}