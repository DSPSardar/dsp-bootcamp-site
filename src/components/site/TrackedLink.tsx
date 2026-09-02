'use client'
import { track } from '@/lib/track'

// Anchor that fires a GA4 event on click. Used for CTA attribution
// (whatsapp_cta_click, academy_cta_click, agents_cta_click, restaurant_demo_click).
export default function TrackedLink({
  event,
  params,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string
  params?: Record<string, string | number | boolean>
}) {
  return (
    <a {...rest} onClick={() => track(event, params)}>
      {children}
    </a>
  )
}
