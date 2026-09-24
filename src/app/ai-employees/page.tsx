// src/app/ai-employees/page.tsx — AI Employees hub (agency flagship page).
// Content per the agency copy doc; gated facts (Emma's phone line, Zara's
// ASOS demo number) come from src/config/site.ts and render placeholders
// until the publish checklist signs them off.
//
// Commercial entity + answer page (2026-09-24, Day 5 of the 30-day challenge,
// same pattern as /agents PR #35): the first body text is a direct definition
// of the category, the title names the country, the Service provider carries
// the sitewide Organization @id (it used to be an id-less inline Organization
// — a second company entity on the flagship page), areaServed names
// Islamabad / Pakistan / Worldwide instead of the bare string 'Worldwide',
// and a WebPage node states dateModified from ./seo.ts (the same constant the
// sitemap reports). Intent split, so the three commercial pages never
// cannibalise: /agents owns "AI automation agency Islamabad" (the build
// service), /ai-employees owns "AI Employee company Pakistan" (the product),
// /mastery owns the education intent.
import type { Metadata } from 'next'
import { ORGANIZATION_ID, breadcrumbLd as breadcrumbLd_build, faqPageLd } from '@/lib/schema'
import { PAGE_LAST_MODIFIED } from './seo'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import LiveDemoBlock from '@/components/site/LiveDemoBlock'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { agency, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  // Buyer-led title: names the category AND the country. The old pair named
  // no geography anywhere, on the page that has to answer "AI Employee
  // company Pakistan".
  title: { absolute: 'AI Employee Company in Pakistan — Hire WhatsApp & Phone AI Staff | DSP' },
  description:
    'DSP is an AI Employee company in Islamabad, Pakistan. AI staff that answer every lead, call and booking 24/7 on WhatsApp and phone, in English and Urdu. Built on DSPAgentHub, live in 7 days.',
  alternates: { canonical: '/ai-employees' },
  openGraph: {
    type: 'website',
    url: '/ai-employees',
    title: 'AI Employee Company in Pakistan — DSP',
    description:
      'AI staff that answer every lead, call and booking 24/7 on WhatsApp and phone. Built in Islamabad on DSPAgentHub, live in 7 days.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

const breadcrumbLd = breadcrumbLd_build([{ name: 'AI Employees', path: '/ai-employees' }])

// The direct answer. Defines the CATEGORY first and DSP second, so an engine
// asked "what is an AI Employee?" or "is there an AI Employee company in
// Pakistan?" can quote one sentence that carries the definition, the country
// and the deliverable. Rendered verbatim as the first body text, and reused
// verbatim as the Service and WebPage description — one string, never
// reworded per surface (the same rule as the /agents ANSWER).
const ANSWER =
  'An AI Employee is an AI agent hired for one job in a business — answering, qualifying, booking and selling on the company’s own WhatsApp and phone lines, 24 hours a day, with a job description, a knowledge base, acceptance tests and a supervisor. DSP is an AI Employee company in Islamabad, Pakistan: we build each Employee on our own platform, DSPAgentHub, deploy it on the client’s number in English and Urdu, and supervise it every month. Setup from $500 one-time, then from $199 a month, live in 7 days.'

// Service schema for the hub. Prices live on /pricing (which carries the
// Offer catalog) — here each Employee is listed as the service it performs.
// Carries the sitewide Organization @id so parsers merge this provider with
// the root layout's Organization node instead of seeing a second one.
const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${site.url}/ai-employees#service`,
  serviceType: 'AI Employee (managed AI agent) for sales, support, bookings, and phone orders',
  name: 'DSP AI Employees',
  description: ANSWER,
  url: `${site.url}/ai-employees`,
  provider: {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: '+92-342-0580864',
  },
  areaServed: [
    { '@type': 'City', name: 'Islamabad' },
    { '@type': 'Country', name: 'Pakistan' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  availableLanguage: ['en', 'ur'],
  offers: {
    '@type': 'Offer',
    name: 'AI Employee packages',
    description: 'Setup from $500 one-time, then from $199/month. Cancel anytime.',
    price: agency.pricing.tiers[0].monthlyUsd,
    priceCurrency: 'USD',
    url: `${site.url}/pricing`,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Employees',
    itemListElement: agency.employees.map((emp) => ({
      '@type': 'Offer',
      name: `${emp.name} — ${emp.role}`,
      description: emp.hubLine,
      priceCurrency: 'USD',
      price: agency.pricing.tiers[0].monthlyUsd,
      url: `${site.url}/pricing`,
    })),
  },
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

// WebPage node: the only place the page states when it last changed. Its
// dateModified is the same constant the sitemap reports (./seo.ts), so an
// engine comparing the two never sees a page that claims to be unchanged.
// `about` points at the Service node above by @id — one entity, not two.
const webPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/ai-employees#webpage`,
  url: `${site.url}/ai-employees`,
  name: 'AI Employee Company in Pakistan — Hire WhatsApp & Phone AI Staff | DSP',
  description: ANSWER,
  inLanguage: 'en',
  dateModified: PAGE_LAST_MODIFIED,
  publisher: { '@id': ORGANIZATION_ID },
  about: { '@id': `${site.url}/ai-employees#service` },
}

// One array feeds both the visible <details> list and the FAQPage node.
// Buyer-intent questions first — what it is, is there one in Pakistan, what
// it costs, how long to go live — because those are the queries the page has
// to answer; the operational questions follow.
const faqs = [
  {
    q: 'What is an AI Employee?',
    a: 'An AI agent hired for one job in your business — answering, qualifying, booking and selling on your own WhatsApp and phone lines, 24 hours a day. Unlike a chatbot it has a job description, a knowledge base, acceptance tests and a supervisor, and it reports its work on a live dashboard.',
  },
  {
    q: 'Is there an AI Employee company in Pakistan?',
    a: 'Yes. DSP builds, deploys and supervises AI Employees from Islamabad, Pakistan, on its own platform, DSPAgentHub, for businesses in Pakistan and worldwide. Every Employee works in English and Urdu.',
  },
  {
    q: 'How much does an AI Employee cost?',
    a: 'Setup from $500 one-time, then from $199 a month, cancel anytime. Full packages are on the pricing page. A human hire costs salary plus training plus turnover, works eight hours a day and handles one conversation at a time.',
  },
  {
    q: 'How long does it take to go live?',
    a: 'Seven days from sign-off. We collect your price list, business rules and escalation contacts, build and test the Employee against acceptance tests, connect it to your WhatsApp Business API number or phone line, and hand you the dashboard.',
  },
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
    q: 'Do you train teams to build AI Employees, not only build them for us?',
    a: 'Yes. DSP is both an AI agency and an AI agents training company. If you want your own staff to maintain and extend an Employee in-house, they can take DSP AI Agent Mastery — the same 16-module course, in Urdu and English, that our own builds follow. Ask on WhatsApp about seats for a team.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Mirrors the visible FAQ below verbatim (faqs is the single source). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(faqs)) }}
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

      {/* ============ ANSWER-FIRST DEFINITION ============ */}
      {/* The first body text on the page is the direct answer, so an engine
          summarising /ai-employees quotes a sentence that names the category,
          the country and the deliverable rather than assembling one from
          marketing. Same string as the Service and WebPage description. */}
      <section id="what-is-an-ai-employee" style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: '46rem' }}>
          <div className="sec-head">
            <p className="eyebrow">What an AI Employee is</p>
            <h2>What is an AI Employee?</h2>
          </div>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.65 }}>{ANSWER}</p>
          <p style={{ marginTop: '1rem', color: 'var(--navy-soft)' }}>
            The long-form definition is on{' '}
            <Link href="/what-is-an-ai-employee">What is an AI Employee?</Link>; the agency that
            builds them is <Link href="/agents">DSP Agents</Link>, and you can talk to one on our
            own site right now — <Link href="/sardar">SARDAR</Link>, a voice AI Employee that
            answers questions about DSP by phone-style call.
          </p>
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
                {/* Card CTA goes to the profile page; the WhatsApp prefill is the
                    CTA on that page, not here. */}
                <Link className="btn btn-ghost btn-sm" href={`/ai-employees/${emp.id}`}>
                  Meet {emp.name} →
                </Link>
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
          <div className="table-scroll" tabIndex={0} role="region" aria-label="Scrollable table">
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

      {/* ============ 9 · LEARN TO BUILD THEM ============ */}
      {/* Blueprint §1: "You can hire one, or learn to build them." The second
          door on the category page — kept to one sentence and one link, no
          pricing, mirroring the homepage hire-band restraint. */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">The other door</p>
            <h2>Or learn to build them.</h2>
            <p>
              DSP is where AI Employees come from — you can <Link href="/agents">hire one built for your business</Link>, or learn to build them.
              The working method behind every Employee on this page is what we teach in
              DSP AI Agent Mastery, self-paced, from zero.
            </p>
          </div>
          <p style={{ textAlign: 'center' }}>
            <TrackedLink
              className="btn btn-ghost"
              href="/mastery"
              event="academy_cta_click"
              params={{ cta: 'aiemp_learn_band' }}
            >
              Explore AI Agent Mastery →
            </TrackedLink>
          </p>
        </div>
      </section>

      {/* ============ 10 · FINAL CTA ============ */}
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
