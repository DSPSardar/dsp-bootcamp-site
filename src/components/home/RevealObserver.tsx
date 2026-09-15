'use client'
import { useEffect } from 'react'

// Scroll-reveal for the homepage, as progressive enhancement. Server HTML
// is fully visible. After mount this marks the nearest .dsp-site root with
// data-js, which is the ONLY thing that lets site.css hide [data-reveal]
// elements; the observer then adds .on as each enters the viewport. No JS,
// no IntersectionObserver, or prefers-reduced-motion → nothing is hidden
// and nothing moves. Renders no DOM of its own.
export default function RevealObserver() {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return
    }
    const root = document.querySelector<HTMLElement>('.dsp-site')
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (items.length === 0) return

    // Anything already on screen at mount is lit immediately, so the first
    // paint never flashes hidden content; the flag goes on in the same frame.
    const vh = window.innerHeight
    for (const el of items) {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('on')
    }
    root.setAttribute('data-js', '')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('on')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    for (const el of items) if (!el.classList.contains('on')) observer.observe(el)
    return () => {
      observer.disconnect()
      root.removeAttribute('data-js')
    }
  }, [])
  return null
}
