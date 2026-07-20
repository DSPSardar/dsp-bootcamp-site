import Link from 'next/link'
import { site, socials } from '@/config/site'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <p className="foot-brand"><span className="brand-mark" aria-hidden="true">D</span> Digital Services Program</p>
            <p>{site.tagline}</p>
            <p style={{ marginTop: '.9rem' }}>{site.city}, {site.country}<br />
              <a href={`mailto:${site.email}`}>{site.email}</a><br />
              <a href={`tel:+${site.whatsappNumber}`}>{site.whatsappDisplay}</a> (call &amp; WhatsApp)</p>
          </div>
          <div>
            <h3>DSP Agents</h3>
            <ul>
              <li><Link href="/agents">Why hire us</Link></li>
              <li><Link href="/agents/restaurant-ai">Restaurant AI</Link></li>
              <li><Link href="/agents/case-studies">Case studies</Link></li>
            </ul>
          </div>
          <div>
            <h3>DSP Academy</h3>
            <ul>
              <li><Link href="/academy">Compare courses</Link></li>
              <li><Link href="/academy/bootcamp">Vibe Coding Bootcamp</Link></li>
              <li><Link href="/academy/fde">FDE Program</Link></li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About Sardar</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href={socials.youtube}>YouTube</a></li>
              <li><a href={socials.tiktok}>TikTok</a></li>
              <li><a href={socials.facebook}>Facebook</a></li>
              <li><a href={socials.instagram}>Instagram</a></li>
              <li><a href={socials.linkedin}>LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-legal">
          <span>© 2026 Digital Services Program · SECP-registered company</span>
          <span>We build AI agents. We train you to build them.</span>
        </div>
      </div>
    </footer>
  )
}
