// src/app/page.tsx — company homepage, V2 (blueprint §4: 13 sections in
// locked order, Mastery-primary). The agency appears exactly twice: its
// numbers in the proof section (§0.1 — the agency is the course's proof)
// and the one-sentence hire band (11). Everything that left this page
// stays live on /ai-employees and /pricing.
//
// §9: every number and proof element here already exists in the repo —
// agency.proof, bootcamp history, the /mastery student videos (Bunny
// allowlist), the Anthropic certificate photos. Nothing invented.
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import ProofCounters from '@/components/site/ProofCounters'
import Evolution from '@/components/home/Evolution'
import { WhatsAppIcon } from '@/components/home/icons'
import { faqPageLd } from '@/lib/schema'
import { agency, bootcamp, mastery, site, waLink } from '@/config/site'
import { bunnyConfigured } from '@/lib/mastery/bunny'

export const metadata: Metadata = {
  title: { absolute: 'Digital Services Program — We Build AI Agents. We Train You to Build Them.' },
  description:
    'DSP builds AI Employees — AI agents that handle sales, support, bookings, and phone orders for your business — and teaches you to build them through DSP AI Agent Mastery, a self-paced program.',
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
      'AI Employees for your business + DSP AI Agent Mastery, self-paced training to build your own.',
    images: ['/og-card.png'],
  },
}

// 03 · anatomy — the eight parts named in §4. Descriptive, no claims.
const anatomy = [
  { part: 'Brain', line: 'The model that reasons, reads, and writes.' },
  { part: 'Job description', line: 'What it does, what it never does, and how it speaks.' },
  { part: 'Knowledge', line: 'Your prices, policies, menu, and FAQs.' },
  { part: 'Memory', line: 'It remembers the customer and the conversation.' },
  { part: 'Tools', line: 'The systems it can actually operate.' },
  { part: 'APIs', line: 'How it connects to the tools your business already runs on.' },
  { part: 'Workflows', line: 'The steps it follows for each job, every time.' },
  { part: 'Guardrails', line: 'The rules it cannot break — and when it must hand over to a human.' },
]

// 04 · in the wild — jobs already published on the AI Employees pages.
const useCases = [
  { job: 'WhatsApp sales', line: 'Answers every lead, qualifies it, and closes.' },
  { job: 'Customer support', line: 'Handles the questions your team answers all day.' },
  { job: 'Appointment booking', line: 'Fills the calendar without back-and-forth.' },
  { job: 'Restaurant phone orders', line: 'Takes the order while the kitchen keeps cooking.' },
  { job: 'Lead qualification', line: 'Sorts serious buyers from window shoppers.' },
  { job: 'Follow-ups', line: 'The second and third message that never gets forgotten.' },
  { job: 'After-hours coverage', line: 'Nights, weekends, holidays — answered.' },
  { job: 'Escalation', line: 'Hands complex cases to your team with full context.' },
]

// 09 · who it's for — six audiences, descriptive only.
const audiences = [
  { who: 'Business owners', line: 'Put an AI Employee to work in your own business.' },
  { who: 'Freelancers & agency founders', line: 'Build and run Employees for clients.' },
  { who: 'Career switchers', line: 'A skill in demand, learnable from zero.' },
  { who: 'Students & fresh graduates', line: 'Graduate holding a live agent, not just a degree.' },
  { who: 'Working professionals', line: 'Add agent-building to the job you already have.' },
  { who: 'Non-programmers', line: 'You describe, direct, and test — the AI writes the code.' },
]

// 12 · FAQ — the top objections. Every answer is already published on
// /mastery or this site (§9: nothing new asserted). Mirrored in FAQPage LD.
const faqs = [
  { q: 'What exactly is an AI Employee?',
    a: 'A trained AI agent that handles one job in your business — sales, support, bookings, or phone orders — on your own WhatsApp number or phone line, 24 hours a day.' },
  { q: 'I have never coded. Can I really do this?',
    a: 'Yes. That is the audience this was built for. You describe what you want and Claude Code writes the code. Your job is to plan, direct, test and ship — which is what the program teaches. If you can write a clear WhatsApp message, you can write a Job Description.' },
  { q: 'How much time does it take?',
    a: 'About an hour a day for 30 days, or four sessions a week for eight weeks. Each module is one to three lectures plus a build. Lifetime access means you can go slower — the only thing that doesn’t work is stopping.' },
  { q: 'Is $100 really all I pay?',
    a: '$100 covers the entire program, lifetime. You will need a Claude account to build with during the modules — Module 3 walks you through setup and the free-tier route, and paid Claude plans start at $20/month if you choose to upgrade. GitHub and Vercel are free for what this program uses. No other purchase is required to finish.' },
  { q: 'Do I get a recognised certificate?',
    a: 'Two kinds. The DSP Master certificate has a public verification page showing the live agent you built — that is proof of work, not attendance. Separately, Module 3 walks you through Claude Academy, the free training run by Anthropic — the US company that builds Claude — so you finish holding three of their course completion badges with your name on them — Claude 101, Claude Code 101 and Introduction to Claude Cowork. Those are issued by Anthropic, not by DSP. Neither is a university accreditation; what employers and clients actually check is the working agent behind the link.' },
  { q: 'Is it in Urdu or English?',
    a: 'Lectures are taught in an Urdu–English mix, the way DSP teaches live. All templates, slides and downloads are in English. Subtitles are provided.' },
  { q: 'What does “one year of free support” mean?',
    a: 'You’re in the DSP group from day one, and questions there are answered within one working day. On top of that there’s a live session every weekend — bring your build, we debug your errors on the call, and every session is recorded. Support runs for a full year.' },
  { q: 'Refunds?',
    a: 'Seven days, no questions. Start Module 1; if it isn’t for you, email us and we refund in full.' },
]

