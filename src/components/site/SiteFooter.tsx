import Link from 'next/link'
import { agency, footerGuides, site, socials } from '@/config/site'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <p className="foot-brand"><span className="brand-mark" aria-hidden="true">D</span> Digital Services Program</p>
            <p>{site.tagline}</p>
            <address style={{ marginTop: '.9rem', fontStyle: 'normal' }}>{site.addressLine}<br />
              <a href={`mailto:${site.email}`}>{site.email}</a><br />
              <a href={`tel:+${site.whatsappNumber}`}>{site.whatsappDisplay}</a> (call &amp; WhatsApp)</address>
          </div>
          <div>
            <h3>AI Employees</h3>
            <ul>
              <li><Link href="/ai-employees">AI Employees</Link></li>
              <li><a href={agency.hubUrl} rel="noopener">{agency.hubName} ↗</a></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/agents">Custom agent builds</Link></li>
              <li><Link href="/agents/restaurant-ai">Restaurant AI</Link></li>
              <li><Link href="/channelops">ChannelOps</Link></li>
              <li><Link href="/agents/case-studies">Case studies</Link></li>
            </ul>
          </div>
          <div>
            <h3>Learn</h3>
            <ul>
              <li><Link href="/mastery">AI Agent Mastery</Link></li>
              <li><Link href="/channelops#course">ChannelOps training</Link></li>
            </ul>
            {footerGuides.length > 0 && (
              <>
                {/* Query-shaped guides (Corroboration Engine) — registry in site.ts `guides`: live ones with footer:true (the framework sub-pages are linked from their parent guides instead) */}
                <h3 style={{ marginTop: '1.4rem' }}>Guides</h3>
                <ul>
                  {footerGuides.map((g) => (
                    <li key={g.path}><Link href={g.path}>{g.title}</Link></li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About DSP</Link></li>
              <li><Link href="/sardar-ghaffar">Sardar Ghaffar</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              {/* History entry, not an offer — owner ruling 2026-08-30 */}
              <li><Link href="/academy/bootcamp">The Agentic Lab (2025–2026)</Link></li>
              <li><Link href="/survey">Pakistan AI Skills Survey 2026</Link></li>
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
          <span>DSP builds AI Employees for business — and teaches you how to build them.</span>
        </div>
      </div>
    </footer>
  )
}
