import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | Kaleb Bishop',
  description: 'Professional headshots, action shots, and behind-the-scenes images from film and television productions.',
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}