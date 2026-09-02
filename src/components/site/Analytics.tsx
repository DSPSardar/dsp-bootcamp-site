// GA4 loader + event helpers. Renders nothing until NEXT_PUBLIC_GA4_ID is set
// (add it in Vercel → Settings → Environment Variables; no code change needed).
import Script from 'next/script'

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID

export default function Analytics() {
  if (!GA4_ID) return null
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
      </Script>
    </>
  )
}
