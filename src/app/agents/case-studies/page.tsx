// src/app/agents/case-studies/page.tsx — Problem → Architecture → Result.
import type { Metadata } from 'next'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { WhatsAppIcon } from '@/components/home/icons'
import { waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'Case Studies — AI Agent Deployments | DSP Agents' },
  description:
    'How DSP builds production AI agent systems: the RankPilot 7-agent SEO system and multi-tenant restaurant phone-agent deployments, told as Problem → Architecture → Result.',
  alternates: { canonical: '/agents/case-studies' },
  openGraph: {
    type: 'website',
    url: '/agents/case-studies',
    title: 'DSP Agents case studies — Problem → Architecture → Result',
    description: 'Real agent systems in production: RankPilot 7-agent SEO and restaurant phone AI.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

type CaseStudy = {
  id: string
  kicker: string
  title: string
  problem: string
  architecture: string[]
  result: string
}

const CASES: CaseStudy[] = [
  {
    id: 'rankpilot',
    kicker: 'Multi-agent system · SEO',
    title: 'RankPilot — a 7-agent SEO system',
    problem:
      'SEO content production is a pipeline problem: keyword research, competitor analysis, briefs, drafts, on-page optimisation, internal linking, and QA — each step a different skill, each handoff a place where quality dies. Done by hand it is slow; done by one generic AI prompt it is mediocre.',
    architecture: [
      'Seven specialised agents, one per pipeline stage — researcher, competitor analyst, brief writer, drafter, on-page optimiser, internal-linker, and QA reviewer.',
      'An orchestrator routes work between them and enforces stage gates: no draft starts without an approved brief, nothing ships without passing QA rules.',
      'Each agent has its own job description, tools, and knowledge — the QA agent literally holds the style guide and checks the others\' work against it.',
    ],
    result:
      'A content pipeline that runs end-to-end with human review at the gates instead of human labour at every stage — consistent briefs, consistent drafts, and QA that never gets tired. The same architecture pattern now powers our client agent-team builds.',
  },
  {
    id: 'restaurant',
    kicker: 'Voice agent · US restaurants',
    title: 'Restaurant phone-ordering agent, multi-tenant',
    problem:
      'US restaurants lose orders every day to unanswered phones — the rush hour that fills the dining room is the same hour the phone gets dropped. Hiring for the phone is expensive; missing the call is worse. And every restaurant that wants an AI answer can\'t wait months for a custom build.',
    architecture: [
      'A single multi-tenant voice-agent platform: each restaurant is configuration — menu, prices, hours, specials — not a new codebase.',
      'The agent answers on the first ring, takes the order conversationally, handles menu questions, and confirms the order back to the caller.',
      'Completed orders are delivered to the restaurant by text and email the moment the call ends; guardrails keep the agent inside its menu and policies.',
    ],
    result:
      'Restaurants go live in days, not months. Every call answered, every order captured, no hold music — and one platform serves them all, which is what keeps the price at a monthly subscription instead of a custom-software invoice.',
  },
]

export default function CaseStudiesPage() {
  return (
    <SiteShell>
      {/* ============ HERO ============ */}
      <section className="hero-dark" style={{ paddingBottom: 56 }}>
        <div className="wrap">
          <p className="eyebrow">Case studies</p>
          <h1>Problem. Architecture. <em>Result.</em></h1>
          <p className="sub">
            How we actually build agent systems — told the way an engineer would tell it,
            not the way a brochure would.
          </p>
        </div>
      </section>

      {/* ============ CASES ============ */}
      {CASES.map((c, i) => (
        <section key={c.id} id={c.id} className={i % 2 === 1 ? 'band-dark' : undefined}>
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">{c.kicker}</p>
              <h2>{c.title}</h2>
            </div>
            <div className="grid-3" style={{ alignItems: 'stretch' }}>
              <div className={i % 2 === 1 ? 'card dark' : 'card'} style={i % 2 === 1 ? { background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' } : undefined}>
                <p className="kicker">Problem</p>
                <p>{c.problem}</p>
              </div>
              <div className={i % 2 === 1 ? 'card dark' : 'card'} style={i % 2 === 1 ? { background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' } : undefined}>
                <p className="kicker">Architecture</p>
                {c.architecture.map((a, j) => (
                  <p key={j} style={{ marginBottom: '.7rem' }}>{a}</p>
                ))}
              </div>
              <div className="card dark" style={i % 2 === 1 ? undefined : undefined}>
                <p className="kicker">Result</p>
                <p>{c.result}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============ CTA ============ */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Your workflow could be the next one on this page.</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink
              className="btn btn-primary"
              href={waLink('Hi DSP, I read your case studies and want to discuss a project.')}
              event="agents_cta_click"
              params={{ cta: 'cases_footer_hire' }}
            >
              <WhatsAppIcon /> Talk to us about your project
            </TrackedLink>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
