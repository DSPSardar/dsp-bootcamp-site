// src/app/agents/page.tsx — DSP Agents: the commercial entity + answer page.
//
// Day 1 of the 30-day AI Search Dominance challenge (20 Sep 2026) found that
// DSP owns no commercial-intent surface at all. Three buyer SERPs — "AI
// automation agency Islamabad", "hire AI agent development company Pakistan",
// "AI receptionist WhatsApp booking agent small business Pakistan" — returned
// zero DSP results; the winners were competitors' location+service pages,
// listicles and directories. Every query-shaped page DSP owned was education
// intent, so the side of the business that sells builds had nothing shaped
// like a buyer's question.
//
// The fix deepens an already-crawled URL instead of adding one: /research
// (19 Sep) is still absent from the index, and new URLs do not index inside a
// month. So this page becomes the commercial surface — an answer-first
// definition in the first screen, proof read off a named dashboard with its
// as-of date, a six-question FAQPage that mirrors the visible <details>
// verbatim, internal links out of what was a dead end, and a Service node
// that finally states areaServed and what is actually on offer.
import type { Metadata } from 'next'
import { ORGANIZATION_ID, breadcrumbLd, faqPageLd, type Faq } from '@/lib/schema'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { site, entity, waLink } from '@/config/site'
import { PAGE_LAST_MODIFIED } from './seo'

// Title and description lead with the words a buyer types, not the words a
// student types: "AI automation agency", "AI agent development company", the
// city and the country. The title ends in the brand, set `absolute` so the
// root layout's '%s | DSP' template does not double the suffix.
export const metadata: Metadata = {
  title: { absolute: 'AI Automation Agency in Islamabad, Pakistan — DSP Agents' },
  description:
    'DSP Agents is the AI agent development company inside Digital Services Program, Islamabad. We build and deploy production AI Employees — WhatsApp and phone receptionists, booking and ordering agents, multi-agent SEO systems and custom automations — for businesses in Pakistan and worldwide.',
  alternates: { canonical: '/agents' },
  openGraph: {
    type: 'website',
    url: '/agents',
    title: 'AI Automation Agency in Islamabad — DSP Agents',
    description:
      'Production AI agents built and deployed for real businesses: WhatsApp and phone receptionists, booking agents, multi-agent systems. Islamabad, Pakistan — working worldwide.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

// The one-paragraph answer, repeated verbatim as the page's first body text
// and as the Service node's description, so an engine that quotes either one
// quotes the same sentence. Names the category, the city, the country and the
// deliverable — the four things the buyer queries actually contain.
const ANSWER =
  'DSP Agents is the AI agent development and business-automation arm of Digital Services Program (DSP), an AI company in Islamabad, Pakistan. We build and deploy production AI Employees for businesses: WhatsApp and phone receptionists that answer every call and message, booking and ordering agents, multi-agent systems that run a whole workflow end to end, and custom automations scoped to one business. We work with clients in Pakistan and worldwide.'

// FAQ — buyer-intent questions, not curriculum questions. Rendered verbatim
// as visible <details> AND emitted as FAQPage; the two must never drift, so
// this array is the single source for both.
const FAQS: ReadonlyArray<Faq> = [
  {
    q: 'What does an AI automation agency actually do?',
    a: 'It takes a process your team runs by hand — answering the phone, replying to WhatsApp enquiries, qualifying leads, taking bookings, producing content — and puts a software agent on it. The agent holds the job description, the tools and the knowledge for that one job, runs inside guardrails, and hands anything it should not decide back to a human. DSP Agents scopes the process first, builds a working proof of concept, then deploys and supports it.',
  },
  {
    q: 'Can you build a WhatsApp or phone receptionist for a small business?',
    a: 'Yes — it is the most common build we are asked for. The agent answers on WhatsApp or on the phone, knows your services, prices and hours, answers the questions customers actually ask, captures the booking or the order, and delivers it to you by message and email the moment the conversation ends. Small businesses are the fit: the calls and messages you are already missing are the whole business case.',
  },
  {
    q: 'Do you build AI agents for businesses outside Pakistan?',
    a: 'Yes. DSP is based in Islamabad and our flagship phone-ordering agent runs for restaurants in the United States. We work with clients across Pakistan, the Gulf, the United Kingdom, North America and Australia, and delivery is remote in every case.',
  },
  {
    q: 'How long does it take to get an agent live?',
    a: 'For a build on one of our existing platforms — the multi-tenant phone-ordering agent, or a WhatsApp receptionist — days, because your business is configuration rather than a new codebase. A custom multi-agent system is scoped at the discovery call and runs proof of concept, then pilot, then production; the proof of concept comes before you pay for production, so you see it working before you commit.',
  },
  {
    q: 'What does it cost to hire you to build an AI agent?',
    a: 'It depends on whether you are configuring one of our platforms or commissioning a custom build, so we quote after the scoping call rather than from a price list. Two things are fixed: the first conversation is free, and we will tell you if an agent is the wrong tool for your problem instead of selling you one.',
  },
  {
    q: 'Should I hire you to build the agent, or learn to build it myself?',
    a: 'Both are on offer and they suit different situations. Hire us when the agent is a business system you need running and supported. Learn it yourself through DSP AI Agent Mastery when you want the capability in-house — it is the same work, taught in Urdu and English, building one real AI Employee from an empty folder to a live URL.',
  },
]

// The Service node. Two additions over the 6 Sep version, both aimed at the
// buyer SERPs: `areaServed` now names Islamabad and Pakistan instead of the
// single unhelpful string "Worldwide", and `hasOfferCatalog` states what is
// on offer so the node answers "what do they sell" as well as "who are they".
// Carries the sitewide Organization @id so parsers merge this provider with
// the root layout's Organization node instead of seeing a second one.
const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${site.url}/agents#service`,
  serviceType: 'AI agent development and business automation',
  name: 'DSP Agents — AI agent development and business automation',
  description: ANSWER,
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
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI agent and automation builds',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI receptionist and WhatsApp booking agent',
          description:
            'An agent that answers WhatsApp and phone enquiries for a business, knows its services, prices and hours, captures the booking or enquiry, and delivers it to the owner by message and email.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Restaurant phone-ordering AI agent',
          description:
            'A multi-tenant voice agent that answers every call to a restaurant, takes the order conversationally, handles menu questions, and sends the completed order to the kitchen by text and email.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Multi-agent workflow systems',
          description:
            'Orchestrated teams of specialised agents with stage gates between them, such as RankPilot, a seven-agent SEO pipeline running research, drafting, optimisation and QA.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom AI Employee builds',
          description:
            'Lead qualification, customer intake and internal operations agents scoped to one business, delivered discovery first, then proof of concept, pilot and production.',
        },
      },
    ],
  },
}

