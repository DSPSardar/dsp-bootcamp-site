'use client'
import TrackedLink from '@/components/site/TrackedLink'
import { site } from '@/config/site'
import { ASOS_DEMO_URL, MASTERY_URL, WHATSAPP_URL } from './links'

// Fixed bottom bar: the page's two conversions plus one WhatsApp lead link.
// Events reuse the site's existing GA4 names so /sardar shows up in the
// same reports as every other CTA (academy_cta_click, agent_hub_click,
// whatsapp_cta_click).
export default function CtaBar() {
  return (
    <div className="ctabar" role="region" aria-label="Next steps">
      <div className="wrap">
        <TrackedLink className="btn btn-accent" href={MASTERY_URL} event="academy_cta_click" params={{ cta: 'sardar_bar_mastery' }}>
          Build your own SARDAR →
        </TrackedLink>
        <TrackedLink className="btn btn-ghost" href={ASOS_DEMO_URL} target="_blank" rel="noopener" event="agent_hub_click" params={{ cta: 'sardar_bar_asos' }}>
          Get this for your business →
        </TrackedLink>
        <TrackedLink className="btn btn-ghost wa" href={WHATSAPP_URL} target="_blank" rel="noopener" event="whatsapp_cta_click" params={{ cta: 'sardar_bar_whatsapp' }}>
          WhatsApp {site.whatsappDisplay}
        </TrackedLink>
      </div>
    </div>
  )
}
