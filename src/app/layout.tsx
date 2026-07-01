// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

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
  alternates: { canonical: './' }, // self-referencing on every route
  title: {
    default: 'AI Agents Bootcamp — 7 Days, 5 Live Zoom Classes, PKR 10,000 | DSP',
    template: '%s | DSP',
  },
  description:
    'Build and deploy your first AI agent in 7 days — no code. 5 live Zoom classes (9–10 PM PKT), 4 certificates. PKR 10,000, everything included.',
  openGraph: {
    siteName: 'Digital Services Program',
    type: 'website',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        {children}
      </body>
    </html>
  )
}
