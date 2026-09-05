// src/app/sardar-ghaffar/page.tsx — the founder's entity page.
//
// Corroboration Engine, Day 1 (Entity Lock, 2026-09-06). This is the ONE URL
// the founder's Person node (src/lib/schema.ts personNode → PERSON_ID) points
// at, and the target of every byline on the site. Its job is machine
// disambiguation as much as reading: the same name, title, one-sentence
// description and credential links that appear on /about, /mastery and the
// off-site profiles (LinkedIn, YouTube, GitHub), plus everything he has
// written on this site, so an answer engine that asks "who is Sardar
// Ghaffar?" finds one consistent answer with verifiable links.
//
// Every fact here comes from src/config/site.ts (`founder`, `entity`) or is
// visible elsewhere on the site — nothing is claimed that a visitor cannot
// verify. The Urdu paragraph is real content for the Urdu-speaking audience
// (lang="ur"), not decoration.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { entity, founder, mastery, site, socials, waLink } from '@/config/site'
import { getAllPosts } from '@/lib/posts'
import { ORGANIZATION_ID, PERSON_ID, SCHEMA_CONTEXT, breadcrumbLd, ref } from '@/lib/schema'
import { PAGE_LAST_MODIFIED } from './seo'

const CANONICAL = `${site.url}${founder.path}`
const TITLE = `${founder.name} — Founder & Lead Instructor, Digital Services Program (DSP)`
const DESCRIPTION = founder.description

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: founder.path },
  openGraph: {
    type: 'profile',
    url: founder.path,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: founder.image, width: 640, height: 800, alt: `${founder.name}, founder and lead instructor, Digital Services Program` }],
  },
}

// ProfilePage whose mainEntity is the sitewide Person node (defined in the
// root layout's entity graph) — this page does not redefine him.
const profilePageLd = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'ProfilePage',
  '@id': `${CANONICAL}#webpage`,
  url: CANONICAL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: ['en', 'ur'],
  dateModified: PAGE_LAST_MODIFIED,
  mainEntity: ref(PERSON_ID),
  about: ref(PERSON_ID),
  publisher: ref(ORGANIZATION_ID),
}

const frameworks = [
  { name: 'Agent = Claude + Job Description + Tools + Loop', what: 'The four-part formula every DSP build starts from.' },
  { name: 'The 7-Part Job Description', what: 'Role, Goal, Audience, Tone, Steps, Rules, Examples — how a system prompt is written at DSP.' },
  { name: 'The Memory Ladder', what: 'From a single prompt to RAG: which kind of memory an agent needs, and when.' },
  { name: 'The Agent Idea Filter', what: 'The test an idea passes before anyone builds it.' },
  { name: 'One Agent, Many Clients', what: 'The multi-tenant model behind DSP’s own AI Employees.' },
  { name: 'The AI Employee', what: 'An agent with a job, tools and a loop, deployed to a live URL — the project every Mastery student ships.' },
] as const

