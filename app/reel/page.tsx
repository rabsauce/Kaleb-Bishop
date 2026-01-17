import { Metadata } from 'next'
import ReelEmbed from '@/components/ReelEmbed'
import { profile } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Stunt Reel | Kaleb Bishop',
  description: 'Watch the professional stunt reel of Kaleb Bishop, featuring work from The Six Triple Eight, True Lies, Souls of Silence, and more major Hollywood productions.',
  openGraph: {
    title: 'Kaleb Bishop | Professional Stunt Reel',
    description: 'Watch the stunt reel featuring high-impact sequences from major Hollywood productions.',
    type: 'website',
  },
}

export default function ReelPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
            Stunt Reel
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A compilation of high-impact stunt sequences from major film and television productions.
            Featuring precision driving, high falls, fire burns, wire work, and complex fight
            choreography.
          </p>
        </div>

        {/* Reel Embed */}
        <ReelEmbed />

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            For booking inquiries, please{' '}
            <a href="/contact" className="text-accent-blue hover:text-accent-blue-dark underline">
              contact me
            </a>{' '}
            or reach out to my agent.
          </p>
        </div>
      </div>
    </div>
  )
}