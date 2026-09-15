// Shared shell for the company pages (/, /agents/*, /academy,
// /about). The bootcamp page composes its own shell (.dsp-site +
// .page-bootcamp); blog/contact keep
// the dark theme. Never mix the shells.
import '@/app/site.css'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function SiteShell({ children, mainClassName }: { children: React.ReactNode; mainClassName?: string }) {
  return (
    <div className="dsp-site">
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className={mainClassName}>{children}</main>
      <SiteFooter />
    </div>
  )
}
