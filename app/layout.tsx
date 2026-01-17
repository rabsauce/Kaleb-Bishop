import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Kaleb Bishop | Professional Stunt Performer & Actor | SAG-AFTRA',
  description: 'SAG-AFTRA certified professional stunt performer and actor. Known for The Six Triple Eight (2024), True Lies (2023), and Souls of Silence (2025). Specializing in stunt performance, stunt doubling, and location management.',
  keywords: ['stunt performer', 'stunt double', 'Hollywood stunts', 'SAG-AFTRA', 'film stunts', 'TV stunts', 'location management', 'Kaleb Bishop'],
  authors: [{ name: 'Kaleb Bishop' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: 'Kaleb Bishop | Professional Stunt Performer & Actor',
    description: 'SAG-AFTRA certified professional stunt performer and actor. Featured in The Six Triple Eight, True Lies, and Souls of Silence.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kaleb Bishop - Stunt Performer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaleb Bishop | Professional Stunt Performer & Actor',
    description: 'SAG-AFTRA certified professional stunt performer and actor. Featured in major Hollywood productions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}