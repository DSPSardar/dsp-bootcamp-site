// Page-aware prompt chips and CTA for the SARDAR launcher, keyed by pathname.
// Every link and price comes from src/config/site.ts — nothing is typed here.
import { mastery, waLink } from '@/config/site'

export type LauncherCta = {
  /** GA4 `cta` value for sardar_cta_click. */
  id: string
  label: string
  href: string
  /** Opens in a new tab (WhatsApp deep links). */
  external?: boolean
}

export type LauncherConfig = {
  chips: readonly [string, string, string]
  cta: LauncherCta
}

const DEMO_WA = waLink('Hi DSP, I met SARDAR on your site. I want a demo of an AI Employee for my business.')

const HOME: LauncherConfig = {
  chips: ['What is Mastery?', 'Get an AI Employee for my business', 'Show me you working'],
  // No price or enrol wording on Home (owner ruling 15 Sep 2026): the price
  // lands on /mastery, where the value is explained.
  cta: { id: 'start_mastery', label: 'Start Mastery', href: mastery.url },
}

const MASTERY: LauncherConfig = {
  chips: [`What do I build in the ${mastery.modules} modules?`, 'Is it for complete beginners?', 'How do I enrol?'],
  cta: { id: 'enrol_now', label: `Enrol now – ${mastery.priceDisplay}`, href: `${mastery.url}/enrol` },
}

const BUSINESS: LauncherConfig = {
  chips: ['What does Zara do on WhatsApp?', 'How much for my business?', 'Book a demo'],
  cta: { id: 'demo_whatsapp', label: 'Get a demo on WhatsApp', href: DEMO_WA, external: true },
}

/** Which config a path gets. Unknown paths fall back to the Home config. */
export function configFor(pathname: string): LauncherConfig {
  if (pathname === '/mastery' || pathname.startsWith('/mastery/')) return MASTERY
  if (pathname === '/ai-employees' || pathname.startsWith('/ai-employees/') || pathname === '/pricing') return BUSINESS
  return HOME
}

/** Routes that never get the launcher: the 3D showcase itself, the student
 *  app, the payment page and admin. */
export function isExcluded(pathname: string): boolean {
  return (
    pathname === '/sardar' || pathname.startsWith('/sardar/') ||
    pathname === '/app' || pathname.startsWith('/app/') ||
    pathname === '/mastery/enrol' || pathname.startsWith('/mastery/enrol/') ||
    pathname === '/admin' || pathname.startsWith('/admin/')
  )
}

/** Fired by anything on a page that wants the panel open (the /mastery card). */
export const OPEN_EVENT = 'sardar:open'
