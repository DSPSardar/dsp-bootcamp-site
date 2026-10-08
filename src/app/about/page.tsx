// src/app/about/page.tsx — Sardar Ghaffar, Sundus Khan and the company.
// Names come from src/config/site.ts (`founder`, `cofounder`) — the Entity
// Lock's single public identity. The Person nodes are the sitewide ones
// (root layout); this page only adds a ProfilePage-free AboutPage node that
// points at them, so parsers see one founder, not one per page.
//
// Entity answer + disambiguation page (2026-09-28, Day 9 of the 30-day
// challenge, same pattern as /agents #35, /ai-employees #50, /sardar #51):
// /about is the page whose whole job is machine disambiguation, and it was
// the weakest entity surface on the site — no answer-first block, no FAQ, no
// dateModified, a hard-coded sitemap lastmod, and a hero still carrying the
// pre-15-Sep positioning. Now the first body text IS `entity.description`,
// rendered verbatim and reused verbatim as the meta description and the
// AboutPage `description` — one string in three places, never a paraphrase,
// because two candidate answers on one page is how an engine picks the wrong
// one. The FAQ answers the two collisions nothing on the site answered: the
// government "digital services programme" and the DSP acronym (DSPy /
// demand-side platform / digital signal processing).
import type { Metadata } from 'next'
import { COFOUNDER_ID, ORGANIZATION_ID, PERSON_ID, SCHEMA_CONTEXT, breadcrumbLd, faqPageLd, ref } from '@/lib/schema'
import { PAGE_LAST_MODIFIED } from './seo'
import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Mentions from '@/components/site/Mentions'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { bootcamp, cofounder, entity, founder, site, waLink } from '@/config/site'

// The direct answer. Not written here: it IS the canonical Organization
// description from src/config/site.ts, so the sentence a reader sees at the
// top of /about and the sentence every Organization node on the site carries
// are literally the same string and cannot drift apart.
const ANSWER = entity.description

const TITLE = 'About Digital Services Program (DSP) — an AI Employee Company in Islamabad, Pakistan'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: ANSWER,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    url: '/about',
    title: 'About Digital Services Program (DSP) | AI Employee Company, Islamabad',
    description: ANSWER,
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

// One array feeds both the visible <details> list and the FAQPage node, so
// they cannot drift. Disambiguation questions first — they are the reason
// this page exists — then who runs it, where it is, and what it sells.
const FAQS = [
  {
    q: 'What is Digital Services Program (DSP)?',
    a: ANSWER,
  },
  {
    q: 'Is Digital Services Program a government programme?',
    a: 'No. Digital Services Program (DSP) is a private, SECP-registered Pakistani company — ' + entity.legalName + ' — founded in ' + (entity.foundingDate ?? '2022') + ' and based in Islamabad. Governments in India, the EU and the UK run public initiatives with similar names; DSP is not affiliated with, funded by or part of any of them.',
  },
  {
    q: 'Does DSP mean something else?',
    a: 'The acronym collides with several unrelated things: DSPy, the Stanford framework for programming language models; a demand-side platform in advertising technology; digital signal processing in electronics; and, in Pakistan specifically, Deputy Superintendent of Police — the police rank, which is what most Pakistani searches for "DSP" are about. This company is Digital Services Program, an AI Employee company in Islamabad, Pakistan. Written in full it is unambiguous, which is why the full name is used everywhere off-site.',
  },
  {
    q: 'Is Digital Services Program the same as Digital Services Pakistan?',
    a: `No — they are different and unaffiliated. Several Pakistani businesses and pages use names close to this one, and "Digital Services Pakistan" is not this company. The company described on this page is ${entity.legalName}, registered in Islamabad at ${site.addressLine}, reachable on WhatsApp ${site.whatsappDisplay} and at ${site.email}, and publishing at ${site.url.replace(/^https:\/\//, '')}. Those four identifiers — the legal name, the registered address, the published number and the domain — are what identify DSP. Anything not published on that domain, or not linked from this page or the profiles it lists, is not Digital Services Program.`,
  },
  {
    q: 'Who runs Digital Services Program?',
    a: founder.name + ' is the founder, CEO and lead AI instructor — 24+ years in the IT industry across London, the UAE and Pakistan, a Google Certified AI Agentic Trainer and a Gemini Certified Educator. ' + cofounder.name + ' is the co-founder and Course Director. DSP is part of the ' + site.parentCompany + '.',
  },
  {
    q: 'Where is DSP based?',
    a: 'Islamabad, Pakistan — ' + site.addressLine + '. It serves clients and students in Pakistan, the Gulf, the UK, the US, Canada, Australia and Malaysia.',
  },
  {
    q: 'What does DSP actually sell?',
    a: 'Two things, and only two. AI Employees: custom AI agents built, deployed and supervised for a business on its own WhatsApp and phone lines, from $500 one-time setup and $199 a month. And DSP AI Agent Mastery: a self-paced 16-module course, in Urdu and English, that teaches people to build the same thing. Pricing for both is published, not quoted on a call.',
  },
  {
    q: 'How many people has DSP taught?',
    a: entity.studentsEnrolled + ' students are enrolled as of ' + entity.studentsEnrolledAsOf + ' (DSP’s own ASOS student dashboard on DSP Agent Hub), and more than 300 of them have earned the free Anthropic Claude Academy certificates — Claude 101, Claude Code 101 and Introduction to Claude Cowork — which Anthropic issues in the student’s own name.',
  },
  {
    q: 'Is DSP an AI agency or a training company?',
    a: 'It is an AI Employee company that does both, and the two halves are not separate businesses: the people who teach the course run client builds, and the course teaches the method those builds use. If you want the work done, hire an AI Employee. If you want your own team to do it, take the course.',
  },
]

