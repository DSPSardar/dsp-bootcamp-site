// GA4 loader. Rendered once, by the root layout, so every page carries
// exactly one Google tag. The measurement ID is the account's G-2HCL48T58X
// (owner-supplied 2026-09-03); NEXT_PUBLIC_GA4_ID, if set in Vercel or
// .env, overrides it (e.g. to point a preview at a test property).
//
// Load order (perf pass 2026-09-06):
//   1. The inline `ga4-init` script runs afterInteractive, so window.gtag
//      and dataLayer exist immediately and every event queues.
//   2. gtag.js itself (~521 KiB decoded — nearly all of PageSpeed's unused /
//      unminified JS on the homepage) is NOT requested at page load.
//      GtagLoader injects it on the first pointerdown / keydown / scroll /
//      touchstart, or 8 s after window.load as a fallback. Under Data Saver
//      (navigator.connection.saveData) there is no fallback: interaction only.
//   3. When the library arrives it drains the dataLayer queue, so page_view
//      and any CTA events fired before then are still sent.
// The previous `lazyOnload` approach still landed inside the Lighthouse
// trace; a user-gesture gate is the only thing the lab never triggers.
import Script from 'next/script'
import GtagLoader from './GtagLoader'

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
      <GtagLoader id={GA4_ID} />
    </>
  )
}
