// src/app/learn-claude-urdu/page.tsx — "Claude seekhein, roz aik qadam".
//
// The free 30-day Urdu course for non-coders (added 2026-11-17): days 1-14
// teach Claude itself (chat, context window, projects, artifacts, connectors,
// skills, plugins, Cowork, schedule, Dispatch, Claude Code, which model when),
// days 15-30 show what to build with it (website, chatbot, agents, a sales
// system, SEO and GEO). It is the companion page to the daily social series
// and every part ends by pointing at /mastery, where the full build is taught.
//
// The page is Urdu and right-to-left by design. The body is authored HTML in
// ./content.ts and all styling is scoped under `.dsp-site .lcu` in
// ./learn-claude-urdu.css, so nothing here touches the company-page styles.
// Nastaliq is self-hosted through next/font like every other face on the
// site (no runtime Google Fonts request).
import type { Metadata } from 'next'
import { Noto_Nastaliq_Urdu } from 'next/font/google'
import SiteShell from '@/components/site/SiteShell'
import { COURSE_HTML } from './content'
import './learn-claude-urdu.css'

const PATH = '/learn-claude-urdu'
// The English edition of the same course (added 2026-11-20).
const ENGLISH_PATH = '/learn-claude'
const SEO_TITLE = 'Learn Claude in Urdu: 30-Day Course for Non-Coders | DSP'
const DESCRIPTION =
  'Learn Claude in Urdu, one step a day: a 30-day course for non-coders covering Claude chat, Cowork, Claude Code, which model to use, websites, AI agents, SEO and GEO.'
// Content-change date. The `guides` registry entry in src/config/site.ts
// must carry the same value (scripts/check-guide-dates.mjs).
const UPDATED = '2026-11-20'

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-nastaliq',
  display: 'swap',
  fallback: ['Noto Naskh Arabic', 'serif'],
  // Below-the-header text on one page only: no High-priority preload.
  preload: false,
})

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: ENGLISH_PATH, ur: PATH },
  },
  openGraph: {
    type: 'article',
    url: PATH,
    title: SEO_TITLE,
    description: DESCRIPTION,
    modifiedTime: UPDATED,
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

export default function LearnClaudeUrduPage() {
  return (
    <SiteShell>
      <div
        className={`lcu ${nastaliq.variable}`}
        lang="ur"
        dir="rtl"
        dangerouslySetInnerHTML={{ __html: COURSE_HTML }}
      />
    </SiteShell>
  )
}
