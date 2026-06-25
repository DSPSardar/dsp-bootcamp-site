// src/app/layout.tsx
import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digitalservicesprogram.com'),
  title: 'AI Agents Bootcamp — Learn AI Agents in 15 Days | DSP',
  description:
    'AI Agents Bootcamp by DSP — 15 days, live Zoom, beginner friendly. Earn 3 Claude/Anthropic certificates + 1 DSP certificate. No coding needed.',
  alternates: {
    canonical: 'https://www.digitalservicesprogram.com/',
  },
  openGraph: {
    title: 'AI Agents Bootcamp — Build Real-World AI in 15 Days | DSP',
    description:
      'Live Zoom bootcamp for beginners. Build real-world AI agents in 15 days. 4 certificates.',
    url: 'https://www.digitalservicesprogram.com/',
    type: 'website',
    images: [
      {
        url: '/logo.webp',
        width: 1200,
        height: 630,
        alt: 'DSP AI Agents Bootcamp — 15-Day Live Program',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agents Bootcamp — Learn AI Agents in 15 Days | DSP',
    description:
      'Build real-world AI agents in 15 days. Live Zoom, beginner friendly, 4 certificates.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      >
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
