// Client-side GA4 event helper. Safe to call when GA4 isn't loaded —
// events queue into dataLayer and are picked up if/when gtag initialises.
'use client'

type EventParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  }
}
