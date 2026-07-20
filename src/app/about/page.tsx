// src/app/about/page.tsx — Sardar Abdul Ghaffar Khan and the company.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { bootcamp, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'About DSP — Founder & Trainers, Digital Services Program' },
  description:
    'Sardar Abdul Ghaffar Khan: 24+ years in IT across London, the UAE, and Pakistan, Google Certified AI Agentic Trainer, Gemini Certified Educator (2025–2028). Meet the trainers behind DSP Academy.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About Sardar Abdul Ghaffar Khan | DSP',
    description:
      'The instructor and engineer behind DSP — 24+ years in IT, taught in London, UAE, and Pakistan.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sardar Abdul Ghaffar Khan',
  jobTitle: 'Co-Founder & Lead Instructor',
  worksFor: { '@type': 'Organization', name: site.name, url: site.url },
  url: `${site.url}/about`,
  knowsAbout: ['AI agents', 'Multi-agent systems', 'AI training', 'Software engineering'],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Certified AI Agentic Trainer',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Gemini Certified Educator (Google for Education, valid 2025–2028)',
      url: 'https://www.credential.net/aae3459a-b0b9-463e-86cd-da7806e00e5d',
    },
  ],
}

const sundasLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sundas Khan',
  jobTitle: 'Co-Founder & Course Director',
  worksFor: { '@type': 'Organization', name: site.name, url: site.url },
  knowsAbout: ['AI agents', 'AI training', 'Curriculum design', 'Psychology', 'Learner engagement'],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'Certified AI Trainer' },
    { '@type': 'EducationalOccupationalCredential', name: 'Gold Medallist, Psychology' },
  ],
}

export default function AboutPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sundasLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1>Built by a small team. <em>Taught live, by all of them.</em></h1>
          <p className="sub">
            Digital Services Program was founded by Sardar Abdul Ghaffar Khan and Sundas Khan,
            DSP&apos;s Course Director.
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
              launched DSP together with Sundas Khan, now DSP&apos;s Course Director, as its
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
            <div className="card dark" style={{ marginTop: '1.2rem' }}>
              <p className="kicker">The company</p>
              <h3>{site.tagline}</h3>
              <p>
                DSP Agents ships production agent systems — including an AI phone-ordering
                platform for US restaurants. DSP Academy has trained {bootcamp.studentsTrained}{' '}
                students across {bootcamp.batchesCompleted} live cohorts, with a new bootcamp
                batch every Monday.
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
                <h3>Sardar Abdul Ghaffar Khan</h3>
                <p style={{ color: 'var(--gold)', fontSize: '.85rem', fontFamily: 'var(--mono)', margin: '.2rem 0 .6rem' }}>Co-Founder &amp; Lead Instructor</p>
                <p>24+ years in IT across London, the UAE, and Pakistan. Google Certified AI Agentic Trainer and Gemini Certified Educator. Teaches every bootcamp and FDE cohort live.</p>
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
                <h3>Sundas Khan</h3>
                <p style={{ color: 'var(--gold)', fontSize: '.85rem', fontFamily: 'var(--mono)', margin: '.2rem 0 .6rem' }}>Co-Founder &amp; Course Director</p>
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
            <Link className="btn btn-primary" href="/academy">Join the Academy</Link>
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
