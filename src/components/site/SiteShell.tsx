// Shared shell for the company pages (/, /agents/*, /academy,
// /about). The bootcamp page composes its own shell (.dsp-site +
// .page-bootcamp with AnnouncementBar/StickyCta); blog/contact keep
// the dark theme. Never mix the shells.
import '@/app/site.css'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="dsp-site">
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  )
}
