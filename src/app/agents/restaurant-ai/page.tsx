// src/app/agents/restaurant-ai/page.tsx — flagship product page (US audience).
import type { Metadata } from 'next'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon } from '@/components/home/icons'
import { restaurantAgent, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'Restaurant AI Phone Answering — Never Miss Another Order | DSP Agents' },
  description:
    'An AI agent that answers every call to your restaurant, takes the order, and never puts a customer on hold. Multi-tenant platform — live in days, not months. Plans from $99/month.',
  alternates: { canonical: '/agents/restaurant-ai' },
  openGraph: {
    type: 'website',
    url: '/agents/restaurant-ai',
    title: 'Never Miss Another Order — AI Phone Ordering for Restaurants | DSP',
    description:
      'Your busiest hour is when the phone rings most. Our AI answers every call, takes every order. Live in days, not months.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

// Demo bookings go to Calendly when configured, WhatsApp otherwise.
const demoHref =
  restaurantAgent.calendlyUrl ??
  waLink('Hi DSP, I run a restaurant and want a demo of the AI phone-ordering agent.')

const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: restaurantAgent.name,
  description:
    'Multi-tenant AI phone-ordering agent for restaurants. Answers every call 24/7, takes orders with full menu knowledge, and hands them to your kitchen. Live in days, not months.',
  brand: { '@type': 'Organization', name: site.name, url: site.url },
  offers: restaurantAgent.tiers.map((t) => ({
    '@type': 'Offer',
    name: `${t.name} plan`,
    price: String(t.priceUsd),
    priceCurrency: 'USD',
    url: `${site.url}/agents/restaurant-ai#pricing`,
    availability: 'https://schema.org/InStock',
  })),
}

const PAINS = [
  {
    k: 'The missed call',
    h: 'Every unanswered ring is a lost ticket',
    p: 'Industry studies put the average missed-call rate at dinner rush in double digits. A customer who hits voicemail orders from the next place on the list — and may never call back.',
  },
  {
    k: 'The rush hour trap',
    h: 'Your phone is busiest when your staff is busiest',
    p: 'The exact moment your team is slammed with in-house orders is the moment the phone rings most. Someone either drops the line or drops the food.',
  },
  {
    k: 'The labor math',
    h: 'A phone person costs more than a phone agent',
    p: 'Staffing the phone through open hours costs thousands a month — for a task that is 90% repeating the menu, taking names, and reading back orders.',
  },
]

const STEPS = [
  {
    n: '1',
    h: 'We load your menu',
    p: 'Menu, prices, hours, specials, allergen notes — your agent learns your restaurant, not a generic script. You review everything before it goes live.',
  },
  {
    n: '2',
    h: 'Your calls route to the agent',
    p: 'Keep your number. Calls are answered instantly, every time — the agent takes the order, confirms it back, and handles "what comes on that?" without breaking stride.',
  },
  {
    n: '3',
    h: 'Orders land in your kitchen',
    p: 'Each order arrives by text and email the moment the caller hangs up. Our platform is multi-tenant — you\'re live in days, not months.',
  },
]

