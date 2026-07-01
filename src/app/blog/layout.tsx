import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './blog.css'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  )
}
