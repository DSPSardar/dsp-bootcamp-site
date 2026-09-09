// src/app/about/page.tsx — Sardar Ghaffar, Sundus Khan and the company.
// Names come from src/config/site.ts (`founder`, `cofounder`) — the Entity
// Lock's single public identity. The Person nodes are the sitewide ones
// (root layout); this page only adds a ProfilePage-free AboutPage node that
// points at them, so parsers see one founder, not one per page.
import type { Metadata } from 'next'
import { COFOUNDER_ID, ORGANIZATION_ID, PERSON_ID, SCHEMA_CONTEXT, breadcrumbLd, ref } from '@/lib/schema'
import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { bootcamp, cofounder, entity, founder, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'About DSP — Founder & Trainers, Digital Services Program' },
  description:
    'Sardar Ghaffar: 24+ years in IT across London, the UAE, and Pakistan, Google Certified AI Agentic Trainer, Gemini Certified Educator (2025–2028). Meet the founders behind Digital Services Program (DSP), Islamabad.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About Sardar Ghaffar | DSP',
    description:
      'The instructor and engineer behind DSP — 24+ years in IT, taught in London, UAE, and Pakistan.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

// The page node: an AboutPage whose mainEntity is the Organization and whose
// `about` lists the two founders — all three by @id, defined once in the
// root layout's entity graph.
const aboutPageLd = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'AboutPage',
  '@id': `${site.url}/about#webpage`,
  url: `${site.url}/about`,
  name: 'About DSP — Founder & Trainers, Digital Services Program',
  mainEntity: ref(ORGANIZATION_ID),
  about: [ref(PERSON_ID), ref(COFOUNDER_ID)],
  publisher: ref(ORGANIZATION_ID),
}

export default function AboutPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: 'About', path: '/about' }])) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1>Built by a small team. <em>Taught live, by all of them.</em></h1>
          <p className="sub">
            Digital Services Program (DSP) is an AI agents training company and AI agency in
            Islamabad, Pakistan, founded by {founder.name} and {cofounder.name}, DSP&apos;s Course Director.
          </p>
        </div>
      </section>

      {/* ============ BIO ============ */}
      <section>
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">The story</p>
            <h2>From classrooms in London to agents in production.</h2>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              Sardar has spent more than 24 years in the IT industry, teaching and building in
              London, the UAE, and Pakistan. He founded the Sardar Group of Companies, and
              launched DSP together with {cofounder.name}, now DSP&apos;s Course Director, as its
              answer to the AI moment: one division that builds AI agents for clients worldwide,
              and one that trains people to build them.
            </p>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              That combination is deliberate. The instructor teaching you customer discovery ran
              a client scoping call that morning. The curriculum isn&apos;t theory imported from
              a textbook — it&apos;s the working method of a company that ships.
            </p>
            <ul className="check-list" style={{ marginTop: '1.4rem' }}>
              <li><CheckIcon /> 24+ years in the IT industry — London 🇬🇧, UAE 🇦🇪, Pakistan 🇵🇰</li>
              <li><CheckIcon /> Google Certified AI Agentic Trainer</li>
              <li><CheckIcon /> Founder, Sardar Group of Companies</li>
              <li><CheckIcon /> Every DSP class taught live by him — no pre-recorded stand-ins</li>
            </ul>
            <p style={{ marginTop: '1.2rem' }}>
              <Link href={founder.path} style={{ color: 'var(--teal-deep)', fontWeight: 600 }}>Full profile, credentials and everything he has written →</Link>
            </p>
          </div>
          <div>
            <a
              className="card"
              style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none' }}
              href="https://www.credential.net/aae3459a-b0b9-463e-86cd-da7806e00e5d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/gemini-certified-educator-badge.png" alt="Gemini Certified Educator badge issued by Google for Education" width={72} height={72} />
              <span>
                <strong style={{ display: 'block' }}>Gemini Certified Educator</strong>
                <span style={{ fontSize: '.85rem', color: 'var(--navy-soft)' }}>Issued by Google for Education · valid to Oct 2028</span>
                <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--teal-deep)', marginTop: '.3rem' }}>Verify credential ↗</span>
              </span>
            </a>
            <a
              className="card"
              style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none', marginTop: '1.2rem' }}
              href="https://www.kaggle.com/certification/badges/abdulghaffarkhan804/108"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external Kaggle SVG badge, served as-is */}
              <img src="/kaggle-vibecoding-agents-badge.svg" alt="Google/Kaggle 5-Day AI Agents: Intensive Vibe Coding Course certification badge" width={72} height={72} />
              <span>
                <strong style={{ display: 'block' }}>Google/Kaggle: 5-Day AI Agents</strong>
                <span style={{ fontSize: '.85rem', color: 'var(--navy-soft)' }}>Certified by Google — 5-Day AI Agents: Intensive Vibe Coding Course, 2026</span>
                <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--teal-deep)', marginTop: '.3rem' }}>Verify credential ↗</span>
              </span>
            </a>
            <div className="card dark" style={{ marginTop: '1.2rem' }}>
              <p className="kicker">The company</p>
              <h3>{site.tagline}</h3>
              <p>
                DSP Agents ships production agent systems — including an AI phone-ordering
                platform for US restaurants. DSP Academy has taught{' '}
                {entity.studentsEnrolled} students — {bootcamp.batchesCompleted} live cohorts in
                the Agentic Lab, and now DSP AI Agent Mastery, a self-paced program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRAINERS ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Our trainers</p>
            <h2>Every class taught by someone who has done the work.</h2>
            <p>DSP was planned and built by more than one person — every trainer we add since meets the same bar they set.</p>
          </div>
          <div className="grid-2">
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)', display: 'flex', gap: '1.1rem' }}>
              <span
                aria-hidden="true"
                style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gold)', color: 'var(--navy-deep)', display: 'grid', placeItems: 'center', fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}
              >
                SG
              </span>
              <div>
                <h3><Link href={founder.path} style={{ color: 'inherit', textDecoration: 'none' }}>{founder.name}</Link></h3>
                <p style={{ color: 'var(--gold)', fontSize: '.85rem', fontFamily: 'var(--mono)', margin: '.2rem 0 .6rem' }}>{founder.jobTitle}</p>
                <p>24+ years in IT across London, the UAE, and Pakistan. Google Certified AI Agentic Trainer and Gemini Certified Educator. Taught every Agentic Lab cohort live.</p>
              </div>
            </div>
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)', display: 'flex', gap: '1.1rem' }}>
              <span
                aria-hidden="true"
                style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gold)', color: 'var(--navy-deep)', display: 'grid', placeItems: 'center', fontFamily: 'var(--disp)', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}
              >
                SK
              </span>
              <div>
                <h3>{cofounder.name}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '.85rem', fontFamily: 'var(--mono)', margin: '.2rem 0 .6rem' }}>{cofounder.jobTitle}</p>
                <p>
                  Certified AI trainer and gold medallist in psychology, one of the country&apos;s
                  leading AI trainers. Her background in psychology means she teaches to how
                  students actually think and learn, not just what the syllabus says.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="band-dark" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Learn from them, or hire the team.</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-primary" href="/mastery">Explore DSP AI Agent Mastery</Link>
            <Link className="btn btn-ghost-light" href="/agents">Hire DSP Agents</Link>
            <a className="btn btn-gold" href={waLink('Hi DSP, I found you through the About page.')}>
              <WhatsAppIcon /> Say salaam
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
