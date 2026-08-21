// src/app/academy/page.tsx — DSP Academy overview.
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon } from '@/components/home/icons'
import { bootcamp, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'DSP Academy — AI Agents Bootcamp' },
  description:
    'DSP Academy trains you to build AI agents: a 7-day Vibe Coding Bootcamp with five live Zoom classes that takes you from complete beginner to a deployed AI agent with a live URL.',
  alternates: { canonical: '/academy' },
  openGraph: {
    type: 'website',
    url: '/academy',
    title: 'DSP Academy — build your first AI agent in 7 days',
    description:
      '7 days to your first AI agent. Live teaching, real projects, real deployment.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

export default function AcademyPage() {
  return (
    <SiteShell>
      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <p className="eyebrow">DSP Academy</p>
          <h1>We train the world to <em>build AI agents</em>.</h1>
          <p className="sub">
            Start with 7 days to your first working agent. Every class live, every project
            real — taught by the same team that builds agents for clients.
          </p>
          <div className="hero-ctas">
            <TrackedLink className="btn btn-primary" href={bootcamp.url} event="academy_cta_click" params={{ cta: 'academy_hero_bootcamp' }}>
              Start with the Bootcamp
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ THE COURSES ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The courses</p>
            <h2>Start here.</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <p className="kicker">Featured course</p>
              <h3>{bootcamp.name}</h3>
              <p>
                {bootcamp.days} days, no coding required. Five live Zoom classes, {bootcamp.schedule}.
                You plan, build, and deploy a working AI agent — and present it live on Day 7.
              </p>
              <ul className="check-list">
                <li><CheckIcon /> {bootcamp.certificates} certificates — 3 Anthropic + 1 DSP</li>
                <li><CheckIcon /> {bootcamp.batchCadence} · {bootcamp.seats} seats</li>
                <li><CheckIcon /> Day-1 money-back guarantee</li>
              </ul>
              <TrackedLink className="btn btn-primary" href={bootcamp.url} event="academy_cta_click" params={{ cta: 'academy_card_bootcamp' }}>
                See the 7-day bootcamp
              </TrackedLink>
            </div>
            <div className="card dark">
              <p className="kicker">Coming soon</p>
              <h3>ChannelOps</h3>
              <p>
                Fix a YouTube channel with five AI agents — learn to build the system in one
                week, or have us run it for you.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <Link href="/channelops" style={{ color: 'var(--gold)', fontWeight: 600 }}>See ChannelOps →</Link>
              </p>
              <p style={{ marginTop: '1rem', fontSize: '.95rem' }}>
                Not sure where to start? <a href={waLink('Hi DSP, is the Vibe Coding Bootcamp right for me?')} style={{ color: 'var(--gold)' }}>Ask us on WhatsApp</a>
                {' '}— we&apos;ll tell you honestly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LADDER ============ */}
      <section className="band-dark" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>7 days to your first agent. Then real client work.</h2>
          <p style={{ maxWidth: '38rem', margin: '.8rem auto 0' }}>
            Top graduates step onto live DSP Agents client projects — the training division and
            the software division are the same company. That&apos;s the ladder.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-primary" href={bootcamp.url}>Start climbing</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
