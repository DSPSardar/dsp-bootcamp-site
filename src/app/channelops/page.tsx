// src/app/channelops/page.tsx — ChannelOps: YouTube channel cleanup,
// as a service or as a course. Copy follows the launch spec; the
// human-approval rule repeats in the hero, the system section, and the
// FAQ deliberately — it is the differentiator.
import type { Metadata } from 'next'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { channelops, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'ChannelOps by DSP — AI Agents That Fix Your YouTube Channel' },
  description:
    'Most business channels have years of videos with no tags, no playlists, broken titles, and the wrong language declared. ChannelOps fixes that — with AI agents, a human approving every change. As a monthly service, or as a one-week course.',
  alternates: { canonical: '/channelops' },
  openGraph: {
    type: 'website',
    url: '/channelops',
    title: 'ChannelOps by DSP — your YouTube channel, fixed by AI agents',
    description:
      'Audit, SEO, thumbnails, transcripts, publishing — five agents, one human in charge. Learn it, or have it done.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChannelOps by DSP — your YouTube channel, fixed by AI agents',
    description:
      'Audit, SEO, thumbnails, transcripts, publishing — five agents, one human in charge. Learn it, or have it done.',
    images: ['/og-card.png'],
  },
}

const serviceHref = waLink('Hi DSP, I want my YouTube channel audited by ChannelOps.')
const courseHref = waLink('Hi DSP, I want to reserve a seat in the ChannelOps course.')
const finalHref = waLink('Hi DSP, here is my YouTube channel link:')

const auditFindings = [
  { label: 'videos in no playlist', bars: 8, severity: 'high' },
  { label: 'near-empty descriptions', bars: 6, severity: 'high' },
  { label: 'titles truncating on mobile', bars: 4, severity: 'medium' },
  { label: 'wrong language declared', bars: 3, severity: 'medium' },
  { label: 'videos with no tags', bars: 2, severity: 'medium' },
]

const beforeAfter = [
  ['Videos sitting alone, unplayed', 'Themed playlists, every video placed'],
  ['Metadata in the wrong language for the audience', 'Every video tagged in the language it’s actually in'],
  ['One-line or empty descriptions', 'Every description rewritten with chapters + CTA'],
  ['Auto-grabbed frames as thumbnails', 'Custom thumbnails on one visual system'],
  ['Titles truncating on mobile', 'Every title sized for a phone screen'],
]

const agents = [
  { name: 'Audit', desc: 'Reads every video, flags everything broken. Read-only.' },
  { name: 'SEO', desc: 'Proposes new titles, tags, descriptions. Proposes, never applies.' },
  { name: 'Thumbnails', desc: 'Generates the design; a human writes the hook line.' },
  { name: 'Transcripts', desc: 'Urdu-aware transcription, chapters, captions.' },
  { name: 'Publish', desc: 'Applies approved changes only, inside YouTube’s daily quota, with a backup taken first.' },
]

const faqs = [
  {
    q: 'Is this the “faceless YouTube automation” thing?',
    a: 'No. We don’t generate videos, and we don’t mass-upload anything. We fix and operate what you already publish. Every change is approved by a human before it touches your channel.',
  },
  {
    q: 'Do I need to know how to code (course)?',
    a: 'No. Claude Code writes the code. You learn to direct it, review it, and approve it — which is the actual job.',
  },
  {
    q: 'Is my channel safe (service)?',
    a: 'A full backup is taken before anything changes, changes go live only after you approve them on WhatsApp, and deleting anything is off the table entirely.',
  },
  {
    q: 'What does the service cost?',
    a: 'It depends on channel size. The audit conversation is free and takes ten minutes on WhatsApp.',
  },
  {
    q: 'Why is YouTube’s API free — is there a catch?',
    a: 'Google gives every developer a free daily allowance. The catch is it’s small, and using it well is a skill. That skill is half of what the course teaches.',
  },
]

