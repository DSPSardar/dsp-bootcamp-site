// src/app/page.tsx — company homepage, V3 (Sept 2026): DSP as an AI
// Employee company. Twelve sections in the brief's order, AI-Employee
// primary, with Agent Hub (the product) and Mastery (the education gateway)
// each given one section. Learn → Build → Deploy is the spine.
//
// Every number on this page is read from src/config/site.ts, where each one
// names its dashboard and period (agency.proof, agency.revenue,
// distribution, entity.studentsEnrolled). Every visual that is not a real
// capture is labelled "Illustrative". Nothing is invented.
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import ProofCounters from '@/components/site/ProofCounters'
import Evolution from '@/components/home/Evolution'
import RevealObserver from '@/components/home/RevealObserver'
import HeroEmployee from '@/components/home/HeroEmployee'
import EmployeeGrid from '@/components/home/EmployeeGrid'
import AgentHubSection from '@/components/home/AgentHubSection'
import DistributionEngine from '@/components/home/DistributionEngine'
import EmployeeEngine from '@/components/home/EmployeeEngine'
import Journey from '@/components/home/Journey'
import GlobalSection from '@/components/home/GlobalSection'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { faqPageLd } from '@/lib/schema'
import { agency, entity, founder, mastery, site, waLink } from '@/config/site'
import { bunnyConfigured } from '@/lib/mastery/bunny'
import { STUDENT_BUILDS } from '@/app/mastery/students'
import './home.css'

export const metadata: Metadata = {
  title: { absolute: 'DSP — AI Employees for Business | Digital Services Program' },
  description:
    'DSP builds AI Employees for business — AI sales, support, booking and order-taking staff on WhatsApp and phone, run on DSP Agent Hub — and teaches you to build your own in DSP AI Agent Mastery, a self-paced program.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'DSP — Don’t just use AI. Build the employee.',
    description:
      'DSP builds AI Employees for business — and teaches you how to build them yourself. Learn → Build → Deploy.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSP — Don’t just use AI. Build the employee.',
    description: 'AI Employees for business, DSP Agent Hub, and DSP AI Agent Mastery, the self-paced program to build your own.',
    images: ['/og-card.png'],
  },
}

