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

/** The Agentic Lab bootcamp — SUNSET 2026-08-30. No more live batches;
    Mastery (below) is DSP's only educational product. These facts remain
    as historical record for the evergreen /academy/bootcamp explainer and
    /about. Do not add batch dates, seat counts, or enrolment copy back. */
export const bootcamp = {
  name: 'Vibe Coding Bootcamp',
  /** 7-day format (historical) */
  days: 7,
  /** 5 live Zoom classes Mon–Fri 9–10 PM PKT (historical) */
  liveClasses: 5,
  schedule: 'Mon–Fri, 9–10 PM PKT',
  /** 4 certificates (3 Anthropic + 1 DSP) — earned by past students */
  certificates: 4,
  /** Final totals at sunset */
  batchesCompleted: 6,
  /** Estimate: batchesCompleted × 30 seats. Update with the real total if known precisely. */
  studentsTrained: '180+',
  url: '/academy/bootcamp',
} as const

/** DSP AI Agent Mastery — the self-paced program (approved Aug 2026).
    Distinct from the retired live 30-day program: this is recorded,
    lifetime-access, $100 one-time, with 12 months of group support. */
export const mastery = {
  name: 'DSP AI Agent Mastery — Zero to Master',
  shortName: 'AI Agent Mastery',
  priceUsd: 100,
  priceDisplay: '$100',
  /** Anchor price shown struck-through after launch */
  laterPriceDisplay: '$197',
  access: 'Lifetime',
  supportMonths: 12,
  modules: 15,
  lectureHours: '30+',
  refundDays: 7,
  /** Dodo Payments hosted checkout — null until the account is live; CTAs fall back to WhatsApp */
  checkoutUrl: null as string | null,
  /** Free Module 1 lead-magnet page — null until built */
  freeModuleUrl: null as string | null,
  url: '/mastery',
  /** Local payment rails for Pakistan-based students (card checkout pending). */
  pkr: {
    price: 'PKR 28,000',
    bank: {
      title: 'Digital Services Program PVT Ltd',
      name: 'Meezan Bank',
      branch: 'F-10 Markaz, Islamabad (branch code 0304)',
      account: '0112565644',
      iban: 'PK17MEZN0003040112565644',
    },
  },
} as const

