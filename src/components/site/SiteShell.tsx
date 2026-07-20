// Shared shell for the company pages (/, /agents/*, /academy, /academy/fde,
// /about). The bootcamp page keeps its own .dsp-home shell; blog/contact keep
// the dark theme. Never mix the three.
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
