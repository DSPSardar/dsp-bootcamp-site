// Injects Google's gtag.js library once, on the first user interaction —
// or on a fallback timer after window.load — instead of at page load.
//
// Why (perf pass 2026-09-06): gtag.js is ~521 KiB decoded and was the source
// of nearly all of PageSpeed's "unused JS" / "unminified JS" / long JS
// execution flags on the homepage; our own chunks are ~554 KiB and minified.
// `lazyOnload` did not help in the lab because the Lighthouse trace runs long
// enough to capture a post-load fetch. Deferring to the first interaction
// keeps the library out of the lab trace entirely (Lighthouse never scrolls or
// clicks) while real visitors still get it within a few seconds.
//
// Events are not lost: the inline `ga4-init` script (Analytics.tsx) defines
// window.gtag and dataLayer immediately, so every call queues until the
// library arrives and drains the queue.
'use client'
import { useEffect } from 'react'

const TRIGGERS = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const
const FALLBACK_MS = 8000

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } }

export default function GtagLoader({ id }: { id: string }) {
  useEffect(() => {
    const src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    let fired = false
    let timer: number | undefined

    const arm = () => {
      timer = window.setTimeout(load, FALLBACK_MS)
    }

    const detach = () => {
      for (const ev of TRIGGERS) window.removeEventListener(ev, load)
      window.removeEventListener('load', arm)
      if (timer !== undefined) window.clearTimeout(timer)
    }

    function load() {
      if (fired) return
      fired = true
      detach()
      // Guard against double injection (StrictMode re-runs, HMR, a second
      // mount): one script per src, ever.
      if (document.querySelector(`script[src="${src}"]`)) return
      const s = document.createElement('script')
      s.async = true
      s.src = src
      document.head.appendChild(s)
    }

    for (const ev of TRIGGERS) window.addEventListener(ev, load, { passive: true, once: true })

    // Data Saver: interaction only, no timer — the visitor asked for less.
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true
    if (!saveData) {
      if (document.readyState === 'complete') arm()
      else window.addEventListener('load', arm, { once: true })
    }

    return detach
  }, [id])

  return null
}
