// src/app/ai-employees/page.tsx — AI Employees hub (agency flagship page).
// Content per the agency copy doc; gated facts (Emma's phone line, Zara's
// ASOS demo number) come from src/config/site.ts and render placeholders
// until the publish checklist signs them off.
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import LiveDemoBlock from '@/components/site/LiveDemoBlock'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { agency, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'Hire AI Employees for Your Business | Sales, Support, Bookings & Orders — DSP' },
  description:
    'AI Employees that answer every lead, call, and booking 24/7 on WhatsApp and phone. Built on DSPAgentHub, live in 7 days. Talk to one right now.',
  alternates: { canonical: '/ai-employees' },
  openGraph: {
    type: 'website',
    url: '/ai-employees',
    title: 'Hire AI Employees for Your Business — DSP',
    description:
      'AI Employees that answer every lead, call, and booking 24/7 on WhatsApp and phone. Built on DSPAgentHub, live in 7 days.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'AI Employees', item: `${site.url}/ai-employees` },
  ],
}

const included = [
  { title: 'DSPAgentHub dashboard', detail: 'live pipeline, every conversation, every outcome' },
  { title: 'AI insights & sentiment analysis', detail: 'know how your customers feel, not just what they said' },
  { title: 'Escalation to your team', detail: 'instant handover with full context when needed' },
  { title: 'Weekly performance digest', detail: 'leads handled, hours saved, revenue attributed' },
  { title: 'Your own data, our own platform', detail: 'no third-party no-code subscriptions billing you forever' },
  { title: 'Ongoing supervision', detail: 'we monitor, tune, and improve your Employee every month' },
]

const comparison: Array<[string, string, string]> = [
  ['Working hours', '8 hours/day, 6 days', '24/7/365'],
  ['Response time', 'Minutes to hours', 'Seconds'],
  ['Handles at once', '1 conversation', 'Unlimited'],
  ['Monthly cost', 'Salary + training + turnover', 'From $199 flat'],
  ['Sick days / leave', 'Yes', 'Never'],
  ['Forgets your price list', 'Sometimes', 'Never'],
  ['Judgment on complex cases', '✔ Better', 'Escalates to your team'],
  ['Builds personal relationships', '✔ Better', 'Supports your team doing it'],
]

const faqs = [
  {
    q: 'Can one AI Employee do sales AND bookings AND support?',
    a: 'Yes — the AI Sales Team package puts multiple Employees on one number, each handling what they’re best at.',
  },
  {
    q: 'Does it work with my existing WhatsApp number?',
    a: 'Yes, via the official WhatsApp Business API. Your number, your brand, our AI.',
  },
  {
    q: 'What if my prices or menu change?',
    a: 'Tell us — or update it yourself in your dashboard. Your Employee knows the new information immediately.',
  },
  {
    q: 'Is my business data safe?',
    a: 'Your data lives in your own isolated tenant on DSPAgentHub with enterprise-grade access controls. It is never shared between clients.',
  },
]

