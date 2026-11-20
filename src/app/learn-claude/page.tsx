// src/app/learn-claude/page.tsx — "Learn Claude, one step a day".
//
// The English edition of the free 30-day course for non-coders (added
// 2026-11-20). It is the same course as /learn-claude-urdu, lesson for
// lesson: days 1-14 teach Claude itself (chat, context window, projects,
// artifacts, connectors, skills, plugins, Cowork, schedule, Dispatch, Claude
// Code, which model when), days 15-30 show what to build with it (website,
// chatbot, agents, a sales system, SEO and GEO). Every part ends by pointing
// at /mastery, where the full build is taught.
//
// The body is authored HTML in ./content.ts and all styling is scoped under
// `.dsp-site .lce` in ./learn-claude.css, so nothing here touches the
// company-page styles. The two editions declare each other as hreflang
// alternates and link to each other from the hero.
import type { Metadata } from 'next'
import SiteShell from '@/components/site/SiteShell'
import { COURSE_HTML } from './content'
import './learn-claude.css'

const PATH = '/learn-claude'
const URDU_PATH = '/learn-claude-urdu'
const SEO_TITLE = 'Learn Claude: 30-Day Course for Non-Coders | DSP'
const DESCRIPTION =
  'Learn Claude one step a day: a 30-day course for non-coders covering Claude chat, Cowork, Claude Code, which model to use, websites, AI agents, SEO and GEO.'
// Content-change date. The `guides` registry entry in src/config/site.ts
// must carry the same value (scripts/check-guide-dates.mjs).
const UPDATED = '2026-11-20'

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: { en: PATH, ur: URDU_PATH },
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

export default function LearnClaudePage() {
  return (
    <SiteShell>
      <div className="lce" lang="en" dangerouslySetInnerHTML={{ __html: COURSE_HTML }} />
    </SiteShell>
  )
}
