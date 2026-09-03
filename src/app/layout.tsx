// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './tokens.css'
import './globals.css'
import Analytics from '@/components/site/Analytics'

import { organizationLd } from '@/lib/schema'

// Blueprint §6: display serif on hero + H2 only, Inter for body/UI,
// JetBrains Mono for code — all self-hosted via next/font (no runtime
// Google Fonts @import anywhere).
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400', // the face's only weight — serif headings are 400 by design
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  // Small labels only, never the LCP text: don't spend a High-priority
  // preload on it during the critical path (perf pass 2026-09-03).
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.digitalservicesprogram.com'),
  alternates: { canonical: './' }, // self-referencing on every route
  title: {
    default: 'Digital Services Program — We Build AI Agents. We Train You to Build Them.',
    template: '%s | DSP',
  },
  description:
    'DSP builds AI Employees for businesses worldwide — AI agents that handle sales, support, bookings, and phone orders — and teaches you to build them through DSP AI Agent Mastery, a self-paced program.',
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

// Sitewide Organization schema via the typed builder (src/lib/schema.ts) —
// page-level schemas (Course, Product, Service, Person) live on their own pages.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <script
          id="auth-fragment-forward"
          dangerouslySetInnerHTML={{
            __html:
              "if(location.hash.indexOf('access_token=')>-1||location.hash.indexOf('error_code=')>-1){if(location.pathname!=='/auth/confirm'){location.replace('/auth/confirm'+location.search+location.hash)}}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
