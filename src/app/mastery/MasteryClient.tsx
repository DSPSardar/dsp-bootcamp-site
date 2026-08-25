'use client'
import { useEffect } from 'react'

/** Scroll-driven effects for the Mastery landing page: journey rail fill + sticky CTA. */
export default function MasteryClient() {
  useEffect(() => {
    const rail = document.getElementById('rail')
    const hero = document.querySelector('.page-mastery .hero')
    const sticky = document.getElementById('sticky')
    const price = document.getElementById('pricing')
    if (!rail || !hero || !sticky || !price) return
    const phases = Array.from(rail.querySelectorAll<HTMLElement>('.phase'))
    const update = () => {
      const r = rail.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height))
      rail.style.setProperty('--fill', `${p * 100}%`)
      phases.forEach((ph) => ph.classList.toggle('on', ph.getBoundingClientRect().top < vh * 0.6))
      const heroGone = hero.getBoundingClientRect().bottom < 0
      const pr = price.getBoundingClientRect()
      const priceVisible = pr.top < vh && pr.bottom > 0
      sticky.classList.toggle('show', heroGone && !priceVisible)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return null
}
