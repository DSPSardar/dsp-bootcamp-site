// src/app/pricing/page.tsx — published AI Employee pricing.
// Tier facts live in src/config/site.ts (agency.pricing). Emma's pricing is
// gated behind agency.emmaPricingApproved (Checkpoint 5 + paid Twilio number).
// Deliberate wording: usage limits stay a "generous monthly AI-usage
// allowance" — never publish raw token numbers.
import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { agency, site, waLink } from '@/config/site'

export const metadata: Metadata = {
  title: { absolute: 'AI Employee Pricing — Setup + Monthly, No Hidden Retainers | DSP' },
  description:
    'Transparent AI Employee pricing: setup from $500, monthly from $199. Cancel anytime. Compare packages and see exactly what’s included.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    type: 'website',
    url: '/pricing',
    title: 'AI Employee Pricing — Setup + Monthly, No Hidden Retainers | DSP',
    description:
      'Transparent AI Employee pricing: setup from $500, monthly from $199. Cancel anytime.',
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
}

// Service + Offer JSON-LD with the three tiers (publish checklist item).
// Offer price = monthly fee; the one-time setup fee is stated in the description.
const pricingLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Employee (managed AI agent) subscription',
  name: 'DSP AI Employees',
  description:
    'Custom-built AI Employees for sales, support, bookings, and phone orders — built, deployed, and supervised by DSP on DSPAgentHub. One-time setup fee plus monthly subscription, cancel anytime.',
  provider: {
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: '+92-342-0580864',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Employee packages',
    itemListElement: agency.pricing.tiers.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      description: `${tier.blurb}. One-time setup $${tier.setupUsd.toLocaleString('en-US')}, then $${tier.monthlyUsd}/month. Cancel anytime.`,
      price: tier.monthlyUsd,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: tier.monthlyUsd,
        priceCurrency: 'USD',
        unitText: 'MONTH',
      },
    })),
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${site.url}/pricing` },
  ],
}

const featureMatrix: Array<[string, boolean, boolean, boolean]> = [
  ['24/7 WhatsApp coverage', true, true, true],
  ['Bookings & reminders', true, true, true],
  ['Lead qualification & follow-up', false, true, true],
  ['Payment-confirmed sales tracking', false, true, true],
  ['AI insights & sentiment', false, true, true],
  ['Support/FAQ handling', false, false, true],
  ['Multiple Employees, one number', false, false, true],
  ['Monthly strategy call', false, false, true],
  ['Dashboard & weekly digest', true, true, true],
  ['Cancel anytime', true, true, true],
]

const faqs = [
  {
    q: 'Why is there a setup fee?',
    a: 'Because your Employee is custom-built: discovery, job description, knowledge base, and testing by our team. The setup fee is why it works on day 7 instead of frustrating your customers for months.',
  },
  {
    q: 'Are there usage limits?',
    a: 'Each tier includes a generous monthly AI-usage allowance suited to its package. If your business grows past it, we’ll recommend the right tier — you’ll never be cut off mid-conversation without warning.',
  },
  {
    q: 'Do prices differ for Pakistan-based businesses?',
    a: 'Contact us for PKR pricing — packages are the same, billed locally.',
  },
  {
    q: 'What’s NOT included?',
    a: 'WhatsApp Business API conversation charges from Meta (typically small) and phone-line charges for Emma are billed at cost. We’ll show you the estimate before you sign.',
  },
]

export default function PricingPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* ============ 1 · HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep">→</span>Pricing
          </nav>
          <h1>Simple pricing. <em>Published, not hidden.</em></h1>
          <p className="sub">
            Most agencies make you sit through a sales call to hear a number. Here are ours.
            One-time setup covers your build; the monthly fee keeps your Employee working,
            monitored, and improving.
          </p>
        </div>
      </section>

      {/* ============ 2 · PRICING TIERS ============ */}
      <section>
        <div className="wrap">
          <div className="grid-3" style={{ alignItems: 'stretch', marginTop: '.8rem' }}>
            {agency.pricing.tiers.map((tier) => (
              <div className={`card tier${'featured' in tier && tier.featured ? ' gold' : ''}`} key={tier.id}>
                {'featured' in tier && tier.featured ? <span className="flag">⭐ Most Popular</span> : null}
                <h3>{tier.name}</h3>
                <p className="price">${tier.monthlyUsd}<small>/month</small></p>
                <p className="setup-line">${tier.setupUsd.toLocaleString('en-US')} one-time setup</p>
                <p className="blurb" style={{ marginTop: '.5rem' }}>{tier.blurb}</p>
                <ul className="check-list">
                  {tier.features.map((f) => (
                    <li key={f}><CheckIcon /> {f}</li>
                  ))}
                </ul>
                <TrackedLink
                  className={`btn ${'featured' in tier && tier.featured ? 'btn-gold' : 'btn-ghost'}`}
                  href={waLink(`Hi DSP, I’m interested in the ${tier.name} package.`)}
                  event="whatsapp_cta_click"
                  params={{ cta: `pricing_tier_${tier.id}` }}
                >
                  {tier.cta}
                </TrackedLink>
              </div>
            ))}
          </div>

          {/* Emma (phone-line AI): pricing gated until Checkpoint 5 sign-off +
              paid Twilio number — flip agency.emmaPricingApproved to publish */}
          <div className="card" style={{ marginTop: '1.6rem', display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <p style={{ maxWidth: '44rem' }}>
              <strong>Emma — AI Order-Taking (restaurants):</strong>{' '}
              {agency.emmaPricingApproved
                ? 'from $750–1,000 setup · from $299/month including 500 calls, then per-call. Phone-line AI is priced by call volume —'
                : 'phone-line AI is priced by call volume, so Emma is quoted per restaurant. Published rates are coming soon —'}{' '}
              talk to us for your quote.
            </p>
            <TrackedLink
              className="btn btn-ghost btn-sm"
              href={waLink('Hi DSP, I run a restaurant and want a quote for Emma, the AI order-taking employee.')}
              event="restaurant_demo_click"
              params={{ cta: 'pricing_emma_quote' }}
            >
              Get my quote →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ============ 3 · WHAT THE SETUP FEE COVERS ============ */}
      <section className="band-dark">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The setup fee</p>
            <h2>What you get in your first 7 days.</h2>
          </div>
          <ul className="check-list" style={{ maxWidth: '46rem' }}>
            <li><CheckIcon /> Day-1 structured discovery call</li>
            <li><CheckIcon /> Your Employee&apos;s complete job description written by our team</li>
            <li><CheckIcon /> Your full knowledge base loaded (prices, policies, FAQs)</li>
            <li><CheckIcon /> Testing against our 10-point acceptance sheet</li>
            <li><CheckIcon /> Your own approval test on your own number</li>
            <li><CheckIcon /> Go-live with a recorded welcome voice note in your brand&apos;s voice</li>
          </ul>
          <p style={{ marginTop: '1.4rem', fontStyle: 'italic' }}>
            This is skilled work by the same team that teaches AI agent building — not a template
            import.
          </p>
        </div>
      </section>

      {/* ============ 4 · ROI MATH ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">ROI</p>
            <h2>Does it pay for itself?</h2>
            <p>
              A part-time receptionist costs more per month than any package here — and covers a
              third of the hours. If your average sale is worth $50, your AI Sales Employee needs{' '}
              <strong style={{ color: 'var(--navy)' }}>7 recovered sales a month</strong> to pay
              for itself. Most businesses miss more than that every week in unanswered messages
              alone.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 5 · COMPARISON TABLE ============ */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Compare</p>
            <h2>What&apos;s included, tier by tier.</h2>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Receptionist</th>
                  <th scope="col">Sales Employee</th>
                  <th scope="col">Sales Team</th>
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map(([feature, a, b, c]) => (
                  <tr key={feature}>
                    <td style={{ fontWeight: 600 }}>{feature}</td>
                    <td>{a ? <span className="tick">✔</span> : '—'}</td>
                    <td>{b ? <span className="tick">✔</span> : '—'}</td>
                    <td>{c ? <span className="tick">✔</span> : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 6 · GUARANTEE ============ */}
      <section className="band-teal">
        <div className="wrap">
          <div className="sec-head center">
            <h2>Our 7-day promise.</h2>
            <p>
              Your AI Employee goes live within 7 days of your discovery call, tested and approved
              by you — or your setup fee is refunded. Monthly billing starts only when your
              Employee starts working. No annual contracts. Cancel with 30 days&apos; notice.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 7 · PRICING FAQ ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head center">
            <p className="eyebrow">FAQ</p>
            <h2>Pricing questions, answered.</h2>
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

      {/* ============ 8 · FINAL CTA ============ */}
      <section className="band-dark">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2>Pick your first hire. We&apos;ll do the rest.</h2>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <TrackedLink
              className="btn btn-gold"
              href={waLink('Hi DSP, help me pick the right AI Employee for my business.')}
              event="whatsapp_cta_click"
              params={{ cta: 'pricing_final' }}
            >
              <WhatsAppIcon /> WhatsApp Us: {site.whatsappDisplay}
            </TrackedLink>
          </div>
          <p style={{ marginTop: '1.2rem', fontSize: '.95rem', fontStyle: 'italic' }}>
            Not sure which Employee fits? Message us your business type — we&apos;ll tell you
            honestly, even if the answer is &ldquo;you don&apos;t need one yet.&rdquo;
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
