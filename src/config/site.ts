// src/config/site.ts
// ─────────────────────────────────────────────────────────────────
// Every editable business fact lives HERE. Update this file to change
// prices, seat counts, batch dates, or contact details — no component
// edits needed. Locked marketing facts (see CLAUDE.md) also live here
// so they stay consistent across every page.
// ─────────────────────────────────────────────────────────────────

export const site = {
  name: 'Digital Services Program',
  shortName: 'DSP',
  url: 'https://www.digitalservicesprogram.com',
  tagline: 'We build AI agents for the world. We train the world to build them.',
  email: 'info@digitalservicesprogram.com',
  /** Locked: +92 342 0580864 everywhere */
  whatsappNumber: '923420580864',
  whatsappDisplay: '+92 342 0580864',
  city: 'Islamabad',
  country: 'Pakistan',
} as const

/** Social reach — distinct from enrolled/trained student counts.
    weeklyReach: verified from ONE platform (Facebook Professional Dashboard →
    Insights → Views, last 7 days) — update from that number specifically.
    combinedReachNote: honest framing for reach across all platforms combined;
    keep it qualitative ("millions") unless you have a real summed total. */
export const socialProof = {
  weeklyReach: '1M+',
  weeklyReachLabel: 'Weekly reach on Facebook alone',
  combinedReachNote:
    'well over a million people a week on Facebook alone — and millions more combined across YouTube, TikTok, and Instagram',
} as const

/** wa.me link with a pre-filled message */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const bootcamp = {
  name: 'Vibe Coding Bootcamp',
  /** Locked: 7-day bootcamp */
  days: 7,
  /** Locked: 5 live Zoom classes Mon–Fri 9–10 PM PKT */
  liveClasses: 5,
  schedule: 'Mon–Fri, 9–10 PM PKT',
  /** Locked: PKR 10,000 one-time — shown ONLY in pricing sections */
  feePkr: 10_000,
  feeDisplay: 'PKR 10,000',
  seats: 30,
  /** Locked: 4 certificates (3 Anthropic + 1 DSP) */
  certificates: 4,
  batchCadence: 'New batch every Monday',
  /** Next cohort start — update weekly. Also feeds Course JSON-LD startDate. */
  nextBatchDate: '2026-07-27',
  nextBatchDisplay: 'Mon 27 July 2026',
  /** Completed batches and the ordinal of the next one — update together */
  batchesCompleted: 6,
  nextBatchOrdinal: '7th',
  /** Estimate: batchesCompleted × seats. Update with the real total if known precisely. */
  studentsTrained: '180+',
  url: '/academy/bootcamp',
} as const

export const fde = {
  name: 'Forward Deployed Engineer (FDE) Program',
  days: 30,
  feePkr: 100_000,
  feeDisplay: 'PKR 100,000',
  /** Seat scarcity counter on /academy/fde — edit freely */
  seats: 20,
  batchCadence: 'New batch every month',
  /** Next cohort start — update monthly. Also feeds Course JSON-LD startDate. */
  nextBatchDate: '2026-08-03',
  nextBatchDisplay: 'Mon 3 Aug 2026',
  /** Bootcamp graduates get this off the FDE fee */
  alumniCreditPkr: 10_000,
  alumniCreditDisplay: 'PKR 10,000',
  url: '/academy/fde',
} as const

export const restaurantAgent = {
  name: 'DSP Restaurant AI — Phone Ordering Agent',
  /** Calendly booking link — set to a real URL when ready; while null,
      demo CTAs fall back to WhatsApp. */
  calendlyUrl: null as string | null,
  /** USD pricing tiers — placeholders, edit freely */
  setupFeeUsd: 499,
  tiers: [
    {
      name: 'Starter',
      priceUsd: 99,
      blurb: 'Single location, up to 300 calls/month',
      features: ['AI answers every call, 24/7', 'Full menu knowledge', 'Order text-back to your POS phone', 'Email order summaries'],
    },
    {
      name: 'Growth',
      priceUsd: 199,
      featured: true,
      blurb: 'Single location, up to 1,000 calls/month',
      features: ['Everything in Starter', 'Upsell prompts (drinks, sides, desserts)', 'Caller history & repeat-order shortcuts', 'Priority support'],
    },
    {
      name: 'Multi-Location',
      priceUsd: 299,
      blurb: 'Up to 3 locations, pooled 2,500 calls/month',
      features: ['Everything in Growth', 'Per-location menus & hours', 'Central reporting dashboard', 'Dedicated onboarding engineer'],
    },
  ],
} as const

export const socials = {
  youtube: 'https://www.youtube.com/@DigitalServicesProgram',
  tiktok: 'https://www.tiktok.com/@digitalservicesprogram',
  facebook: 'https://www.facebook.com/DigitalServicesProgram',
  instagram: 'https://www.instagram.com/digitalservicesprogram',
  linkedin: 'https://www.linkedin.com/company/digitalservicesprogram',
} as const
