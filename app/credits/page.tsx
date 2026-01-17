import { Metadata } from 'next'
import CreditsTable from '@/components/CreditsTable'
import { credits } from '@/data/credits'

export const metadata: Metadata = {
  title: 'Credits & Filmography | Kaleb Bishop',
  description: 'Filmography of Kaleb Bishop, professional stunt performer and actor. Credits include The Six Triple Eight (2024), True Lies (2023), Souls of Silence (2025), and more major Hollywood productions.',
}

export default function CreditsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-3 text-white">
            Credits & Filmography
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive list of film and television credits, featuring work as a stunt
            performer, stunt double, stunt previs, actor, and location manager across major studio
            productions, independent films, and streaming series.
          </p>
        </div>

        {/* Credits Table */}
        <CreditsTable credits={credits} />
      </div>
    </div>
  )
}