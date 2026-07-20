// src/app/page.tsx — dual-engine company homepage.
// The bootcamp landing page this replaced lives on at /academy/bootcamp.
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { bootcamp, fde, restaurantAgent, site, socialProof, socials, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'Digital Services Program — We Build AI Agents. We Train You to Build Them.' },
  description:
    'DSP is an AI agent development company and academy. We build production AI agents for clients worldwide — and train you to build them, from a 7-day bootcamp to a 30-day Forward Deployed Engineer program.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Digital Services Program — We Build AI Agents. We Train You to Build Them.',
    description:
      'AI agents built for the world. Training that takes you from first agent to Forward Deployed Engineer.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSP — We Build AI Agents. We Train You to Build Them.',
    description:
      'AI agent development company + academy. 7 days to your first agent, 30 days to FDE.',
    images: ['/og-card.png'],
  },
}

const demoHref =
  restaurantAgent.calendlyUrl ??
  waLink('Hi DSP, I run a restaurant and want a demo of the AI phone-ordering agent.')

export default function HomePage() {
  return (
    <SiteShell>
      {/* ============ HERO: two engines ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <span className="hero-pill"><span className="dot" aria-hidden="true"></span> Software division + Academy · {site.city}, {site.country} · clients worldwide</span>
          <h1>We build AI agents. <em>We train you to build them.</em></h1>
          <p className="sub">
            One company, two engines. DSP Agents ships production AI agents for businesses around
            the world. DSP Academy turns beginners into agent builders — and agent builders into
            Forward Deployed Engineers.
          </p>
          <div className="hero-ctas">
            <TrackedLink className="btn btn-primary" href="/agents" event="agents_cta_click" params={{ cta: 'home_hero_hire' }}>
              Hire us to build
            </TrackedLink>
            <TrackedLink className="btn btn-gold" href="/academy" event="academy_cta_click" params={{ cta: 'home_hero_academy' }}>
              Join the Academy
            </TrackedLink>
          </div>
          <p className="hero-note">
            Looking for the 7-day bootcamp? <Link href="/academy/bootcamp" style={{ color: 'var(--gold)' }}>It starts Monday →</Link>
          </p>
        </div>
      </section>

      {/* ============ NUMBERS ============ */}
      <div className="stats" aria-label="DSP at a glance">
        <div className="wrap">
          <ul>
            <li><strong>{bootcamp.studentsTrained}</strong><span>Students trained</span></li>
            <li><strong>{socialProof.weeklyReach}</strong><span>{socialProof.weeklyReachLabel}</span></li>
            <li><strong>7 days</strong><span>To your first agent</span></li>
            <li><strong>30 days</strong><span>To FDE, zero to master</span></li>
          </ul>
        </div>
      </div>

      {/* ============ RESTAURANT AGENT SHOWCASE ============ */}
      <section>
        <div className="wrap split">
          <div>
            <p className="eyebrow">Flagship product</p>
            <h2>Hear our agent take a live order.</h2>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              Our multi-tenant phone-ordering AI answers every call to US restaurants — full menu
              knowledge, order capture, straight to the kitchen. No hold music, no missed
              tickets, live in days.
            </p>
            <ul className="check-list">
              <li><CheckIcon /> Answers on the first ring, 24/7</li>
              <li><CheckIcon /> Keeps your number, learns your menu</li>
              <li><CheckIcon /> Plans from ${restaurantAgent.tiers[0].priceUsd}/month</li>
            </ul>
            <div className="hero-ctas">
              <TrackedLink className="btn btn-primary" href={demoHref} event="restaurant_demo_click" params={{ cta: 'home_showcase' }}>
                Get this for your restaurant
              </TrackedLink>
              <Link className="btn btn-ghost" href="/agents/restaurant-ai">Product details</Link>
            </div>
          </div>
          {/* Demo audio placeholder — swap for a real <audio> when the recording is ready */}
          <div className="demo-player" role="img" aria-label="Audio player placeholder: the AI agent taking a live restaurant order">
            <div className="bar">
              <span className="play" aria-hidden="true">
                <svg className="ic" viewBox="0 0 24 24" style={{ width: 22, height: 22 }}><path d="M8 5v14l11-7z" fill="currentColor" stroke="none" /></svg>
              </span>
              <span className="wave" aria-hidden="true">
                {[16, 24, 10, 28, 19, 32, 13, 25, 34, 15, 9, 27, 21, 31, 12, 22, 17, 29, 11, 20, 26, 14, 23, 18].map((h, i) => (
                  <i key={i} style={{ height: h }} />
                ))}
              </span>
              <span>1:04</span>
            </div>
            <p className="cap">▸ &ldquo;Thanks for calling — what can I get started for you?&rdquo; Recording coming here soon.</p>
          </div>
        </div>
      </section>

      {/* ============ THE DSP LADDER ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The DSP Ladder</p>
            <h2>From zero to deployed on real client work.</h2>
          </div>
          <div className="grid-3">
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }}>
              <p className="kicker">Rung 1 · 7 days</p>
              <h3>Your first agent</h3>
              <p>The Vibe Coding Bootcamp. No code, five live classes, and on Day 7 you demo a deployed agent with a live URL. {bootcamp.certificates} certificates.</p>
              <p style={{ marginTop: '1rem' }}><Link href={bootcamp.url} style={{ color: 'var(--gold)', fontWeight: 600 }}>Start here →</Link></p>
            </div>
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }}>
              <p className="kicker">Rung 2 · 30 days</p>
              <h3>Forward Deployed Engineer</h3>
              <p>Zero to master: discovery, POC → production, systems architecture, live client capstone. Only {fde.seats} seats a month.</p>
              <p style={{ marginTop: '1rem' }}><Link href={fde.url} style={{ color: 'var(--gold)', fontWeight: 600 }}>Climb →</Link></p>
            </div>
            <div className="card dark" style={{ background: 'rgba(212,175,55,.08)', borderColor: 'rgba(212,175,55,.45)' }}>
              <p className="kicker">Rung 3 · the payoff</p>
              <h3>Deployed on real client work</h3>
              <p>Top graduates step onto live DSP Agents projects. The academy and the software company are one firm — the ladder ends in real work, not a certificate drawer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FDE SPOTLIGHT ============ */}
      <section>
        <div className="wrap split">
          <div>
            <p className="eyebrow">Flagship course</p>
            <h2>The most wanted AI job in the world.</h2>
            <p style={{ color: 'var(--navy-soft)', marginTop: '.9rem' }}>
              Forward Deployed Engineers are how frontier AI companies actually deliver — the
              engineer who sits with the customer and ships the system. OpenAI, Anthropic,
              Palantir, and Google Cloud are all hiring for the role.
            </p>
            <div className="logo-strip" aria-label="Companies hiring FDEs" style={{ marginBottom: '.4rem' }}>
              <span style={{ color: 'var(--navy-soft)' }}>OpenAI</span>
              <span style={{ color: 'var(--navy-soft)' }}>Anthropic</span>
              <span style={{ color: 'var(--navy-soft)' }}>Palantir</span>
              <span style={{ color: 'var(--navy-soft)' }}>Google Cloud</span>
            </div>
            <div className="hero-ctas">
              <TrackedLink className="btn btn-gold" href={`${fde.url}#apply`} event="academy_cta_click" params={{ cta: 'home_fde_apply' }}>
                Apply for the next batch
              </TrackedLink>
            </div>
          </div>
          <div className="card dark">
            <p className="kicker">DSP FDE Program</p>
            <h3>30 days · only {fde.seats} seats per batch</h3>
            <p>
              Curriculum designed by engineers from Google and Facebook. Live roleplays, a real
              client capstone, interview prep for the top labs, and personal supervision by
              Sardar — the only program of its kind in Pakistan.
            </p>
            <p style={{ marginTop: '.9rem', fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--gold)' }}>
              Next batch: {fde.nextBatchDisplay}
            </p>
          </div>
        </div>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Proof</p>
            <h2>Real students, on camera.</h2>
            <p>
              Verified reviews from our live cohorts, plus a social following that&apos;s
              growing fast — our content reaches {socialProof.combinedReachNote}, and messages
              come in from learners around the world asking to join. Watch the reviews in full
              on our public channels.
            </p>
          </div>
          <div className="grid-4">
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }}>
              <p style={{ fontStyle: 'italic' }}>
                Grade 9, and already shipping multiple agents. Hussain built several AI
                agents after our bootcamp.
              </p>
              <p style={{ marginTop: '.8rem', fontSize: '.85rem' }}>
                Hussain · Grade 9 student · <a href="https://www.facebook.com/reel/2416896862167908" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Watch his story on Facebook</a>
              </p>
            </div>
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }}>
              <p style={{ fontStyle: 'italic' }}>
                &ldquo;I am extremely grateful to be part of the AI Agentic Master Class under the
                Digital Services Program…&rdquo;
              </p>
              <p style={{ marginTop: '.8rem', fontSize: '.85rem' }}>
                Riffat · Saudi Arabia · <a href="https://www.tiktok.com/@digitalservicesprogram/video/7652245609784560903" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Watch on TikTok</a>
              </p>
            </div>
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }}>
              <p style={{ fontStyle: 'italic' }}>Verified student review from the AI Agentic Master Class.</p>
              <p style={{ marginTop: '.8rem', fontSize: '.85rem' }}>
                Abdul Hadi · <a href="https://www.tiktok.com/@digitalservicesprogram/video/7652246560511741191" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Watch on TikTok</a>
              </p>
            </div>
            <div className="card dark" style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }}>
              <p style={{ fontStyle: 'italic' }}>Verified student review from the AI Agentic Master Class.</p>
              <p style={{ marginTop: '.8rem', fontSize: '.85rem' }}>
                Muhammad Usman · UK · <a href="https://www.tiktok.com/@digitalservicesprogram/video/7654094650680020231" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>Watch on TikTok</a>
              </p>
            </div>
          </div>
          <p style={{ marginTop: '1.8rem', fontSize: '.95rem' }}>
            Bootcamp graduates leave with 4 certificates — three from Anthropic&apos;s official
            Claude courses plus the DSP certificate. All testimonials live on{' '}
            <a href={socials.youtube} style={{ color: 'var(--gold)' }}>YouTube</a> and{' '}
            <a href={socials.tiktok} style={{ color: 'var(--gold)' }}>TikTok</a>.
          </p>
          <div className="hero-ctas">
            <TrackedLink
              className="btn btn-primary"
              href={waLink('Hi DSP, I saw your website and want to know more.')}
              event="whatsapp_cta_click"
              params={{ cta: 'home_proof' }}
            >
              <WhatsAppIcon /> WhatsApp us — {site.whatsappDisplay}
            </TrackedLink>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
