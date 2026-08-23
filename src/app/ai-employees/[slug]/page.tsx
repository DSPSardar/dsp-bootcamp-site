// src/app/ai-employees/[slug]/page.tsx — profile page for each AI Employee
// (Zara, Adam, Maya, Emma). All content comes from agency.employees in
// src/config/site.ts, where every claim is one already published on the hub
// or pricing page — nothing new is asserted here.
//
// Section order is fixed: hero → what I do → live demo → how I'm trained →
// my dashboard → my pricing → final CTA.
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteShell from '@/components/site/SiteShell'
import TrackedLink from '@/components/site/TrackedLink'
import LiveDemoBlock from '@/components/site/LiveDemoBlock'
import PlatformSection from '@/components/site/PlatformSection'
import FinalCta from '@/components/site/FinalCta'
import { CheckIcon, WhatsAppIcon } from '@/components/home/icons'
import { agency, site, waLink } from '@/config/site'

type Employee = (typeof agency.employees)[number]

const findEmployee = (slug: string): Employee | undefined =>
  agency.employees.find((e) => e.id === slug)

export function generateStaticParams() {
  return agency.employees.map((e) => ({ slug: e.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const emp = findEmployee(slug)
  if (!emp) return {}
  return {
    title: { absolute: emp.metaTitle },
    description: emp.metaDescription,
    alternates: { canonical: `/ai-employees/${emp.id}` },
    openGraph: {
      type: 'profile',
      url: `/ai-employees/${emp.id}`,
      title: emp.metaTitle,
      description: emp.metaDescription,
      images: [{ url: '/og-card.png', width: 1200, height: 630 }],
    },
  }
}

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const emp = findEmployee(slug)
  if (!emp) notFound()

  const tier = emp.tierId ? agency.pricing.tiers.find((t) => t.id === emp.tierId) : undefined
  // Adam has no solo package — support/FAQ handling ships in the Sales Team tier.
  const tierIsShared = emp.tierId === 'team'

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'AI Employees', item: `${site.url}/ai-employees` },
      { '@type': 'ListItem', position: 3, name: emp.name, item: `${site.url}/ai-employees/${emp.id}` },
    ],
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: emp.role,
    name: `${emp.name} — ${emp.role}`,
    description: emp.hubLine,
    url: `${site.url}/ai-employees/${emp.id}`,
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      email: site.email,
      telephone: '+92-342-0580864',
    },
    areaServed: 'Worldwide',
    // Offer only where a published tier exists — Emma is quoted per restaurant.
    ...(tier
      ? {
          offers: {
            '@type': 'Offer',
            name: tier.name,
            description: `${tier.blurb}. One-time setup $${tier.setupUsd.toLocaleString('en-US')}, then $${tier.monthlyUsd}/month. Cancel anytime.`,
            price: tier.monthlyUsd,
            priceCurrency: 'USD',
            url: `${site.url}/pricing`,
          },
        }
      : {}),
  }

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ============ 1 · FIRST-PERSON HERO ============ */}
      <section className="hero-dark">
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span className="sep">→</span>
            <Link href="/ai-employees">AI Employees</Link><span className="sep">→</span>{emp.name}
          </nav>
          <div className="emp-hero">
            <span className="emp-avatar lg" aria-hidden="true">{emp.name[0]}</span>
            <div>
              <p className="hero-facts">{emp.name} · {emp.role}</p>
              <h1>{emp.headline}</h1>
              <p className="sub">{emp.hubLine}</p>
              <p className="hero-note"><strong>Best for:</strong> {emp.bestFor}</p>
              <div className="hero-ctas">
                <TrackedLink
                  className="btn btn-gold"
                  href={waLink(emp.waMessage)}
                  event="whatsapp_cta_click"
                  params={{ cta: `emp_${emp.id}_hero` }}
                >
                  <WhatsAppIcon /> Hire {emp.name}
                </TrackedLink>
                <TrackedLink
                  className="btn btn-ghost-light"
                  href="/pricing"
                  event="agents_cta_click"
                  params={{ cta: `emp_${emp.id}_hero_pricing` }}
                >
                  See Pricing
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2 · WHAT I DO ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">The job</p>
            <h2>What I do.</h2>
          </div>
          <ul className="check-list" style={{ maxWidth: '46rem' }}>
            {emp.whatIDo.map((item) => (
              <li key={item}><CheckIcon /> {item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 3 · LIVE DEMO (shared component; Emma stays gated) ============ */}
      {/* Zara answers the live WhatsApp line, so only her page says "talk to me". */}
      <LiveDemoBlock
        heading={
          emp.id === 'zara'
            ? 'Don’t take my word for it. Talk to me.'
            : 'Don’t take my word for it. Talk to my team.'
        }
        ctaLocation={`emp_${emp.id}`}
      />

      {/* ============ 4 · HOW I'M TRAINED ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Day 1 to Day 7</p>
            <h2>How I&apos;m trained.</h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <p className="kicker">1 · Discover (Day 1)</p>
              <h3>You brief us once</h3>
              <p>On a structured discovery call, {emp.training.discover}.</p>
            </div>
            <div className="card">
              <p className="kicker">2 · Build &amp; test (Days 2–5)</p>
              <h3>I learn your business</h3>
              <p>{emp.training.build}.</p>
            </div>
            <div className="card">
              <p className="kicker">3 · Go live (Days 6–7)</p>
              <h3>You approve, I start</h3>
              <p>{emp.training.live} — and I don&apos;t stop.</p>
            </div>
          </div>
          <p style={{ marginTop: '1.4rem', fontSize: '.95rem', color: 'var(--navy-soft)' }}>
            I go live with a recorded welcome voice note in your brand&apos;s voice. After that, DSP
            monitors, tunes, and improves me every month.
          </p>
        </div>
      </section>

      {/* ============ 5 · MY DASHBOARD (shared platform section) ============ */}
      <PlatformSection
        heading="My dashboard comes with me."
        intro={
          <>
            I run on <strong>{agency.platformName}</strong>, DSP&apos;s own platform — not rented
            no-code tools that bill you forever. Your dashboard shows every conversation I have and
            every outcome I produce in real time — with AI insights, sentiment analysis, and a
            weekly digest delivered to you.
          </>
        }
      />

      {/* ============ 6 · MY PRICING ============ */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Pricing</p>
            <h2>What I cost.</h2>
          </div>
          {tier ? (
            <div className="card tier" style={{ maxWidth: '34rem' }}>
              <h3>{tier.name}</h3>
              <p className="price">${tier.monthlyUsd}<small>/month</small></p>
              <p className="setup-line">${tier.setupUsd.toLocaleString('en-US')} one-time setup</p>
              <p className="blurb" style={{ marginTop: '.5rem' }}>{tier.blurb}</p>
              {tierIsShared ? (
                <p className="blurb" style={{ marginTop: '.5rem' }}>
                  I work as part of this package: the {tier.name} puts Zara, Adam, and Maya on one
                  number, each handling what they&apos;re best at.
                </p>
              ) : null}
              <ul className="check-list">
                {tier.features.map((f) => (
                  <li key={f}><CheckIcon /> {f}</li>
                ))}
              </ul>
              <div className="hero-ctas" style={{ marginTop: '.4rem' }}>
                <TrackedLink
                  className="btn btn-gold"
                  href={waLink(emp.waMessage)}
                  event="whatsapp_cta_click"
                  params={{ cta: `emp_${emp.id}_pricing` }}
                >
                  <WhatsAppIcon /> {tier.cta}
                </TrackedLink>
                <Link className="btn btn-ghost" href="/pricing">Compare all packages →</Link>
              </div>
            </div>
          ) : (
            /* Emma: phone-line AI is priced by call volume. Published rates stay
               gated behind agency.emmaPricingApproved (Checkpoint 5 + Twilio). */
            <div className="card" style={{ maxWidth: '34rem' }}>
              <h3>Quoted for your restaurant</h3>
              <p style={{ marginTop: '.5rem' }}>
                {agency.emmaPricingApproved
                  ? 'From $750–1,000 setup · from $299/month including 500 calls, then per-call.'
                  : 'Phone-line AI is priced by call volume, so I’m quoted per restaurant. Published rates are coming soon.'}
              </p>
              <div className="hero-ctas" style={{ marginTop: '.4rem' }}>
                <TrackedLink
                  className="btn btn-gold"
                  href={waLink(emp.waMessage)}
                  event="restaurant_demo_click"
                  params={{ cta: `emp_${emp.id}_quote` }}
                >
                  <WhatsAppIcon /> Get my quote
                </TrackedLink>
                <Link className="btn btn-ghost" href="/pricing">See all pricing →</Link>
              </div>
            </div>
          )}
          <p style={{ marginTop: '1.2rem', fontSize: '.93rem', color: 'var(--navy-soft)' }}>
            Live within 7 days of your discovery call, tested and approved by you — or your setup
            fee is refunded. No annual contracts. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ============ 7 · FINAL CTA (standard component) ============ */}
      <FinalCta
        heading={`Ready to put ${emp.name} to work?`}
        message={emp.waMessage}
        ctaLocation={`emp_${emp.id}_final`}
      >
        <p style={{ marginTop: '1.2rem', fontSize: '.95rem' }}>
          Not sure {emp.name} is the right first hire?{' '}
          <Link href="/ai-employees" style={{ color: 'var(--gold)', fontWeight: 600 }}>
            Meet the whole team →
          </Link>
        </p>
      </FinalCta>
    </SiteShell>
  )
}