export default function RestaurantAiPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      {/* ============ HERO ============ */}
      <section className="hero-dark">
        <div className="wrap split">
          <div>
            <span className="hero-pill"><span className="dot" aria-hidden="true"></span> For US restaurants · Live in days, not months</span>
            <h1>Never miss another order. <em>An AI that answers every call.</em></h1>
            <p className="sub">
              Friday, 7 PM. Three tables waiting, two tickets up, and the phone rings again.
              Our AI agent picks up on the first ring, takes the order, and sends it straight
              to your kitchen — every call, every time, 24/7.
            </p>
            <div className="hero-ctas">
              <TrackedLink className="btn btn-gold" href={demoHref} event="restaurant_demo_click" params={{ cta: 'hero' }}>
                Book a demo call
              </TrackedLink>
              <TrackedLink className="btn btn-ghost-light" href="#pricing" event="agents_cta_click" params={{ cta: 'restaurant_hero_pricing' }}>
                See pricing
              </TrackedLink>
            </div>
            <p className="hero-note">Plans from ${restaurantAgent.tiers[0].priceUsd}/mo · keep your existing number · cancel anytime</p>
          </div>

          {/* Demo audio placeholder — replace with a real <audio> once the
              recorded order call is ready. */}
          <div className="demo-player" role="img" aria-label="Audio player placeholder: a recorded call of the AI agent taking a live pizza order">
            <div className="bar">
              <span className="play" aria-hidden="true">
                <svg className="ic" viewBox="0 0 24 24" style={{ width: 22, height: 22 }}><path d="M8 5v14l11-7z" fill="currentColor" stroke="none" /></svg>
              </span>
              <span className="wave" aria-hidden="true">
                {[14, 22, 9, 27, 18, 31, 12, 24, 33, 16, 8, 26, 20, 30, 11, 23, 15, 28, 10, 19, 25, 13, 21, 17].map((h, i) => (
                  <i key={i} style={{ height: h }} />
                ))}
              </span>
              <span>1:04</span>
            </div>
            <p className="cap">▸ Hear our agent take a live order — recording coming to this page. Want it now? Book a demo and we&apos;ll play it live.</p>
          </div>
        </div>
      </section>

      {/* ============ PAIN ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The problem</p>
            <h2>Missed calls are silent lost revenue.</h2>
          </div>
          <div className="grid-3">
            {PAINS.map((c) => (
              <div className="card" key={c.k}>
                <p className="kicker">{c.k}</p>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">How it works</p>
            <h2>Three steps. Live in days.</h2>
            <p>Built multi-tenant from day one — onboarding a new restaurant is configuration, not a software project.</p>
          </div>
          <div className="grid-3">
            {STEPS.map((s) => (
              <div className="card dark" key={s.n} style={{ background: 'rgba(255,255,255,.05)', borderColor: 'var(--line-dark)' }}>
                <p className="kicker">Step {s.n}</p>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing">
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">Pricing</p>
            <h2>Simple plans. One-time setup of ${restaurantAgent.setupFeeUsd}.</h2>
            <p>Every plan includes menu onboarding, call routing, and order delivery to your kitchen.</p>
          </div>
          <div className="grid-3" style={{ alignItems: 'stretch', marginTop: '2.4rem' }}>
            {restaurantAgent.tiers.map((t) => (
              <div className={`card tier${'featured' in t && t.featured ? ' featured' : ''}`} key={t.name}>
                {'featured' in t && t.featured && <span className="flag">Most popular</span>}
                <p className="kicker">{t.name}</p>
                <p className="price">${t.priceUsd}<small>/month</small></p>
                <p className="blurb">{t.blurb}</p>
                <ul className="check-list">
                  {t.features.map((f) => (
                    <li key={f}><CheckIcon /> {f}</li>
                  ))}
                </ul>
                <TrackedLink
                  className="btn btn-primary"
                  style={{ justifyContent: 'center' }}
                  href={demoHref}
                  event="restaurant_demo_click"
                  params={{ cta: `tier_${t.name.toLowerCase()}` }}
                >
                  Book a demo call
                </TrackedLink>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.6rem', fontSize: '.9rem', color: 'var(--navy-soft)' }}>
            Call volumes above your plan? We&apos;ll build you a custom tier —{' '}
            <TrackedLink href={demoHref} event="restaurant_demo_click" params={{ cta: 'custom_tier' }}>talk to us</TrackedLink>.
          </p>
        </div>
      </section>

      {/* ============ CLOSING CTA ============ */}
      <section className="band-dark" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Your phone is ringing right now.</h2>
          <p style={{ maxWidth: '34rem', margin: '.8rem auto 0' }}>
            Fifteen minutes on a demo call and you&apos;ll hear the agent take an order yourself.
            If it&apos;s not obviously right for your restaurant, we&apos;ll tell you.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink className="btn btn-gold" href={demoHref} event="restaurant_demo_click" params={{ cta: 'footer' }}>
              Get this for your restaurant
            </TrackedLink>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
