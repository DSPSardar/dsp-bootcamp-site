// src/app/academy/page.tsx — DSP Academy overview: two courses, one ladder.
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon } from '@/components/home/icons'
import { bootcamp, fde, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'DSP Academy — AI Agents Bootcamp & Forward Deployed Engineer Course' },
  description:
    'Two courses, one ladder: a 7-day Vibe Coding Bootcamp to build your first AI agent, and a 30-day Forward Deployed Engineer program to master the most in-demand AI role in the world.',
  alternates: { canonical: '/academy' },
  openGraph: {
    type: 'website',
    url: '/academy',
    title: 'DSP Academy — from first agent to Forward Deployed Engineer',
    description:
      '7 days to your first AI agent. 30 days to Forward Deployed Engineer. Live teaching, real projects, real deployment.',
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
            Two courses, one ladder. Start with 7 days to your first working agent. Climb to
            30 days and the most wanted AI engineering role in the world. Every class live,
            every project real — taught by the same team that builds agents for clients.
          </p>
          <div className="hero-ctas">
            <TrackedLink className="btn btn-primary" href={bootcamp.url} event="academy_cta_click" params={{ cta: 'academy_hero_bootcamp' }}>
              Start with the Bootcamp
            </TrackedLink>
            <TrackedLink className="btn btn-gold" href={fde.url} event="academy_cta_click" params={{ cta: 'academy_hero_fde' }}>
              Go straight to FDE
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ TWO COURSES ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The courses</p>
            <h2>Pick your entry point.</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <p className="kicker">Course 1 · start here</p>
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
              <p className="kicker">Course 2 · the flagship</p>
              <h3>{fde.name}</h3>
              <p>
                {fde.days} days, zero to master. Customer discovery, POC-to-production, AI systems
                architecture, and a live client capstone. Curriculum designed by engineers from
                Google and Facebook — the only program of its kind in Pakistan.
              </p>
              <ul className="check-list">
                <li><CheckIcon /> Only {fde.seats} seats per batch, personally reviewed</li>
                <li><CheckIcon /> Real client capstone + FDE interview prep</li>
                <li><CheckIcon /> Bootcamp graduates get {fde.alumniCreditDisplay} credit</li>
              </ul>
              <TrackedLink className="btn btn-gold" href={fde.url} event="academy_cta_click" params={{ cta: 'academy_card_fde' }}>
                Explore the FDE program
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON TABLE ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Compare</p>
            <h2>Side by side.</h2>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">Vibe Coding Bootcamp</th>
                  <th scope="col">FDE Program</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Length</td><td>{bootcamp.days} days</td><td>{fde.days} days</td></tr>
                <tr><td>Who it&apos;s for</td><td>Complete beginners — no coding</td><td>Ambitious builders going professional</td></tr>
                <tr><td>Outcome</td><td>Your first deployed AI agent</td><td>Job-ready Forward Deployed Engineer</td></tr>
                <tr><td>Format</td><td>5 live Zoom classes + build weekend</td><td>Daily live work, roleplays, client capstone</td></tr>
                <tr><td>Certificates</td><td>{bootcamp.certificates} — 3 Anthropic + 1 DSP</td><td>DSP FDE Certification</td></tr>
                <tr><td>Seats</td><td>{bootcamp.seats} per batch</td><td><span className="tick">Only {fde.seats} per batch</span></td></tr>
                <tr><td>Batches</td><td>{bootcamp.batchCadence}</td><td>{fde.batchCadence}</td></tr>
                <tr><td>Fee</td><td>{bootcamp.feeDisplay} one-time</td><td>{fde.feeDisplay} one-time · {fde.alumniCreditDisplay} alumni credit</td></tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1.6rem', color: 'var(--navy-soft)', fontSize: '.95rem' }}>
            Not sure which fits? <a href={waLink('Hi DSP, help me choose between the Bootcamp and the FDE program.')}>Ask us on WhatsApp</a>
            {' '}— we&apos;ll tell you honestly, even if the answer is &ldquo;start smaller.&rdquo;
          </p>
        </div>
      </section>

      {/* ============ LADDER ============ */}
      <section className="band-dark" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>7 days to your first agent. 30 days to FDE. Then real client work.</h2>
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
