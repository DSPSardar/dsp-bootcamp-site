// src/app/academy/fde/page.tsx — flagship Forward Deployed Engineer program page.
import type { Metadata } from 'next'
import SiteShell from '@/components/site/SiteShell'
import FdeApplicationForm from '@/components/site/FdeApplicationForm'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { fde, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'Forward Deployed Engineer Course — 30 Days | DSP Academy' },
  description:
    'Become a Forward Deployed Engineer in 30 days. The only FDE program in Pakistan — curriculum designed by engineers from Google and Facebook, live mentorship, a real client capstone. 20 seats per batch.',
  alternates: { canonical: '/academy/fde' },
  openGraph: {
    type: 'website',
    url: '/academy/fde',
    title: 'Become a Forward Deployed Engineer in 30 Days | DSP Academy',
    description:
      'The most wanted AI job in the world. 30 days, 20 seats, live mentorship, real client work. Curriculum designed by engineers from Google and Facebook.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

const courseLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Forward Deployed Engineer (FDE) Program',
  description:
    '30-day zero-to-master Forward Deployed Engineer program. Customer discovery, POC-to-production delivery, AI systems architecture, multi-agent orchestration, FDE interview prep, and a live client capstone. Curriculum designed by engineers from Google and Facebook.',
  provider: {
    '@type': 'Organization',
    name: 'Digital Services Program',
    url: site.url,
  },
  offers: {
    '@type': 'Offer',
    price: String(fde.feePkr),
    priceCurrency: 'PKR',
    availability: 'https://schema.org/InStock',
    url: `${site.url}/academy/fde#fee`,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    startDate: fde.nextBatchDate,
    instructor: { '@type': 'Person', name: 'Sardar Abdul Ghaffar Khan' },
  },
}

const WEEKS = [
  {
    wk: 'Week 1',
    title: 'Customer Discovery & Scoping',
    desc: 'FDEs don’t wait for requirements — they extract them. You learn the 5-column discovery framework and run live roleplays: you play the engineer, we play the difficult client. By Friday you can walk into a room with a stranger’s business problem and walk out with a scoped AI project.',
    outcome: 'You can scope a real AI engagement from a cold conversation.',
  },
  {
    wk: 'Week 2',
    title: 'POC → Pilot → Production',
    desc: 'The FDE’s core loop. You build a proof of concept fast, harden it into a pilot, and learn what production actually demands: enterprise constraints, security reviews, data boundaries, and the stakeholder communication that keeps a project alive when it gets hard.',
    outcome: 'You can carry one project through all three stages — and explain it to a CFO.',
  },
  {
    wk: 'Week 3',
    title: 'AI Systems Architecture',
    desc: 'The deep technical week: harness engineering, guardrails, evals, and multi-agent orchestration. You design agent systems the way the top labs do — tools, memory, handoffs, failure modes — and defend your architecture in review, live.',
    outcome: 'You can design and defend a multi-agent architecture under questioning.',
  },
  {
    wk: 'Week 4',
    title: 'Case Studies, Interview Prep & Live Client Capstone',
    desc: 'Real case studies — RAG, multi-agent, fine-tuning — then FDE interview preparation modelled on Palantir, OpenAI, Anthropic, and Google Cloud processes. You finish on a live client capstone: real stakeholder, real deadline, real deployment. Then certification.',
    outcome: 'You leave with client work on your record, not just a certificate.',
  },
]