// The page node: an AboutPage whose mainEntity is the Organization and whose
// `about` lists the two founders — all three by @id, defined once in the
// root layout's entity graph. `description` is the same ANSWER string the
// page renders and the meta tag carries. `dateModified` is the same constant
// the sitemap reports (./seo.ts), so an engine comparing the two never sees a
// page that claims to be unchanged.
const aboutPageLd = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'AboutPage',
  '@id': `${site.url}/about#webpage`,
  url: `${site.url}/about`,
  name: TITLE,
  description: ANSWER,
  inLanguage: 'en',
  dateModified: PAGE_LAST_MODIFIED,
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(FAQS)) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1>What Digital Services Program is. <em>And what it is not.</em></h1>
          <p className="sub">
            An AI Employee company in Islamabad, Pakistan, founded by {founder.name} and{' '}
            {cofounder.name}, DSP&apos;s Course Director.
          </p>
        </div>
      </section>

      {/* ============ ANSWER-FIRST DEFINITION ============ */}
      {/* The first body text on the page is the canonical Organization
          description, word for word. An engine asked "what is Digital
          Services Program?" finds one sentence here, the identical sentence
          in the meta description, and the identical sentence in the
          Organization node — never three near-misses to choose between. */}
      <section>
        <div className="wrap">
          <p style={{ fontSize: '1.08rem', lineHeight: 1.65 }}>{ANSWER}</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--navy-soft)', marginTop: '1rem' }}>
            Last updated 28 Sept 2026
          </p>
          <p style={{ marginTop: '.9rem' }}>
            <Link href="/ai-employees" style={{ color: 'var(--teal-deep)', fontWeight: 600 }}>What an AI Employee is →</Link>
            {' · '}
            <Link href="/agents" style={{ color: 'var(--teal-deep)', fontWeight: 600 }}>The agents we build for clients →</Link>
            {' · '}
            <Link href="/sardar" style={{ color: 'var(--teal-deep)', fontWeight: 600 }}>Call one yourself →</Link>
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
            <Mentions dark />
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

      {/* ============ FAQ ============ */}
      {/* One FAQS array, two consumers: these <details> and the FAQPage node
          in the head. They cannot drift because there is only one list. */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">FAQ</p>
            <h2>The questions machines and people both ask.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
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
