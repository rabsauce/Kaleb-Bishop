import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Kaleb Bishop',
  description: 'Get in touch with Kaleb Bishop for booking inquiries, collaboration opportunities, or project discussions. Professional stunt performer and actor available for feature films, TV series, and commercials.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}