// src/app/page.tsx — two-door company homepage (agency + Agentic Lab).
// 13 sections in locked order per the homepage copy doc. H1, title, and
// meta tags are frozen — agency content is added around them.
// The bootcamp landing page lives on at /academy/bootcamp.
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import LiveDemoBlock from '@/components/site/LiveDemoBlock'
import ProofCounters from '@/components/site/ProofCounters'
import { WhatsAppIcon } from '@/components/home/icons'
import { agency, bootcamp, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'Digital Services Program — We Build AI Agents. We Train You to Build Them.' },
  description:
    'DSP is an AI agent development company and academy. We build production AI agents for clients worldwide — and train you to build them, starting with a 7-day bootcamp.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Digital Services Program — We Build AI Agents. We Train You to Build Them.',
    description:
      'AI agents built for the world. Training that takes you from beginner to deployed agent builder.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSP — We Build AI Agents. We Train You to Build Them.',
    description:
      'AI agent development company + academy. 7 days to your first deployed AI agent.',
    images: ['/og-card.png'],
  },
}

const faqs = [
  {
    q: 'What exactly is an AI Employee?',
    a: 'A trained AI agent that handles one job in your business — sales, support, bookings, or phone orders — on your own WhatsApp number or phone line, 24 hours a day.',
  },
  {
    q: 'Which languages does it speak?',
    a: 'English and Urdu out of the box, including Roman Urdu — and it matches whatever language your customer writes in.',
  },
  {
    q: 'What happens when it gets confused?',
    a: 'It escalates to your team instantly with the full conversation attached. It never guesses about prices, refunds, or commitments.',
  },
  {
    q: 'How long until it’s working?',
    a: '7 days from your discovery call to going live. That’s a commitment, not an estimate.',
  },
  {
    q: 'What do I need to provide?',
    a: 'One discovery call and your business information — menu, price list, FAQs. We handle everything else.',
  },
  {
    q: 'Am I locked into a contract?',
    a: 'No. Monthly billing, cancel anytime. The setup fee covers your build; the monthly fee keeps your Employee working, monitored, and improving.',
  },
]

