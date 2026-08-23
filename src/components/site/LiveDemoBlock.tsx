import TrackedLink from '@/components/site/TrackedLink'
import { WhatsAppIcon } from '@/components/home/icons'
import { agency, site } from '@/config/site'

// Teal "talk to one right now" band — shared verbatim between the homepage
// (section 5) and /ai-employees (section 4). Demo lines are gated in
// src/config/site.ts until the publish checklist signs them off:
//  · Zara's ASOS WhatsApp line — falls back to the main site WhatsApp
//  · Emma's phone line — renders a coming-soon pill while null

function zaraHref(): string {
  const number = agency.zaraDemoWaNumber ?? site.whatsappNumber
  const message =
    agency.zaraDemoWaNumber === null
      ? 'Hi DSP, I’d like to talk to Zara, your AI Sales Employee.'
      : 'Hi Zara!'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export default function LiveDemoBlock({
  heading,
  intro,
  ctaLocation,
}: {
  heading: string
  intro?: string
  ctaLocation: string
}) {
  return (
    <section className="band-teal">
      <div className="wrap">
        <div className="sec-head center">
          <h2>{heading}</h2>
          {intro ? <p>{intro}</p> : null}
        </div>
        <div className="hero-ctas" style={{ justifyContent: 'center' }}>
          <TrackedLink
            className="btn btn-gold"
            href={zaraHref()}
            event="whatsapp_cta_click"
            params={{ cta: `${ctaLocation}_zara_demo` }}
          >
            <WhatsAppIcon /> WhatsApp Zara Now
          </TrackedLink>
          {agency.emmaDemoPhone ? (
            <TrackedLink
              className="btn btn-ghost-light"
              href={`tel:${agency.emmaDemoPhone}`}
              event="restaurant_demo_click"
              params={{ cta: `${ctaLocation}_emma_call` }}
            >
              📞 Call Emma: {agency.emmaDemoPhoneDisplay}
            </TrackedLink>
          ) : (
            <span className="btn btn-disabled">📞 Call Emma — phone demo launching soon</span>
          )}
        </div>
        <p className="small-print" style={{ textAlign: 'center' }}>
          Real AI. No script. Ask them anything about your business.
        </p>
      </div>
    </section>
  )
}
