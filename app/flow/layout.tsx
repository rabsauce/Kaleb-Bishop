import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flow Arts | Kaleb Bishop',
  description: 'Fire and LED flow arts performer specializing in Poi and Dragonstaff. Available for music festivals, private events, and corporate entertainment. Watch the flow reel and book a performance.',
}

export default function FlowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}