export default function SardarGhaffarPage() {
  const posts = getAllPosts()

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: founder.name, path: founder.path }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageLd) }} />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap split" style={{ alignItems: 'center' }}>
          <div>
            <p className="eyebrow">{founder.jobTitle}</p>
            <h1>{founder.name}</h1>
            <p className="sub">{founder.description}</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href={mastery.url}>Learn from him: {mastery.shortName}</Link>
              <a className="btn btn-ghost-light" href={founder.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <div style={{ maxWidth: 360, justifySelf: 'center' }}>
            <Image
              src={founder.image}
              alt={`${founder.name}, founder and lead instructor, Digital Services Program`}
              width={640}
              height={800}
              priority
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius)' }}
            />
          </div>
        </div>
      </section>

      {/* ============ FACTS ============ */}
      <section>
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Who he is</p>
            <h2>Teaching technology since 2002. Building AI agents since they existed.</h2>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              {founder.name} (full name {founder.alternateName}) founded {site.name} in {site.city},{' '}
              {site.country}, together with its Course Director, Sundus Khan. DSP has two divisions:
              DSP Agents builds AI Employees for businesses worldwide, and DSP Academy teaches people to
              build them — today through {mastery.name}, a self-paced program taught in Urdu and English.
            </p>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              He teaches every DSP class himself. Students describe an agent in plain English and Claude
              writes the code — the method DSP calls Vibe Coding — and every student finishes with an AI
              Employee running at a live URL.
            </p>
            <ul className="check-list" style={{ marginTop: '1.4rem' }}>
              <li><CheckIcon /> Founder &amp; Lead Instructor, Digital Services Program (DSP), Islamabad</li>
              <li><CheckIcon /> Google Certified AI Agentic Trainer · Gemini Certified Educator (2025–2028)</li>
              <li><CheckIcon /> Anthropic (Claude)-verified educator</li>
              <li><CheckIcon /> 24+ years in IT — London 🇬🇧, UAE 🇦🇪, Pakistan 🇵🇰; teaching since 2002</li>
              <li><CheckIcon /> Founder, {site.parentCompany}</li>
              <li><CheckIcon /> Teaches in Urdu and English to students in {entity.areaServed.length} countries</li>
            </ul>
          </div>
          <div>
            <a
              className="card"
              style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none' }}
              href={founder.credentials[0].url}
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
              href={founder.credentials[1].url}
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
              <p className="kicker">Find him elsewhere</p>
              <ul className="check-list" style={{ marginTop: 0 }}>
                <li><a href={founder.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>LinkedIn — {founder.name}</a></li>
                <li><a href={socials.youtube} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>YouTube — @DigitalServicesProgram</a></li>
                <li><a href={socials.github} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>GitHub — DSPSardar</a></li>
                <li><a href={socials.facebook} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>Facebook — Digital Services Program</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ URDU ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">اردو میں</p>
          </div>
          <p lang="ur" dir="rtl" style={{ fontSize: '1.2rem', lineHeight: 1.9, maxWidth: 720 }}>
            سردار غفار ڈیجیٹل سروسز پروگرام (DSP) اسلام آباد کے بانی اور لیڈ انسٹرکٹر ہیں۔ وہ 2002 سے ٹیکنالوجی پڑھا رہے ہیں اور لندن، متحدہ عرب امارات اور پاکستان میں 24 سال سے زیادہ آئی ٹی کا تجربہ رکھتے ہیں۔ گوگل اور اینتھروپک (Claude) سے تصدیق شدہ AI ٹرینر ہیں اور DSP AI Agent Mastery میں اردو اور انگریزی میں سکھاتے ہیں کہ بغیر کوڈنگ سیکھے AI ایجنٹ کیسے بنائے، لانچ کیے اور بیچے جاتے ہیں۔
          </p>
        </div>
      </section>

      {/* ============ FRAMEWORKS ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">What he teaches</p>
            <h2>The DSP frameworks.</h2>
            <p>Named, repeatable methods every DSP student learns and every DSP build uses.</p>
          </div>
          <div className="grid-2">
            {frameworks.map((f) => (
              <div className="card" key={f.name}>
                <h3>{f.name}</h3>
                <p>{f.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WRITING ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Everything he has written here</p>
            <h2>{posts.length} articles on the DSP blog.</h2>
            <p>Plus the course itself: <Link href={mastery.url} style={{ color: 'var(--gold)' }}>{mastery.name}</Link> and the <Link href="/channelops#course" style={{ color: 'var(--gold)' }}>ChannelOps course</Link>.</p>
          </div>
          <ul style={{ columns: 2, columnGap: '2rem', listStyle: 'none', padding: 0, margin: 0 }}>
            {posts.map((p) => (
              <li key={p.slug} style={{ breakInside: 'avoid', padding: '.35rem 0', borderBottom: '1px solid var(--line-dark)' }}>
                <Link href={`/blog/${p.slug}`} style={{ color: '#fff', textDecoration: 'none' }}>{p.title}</Link>
                <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '.72rem', color: '#C9D6EC' }}>{p.category} · <time dateTime={p.date}>{p.date.slice(0, 10)}</time></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Learn from him, or hire the team.</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-primary" href={mastery.url}>Explore {mastery.shortName}</Link>
            <Link className="btn btn-ghost" href="/agents">Hire DSP Agents</Link>
            <a className="btn btn-gold" href={waLink(`Hi DSP, I read about ${founder.name}.`)}>
              <WhatsAppIcon /> Say salaam
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
