import type { Metadata } from 'next'
import Link from 'next/link'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { site, mastery, agency } from '@/config/site'
import SiteHeader from '@/components/site/SiteHeader'
import { SARDAR_FAQS } from './faq'
import { sardarSchema } from './schema'
import { ANSWER, CANONICAL, OG_IMAGE, SEO_DESCRIPTION, SEO_TITLE } from './seo'
import SardarClient from './SardarClient'
import CtaBar from './CtaBar'
import ModuleCards from './ModuleCards'
import '@/app/site.css'
import './sardar.css'

// /sardar — SARDAR, a 3D voice AI Employee showcase. Own shell (like
// /mastery), main site header on top so visitors can leave. Two jobs:
// make students want to build it (→ /mastery) and show businesses ASOS in
// action (→ dspagenthub.com). Front-end only: Demo Mode plays canned answers
// from src/content/sardar/demo.json; Live Mode (step 5) reads DSP Agent Hub
// through a read-only proxy and is gated to admins.
export const metadata: Metadata = {
  title: { absolute: SEO_TITLE }, // already ends in "| DSP"; skip the root template
  description: SEO_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: CANONICAL,
    siteName: site.name,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SARDAR, a 3D voice AI Employee by Digital Services Program' }],
  },
  twitter: { card: 'summary_large_image', title: SEO_TITLE, description: SEO_DESCRIPTION, images: [OG_IMAGE] },
}

/** Ready Player Me bust, owner-supplied. Checked at build time (this page is
 *  static) the same way agency.hubScreenshot is: present → the 3D stage loads
 *  it; absent → the procedural low-poly bust ships instead. */
const AVATAR_URL = existsSync(join(process.cwd(), 'public', 'sardar', 'avatar.glb')) ? '/sardar/avatar.glb' : null

export default function SardarPage() {
  return (
    <>
      <div className="dsp-site sardar-sitebar"><SiteHeader /></div>
      <div className="page-sardar">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sardarSchema()) }} />
        <main>
        <section className="hero" id="top">
          <div className="wrap">
            <div className="top">
              <div className="eyebrow">SARDAR · voice AI Employee · built on {agency.hubName}</div>
              <h1>Meet <em>SARDAR</em>. Ask it anything a sales team does.</h1>
              <p className="lead">
                A voice AI Employee running on {agency.hubProduct}. Tap a question, watch it work, then build your own in {mastery.shortName} or get one for your business from {site.name}.
              </p>
            </div>
            <SardarClient avatarUrl={AVATAR_URL} />
          </div>
        </section>

        {/* ====== ANSWER-FIRST DEFINITION ====== */}
        {/* The first body text under the stage is the direct answer, so an
            engine summarising /sardar quotes a passage that names the
            category, the free live demo, the languages, the country and the
            deliverable rather than assembling one from marketing. Same string
            as the SoftwareApplication, Service and WebPage description. */}
        <section id="what-is-a-voice-ai-employee">
          <div className="wrap answer">
            <div className="eyebrow">What you are talking to</div>
            <h2>What is a voice AI Employee?</h2>
            <p className="answer-body">{ANSWER}</p>
            <p className="muted answer-links">
              The demo above is free. The Employee that does this on your own number is built by{' '}
              <Link href="/agents">DSP Agents</Link>, the AI automation agency in Islamabad;{' '}
              <Link href="/ai-employees">AI Employees</Link> lists the roles it can take and{' '}
              <Link href="/pricing">pricing</Link> the packages. To build one yourself, start at{' '}
              <Link href={mastery.url}>{mastery.shortName}</Link>.
            </p>
          </div>
        </section>

        <ModuleCards />

        {/* ====== FAQ ====== */}
        {/* One array (./faq.ts) feeds this list and the FAQPage node, so the
            schema can never claim an answer the page does not show. */}
        <section id="faq">
          <div className="wrap answer">
            <div className="eyebrow">Questions people ask before they call</div>
            <h2>Voice AI Employees, answered.</h2>
            <div className="faq-list">
              {SARDAR_FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        </main>
        <CtaBar />
      </div>
    </>
  )
}