export default function ChannelOpsPage() {
  return (
    <SiteShell>
      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap split">
          <div>
            <p className="eyebrow">ChannelOps by DSP</p>
            <h1>Your YouTube channel is losing money <em>quietly</em>.</h1>
            <p className="sub">
              Most business channels have years of videos with no tags, no playlists, broken
              titles, and the wrong language declared. YouTube can&apos;t recommend what it
              can&apos;t understand. ChannelOps fixes that — with AI agents, a human approving
              every change.
            </p>
            <div className="hero-ctas">
              <TrackedLink className="btn btn-primary" href={serviceHref} event="channelops_service_cta" params={{ cta: 'hero_fix' }}>
                <WhatsAppIcon /> Fix my channel →
              </TrackedLink>
              <TrackedLink className="btn btn-gold" href="#course" event="channelops_course_cta" params={{ cta: 'hero_teach' }}>
                Teach me to do it →
              </TrackedLink>
            </div>
          </div>
          {/* minWidth 0 lets the 1fr grid column shrink below the nowrap
              audit labels' min-content width on small screens */}
          <div style={{ minWidth: 0 }}>
            <div
              className="card"
              style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', lineHeight: 2, borderColor: 'rgba(212,175,55,.45)', color: 'var(--navy)', overflow: 'hidden' }}
              role="img"
              aria-label="Sample channel audit report listing common problems: videos in no playlist, near-empty descriptions, titles truncating on mobile, wrong language declared, videos with no tags"
            >
              <p style={{ letterSpacing: '.1em', color: 'var(--teal-deep)', marginBottom: '.6rem' }}>
                CHANNEL AUDIT · sample report
              </p>
              {auditFindings.map((f) => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '.7rem' }}>
                  <span style={{ flex: '1 1 auto', minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.label}</span>
                  <span aria-hidden="true" style={{ display: 'inline-flex', gap: 2, flex: 'none' }}>
                    {Array.from({ length: f.bars }).map((_, i) => (
                      <i key={i} style={{ width: 7, height: 12, background: f.severity === 'high' ? 'var(--gold)' : 'var(--teal)', borderRadius: 1 }} />
                    ))}
                  </span>
                  <span style={{ flex: 'none', width: '4.2em', color: f.severity === 'high' ? 'var(--gold-dark)' : 'var(--teal-deep)' }}>{f.severity}</span>
                </div>
              ))}
              <p style={{ marginTop: '.6rem', color: 'var(--navy-soft)' }}>→ full report generated in minutes</p>
            </div>
            <p style={{ marginTop: '.8rem', fontSize: '.88rem', color: '#9FB0CE' }}>
              A sample of what the audit finds. These are the problems sitting on almost every
              business channel — yours included.
            </p>
          </div>
        </div>
      </section>

      {/* ============ WHO THIS IS FOR ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Two ways in</p>
            <h2>Learn it, or have it done.</h2>
          </div>
          <div className="grid-2">
            <div className="card" style={{ borderColor: 'rgba(212,175,55,.55)' }}>
              <p className="kicker" style={{ color: 'var(--gold-dark)' }}>For builders</p>
              <h3>The ChannelOps Course</h3>
              <p>
                Build all five agents yourself in one week — audit, SEO, thumbnails, transcripts,
                publishing — on a real channel, with Claude Code writing the code and you in
                command. Leave with a working system and your first client report.
              </p>
              <ul className="check-list">
                <li><CheckIcon /> 5 live classes + weekend capstone on a real channel</li>
                <li><CheckIcon /> You keep everything you build</li>
                <li><CheckIcon /> Bootcamp graduates get priority seats</li>
              </ul>
              <TrackedLink className="btn btn-gold" href="#course" event="channelops_course_cta" params={{ cta: 'door_builders' }}>
                See the course →
              </TrackedLink>
            </div>
            <div className="card" style={{ borderColor: 'rgba(2,128,144,.55)' }}>
              <p className="kicker">For businesses</p>
              <h3>ChannelOps as a service</h3>
              <p>
                You have a channel. You don&apos;t have time. We audit it, fix the metadata,
                organize the playlists, and send you a before/after report every month. You
                approve every change on WhatsApp before it goes live.
              </p>
              <ul className="check-list">
                <li><CheckIcon /> Full audit in the first week</li>
                <li><CheckIcon /> Nothing changes without your yes</li>
                <li><CheckIcon /> Cancel any month</li>
              </ul>
              <TrackedLink className="btn btn-primary" href={serviceHref} event="channelops_service_cta" params={{ cta: 'door_businesses' }}>
                <WhatsAppIcon /> Get your channel audited →
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROOF ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The receipts</p>
            <h2>What a cleanup delivers.</h2>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Before</th>
                  <th scope="col">After</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map(([before, after]) => (
                  <tr key={before}>
                    <td>{before}</td>
                    <td><span className="tick">{after}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1.6rem', color: 'var(--navy-soft)', fontSize: '.95rem' }}>
            Built and battle-tested on a real channel before it was ever offered to a client —
            every mistake was made on our own time, not yours.
          </p>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The system</p>
            <h2>Five agents. One human in charge.</h2>
          </div>
          <div>
            {agents.map((a, i) => (
              <div key={a.name} className="curric-row" style={{ borderTopColor: 'var(--line-dark)' }}>
                <span className="wk" style={{ color: 'var(--gold)' }}>0{i + 1}</span>
                <div>
                  <h3>{a.name}</h3>
                  <p style={{ color: '#C9D6EC' }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '2rem', fontSize: '1.25rem', fontFamily: 'var(--disp)', fontWeight: 600, color: 'var(--gold)' }}>
            Nothing writes to a channel without a human saying yes. That rule is the product.
          </p>
        </div>
      </section>

      {/* ============ THE COURSE ============ */}
      <section id="course">
        <div className="wrap split">
          <div>
            <p className="eyebrow">For builders</p>
            <h2>One week. Five agents. A real channel.</h2>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              Five live Zoom classes, Mon–Fri 9–10 PM PKT, plus a weekend capstone where every
              student audits a real outside channel — a local business, a school, an NGO — and
              hands the owner a report.
            </p>
            <div className="hero-ctas">
              <TrackedLink className="btn btn-gold" href={courseHref} event="channelops_course_cta" params={{ cta: 'course_reserve' }}>
                <WhatsAppIcon /> Reserve a seat →
              </TrackedLink>
            </div>
          </div>
          <div className="card dark">
            <p className="kicker">The ChannelOps Course</p>
            <h3>5 live classes + weekend capstone</h3>
            <ul className="check-list">
              <li><CheckIcon /> {channelops.feeDisplay} one-time</li>
              <li><CheckIcon /> New batch monthly · limited seats</li>
              <li><CheckIcon /> Bootcamp alumni: {channelops.alumniFeeDisplay}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ WHO'S BEHIND IT ============ */}
      <section className="band-dark" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Track record</p>
            <h2>Taught by the people who ran it.</h2>
            <p>
              ChannelOps comes from Digital Services Program — an SECP-registered AI agent
              company in Islamabad. Built by Sardar Ghaffar: 24+ years in IT, Google &amp;
              Kaggle certified in agentic AI, Google Gemini Educator, and Anthropic-verified
              trainer. The system was built and battle-tested in production before it was ever
              offered to anyone else.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Questions</p>
            <h2>Asked every time.</h2>
          </div>
          <div style={{ maxWidth: '46rem' }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ borderTop: '1px solid var(--line)', padding: '1.3rem 0' }}>
                <h3 style={{ fontSize: '1.08rem' }}>{f.q}</h3>
                <p style={{ color: 'var(--navy-soft)', fontSize: '.96rem', marginTop: '.4rem' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="band-dark" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Ten minutes on WhatsApp. Then a number, not a pitch.</h2>
          <p style={{ maxWidth: '36rem', margin: '.8rem auto 0' }}>
            Send us your channel link. We&apos;ll tell you what&apos;s broken and what it would
            take to fix — honestly, even if the answer is &ldquo;your channel is fine.&rdquo;
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink className="btn btn-primary" href={finalHref} event="channelops_whatsapp_cta" params={{ cta: 'final' }}>
              <WhatsAppIcon /> WhatsApp us your channel →
            </TrackedLink>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