export const channelops = {
  name: 'The ChannelOps Course',
  /** Course fee — shown only in the course offer section */
  feePkr: 30_000,
  feeDisplay: 'PKR 30,000',
  /** Discounted fee for alumni of the sunset Agentic Lab bootcamp —
      a live perk for past students, not an offer of the Lab itself */
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

  /** Product proof bar — our own DSPAgentHub numbers. Update from the
      dashboard, and move `asOf` forward with every update. These are
      server-rendered into the HTML — the static markup must never show a
      zero (see ProofCounters). */
  proof: {
    leads: 868,
    sales: 280,
    zeroTakeoverPct: 50.7,
    daysToLive: 7,
    asOf: '2026-08-23',
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

  /* Per-employee profile pages at /ai-employees/<id>.
     EVERY claim below is already published on the hub or pricing page —
     headline/whatIDo/training only rephrase existing copy in first person.
     Do not add statistics, features, languages, or integrations here that
     don't already appear elsewhere on the site.
     `tierId` maps to pricing.tiers; null = quoted individually (Emma). */
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
      headline: 'I answer every lead in seconds — and I keep following up until they decide.',
      metaTitle: 'Hire Zara — AI Sales Employee for WhatsApp | DSP',
      metaDescription:
        'Zara answers every WhatsApp lead in seconds, qualifies them from your price list, follows up until they decide, and only marks a sale won when payment is confirmed. Live in 7 days.',
      whatIDo: [
        'Reply to every lead instantly, 24/7 — including the ones who message at 11 PM',
        'Answer their questions straight from your price list',
        'Qualify each lead and run follow-up sequences until they decide',
        'Guide them through payment, and only mark a sale won once the money is confirmed',
        'Escalate to your team the moment something needs a human',
      ],
      training: {
        discover: 'we map your services, your price list, your FAQs, and the rules I must follow',
        build: 'My job description and your price list are loaded into DSPAgentHub, then I’m tested against our 10-point acceptance sheet',
        live: 'You test me yourself on your own WhatsApp number. When you approve, I start answering your leads',
      },
      tierId: 'sales',
      waMessage: 'Hi DSP, I want to hire Zara for my business.',
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
      headline: 'I answer the same 50 questions every day, so your team doesn’t have to.',
      metaTitle: 'Hire Adam — AI Support Employee for WhatsApp | DSP',
      metaDescription:
        'Adam answers your customers’ repetitive questions instantly, 24/7, in their own language — order status, policies, how-tos — and hands anything sensitive to your team with the full conversation attached.',
      whatIDo: [
        'Answer the repetitive questions instantly, 24/7 — order status, policies, how-tos',
        'Reply in the customer’s own language, English or Urdu, matching however they write',
        'Work from your knowledge base, so my answers are your policies, not guesses',
        'Hand anything sensitive or unusual to your team with the full conversation attached',
        'Log every conversation and its outcome on your dashboard',
      ],
      training: {
        discover: 'we map your policies, your FAQs, and exactly which questions should come to a human instead of me',
        build: 'My job description and your knowledge base are loaded into DSPAgentHub, then I’m tested against our 10-point acceptance sheet',
        live: 'You test me yourself on your own WhatsApp number. When you approve, I start answering your customers',
      },
      // No solo tier: support/FAQ handling ships in the AI Sales Team package.
      tierId: 'team',
      waMessage: 'Hi DSP, I want to hire Adam for my business.',
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
      headline: 'I keep your calendar full around the clock — and your no-shows down.',
      metaTitle: 'Hire Maya — AI Booking Employee for Appointments | DSP',
      metaDescription:
        'Maya takes booking requests around the clock, checks your availability, confirms the appointment, and reminds customers before they’re due — so your calendar stays full and no-shows go down. From $199/month.',
      whatIDo: [
        'Take booking requests around the clock, any hour of the day',
        'Check your availability before I confirm anything',
        'Confirm the appointment with the customer straight away',
        'Send reminders before they’re due, so fewer people no-show',
        'Report every booking on your dashboard and in your weekly digest',
      ],
      training: {
        discover: 'we map your services, your opening hours, your availability rules, and your booking policies',
        build: 'My job description and your availability rules are loaded into DSPAgentHub, then I’m tested against our 10-point acceptance sheet',
        live: 'You test me yourself on your own WhatsApp number. When you approve, I start taking your bookings',
      },
      tierId: 'receptionist',
      waMessage: 'Hi DSP, I want to hire Maya for my business.',
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
      headline: 'I answer your restaurant’s phone on the first ring — even in the dinner rush.',
      metaTitle: 'Hire Emma — AI Order-Taking Employee for Restaurants | DSP',
      metaDescription:
        'Emma answers your restaurant’s phone on the first ring, takes the complete order with sizes and modifiers, confirms the total, and texts the customer their confirmation — even during the dinner rush.',
      whatIDo: [
        'Answer your phone on the first ring, even during the dinner rush when your staff can’t',
        'Take the complete order — sizes, modifiers, quantities',
        'Confirm the total back to the customer before the call ends',
        'Text the customer their order confirmation',
        'Escalate to your team when something needs a human',
      ],
      training: {
        discover: 'we map your full menu — sizes, modifiers, prices — plus your hours and your order rules',
        build: 'My job description and your menu are loaded into DSPAgentHub, then I’m tested against our 10-point acceptance sheet',
        live: 'You test me yourself on your own phone line. When you approve, I start answering your calls',
      },
      // Phone-line AI is quoted by call volume; pricing gated by emmaPricingApproved.
      tierId: null as string | null,
      waMessage: 'Hi DSP, I run a restaurant and want to hire Emma.',
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
} as const

export const socials = {
  youtube: 'https://www.youtube.com/@DigitalServicesProgram',
  tiktok: 'https://www.tiktok.com/@digitalservicesprogram',
  facebook: 'https://www.facebook.com/DigitalServicesProgram',
  instagram: 'https://www.instagram.com/digitalservicesprogram',
  linkedin: 'https://www.linkedin.com/company/digitalservicesprogram',
} as const