export default function HomePage() {
  return (
    <SiteShell>
      {/* ============ 1 · HERO — two doors ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <span className="hero-pill"><span className="dot" aria-hidden="true"></span> Software division + Academy · {site.city}, {site.country} · clients worldwide</span>
          <h1>We build AI agents. <em>We train you to build them.</em></h1>
          <p className="sub">
            Digital Services Program builds AI Employees for businesses on our own platform,
            DSPAgentHub — and trains the next generation of AI agent builders every week in the
            DSP Agentic Lab.
          </p>
          <div className="door-grid">
            <div className="door">
              <span className="door-emoji" aria-hidden="true">🤝</span>
              <h2>Hire an AI Employee</h2>
              <p>
                Your business never misses a lead, a call, or a booking again. Sales, support,
                bookings, and phone orders — handled by AI, live in 7 days.
              </p>
              <TrackedLink className="btn btn-gold" href="/ai-employees" event="agents_cta_click" params={{ cta: 'home_door_employees' }}>
                Meet the AI Employees →
              </TrackedLink>
            </div>
            <div className="door">
              <span className="door-emoji" aria-hidden="true">🎓</span>
              <h2>Join the DSP Agentic Lab</h2>
              {/* Fee deliberately absent — locked fact: PKR fee appears only in pricing sections */}
              <p>
                Learn to build AI agents in our 7-day live bootcamp. {bootcamp.certificates} certificates
                (3 Anthropic + 1 DSP). {bootcamp.batchCadence}.
              </p>
              <TrackedLink className="btn btn-navy" href={bootcamp.url} event="academy_cta_click" params={{ cta: 'home_door_lab' }}>
                Enter the Agentic Lab →
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2 · FOUNDER AUTHORITY BAR ============ */}
      <div className="authority-bar" aria-label="Founder credentials">
        <div className="wrap">
          <ul>
            {agency.founderBar.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ============ 3 · PROBLEM STRIP ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">The problem</p>
            <h2>Every unanswered message is money walking out the door.</h2>
            <p>
              Most businesses miss more than half their inbound calls and messages — at night,
              during rush hours, on weekends, on holidays. Each one is a customer who called your
              competitor next. You don&apos;t have a marketing problem. You have an answering
              problem. AI Employees fix it permanently.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 4 · MEET YOUR AI EMPLOYEES ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">AI Employees</p>
            <h2>Meet the team that never sleeps.</h2>
          </div>
          <div className="grid-4">
            {agency.employees.map((emp) => (
              <div className="card emp-card" key={emp.id}>
                <span className="emp-avatar" aria-hidden="true">{emp.name[0]}</span>
                <h3>{emp.name}</h3>
                <p className="role">{emp.role}</p>
                <blockquote>&ldquo;{emp.homeLine}&rdquo;</blockquote>
                <TrackedLink
                  className="btn btn-ghost btn-sm"
                  href={`/ai-employees#${emp.id}`}
                  event="agents_cta_click"
                  params={{ cta: `home_hire_${emp.id}` }}
                >
                  Hire {emp.name} →
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5 · LIVE DEMO BLOCK ============ */}
      <LiveDemoBlock
        heading="Don’t book a demo. Talk to one right now."
        intro="Other agencies ask you to schedule a call to see a slideshow. Our AI Employees introduce themselves."
        ctaLocation="home"
      />

      {/* ============ 6 · PRODUCT PROOF BAR ============ */}
      <div className="proof" aria-label="DSPAgentHub results">
        <div className="wrap">
          <ProofCounters />
          <p className="proof-note">
            These are our own numbers. The same AI Employee that runs DSP&apos;s sales runs yours.
          </p>
        </div>
      </div>

      {/* ============ 7 · HOW IT WORKS ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">How it works</p>
            <h2>Live in 7 days. Here&apos;s how.</h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <p className="kicker">1 · Discover (Day 1)</p>
              <h3>One structured call</h3>
              <p>
                A structured discovery call. We map your services, prices, FAQs, and rules —
                everything your AI Employee must know.
              </p>
            </div>
            <div className="card">
              <p className="kicker">2 · Build (Days 2–5)</p>
              <h3>Your Employee, trained</h3>
              <p>
                We write your Employee&apos;s job description on DSPAgentHub, load your business
                knowledge, and test it against our 10-point acceptance sheet.
              </p>
            </div>
            <div className="card">
              <p className="kicker">3 · Go Live (Days 6–7)</p>
              <h3>You approve, it works</h3>
              <p>
                You test it yourself on your own WhatsApp or phone line. When you approve, your AI
                Employee starts work — and never stops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8 · PLATFORM ============ */}
      <section className="band-dark">
        <div className="wrap split">
          <div>
            <p className="eyebrow">DSPAgentHub</p>
            <h2>Your AI Employee comes with its own office.</h2>
            <p style={{ marginTop: '.9rem' }}>
              Every AI Employee runs on <strong>DSPAgentHub</strong>, our own platform — not rented
              no-code tools that bill you forever. Your dashboard shows every conversation, every
              qualified lead, every booking, and every sale in real time — with AI insights,
              sentiment analysis, and a weekly digest delivered to you.
            </p>
            <p style={{ marginTop: '1rem', fontWeight: 600, color: '#fff' }}>
              Owned platform. Your data. No third-party subscriptions.
            </p>
          </div>
          {/* Real dashboard screenshot only (publish checklist) — swap this frame for it */}
          <div className="shot-placeholder" role="img" aria-label="Placeholder for a real DSPAgentHub dashboard screenshot — pipeline view">
            <span>DSPAgentHub dashboard screenshot<br />(pipeline view) goes here</span>
          </div>
        </div>
      </section>

      {/* ============ 9 · CASE STUDIES TEASER ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Case studies</p>
            <h2>Working for real businesses today.</h2>
          </div>
          {/* Gated: real client cards publish once written permission is secured
              (agency.caseStudiesApproved in src/config/site.ts) */}
          {agency.caseStudiesApproved ? null : (
            <div className="grid-2">
              <div className="card">
                <p className="kicker">Case study · publishing soon</p>
                <p>
                  Our first client stories are being written up now — with real numbers, published
                  with each client&apos;s permission.
                </p>
                <p style={{ marginTop: '.8rem' }}>
                  <Link href="/agents/case-studies" style={{ fontWeight: 600 }}>See our current work →</Link>
                </p>
              </div>
              <div className="card">
                <p className="kicker">Want to be one?</p>
                <p>
                  Early clients get founder-level attention — and a case study that markets your
                  business as well as ours.
                </p>
                <p style={{ marginTop: '.8rem' }}>
                  <a href={waLink('Hi DSP, I want an AI Employee for my business.')} style={{ fontWeight: 600 }}>Talk to us →</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ 10 · LEADERSHIP ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Leadership</p>
            <h2>Built and supervised by the team that has taught AI to thousands.</h2>
          </div>
          <div className="grid-2">
            <div className="card leader-card">
              <Image className="leader-photo" src="/instructor-poster.jpg" alt="Sardar Ghaffar" width={96} height={96} />
              <h3>Sardar Ghaffar</h3>
              <p className="role">Founder &amp; Lead Instructor</p>
              <p>
                Teaching technology since 2002 across London, the UAE, and Pakistan. Google &amp;
                Anthropic verified AI agentic trainer. Founder, Sardar Group of Companies.
              </p>
            </div>
            <div className="card leader-card">
              {/* Real photo required before publish — placeholder until provided */}
              <span className="leader-photo placeholder">photo<br />coming</span>
              {/* Surname + degree/university gated in config until confirmed — never guess */}
              <h3>Sundus{agency.leadership.sundusSurname ? ` ${agency.leadership.sundusSurname}` : ''}</h3>
              <p className="role">Co-Founder &amp; Instructor</p>
              <p>
                Gold Medalist{agency.leadership.sundusDegreeLine ? ` — ${agency.leadership.sundusDegreeLine}` : ''}.
                Has trained hundreds of students in AI agent development at DSP.
              </p>
            </div>
          </div>
          <p style={{ marginTop: '1.4rem', fontSize: '.92rem', color: 'var(--navy-soft)' }}>
            Supported by a dedicated delivery team. <Link href="/about">About DSP →</Link>
          </p>
        </div>
      </section>

      {/* ============ 11 · PRICING TEASER ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">Pricing</p>
            <h2>Simple pricing. No hidden retainers.</h2>
          </div>
          <div className="teaser-tiers">
            {agency.pricing.tiers.map((tier) => (
              <div className="card" key={tier.id}>
                <p className="kicker">{tier.name}</p>
                <strong className="from">from ${tier.monthlyUsd}<small>/mo</small></strong>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center' }}>
            One-time setup from ${agency.pricing.tiers[0].setupUsd}. Cancel anytime.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink className="btn btn-gold" href="/pricing" event="agents_cta_click" params={{ cta: 'home_pricing_teaser' }}>
              See Full Pricing →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ 12 · FAQ ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">FAQ</p>
            <h2>Questions businesses ask us.</h2>
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

      {/* ============ 13 · FINAL CTA ============ */}
      <section className="band-dark">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Hire your first AI Employee this week.</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink
              className="btn btn-gold"
              href={waLink('Hi DSP, I want to hire an AI Employee for my business.')}
              event="whatsapp_cta_click"
              params={{ cta: 'home_final' }}
            >
              <WhatsAppIcon /> WhatsApp Us: {site.whatsappDisplay}
            </TrackedLink>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.95rem' }}>
            Want to build AI agents yourself instead?{' '}
            <Link href={bootcamp.url} style={{ color: 'var(--gold)', fontWeight: 600 }}>
              New Agentic Lab batch every Monday →
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
