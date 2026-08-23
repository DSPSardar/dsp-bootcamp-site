import TrackedLink from '@/components/site/TrackedLink'
import { WhatsAppIcon } from '@/components/home/icons'
import { site, waLink } from '@/config/site'

// Standard closing CTA band. The WhatsApp number is always the locked site
// number; only the prefilled message and GA4 cta label vary per page.
export default function FinalCta({
  heading,
  message,
  ctaLocation,
  children,
}: {
  heading: string
  message: string
  ctaLocation: string
  children?: React.ReactNode
}) {
  return (
    <section className="band-dark">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h2>{heading}</h2>
        <div className="hero-ctas" style={{ justifyContent: 'center' }}>
          <TrackedLink
            className="btn btn-gold"
            href={waLink(message)}
            event="whatsapp_cta_click"
            params={{ cta: ctaLocation }}
          >
            <WhatsAppIcon /> WhatsApp Us: {site.whatsappDisplay}
          </TrackedLink>
        </div>
        {children}
      </div>
    </section>
  )
}
