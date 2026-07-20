// src/app/agents/page.tsx — DSP Agents: the software division.
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'AI Agent Development Company — DSP Agents' },
  description:
    'DSP Agents builds production AI agents for clients worldwide: an AI phone-ordering agent for US restaurants, multi-agent SEO systems, and custom agent deployments. Scoped, shipped, supported.',
  alternates: { canonical: '/agents' },
  openGraph: {
    type: 'website',
    url: '/agents',
    title: 'DSP Agents — we build AI agents for the world',
    description:
      'Production AI agents, built and deployed for real businesses. Flagship: AI phone ordering for US restaurants.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI agent development',
  name: 'DSP Agents — AI agent development',
  description:
    'Design, development, and deployment of production AI agents: phone-ordering agents for restaurants, multi-agent SEO systems, and custom agent builds for businesses worldwide.',
  provider: {
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: '+92-342-0580864',
  },
  areaServed: 'Worldwide',
}

export default function AgentsPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <p className="eyebrow">DSP Agents</p>
          <h1>We build AI agents <em>for the world</em>.</h1>
          <p className="sub">
            Not demos. Not decks. Deployed agents doing real work inside real businesses —
            answering phones, qualifying leads, running SEO pipelines. Scoped honestly, shipped
            fast, supported after launch.
          </p>
          <div className="hero-ctas">
            <TrackedLink
              className="btn btn-gold"
              href={waLink('Hi DSP, I want to talk about building an AI agent for my business.')}
              event="agents_cta_click"
              params={{ cta: 'agents_hero_hire' }}
            >
              <WhatsAppIcon /> Hire us to build
            </TrackedLink>
            <TrackedLink className="btn btn-ghost-light" href="/agents/case-studies" event="agents_cta_click" params={{ cta: 'agents_hero_cases' }}>
              See our work
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE BUILD ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">What we build</p>
            <h2>Agents that earn their keep.</h2>
          </div>
          <div className="grid-3">
            <div className="card dark">
              <p className="kicker">Flagship product</p>
              <h3>Restaurant phone-ordering AI</h3>
              <p>A multi-tenant agent answering every call to US restaurants — full menu knowledge, order capture, kitchen handoff. Live in days, not months.</p>
              <p style={{ marginTop: '1rem' }}>
                <Link href="/agents/restaurant-ai" style={{ color: 'var(--gold)', fontWeight: 600 }}>See the product →</Link>
              </p>
            </div>
            <div className="card">
              <p className="kicker">Multi-agent systems</p>
              <h3>Agent teams for real workflows</h3>
              <p>Orchestrated fleets — like RankPilot, our 7-agent SEO system — where specialised agents research, write, review, and ship together.</p>
            </div>
            <div className="card">
              <p className="kicker">Custom builds</p>
              <h3>Your workflow, agentified</h3>
              <p>Lead qualification, customer intake, internal ops. If a process runs on conversations and rules, we can usually put an agent on it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">How we work</p>
            <h2>The FDE method — because we teach it.</h2>
            <p>
              Our academy trains Forward Deployed Engineers. Our software division works the same
              way: discovery first, then POC → pilot → production, with guardrails and evals
              before launch — never a black box.
            </p>
          </div>
          <ul className="check-list" style={{ maxWidth: '38rem' }}>
            <li><CheckIcon /> Scoping call before any commitment — we&apos;ll tell you if an agent is the wrong tool</li>
            <li><CheckIcon /> Working proof of concept before you pay for production</li>
            <li><CheckIcon /> Security guardrails and testing built in, not bolted on</li>
            <li><CheckIcon /> Post-launch support from the team that built it</li>
          </ul>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Tell us the problem. We&apos;ll tell you if an agent solves it.</h2>
          <p style={{ maxWidth: '34rem', margin: '.8rem auto 0', color: 'var(--navy-soft)' }}>
            First conversation is free and honest. Bring the workflow that&apos;s eating your team&apos;s time.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink
              className="btn btn-primary"
              href={waLink('Hi DSP, I want to discuss an AI agent project.')}
              event="agents_cta_click"
              params={{ cta: 'agents_footer_hire' }}
            >
              <WhatsAppIcon /> Start the conversation
            </TrackedLink>
            <Link className="btn btn-ghost" href="/agents/case-studies">Read the case studies</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