export default function AiEmployeesPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ============ 1 · HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep">→</span>AI Employees
          </nav>
          <h1>Hire an AI Employee. <em>Never miss a customer again.</em></h1>
          <p className="sub">
            Trained AI staff for your business — answering, qualifying, booking, and selling on
            your WhatsApp and phone lines, 24 hours a day, in English and Urdu. Built, deployed,
            and supervised by DSP on our own platform.
          </p>
          <div className="hero-ctas">
            <TrackedLink
              className="btn btn-gold"
              href={waLink('Hi DSP, I’d like to talk to an AI Employee.')}
              event="whatsapp_cta_click"
              params={{ cta: 'aiemp_hero_talk' }}
            >
              <WhatsAppIcon /> Talk to an AI Employee Now
            </TrackedLink>
            <TrackedLink className="btn btn-ghost-light" href="/pricing" event="agents_cta_click" params={{ cta: 'aiemp_hero_pricing' }}>
              See Pricing
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ 2 · WHY AN AI EMPLOYEE ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">Not a chatbot</p>
            <h2>This is not a chatbot.</h2>
            <p>
              A chatbot follows a script and frustrates your customers. An AI Employee holds a
              real conversation, knows your full price list, follows your business rules,
              escalates to your team when it should, and reports its work on a live dashboard. It
              has a job description, a knowledge base, acceptance tests, and a supervisor.
              That&apos;s why we call them Employees.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 3 · THE TEAM ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The team</p>
            <h2>Choose your first hire.</h2>
          </div>
          <div className="grid-2">
            {agency.employees.map((emp) => (
              <div className="card emp-card" key={emp.id} id={emp.id}>
                <span className="emp-avatar" aria-hidden="true">{emp.name[0]}</span>
                <h3>{emp.name} — {emp.role}</h3>
                <blockquote>&ldquo;{emp.hubLine}&rdquo;</blockquote>
                <p className="best-for"><strong>Best for:</strong> {emp.bestFor}</p>
                {/* Individual profile pages (/ai-employees/zara/ …) come later —
                    until they exist this CTA goes to WhatsApp so it always works */}
                <TrackedLink
                  className="btn btn-ghost btn-sm"
                  href={waLink(`Hi DSP, I’d like to meet ${emp.name}, your ${emp.role}.`)}
                  event="whatsapp_cta_click"
                  params={{ cta: `aiemp_meet_${emp.id}` }}
                >
                  Meet {emp.name} →
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4 · LIVE DEMO (shared with homepage) ============ */}
      <LiveDemoBlock heading="Interview them yourself — right now." ctaLocation="aiemp" />

      {/* ============ 5 · AI EMPLOYEE vs HUMAN HIRE ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Comparison</p>
            <h2>The honest comparison.</h2>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Feature</span></th>
                  <th scope="col">Human staff member</th>
                  <th scope="col">DSP AI Employee</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, human, ai]) => (
                  <tr key={feature}>
                    <td style={{ fontWeight: 600 }}>{feature}</td>
                    <td>{human}</td>
                    <td>{ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.93rem', color: 'var(--navy-soft)', fontStyle: 'italic' }}>
            Note the last two rows — we&apos;re honest about them. Your AI Employee handles the
            volume so your human team handles the moments that matter. The winning setup is both.
          </p>
        </div>
      </section>

      {/* ============ 6 · WHAT EVERY AI EMPLOYEE INCLUDES ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Included</p>
            <h2>Every hire comes fully equipped.</h2>
          </div>
          <div className="grid-3">
            {included.map((item) => (
              <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }} key={item.title}>
                <h3 style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start', fontSize: '1.05rem' }}>
                  <CheckIcon /> {item.title}
                </h3>
                <p style={{ marginTop: '.4rem' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7 · PROCESS STRIP ============ */}
      <section>
        <div className="wrap">
          <div className="process-strip">
            <span className="step"><small>Day 1</small>Discover</span>
            <span className="arrow" aria-hidden="true">→</span>
            <span className="step"><small>Days 2–5</small>Build &amp; Test</span>
            <span className="arrow" aria-hidden="true">→</span>
            <span className="step"><small>Day 7</small>Live</span>
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '.95rem', color: 'var(--navy-soft)', fontStyle: 'italic' }}>
            One discovery call from you. Everything else from us.
          </p>
        </div>
      </section>

      {/* ============ 8 · FAQ ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">FAQ</p>
            <h2>Before you hire.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9 · FINAL CTA ============ */}
      <section className="band-dark">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Your first AI Employee can start Monday.</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink
              className="btn btn-gold"
              href={waLink('Hi DSP, I want to hire an AI Employee.')}
              event="whatsapp_cta_click"
              params={{ cta: 'aiemp_final' }}
            >
              <WhatsAppIcon /> WhatsApp Us: {site.whatsappDisplay}
            </TrackedLink>
            <TrackedLink className="btn btn-ghost-light" href="/pricing" event="agents_cta_click" params={{ cta: 'aiemp_final_pricing' }}>
              See Pricing →
            </TrackedLink>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
