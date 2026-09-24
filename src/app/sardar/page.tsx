import type { Metadata } from 'next'
import { site, mastery, agency } from '@/config/site'
import SiteHeader from '@/components/site/SiteHeader'
import { breadcrumbLd } from '@/lib/schema'
import SardarClient from './SardarClient'
import CtaBar from './CtaBar'
import ModuleCards from './ModuleCards'
import { CANONICAL } from './links'
import '@/app/site.css'
import './sardar.css'

// /sardar — SARDAR, a 3D voice AI Employee showcase. Own shell (like
// /mastery), main site header on top so visitors can leave. Two jobs:
// make students want to build it (→ /mastery) and show businesses ASOS in
// action (→ dspagenthub.com). Front-end only: Demo Mode plays canned answers
// from src/content/sardar/demo.json; Live Mode (step 5) reads DSP Agent Hub
// through a read-only proxy and is gated to admins.
export const metadata: Metadata = {
  title: 'SARDAR — meet a 3D voice AI Employee, live in your browser',
  description:
    'Talk to SARDAR, a voice AI Employee built on DSP Agent Hub. Watch it triage leads, draft posts and follow up, then learn to build your own in DSP AI Agent Mastery.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'SARDAR — a 3D voice AI Employee you can talk to', url: CANONICAL, images: [{ url: '/sardar/og.png', width: 1200, height: 630 }] },
}

export default function SardarPage() {
  return (
    <>
      <div className="dsp-site sardar-sitebar"><SiteHeader /></div>
      <div className="page-sardar">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: 'SARDAR', path: '/sardar' }])) }} />
        <section className="hero" id="top">
          <div className="wrap">
            <div className="top">
              <div className="eyebrow">SARDAR · voice AI Employee · built on {agency.hubName}</div>
              <h1>Meet <em>SARDAR</em>. Ask it anything a sales team does.</h1>
              <p className="lead">
                A voice AI Employee running on {agency.hubProduct}. Tap a question, watch it work, then build your own in {mastery.shortName} or get one for your business from {site.name}.
              </p>
            </div>
            <SardarClient />
          </div>
        </section>
        <ModuleCards />
        <CtaBar />
      </div>
    </>
  )
}