const faqLd = faqPageLd(FAQS)

// WebPage node: the only place the page states when it last changed. Its
// dateModified is the same constant the sitemap reports (./seo.ts), so an
// engine comparing the two never sees a page that claims to be unchanged.
// `about` points at the Service node above by @id — one entity, not two.
const webPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${site.url}/agents#webpage`,
  url: `${site.url}/agents`,
  name: 'AI Automation Agency in Islamabad, Pakistan — DSP Agents',
  description: ANSWER,
  inLanguage: 'en',
  dateModified: PAGE_LAST_MODIFIED,
  publisher: { '@id': ORGANIZATION_ID },
  about: { '@id': `${site.url}/agents#service` },
}

export default function AgentsPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: 'AI Agents', path: '/agents' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <p className="eyebrow">DSP Agents · Islamabad, Pakistan</p>
          <h1>AI automation agency. <em>We build the agent, then run it.</em></h1>
          <p className="sub">
            Not demos. Not decks. Deployed agents doing real work inside real businesses —
            answering phones and WhatsApp, taking bookings, qualifying leads, running SEO
            pipelines. Scoped honestly, shipped fast, supported after launch.
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

      {/* ============ ANSWER-FIRST DEFINITION ============ */}
      {/* The first body text on the page is the direct answer, so an engine
          summarising /agents quotes a sentence that names the category, the
          city and the deliverable rather than assembling one from marketing. */}
      <section id="what-we-are" style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: '46rem' }}>
          <div className="sec-head">
            <p className="eyebrow">What DSP Agents is</p>
            <h2>An AI agency in Islamabad that ships production agents.</h2>
          </div>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.65 }}>{ANSWER}</p>
          <p style={{ marginTop: '1rem', color: 'var(--navy-soft)' }}>
            The agents we build are what we call{' '}
            <Link href="/what-is-an-ai-employee">AI Employees</Link> — software that holds one
            job description, uses its own tools, and is accountable for an outcome rather than a
            prompt. You can see{' '}
            <Link href="/ai-employees">the roles we build them for</Link>, or read{' '}
            <Link href="/agents/case-studies">two builds in full</Link>.
          </p>
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
            <div className="card">
              <p className="kicker">Most requested</p>
              <h3>AI receptionists &amp; booking agents</h3>
              <p>An agent on WhatsApp or the phone that knows your services, prices and hours, answers what customers actually ask, captures the booking, and sends it to you the moment the conversation ends.</p>
            </div>
            <div className="card dark">
              <p className="kicker">Flagship product</p>
              <h3>Restaurant phone-ordering AI</h3>
              <p>A multi-tenant agent answering every call to US restaurants — full menu knowledge, order capture, kitchen handoff. Live in days, not months.</p>
              <p style={{ marginTop: '1rem' }}>
                <Link href="/agents/restaurant-ai" style={{ color: 'var(--gold)', fontWeight: 600 }}>See the product →</Link>
              </p>
            </div>
            <div className="card">
              <p className="kicker">Multi-agent &amp; custom</p>
              <h3>Your workflow, agentified</h3>
              <p>Orchestrated fleets — like RankPilot, our 7-agent SEO system — plus custom builds for lead qualification, customer intake and internal ops. If a process runs on conversations and rules, we can usually put an agent on it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROOF ============ */}
      {/* House rule: every number here is read off a named dashboard and
          carries the date it was read. No estimates, no rounded-up claims. */}
      <section className="band-dark">
        <div className="wrap" style={{ maxWidth: '46rem' }}>
          <div className="sec-head">
            <p className="eyebrow">Proof</p>
            <h2>We run our own agents in production first.</h2>
          </div>
          <ul className="check-list">
            <li>
              <CheckIcon /> <strong>DSP Agent Hub</strong> — our own agent platform. Its ASOS
              student dashboard read <strong>{entity.studentsEnrolled} enrolled</strong> as of{' '}
              {new Date(entity.studentsEnrolledAsOf).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}.
              The platform we sell from is the platform we operate.
            </li>
            <li>
              <CheckIcon /> <strong>The restaurant phone-ordering agent</strong> is multi-tenant and
              live for US restaurants — one platform, each restaurant a configuration.
            </li>
            <li>
              <CheckIcon /> <strong>RankPilot</strong>, our 7-agent SEO system, runs the content
              pipeline for this site. We do not sell a pattern we have not run ourselves.
            </li>
            <li>
              <CheckIcon /> Built and led by{' '}
              <Link href="/sardar-ghaffar">Sardar Ghaffar</Link>, teaching IT since 2002 and a
              verified Anthropic and Google agentic-AI trainer.
            </li>
          </ul>
        </div>
      </section>

      {/* ============ HOW WE WORK ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">How we work</p>
            <h2>Discovery first. Then ship.</h2>
            <p>
              Discovery first, then POC → pilot → production, with guardrails and evals
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

      {/* ============ FAQ ============ */}
      {/* Rendered verbatim from FAQS, which also feeds the FAQPage node —
          the visible text and the markup cannot drift apart. */}
      <section className="band-paper faq-list" id="faq" aria-labelledby="faq-h">
        <div className="wrap" style={{ maxWidth: '46rem' }}>
          <div className="sec-head">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-h">What buyers ask before they hire us.</h2>
          </div>
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
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
          <p style={{ marginTop: '1.6rem', fontSize: '.95rem', color: 'var(--navy-soft)' }}>
            Would rather build it yourself? <Link href="/mastery">DSP AI Agent Mastery</Link> teaches
            the same work in Urdu and English. Prefer email or a form?{' '}
            <Link href="/contact">Contact us</Link>.
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
