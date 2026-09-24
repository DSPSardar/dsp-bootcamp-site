// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import './tokens.css'
import './globals.css'
import Analytics from '@/components/site/Analytics'
import LauncherMount from '@/components/sardar/LauncherMount'

import { entityGraphLd } from '@/lib/schema'

// Blueprint §6: display serif on hero + H2 only, Inter for body/UI,
// JetBrains Mono for code — all self-hosted via next/font (no runtime
// Google Fonts @import anywhere).
//
// CLS pass 2026-09-15: next/font's size-adjusted fallback faces are
// `local(Arial)` / `local(Times New Roman)`, which do not exist on Linux
// (PageSpeed's runners) or Android — there the face errors, the page
// first paints in an unadjusted generic font, and the swap to the real
// font moved the hero panel (lab CLS 0.10). The `fallback` lists below
// chain to metric-matched faces declared in globals.css (Liberation /
// Arimo / Tinos / Roboto via local()) so the pre-swap layout already has
// the web font's metrics on every OS.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400', // the face's only weight — serif headings are 400 by design
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
  fallback: ['DSP Serif Fallback', 'Georgia', 'serif'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['DSP Sans Fallback', 'system-ui', 'Segoe UI', 'sans-serif'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  fallback: ['DSP Mono Fallback', 'ui-monospace', 'monospace'],
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

// Sitewide entity graph via the typed builders (src/lib/schema.ts): the
// Organization plus its founder and co-founder as Person nodes, linked by
// @id, on every page. Page-level schemas (Course, Product, Service,
// BlogPosting) live on their own pages and point at these ids.

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraphLd()) }}
        />
        {children}
        <Analytics />
        <LauncherMount />
      </body>
    </html>
  )
}
