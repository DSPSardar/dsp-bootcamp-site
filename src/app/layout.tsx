// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/site/Analytics'
import { site, socials } from '@/config/site'

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
    default: 'Digital Services Program — We Build AI Agents. We Train You to Build Them.',
    template: '%s | DSP',
  },
  description:
    'AI agent development company and academy. We build production AI agents for clients worldwide, and train you to build them — from a 7-day bootcamp to a 30-day Forward Deployed Engineer program.',
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

// Sitewide Organization schema — page-level schemas (Course, Product, Service,
// Person) live on their own pages.
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/logo.webp`,
  email: site.email,
  telephone: '+92-342-0580864',
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'PK' },
  sameAs: Object.values(socials),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