export default function HomePage() {
  // Real student stories, on camera — the same Bunny embeds published on
  // /mastery (the /api/video allowlist already covers these GUIDs).
  const stories = [
    { guid: '7e642dff-ebb7-48a5-9da5-e94190716a56', name: 'Mohsin', where: 'United Kingdom',
      line: 'A finance professional with no software background. He built his first website and AI agent in the program and deployed it live.' },
    { guid: '2c5ac1cf-9643-4265-9c0a-72af532a84a9', name: 'DSP student', where: 'Pakistan',
      line: 'Earned PKR 60,000 from AI work before he had even finished the bootcamp.' },
  ].map((v) => ({ ...v, src: bunnyConfigured ? `/api/video/${v.guid}` : null })).filter((v) => v.src)

  const certs = [
    { img: '/mastery/cert-claude-101.jpg', name: 'Claude 101' },
    { img: '/mastery/cert-claude-code-101.jpg', name: 'Claude Code 101' },
    { img: '/mastery/cert-claude-cowork.jpg', name: 'Introduction to Claude Cowork' },
  ]

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(faqs)) }}
      />

      {/* ============ 01 · HERO ============ */}
      <section className="hero-dark home-hero">
        <div className="wrap">
          <h1>Don&apos;t just use AI. <em>Build the employee.</em></h1>
          <p className="sub">
            DSP is where AI Employees come from. Learn to build one from zero in{' '}
            {mastery.shortName} — the same method our team uses to build them for
            businesses worldwide.
          </p>
          <div className="hero-ctas">
            <TrackedLink className="btn btn-gold" href="/mastery/enrol" event="begin_enrol" params={{ cta: 'home_hero' }}>
              Enrol — {mastery.priceDisplay}
            </TrackedLink>
          </div>
          <p className="hero-note">
            Running a business?{' '}
            <TrackedLink href="/ai-employees" event="agents_cta_click" params={{ cta: 'home_hero_hire' }}>
              Hire an AI Employee instead →
            </TrackedLink>
          </p>
        </div>
      </section>

      {/* ============ 02 · EVOLUTION ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The evolution</p>
            <h2>Software stopped waiting for instructions.</h2>
            <p>Five steps from a page that displays to a team that works. Most businesses are still on step one.</p>
          </div>
          <Evolution />
        </div>
      </section>

      {/* ============ 03 · WHAT IS ONE ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Anatomy</p>
            <h2>What an AI Employee is made of.</h2>
            <p>Not magic — parts. Eight of them, and you learn to build every one.</p>
          </div>
          <div className="grid-4">
            {anatomy.map((a) => (
              <div className="card" key={a.part}>
                <h3 style={{ fontSize: '1.02rem' }}>{a.part}</h3>
                <p style={{ fontSize: '.92rem' }}>{a.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 04 · IN THE WILD ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">In the wild</p>
            <h2>The jobs they already do.</h2>
          </div>
          <div className="grid-4">
            {useCases.map((u) => (
              <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }} key={u.job}>
                <h3 style={{ fontSize: '1.02rem' }}>{u.job}</h3>
                <p style={{ fontSize: '.92rem' }}>{u.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 05 · OLD WAY / NEW WAY ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Old way / new way</p>
            <h2>Augment your team. Don&apos;t replace it.</h2>
          </div>
          <div className="grid-2">
            <div className="card">
              <p className="kicker">The old way</p>
              <ul className="check-list">
                <li>Messages after closing time go unanswered until morning.</li>
                <li>Volume grows, so headcount has to grow with it.</li>
                <li>Your best people spend their day on repetitive questions.</li>
              </ul>
            </div>
            <div className="card">
              <p className="kicker">The new way</p>
              <ul className="check-list">
                <li>An AI Employee handles the volume, 24 hours a day.</li>
                <li>Your team handles judgment, relationships, and the moments that matter.</li>
                <li>Complex cases escalate to a human instantly, with full context.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 06 · PROOF ============ */}
      <div className="proof" aria-label="DSPAgentHub results">
        <div className="wrap">
          <ProofCounters />
          <p className="proof-note">
            These are our own numbers, as of{' '}
            {new Date(agency.proof.asOf).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
            The same AI Employee that runs DSP&apos;s sales runs yours.
          </p>
        </div>
      </div>
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Proof</p>
            <h2>Students you can watch, certificates you can check.</h2>
            <p>
              DSP Academy trained {bootcamp.studentsTrained} students across{' '}
              {bootcamp.batchesCompleted} live cohorts before this program was recorded.
            </p>
          </div>
          {stories.length > 0 && (
            <div className="video-grid">
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
          <div className="cert-grid">
            {certs.map((c) => (
              <figure key={c.name}>
                <Image src={c.img} alt={`${c.name} — course completion badge issued by Anthropic`} width={900} height={604} />
                <figcaption>{c.name} · issued by Anthropic</figcaption>
              </figure>
            ))}
          </div>
          <p className="fineprint">
            Results depend on the work you put in. These are individual students, not a promise of income.
          </p>
        </div>
      </section>

      {/* ============ 07 · MASTERY PIVOT ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">{mastery.shortName}</p>
            <h2>Learn to build what we build.</h2>
            <p>
              {mastery.name}: {mastery.modules} modules, {mastery.lectureHours} hours of
              recorded lectures, one real AI Employee built from scratch. {mastery.access}{' '}
              access and {mastery.supportMonths} months of group support —{' '}
              {mastery.priceDisplay}, one time.
            </p>
          </div>
          <div className="hero-ctas">
            <TrackedLink className="btn btn-gold" href="/mastery/enrol" event="begin_enrol" params={{ cta: 'home_pivot' }}>
              Enrol — {mastery.priceDisplay}
            </TrackedLink>
            <TrackedLink className="btn btn-ghost-light" href="/mastery" event="academy_cta_click" params={{ cta: 'home_pivot_curriculum' }}>
              See the full curriculum →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ 08 · WHAT YOU BUILD ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">What you build</p>
            <h2>One working AI Employee, end to end.</h2>
          </div>
          <ol className="flow">
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
        </div>
      </section>

      {/* ============ 09 · WHO IT'S FOR ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Who it&apos;s for</p>
            <h2>Built for people starting from zero.</h2>
          </div>
          <div className="grid-3">
            {audiences.map((a) => (
              <div className="card" key={a.who}>
                <h3 style={{ fontSize: '1.05rem' }}>{a.who}</h3>
                <p style={{ fontSize: '.94rem' }}>{a.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 10 · INSTRUCTOR ============ */}
      <section className="band-dark">
        <div className="wrap split" style={{ alignItems: 'center' }}>
          <div>
            <p className="eyebrow">Your instructor</p>
            <h2>Taught by the founder, not a content team.</h2>
            <p style={{ marginTop: '.9rem' }}>
              Sardar Ghaffar has taught technology since 2002 — in London, the UAE, and
              Pakistan. Google &amp; Anthropic verified AI agentic trainer, founder of the
              Sardar Group of Companies. The curriculum isn&apos;t theory imported from a
              textbook — it&apos;s the working method of a company that ships.
            </p>
            <p style={{ marginTop: '1.1rem' }}>
              <Link href="/about" style={{ color: '#C9D6EC' }}>About DSP and the team →</Link>
            </p>
          </div>
          <div>
            <Image
              src="/mastery/sardar.jpg"
              alt="Sardar Ghaffar, founder of Digital Services Program"
              width={900}
              height={1125}
              style={{ borderRadius: 18, width: '100%', maxWidth: 380, height: 'auto', marginInline: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* ============ 11 · HIRE BAND ============ */}
      <div className="hire-band">
        <div className="wrap">
          <p>Running a business? DSP builds and runs AI Employees for you — live in 7 days.</p>
          <TrackedLink href="/ai-employees" event="hire_band_click" params={{ cta: 'home_hire_band' }}>
            Hire an AI Employee →
          </TrackedLink>
        </div>
      </div>

      {/* ============ 12 · FAQ ============ */}
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

      {/* ============ 13 · FINAL CTA ============ */}
      <section className="band-dark">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Don&apos;t just use AI. Build the employee.</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink className="btn btn-gold" href="/mastery/enrol" event="begin_enrol" params={{ cta: 'home_final' }}>
              Enrol — {mastery.priceDisplay}
            </TrackedLink>
            <TrackedLink
              className="btn btn-ghost-light"
              href={waLink('Hi DSP, I have a question about AI Agent Mastery.')}
              event="whatsapp_cta_click"
              params={{ cta: 'home_final' }}
            >
              <WhatsAppIcon /> WhatsApp Us: {site.whatsappDisplay}
            </TrackedLink>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