export default function FdePage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <span className="hero-pill"><span className="dot" aria-hidden="true"></span> {fde.batchCadence} · Next: {fde.nextBatchDisplay} · {fde.seats} seats</span>
          <h1>Become a <em>Forward Deployed Engineer</em> in 30 days.</h1>
          <p className="sub">
            The FDE is the highest-demand AI role in the world right now — the engineer who sits
            with the customer, scopes the problem, and ships the AI system that solves it.
            OpenAI, Anthropic, Palantir, and Google Cloud are all hiring for it.
          </p>
          <div className="logo-strip" aria-label="Companies hiring Forward Deployed Engineers">
            <span>OpenAI</span><span>Anthropic</span><span>Palantir</span><span>Google Cloud</span>
          </div>
          <div className="seat-counter" role="note">
            <span className="num">{fde.seats}</span>
            <span className="lbl">seats per batch. Every application is personally reviewed. When they&apos;re gone, you wait a month.</span>
          </div>
          <div className="hero-ctas">
            <TrackedLink className="btn btn-gold" href="#apply" event="academy_cta_click" params={{ cta: 'fde_hero_apply' }}>
              Apply for the next batch
            </TrackedLink>
            <TrackedLink
              className="btn btn-ghost-light"
              href={waLink('Hi DSP, I have a question about the FDE program.')}
              event="whatsapp_cta_click"
              params={{ cta: 'fde_hero_whatsapp' }}
            >
              <WhatsAppIcon /> Ask a question first
            </TrackedLink>
          </div>
          <p className="hero-note">30 days · zero to master · the only program of its kind in Pakistan</p>
        </div>
      </section>

      {/* ============ WHY THIS ROLE ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The role</p>
            <h2>The engineer every AI company is fighting to hire.</h2>
            <p>
              Models are everywhere. People who can deploy them inside a real business — sit with
              the customer, handle the mess, ship the system — are not. That gap has a job title:
              Forward Deployed Engineer. This program exists to put you in it.
            </p>
          </div>
          <div className="grid-3">
            <div className="card">
              <p className="kicker">What an FDE does</p>
              <h3>Ships AI where it&apos;s hardest</h3>
              <p>Inside real companies, with real constraints, real data, and real stakeholders — not in a sandbox.</p>
            </div>
            <div className="card">
              <p className="kicker">Why demand exploded</p>
              <h3>Labs sell outcomes now</h3>
              <p>Frontier AI companies win enterprise deals by deploying engineers alongside customers. FDEs are how those deals get delivered.</p>
            </div>
            <div className="card dark">
              <p className="kicker">Your edge</p>
              <h3>Trained on the full loop</h3>
              <p>Discovery → POC → pilot → production → architecture → interview. Most engineers know one slice. You&apos;ll own the whole loop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CURRICULUM ============ */}
      <section className="band-dark" id="curriculum" style={{ borderTop: '1px solid var(--line-dark)' }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Curriculum</p>
            <h2>Four weeks. Zero to master.</h2>
            <p>
              Designed by engineers from Google and Facebook. Every week ends with something you
              can do that you couldn&apos;t do the Monday before.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--line-dark)', borderRadius: 'var(--radius)', padding: '0 1.6rem' }}>
            {WEEKS.map((w) => (
              <div className="curric-row" key={w.wk} style={{ borderColor: 'var(--line-dark)' }}>
                <span className="wk" style={{ color: 'var(--gold)' }}>{w.wk}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                  <p className="outcome" style={{ color: 'var(--gold)' }}>&ldquo;{w.outcome}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DIFFERENTIATOR ============ */}
      <section>
        <div className="wrap split">
          <div>
            <p className="eyebrow">Why this works</p>
            <h2>Content exists in the world. Transformation doesn&apos;t.</h2>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              Every lecture on this syllabus exists somewhere on YouTube for free. What doesn&apos;t
              exist is what actually changes you: live mentorship, real roleplays with hard
              feedback, a real client project with a real deadline, and personal supervision by
              Sardar through all 30 days. That&apos;s what {fde.feeDisplay} buys — not information,
              transformation.
            </p>
            <ul className="check-list">
              <li><CheckIcon /> Live roleplays — you practise client conversations until they stop being scary</li>
              <li><CheckIcon /> A real client capstone — deployed work you can point to in interviews</li>
              <li><CheckIcon /> Personal supervision by Sardar — every project reviewed, every week</li>
              <li><CheckIcon /> Interview prep modelled on Palantir, OpenAI, Anthropic &amp; Google Cloud</li>
            </ul>
          </div>
          <div className="card dark">
            <p className="kicker">The honest pitch</p>
            <h3>This is not a video course.</h3>
            <p>
              If you want lectures, save your money — they&apos;re free online. If you want to be
              the engineer a company trusts with a deployment, that takes reps, feedback, and
              someone who won&apos;t let you plateau. That&apos;s what we do. {fde.seats} people
              a month, no more.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FEE + APPLICATION ============ */}
      <section className="band-dark" id="fee">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">Fee &amp; admission</p>
            <h2>One fee. A different career.</h2>
          </div>
          <div className="price-card">
            <p className="big">{fde.feeDisplay} <small>one-time</small></p>
            <p className="per">{fde.batchCadence} · Next: {fde.nextBatchDisplay} · {fde.seats} seats</p>
            <ul className="includes">
              <li><CheckIcon /> 30 days, zero to master — full FDE curriculum</li>
              <li><CheckIcon /> Live mentorship &amp; roleplays, not recordings</li>
              <li><CheckIcon /> Real client capstone project, deployed</li>
              <li><CheckIcon /> FDE interview preparation &amp; certification</li>
              <li><CheckIcon /> Personal supervision by Sardar, all 30 days</li>
            </ul>
            <p className="price-note">
              <strong>Bootcamp alumni:</strong> graduates of the 7-day bootcamp get
              {' '}{fde.alumniCreditDisplay} credit toward the FDE fee.
            </p>
          </div>
        </div>
      </section>

      <section id="apply">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Apply</p>
            <h2>Apply for the next batch.</h2>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              {fde.seats}{' '}seats. Applications are reviewed personally — we&apos;re selecting
              for drive and commitment, not existing skill. Zero to master means zero is a valid
              starting point.
            </p>
            <ul className="check-list">
              <li><CheckIcon /> Reply within 24 hours on WhatsApp</li>
              <li><CheckIcon /> Short conversation before any payment</li>
              <li><CheckIcon /> Next batch starts {fde.nextBatchDisplay}</li>
            </ul>
          </div>
          <FdeApplicationForm />
        </div>
      </section>
    </SiteShell>
  )
}
