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

export const channelops = {
  name: 'The ChannelOps Course',
  /** Course fee — shown only in the course offer section, like bootcamp pricing */
  feePkr: 30_000,
  feeDisplay: 'PKR 30,000',
  /** Discounted fee for Vibe Coding Bootcamp alumni */
  alumniFeePkr: 25_000,
  alumniFeeDisplay: 'PKR 25,000',
  url: '/channelops',
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

/* ──────────────────────────────────────────────────────────────────
   AI Employees (agency) — feeds /, /ai-employees, /pricing.
   Gated fields stay null/false until the publish-checklist item they
   correspond to is signed off; components render placeholders until then.
   ────────────────────────────────────────────────────────────────── */
export const agency = {
  platformName: 'DSPAgentHub',

  /** Founder authority bar on the homepage (4 items, gold-dot separated).
      Viewer figure: update from platform dashboards when it changes. */
  founderBar: [
    'Teaching technology since 2002',
    'London → UAE → Pakistan',
    'Google & Anthropic Verified AI Trainer',
    '2.3M viewers reached in the last 90 days',
  ],

  /** Product proof bar — our own DSPAgentHub numbers. Update from the dashboard. */
  proof: {
    leads: 868,
    sales: 280,
    zeroTakeoverPct: 50.7,
    daysToLive: 7,
  },

  /** Zara's public WhatsApp demo line — confirmed Aug 2026: Zara works as
      DSP's own admissions/sales employee on the main site WhatsApp number,
      so messaging her IS the live demo. If she ever moves to a dedicated
      line, change only this value. */
  zaraDemoWaNumber: '923420580864' as string | null,

  /** Emma's phone demo line (+1 607 400-6476). Gated: publish only after
      Checkpoint 5 sign-off — while null, the "Call Emma" CTA renders as a
      coming-soon placeholder. */
  emmaDemoPhone: null as string | null,
  emmaDemoPhoneDisplay: null as string | null,

  /** Emma's pricing ($750–1,000 setup · from $299/mo incl. 500 calls).
      Gated: publish only after Checkpoint 5 sign-off + paid Twilio number.
      While false, /pricing shows a "quote on request" strip instead. */
  emmaPricingApproved: false,

  /** Case-study teaser cards. Gated: hold until Autospa / Personal Cars
      give written permission — while false, placeholder cards render. */
  caseStudiesApproved: false,

  employees: [
    {
      id: 'zara',
      name: 'Zara',
      role: 'AI Sales Employee',
      homeLine:
        'I answer every lead on WhatsApp in seconds, qualify them, follow up, and close the sale — payment confirmed before I mark it won.',
      hubLine:
        'A lead messages you at 11 PM. I reply in 8 seconds. I answer their questions from your price list, qualify them, follow up until they decide, and guide them through payment. I only mark a sale as won when the money is confirmed.',
      bestFor:
        'any business selling services or products over WhatsApp — coaching, real estate, retail, agencies.',
    },
    {
      id: 'adam',
      name: 'Adam',
      role: 'AI Support Employee',
      homeLine:
        'I answer your customers’ questions instantly, 24/7, in their language — and hand over to your team the moment something needs a human.',
      hubLine:
        'Your customers ask the same 50 questions every day. I answer all of them instantly — order status, policies, how-tos — in the customer’s own language. Anything sensitive or unusual, I hand to your team with the full conversation attached.',
      bestFor: 'businesses drowning in repetitive queries — e-commerce, services, software.',
    },
    {
      id: 'maya',
      name: 'Maya',
      role: 'AI Booking Employee',
      homeLine:
        'I take booking requests any hour of the day, check availability, confirm appointments, and send reminders so your customers actually show up.',
      hubLine:
        'I take booking requests around the clock, check your availability, confirm the appointment, and remind the customer before they’re due — so your calendar stays full and your no-shows go down.',
      bestFor: 'salons, clinics, car services, consultants — any appointment business.',
    },
    {
      id: 'emma',
      name: 'Emma',
      role: 'AI Order-Taking Employee',
      homeLine:
        'I answer your restaurant’s phone, take the full order — sizes, modifiers, quantities — confirm the price, and text the customer their confirmation.',
      hubLine:
        'I answer your restaurant’s phone on the first ring — even during the dinner rush when your staff can’t. I take the complete order with sizes and modifiers, confirm the total, and text the customer their confirmation.',
      bestFor: 'restaurants, takeaways, and cafes in the US, UK, and Australia.',
    },
  ],

  /** USD agency pricing — numbers follow the agreed strategy; confirm final
      before publish (publish checklist). Cancel-anytime, no annual contracts. */
  pricing: {
    tiers: [
      {
        id: 'receptionist',
        name: 'AI Receptionist',
        setupUsd: 500,
        monthlyUsd: 199,
        blurb: 'One AI Booking Employee (Maya) on your WhatsApp',
        features: [
          'Takes bookings & appointments 24/7',
          'Availability checks & confirmations',
          'Automated reminders (fewer no-shows)',
          'DSPAgentHub dashboard',
          'Weekly performance digest',
        ],
        cta: 'Start with Maya →',
      },
      {
        id: 'sales',
        name: 'AI Sales Employee',
        setupUsd: 1_000,
        monthlyUsd: 349,
        featured: true,
        blurb: 'Zara, fully trained on your business',
        features: [
          'Instant response to every lead, 24/7',
          'Qualification & follow-up sequences',
          'Payment-confirmed sales tracking',
          'AI insights & sentiment analysis',
          'Escalation to your team',
          'Everything in AI Receptionist',
        ],
        cta: 'Hire Zara →',
      },
      {
        id: 'team',
        name: 'AI Sales Team',
        setupUsd: 1_500,
        monthlyUsd: 599,
        blurb: 'Zara + Adam + Maya on one number',
        features: [
          'Sales, support, and bookings combined',
          'Full analytics & pipeline access',
          'Priority support & monthly strategy call',
          'Custom business rules & workflows',
          'Everything in AI Sales Employee',
        ],
        cta: 'Build My Team →',
      },
    ],
  },

  /** Leadership cards. Gated: Sundus's surname + degree/university must be
      confirmed (certificates/LinkedIn) before filling in — never guess them. */
  leadership: {
    sundusSurname: null as string | null,
    sundusDegreeLine: null as string | null,
  },
} as const

export const socials = {
  youtube: 'https://www.youtube.com/@DigitalServicesProgram',
  tiktok: 'https://www.tiktok.com/@digitalservicesprogram',
  facebook: 'https://www.facebook.com/DigitalServicesProgram',
  instagram: 'https://www.instagram.com/digitalservicesprogram',
  linkedin: 'https://www.linkedin.com/company/digitalservicesprogram',
} as const