// FAQ — the top objections. Every answer is already published on /mastery
// or /ai-employees (nothing new asserted). Mirrored in FAQPage JSON-LD.
const faqs = [
  { q: 'What exactly is an AI Employee?',
    a: 'A trained AI agent that handles one job in your business — sales, support, bookings, or phone orders — on your own WhatsApp number or phone line, 24 hours a day. It has a job description, a knowledge base, tools, guardrails, and a human it escalates to.' },
  { q: 'What is DSP Agent Hub?',
    a: 'DSP Agent Hub (ASOS — AI Sales OS) is the platform every DSP AI Employee runs on: leads, conversations, follow-ups, sales, AI insights and analytics in one pipeline. DSP runs its own admissions on it — Zara, our AI Sales Employee, answers the DSP WhatsApp line.' },
  { q: 'Can I hire one, or do I have to build it?',
    a: 'Both doors are open. DSP builds and runs AI Employees for businesses — live within 7 days of a discovery call, with published USD pricing. Or you learn to build your own in DSP AI Agent Mastery, the same method our team uses.' },
  { q: 'I have never coded. Can I really build one?',
    a: 'Yes. That is the audience Mastery was built for. You describe what you want and Claude Code writes the code. Your job is to plan, direct, test and ship — which is what the program teaches. If you can write a clear WhatsApp message, you can write a Job Description.' },
  { q: 'Do I get a recognised certificate?',
    a: 'Two kinds. The DSP Master certificate has a public verification page showing the live agent you built — proof of work, not attendance. Separately, Module 3 walks you through Anthropic’s free Claude training, so you finish holding three of their completion badges with your name on them. Neither is a university accreditation; what employers and clients actually check is the working agent behind the link.' },
  { q: 'Is it in Urdu or English?',
    a: 'Lectures are taught in an Urdu–English mix, the way DSP teaches live. All templates, slides and downloads are in English. Subtitles are provided. AI Employees answer customers in either language.' },
]

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function HomePage() {
  // Real student stories, on camera — the same Bunny embeds published on
  // /mastery (the /api/video allowlist already covers these GUIDs).
  const stories = STUDENT_BUILDS
    .filter((v) => !v.portrait)
    .map((v) => ({ ...v, src: bunnyConfigured ? `/api/video/${v.guid}` : null }))
    .filter((v) => v.src)

  const certs = [
    { img: '/mastery/cert-claude-101.jpg', name: 'Claude 101', by: 'Anthropic' },
    { img: '/mastery/cert-claude-code-101.jpg', name: 'Claude Code 101', by: 'Anthropic' },
    { img: '/mastery/cert-claude-cowork.jpg', name: 'Claude Cowork', by: 'Anthropic' },
    { img: '/mastery/cert-dsp-master.jpg', name: 'DSP Master', by: 'DSP · verifiable URL' },
  ]

  return (
    <SiteShell mainClassName="home-main">
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(faqs)) }}
      />

      {/* ============ 01 · HERO ============ */}
      <section className="hero-dark home-hero">
        <div className="wrap">
          <div>
            <p className="eyebrow">DSP · AI Employee company</p>
            <h1>Don&apos;t just use AI. <em>Build the employee.</em></h1>
            <p className="sub">
              DSP builds AI Employees for business — and teaches you how to build them yourself.
            </p>
            <div className="hero-ctas">
              <TrackedLink className="btn btn-gold" href="/ai-employees" event="agents_cta_click" params={{ cta: 'home_hero_explore' }}>
                Explore AI Employees
              </TrackedLink>
              <TrackedLink className="btn btn-ghost-light" href="/mastery" event="academy_cta_click" params={{ cta: 'home_hero_mastery' }}>
                Start AI Mastery
              </TrackedLink>
            </div>
            <p className="hero-proofline" aria-label="Learn, build, deploy">
              <span><b>Learn</b> · {mastery.shortName}</span>
              <span><b>Build</b> · {agency.hubName}</span>
              <span><b>Deploy</b> · AI Employees</span>
            </p>
          </div>
          <HeroEmployee />
        </div>
      </section>

      {/* ============ 02 · THE EVOLUTION OF WORK ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The evolution of work</p>
            <h2>Software stopped waiting for instructions.</h2>
            <p>Five steps from a page that displays to a team that works. Most businesses are still on step one.</p>
          </div>
          <Evolution />
        </div>
      </section>

      {/* ============ 03 · MEET THE AI EMPLOYEES ============ */}
      <section className="band-paper" style={{ paddingTop: 0 }} id="employees">
        <div className="wrap" style={{ paddingTop: 88 }}>
          <div className="sec-head">
            <p className="eyebrow">Meet the AI Employees</p>
            <h2>Digital staff, each with one job.</h2>
            <p>
              Four roles DSP builds and runs today. Every one has a job description, a knowledge base,
              the tools to act, and a human to escalate to — and reports its work on {agency.hubName}.
            </p>
          </div>
          <EmployeeGrid />
          <p style={{ marginTop: '1.6rem' }}>
            <TrackedLink className="arrow-link" href="/ai-employees" event="agents_cta_click" params={{ cta: 'home_employees_all' }}>
              See the full team, the honest human-vs-AI comparison, and how hiring works →
            </TrackedLink>
          </p>
        </div>
      </section>

      {/* ============ 04 · DSP AGENT HUB ============ */}
      <AgentHubSection />

      {/* ============ 05 · REAL BUSINESS PROOF ============ */}
      <section className="band-dark proof-v2" id="results">
        <div className="wrap">
          <div className="proof-hero" data-reveal="">
            <p className="eyebrow">Real business proof</p>
            <p className="big">{agency.revenue.display}</p>
            <p className="lbl">{agency.revenue.label}</p>
            <p className="src">
              Source: {agency.hubName} (ASOS) dashboard, Rs. {agency.revenue.pkr.toLocaleString('en-US')}
              <br />as of {fmtDate(agency.revenue.asOf)}
            </p>
            <p className="footnote">{agency.revenue.footnote}</p>
          </div>
          <div>
            <div className="sec-head" style={{ marginBottom: '1.4rem' }}>
              <h2>The same AI Employee that runs DSP&apos;s sales runs yours.</h2>
            </div>
            <div className="proof-grid" data-reveal="stagger">
              <ProofCounters />
              <div>
                <strong>{entity.studentsEnrolled}</strong>
                <span>students in {mastery.shortName}</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>every lead answered, in English or Urdu</span>
              </div>
              <p className="proof-note">
                Leads, sales, takeover rate and time-to-live: {agency.hubName}, DSP tenant, as of {fmtDate(agency.proof.asOf)}.
                Students: ASOS dashboard, as of {fmtDate(entity.studentsEnrolledAsOf)}. Our own numbers, updated from the dashboard, never estimated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 06 · DISTRIBUTION ENGINE ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">DSP distribution engine</p>
            <h2>Attention that turns into customers.</h2>
            <p>
              DSP earns its own demand: a Facebook page in the millions of views, a WhatsApp line an AI
              Employee answers, and a pipeline that closes. Each stage, from its own dashboard.
            </p>
          </div>
          <DistributionEngine />
        </div>
      </section>

      {/* ============ 07 · DSP AI EMPLOYEE ENGINE ============ */}
      <section className="band-ink engine" id="how-it-works">
        <div className="wrap">
          <div data-reveal="">
            <p className="eyebrow">How it works</p>
            <h2>How an AI model becomes an AI Employee.</h2>
            <p style={{ marginTop: '1rem' }}>
              A model on its own answers questions. Give it a role, your knowledge, memory, tools,
              connections, a workflow, guardrails and a loop — and it does a job. This is the system
              behind every DSP Employee, and the syllabus of {mastery.shortName}.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <Link className="arrow-link" href="/what-is-an-ai-employee" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}>
                Read the definition: what is an AI Employee? →
              </Link>
            </p>
          </div>
          <EmployeeEngine />
        </div>
      </section>

      {/* ============ 08 · AI MASTERY ============ */}
      <section className="mastery-block" id="mastery">
        <div className="wrap">
          <div data-reveal="">
            <p className="eyebrow">{mastery.shortName}</p>
            <h2>Build your first AI Employee.</h2>
            <p style={{ marginTop: '1rem', color: 'var(--navy-soft)', fontSize: '1.08rem' }}>
              {mastery.name}{' '}is the education gateway into the DSP ecosystem: recorded lectures, one
              real AI Employee built from an empty folder to a live URL, then your own. The method is
              the one DSP&apos;s team uses on client builds.
            </p>
            <ul className="facts">
              <li><CheckIcon /> {mastery.modules} modules · {mastery.lectureHours} hours of recorded lectures</li>
              <li><CheckIcon /> Self-paced · {mastery.access.toLowerCase()} access</li>
              <li><CheckIcon /> {mastery.supportMonths} months of group support and weekend live sessions</li>
              <li><CheckIcon /> Taught in Urdu and English · materials in English</li>
              <li><CheckIcon /> No coding background needed — Claude Code writes the code</li>
              <li><CheckIcon /> Four certificates — three issued by Anthropic, one by DSP</li>
            </ul>
            <div className="hero-ctas">
              <TrackedLink className="btn btn-gold" href="/mastery" event="academy_cta_click" params={{ cta: 'home_mastery' }}>
                Start AI Mastery
              </TrackedLink>
              <Link className="btn btn-ghost" href="/mastery/curriculum">See all 16 modules</Link>
            </div>
            <div className="taught">
              <Image src={founder.image} alt="" width={104} height={130} />
              <span>
                <b>Taught by <Link href={founder.path}>{founder.name}</Link>, the founder</b>
                Teaching technology since 2002 · Google-certified AI trainer · Anthropic-verified educator
              </span>
            </div>
          </div>
          <div className="offer" data-reveal="">
            <p className="k">What you leave with</p>
            <p className="offer-title">One AI Employee, live on a public URL — then your own.</p>
            <ul>
              <li><CheckIcon /> A café ordering AI Employee, built by you from an empty folder to a live URL</li>
              <li><CheckIcon /> Job Description, memory, tools, APIs, MCP, testing, security, deployment</li>
              <li><CheckIcon /> Selling agents to clients: discovery, proposal and pricing templates</li>
              <li><CheckIcon /> A DSP Master certificate with a public verification page showing your agent</li>
            </ul>
            <div className="certs">
              {certs.map((c) => (
                <figure key={c.name}>
                  <Image src={c.img} alt={`${c.name} certificate, ${c.by}`} width={450} height={302} sizes="(max-width: 560px) 45vw, 12vw" />
                  <figcaption>{c.name}</figcaption>
                </figure>
              ))}
            </div>
            <TrackedLink className="paylink" href="/mastery" event="academy_cta_click" params={{ cta: 'home_offer_program' }}>
              See the full program, format and curriculum →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ 09 · WHAT YOU BUILD ============ */}
      <section className="band-paper">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">What you build</p>
            <h2>One working AI Employee, end to end.</h2>
            <p>The build every Mastery student ships — a simplified version of the multi-tenant agents DSP runs for clients.</p>
          </div>
          <ol className="flow" data-reveal="stagger">
            <li><small>starts with</small>Customer</li>
            <li className="arrow" aria-hidden="true">→</li>
            <li><small>reaches you via</small>WhatsApp · Web · Voice</li>
            <li className="arrow" aria-hidden="true">→</li>
            <li className="core"><small>handled by</small>Your AI Employee</li>
            <li className="arrow" aria-hidden="true">→</li>
            <li><small>drawing on</small>Knowledge · Memory · Tools</li>
            <li className="arrow" aria-hidden="true">→</li>
            <li><small>working in</small>CRM · Calendar · Sheets · Email</li>
            <li className="arrow" aria-hidden="true">→</li>
            <li><small>ending in</small>Booked · Answered · Sold</li>
          </ol>
          {stories.length > 0 && (
            <div className="video-grid" data-reveal="stagger">
              {stories.map((v) => (
                <div key={v.guid}>
                  <div className="video-frame">
                    <iframe
                      src={v.src!}
                      title={`${v.name} — DSP student story`}
                      loading="lazy"
                      allow="accelerometer;gyroscope;encrypted-media;picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="video-caption"><strong>{v.name} · {v.where}</strong> — {v.line}</p>
                </div>
              ))}
            </div>
          )}
          <p className="fineprint">
            Student stories are real recordings, shown with consent. Results depend on the work you put in — individual students, not a promise of income.
          </p>
        </div>
      </section>

      {/* ============ 10 · LEARN → BUILD → DEPLOY → SCALE ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The DSP ecosystem</p>
            <h2>Learn. Build. Deploy. Scale.</h2>
            <p>One path, whether you start as a student or as a business owner.</p>
          </div>
          <Journey />
        </div>
      </section>

      {/* ============ 11 · GLOBAL ============ */}
      <GlobalSection />

      {/* ============ 12 · FINAL CTA ============ */}
      <section className="band-ink final">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>The future of work is digital employees.</h2>
          <p>Learn to build them. Deploy them. Scale them.</p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink className="btn btn-gold" href="/mastery" event="academy_cta_click" params={{ cta: 'home_final_mastery' }}>
              Start AI Mastery
            </TrackedLink>
            <TrackedLink className="btn btn-ghost-light" href="/ai-employees" event="agents_cta_click" params={{ cta: 'home_final_explore' }}>
              Explore AI Employees
            </TrackedLink>
          </div>
          <p style={{ marginTop: '1.4rem', fontSize: '.95rem' }}>
            Prefer to talk?{' '}
            <TrackedLink
              href={waLink('Hi DSP, I have a question about AI Employees or AI Mastery.')}
              target="_blank"
              rel="noopener"
              event="whatsapp_cta_click"
              params={{ cta: 'home_final' }}
              className="inline-cta"
            >
              <WhatsAppIcon /> WhatsApp {site.whatsappDisplay}
            </TrackedLink>
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">FAQ</p>
            <h2>The questions everyone asks first.</h2>
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

      {/* ============ RESEARCH ============ */}
      {/* The survey needs responses, not just crawling, and this page carries
          almost all of the site's traffic — a footer link alone would not do it. */}
      <section className="band-paper" style={{ padding: '44px 0' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Research</p>
          <p style={{ marginTop: '.4rem', color: 'var(--navy-soft)' }}>
            We are asking what actually stops people in Pakistan and the Urdu-speaking diaspora from
            learning AI. Ten questions, anonymous, no phone number — results published free.{' '}
            <Link href="/survey">Take the survey &rarr;</Link>
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
