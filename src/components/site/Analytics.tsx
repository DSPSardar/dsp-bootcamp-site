// GA4 loader. Rendered once, by the root layout, so every page carries
// exactly one Google tag. The measurement ID is the account's G-2HCL48T58X
// (owner-supplied 2026-09-03); NEXT_PUBLIC_GA4_ID, if set in Vercel or
// .env, overrides it (e.g. to point a preview at a test property).
//
// Load order (perf pass 2026-09-03): the inline init runs afterInteractive so
// window.gtag is defined early and queues into dataLayer; the gtag.js library
// itself loads lazyOnload (after window.load) so it no longer competes with
// LCP on mobile. Queued events are sent when the library arrives.
import Script from 'next/script'

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-2HCL48T58X'

export default function Analytics() {
  if (!GA4_ID) return null
  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4_ID}', { send_page_view: true });`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="lazyOnload"
      />
    </>
  )
}
