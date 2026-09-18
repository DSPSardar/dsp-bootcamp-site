// src/config/site.ts
// ─────────────────────────────────────────────────────────────────
// Every editable business fact lives HERE. Update this file to change
// prices, seat counts, batch dates, or contact details — no component
// edits needed. Locked marketing facts (see CLAUDE.md) also live here
// so they stay consistent across every page.
// ─────────────────────────────────────────────────────────────────

/** Registered office — the only address on the site. Used by the Organization
 *  schema (PostalAddress) and, as `site.addressLine`, wherever it is printed. */
const address = {
  streetAddress: 'Office 151, Plot 7, 10th Avenue Service Road East, Sector F-10/4, F-10 Markaz',
  addressLocality: 'Islamabad',
  addressRegion: 'Islamabad Capital Territory',
  postalCode: '44000',
  addressCountry: 'PK',
} as const

const country = 'Pakistan'

export const site = {
  name: 'Digital Services Program',
  shortName: 'DSP',
  url: 'https://www.digitalservicesprogram.com',
  tagline: 'We build AI agents for the world. We train the world to build them.',
  email: 'info@digitalservicesprogram.com',
  /** Locked: +92 342 0580864 everywhere */
  whatsappNumber: '923420580864',
  whatsappDisplay: '+92 342 0580864',
  /** Same locked number in the E.164-with-dashes form schema.org wants */
  telephone: '+92-342-0580864',
  city: address.addressLocality,
  country,
  address,
  /** The office as one printable line (footers) — derived from `address`,
   *  never typed a second time. */
  addressLine: `${address.streetAddress}, ${address.addressLocality} ${address.postalCode}, ${country}`,
  /** Parent group named in the /mastery footer, /about and the Organization schema */
  parentCompany: 'Sardar Group of Companies',
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
  modules: 16,
  lectureHours: '30+',
  refundDays: 7,
  /** Dodo Payments hosted checkout — null until the account is live; CTAs fall back to WhatsApp */
  checkoutUrl: null as string | null,
  /** Free Module 1 lead-magnet page — null until built */
  freeModuleUrl: null as string | null,
  /** Still frame shown on the welcome video's play facade — null until a
   *  frame export exists. Drop a 1280×720 JPG at public/mastery/
   *  welcome-poster.jpg and set this to '/mastery/welcome-poster.jpg'. */
  welcomePoster: null as string | null,
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
    /** JazzCash wallet, published by owner instruction 10 Sep 2026. This is a
     *  PAYMENT FIELD ONLY and appears solely on /mastery/enrol, which is
     *  noindex. It is NOT a contact number: never put it in a WhatsApp link,
     *  the footer, schema `telephone`, or any public marketing copy — the
     *  site's only published contact number stays +92 342 0580864. The wallet
     *  title is the account holder's bank-registered name and does not change
     *  the co-founder's public name, which is "Sundus Khan" everywhere else. */
    jazzCash: {
      title: 'Sundus Shafique',
      number: '0325 3966799',
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

  /** ─── DSP Agent Hub — the product (owner screenshots, 15 Sep 2026) ───
   *  The AI sales platform every DSP AI Employee runs on, and the system DSP
   *  runs its own admissions on. Public site: dspagenthub.com. Its product
   *  line is ASOS (AI Sales OS). `hubModules` is the sidebar of the live app
   *  exactly as screenshotted — never add a module that is not in the product.
   *  `hubScreenshot` names the real UI capture in public/agent-hub/; the
   *  homepage renders it at half its pixel size (2x) inside a navy frame,
   *  and falls back to the (labelled) illustrative workflow rail whenever
   *  the file is absent at build time. Never ship a mock that looks like
   *  real data. */
  hubName: 'DSP Agent Hub',
  hubUrl: 'https://dspagenthub.com/',
  hubProduct: 'ASOS — AI Sales OS',
  hubTagline: 'Close deals while you sleep.',
  hubModules: ['Today', 'Dashboard', 'Leads', 'Conversations', 'AI Insights', 'Ads', 'Analytics', 'Students', 'Reports', 'Automations'],
  hubScreenshot: {
    src: '/agent-hub/pipeline.png',
    alt: 'DSP Agent Hub — the live pipeline view of the DSP tenant',
    width: 2000,
    height: 1300,
  } as { src: string; alt: string; width: number; height: number } | null,

  /** Revenue tracked in DSP Agent Hub — the ASOS dashboard header,
   *  "Revenue: Rs. 4,232,000" (owner figures, DSP tenant, 15 Sep 2026).
   *  DSP's own sales recorded in the platform; `footnote` is printed under
   *  every stat block that shows it. Update `pkr` and `asOf` together, from
   *  the dashboard, never by estimate. */
  revenue: {
    pkr: 4_232_000,
    display: 'PKR 4.2M+',
    label: 'closed through DSP Agent Hub',
    footnote: 'DSP\u2019s own sales, recorded in the platform. Direct payments outside the system are not included.',
    asOf: '2026-09-15',
  },

  /** Product proof bar — our own DSP Agent Hub numbers (DSP tenant). Update
      from the dashboard, and move the dates forward with every update. These
      are server-rendered into the HTML — the static markup must never show
      a zero (see ProofCounters).
      `sales` and `daysToLive`: ASOS dashboard, `asOf`. `leads` and
      `zeroTakeoverPct`: Agent Hub Reports, 90-day view, `kpiAsOf`
      (owner figures, 11 Sept 2026). */
  proof: {
    leads: 1_290,
    sales: 350,
    zeroTakeoverPct: 48.5,
    daysToLive: 7,
    asOf: '2026-09-15',
    kpiSource: 'Agent Hub Reports, 90-day view',
    kpiAsOf: '2026-09-11',
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
      channel: 'WhatsApp',
      tools: ['WhatsApp Business API', 'Your price list & FAQs', 'DSPAgentHub CRM & follow-up sequences', 'Payment confirmation'],
      outcome: 'Every lead answered in seconds, 24/7 — and a sale is only marked won once the money is confirmed.',
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
      channel: 'WhatsApp',
      tools: ['WhatsApp, in English or Urdu', 'Your knowledge base & policies', 'Escalation with the full conversation attached', 'DSPAgentHub dashboard'],
      outcome: 'The same fifty questions answered instantly, all day — your team gets only what needs a human.',
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
      channel: 'WhatsApp',
      tools: ['WhatsApp', 'Your availability rules & opening hours', 'Confirmations & reminders', 'DSPAgentHub dashboard & weekly digest'],
      outcome: 'A calendar that stays full around the clock — and fewer no-shows.',
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
      channel: 'Phone',
      tools: ['Your restaurant phone line', 'Your full menu — sizes, modifiers, prices', 'Order confirmation by text', 'Escalation to your team'],
      outcome: 'Every call answered on the first ring, the complete order taken and confirmed — even in the dinner rush.',
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

/** ─── Independent listings (Corroboration Engine, Day 8 — 2026-09-12) ───
 *  Third-party pages that describe DSP without DSP controlling them. This is
 *  the corroboration leg of the plan: an answer engine treats one source as a
 *  claim and several as a fact, so these are worth stating on the entity
 *  pages — and linking to them helps the engines find them.
 *
 *  RULES, and they are not negotiable:
 *  1. Independent only. DSP's own profiles and courses (YouTube, GitHub, the
 *     free Udemy course) are NOT listings — they belong in `socials` and on
 *     the founder. Conflating the two is the soft claim that would sink the
 *     20 Sep demonstration.
 *  2. Never a paid placement, sponsored post or bought link. If money moved,
 *     it does not go here.
 *  3. Verify the page says what this entry claims before adding it. */
export type Mention = {
  /** The site doing the listing, as it calls itself. */
  source: string
  /** The listing page's own title. */
  title: string
  url: string
  /** What it says about DSP, in one line. */
  note: string
  /** When it was verified. */
  date: string
}

export const mentions: ReadonlyArray<Mention> = [
  {
    source: 'Taleemify',
    title: 'Best Artificial Intelligence Courses in Pakistan — Top Academies & Tools (2026)',
    url: 'https://taleemify.pk/artificial-intelligence-courses',
    note: 'Lists DSP AI Agent Mastery among Pakistan\u2019s AI academies.',
    date: '2026-09-12',
  },
]

export const socials = {
  youtube: 'https://www.youtube.com/@DigitalServicesProgram',
  tiktok: 'https://www.tiktok.com/@digitalservicesprogram',
  facebook: 'https://www.facebook.com/DigitalServicesProgram',
  instagram: 'https://www.instagram.com/digitalservicesprogram',
  linkedin: 'https://www.linkedin.com/company/digitalservicesprogram',
  /** The org that hosts this site's repo and the public Mastery prompt library. */
  github: 'https://github.com/DSPSardar',
} as const

/** ─── Entity Lock (Corroboration Engine, Day 1 — 2026-09-06) ───────────
 *  ONE public identity for the company and its founder, stated identically
 *  in every schema node, page, and off-site profile. Owner decision 5 Sep
 *  2026: the founder's public name is "Sardar Ghaffar" everywhere, with the
 *  full name kept only as an alternateName; the co-founder's public spelling
 *  is "Sundus Khan". Never reintroduce "Sardar Abdul Ghaffar Khan" as a
 *  visible name or "Sundas". `foundingDate` is emitted only while set —
 *  never estimate it. */
export const entity = {
  legalName: 'Digital Services Program Pvt. Ltd.',
  /** The disambiguating one-liner: "Digital Services Program" is also the name
   *  of government programmes in India, the EU and the UK. Every Organization
   *  node and profile carries this so machines can tell DSP apart. */
  description:
    'Digital Services Program (DSP) is an AI agents training company and AI agency in Islamabad, Pakistan. It teaches beginners to build, deploy and sell AI agents in Urdu and English through DSP AI Agent Mastery, and builds AI Employees for businesses worldwide. Not affiliated with any government digital-services programme.',
  /** Year confirmed by the owner (5 Sep 2026). Refine to an ISO month if he
   *  ever supplies one. */
  foundingDate: '2022' as string | null,
  knowsLanguage: ['ur', 'en'],
  /** Where students and clients come from (owner's list, Aug 2026). */
  areaServed: ['PK', 'AE', 'SA', 'GB', 'US', 'CA', 'AU', 'MY'],
  /** Total students enrolled, from DSP's own ASOS student dashboard on
   *  DSP Agent Hub ("Total enrolled: 350", owner screenshot 15 Sep 2026;
   *  was 338 on 10 Sep). THE student number: every page uses this one. The
   *  old bootcamp `studentsTrained: '180+'` was an estimate (batches x 30
   *  seats) and is retired. Never estimate this figure — read it off the
   *  dashboard and move `studentsEnrolledAsOf` with it. */
  studentsEnrolled: 350,
  studentsEnrolledAsOf: '2026-09-15',
} as const

/** ─── Distribution engine (homepage §06) — owner dashboards, 15 Sep 2026 ───
 *  RULES: every stage is a number read off a named dashboard, with the metric
 *  called by the platform's own name and its period. Views are views — never
 *  "reach", "people" or "visitors". Facebook figures come from the Page
 *  Insights block only (Views, Messaging conversations started), never the
 *  Content/monetisation block. Platforms are never summed. A stage with no
 *  verified figure is omitted from this list and the section renders without
 *  it — never a placeholder, never an estimate. */
export type DistributionStage = {
  id: string
  stage: string
  /** Display value, formatted by hand so the rounding is deliberate. */
  display: string
  /** Exact figure as read (for the visually-hidden precise value + comments). */
  exact: number | string
  /** What the number counts, in the platform's own words. */
  metric: string
  source: string
  period: string
}

export const distribution: ReadonlyArray<DistributionStage> = [
  {
    id: 'attention',
    stage: 'Attention',
    display: '8.5M+',
    exact: 8_544_189,
    metric: 'views on the DSP Facebook Page',
    source: 'Facebook Page Insights',
    period: '17 Jun – 14 Sep 2026 (90 days)',
  },
  {
    id: 'engagement',
    stage: 'Engagement',
    display: '556',
    exact: 556,
    metric: 'messaging conversations started on Facebook',
    source: 'Facebook Page Insights',
    period: '17 Jun – 14 Sep 2026 (90 days)',
  },
  {
    id: 'leads',
    stage: 'Leads',
    display: '1,290',
    exact: 1_290,
    metric: 'leads processed by Zara on DSP Agent Hub',
    source: 'DSP Agent Hub Reports',
    period: 'as of 11 Sept 2026 (90-day view)',
  },
  {
    id: 'customers',
    stage: 'Customers',
    display: '350',
    exact: 350,
    metric: 'students in DSP AI Agent Mastery',
    source: 'DSP Agent Hub · ASOS student dashboard',
    period: 'as of 15 Sep 2026',
  },
  {
    id: 'revenue',
    stage: 'Revenue',
    display: 'PKR 4.2M+',
    exact: 'Rs. 4,232,000',
    metric: 'revenue closed through DSP Agent Hub',
    source: 'DSP Agent Hub · ASOS',
    period: 'as of 15 Sep 2026',
  },
]

export const founder = {
  name: 'Sardar Ghaffar',
  alternateName: 'Sardar Abdul Ghaffar Khan',
  /** Shorter forms the name appears under off-site (GEO pass 2026-09-06);
   *  schema-only — every Person node lists them as alternateName. */
  alsoKnownAs: ['Abdul Ghaffar Khan', 'Sardar Abdul Ghaffar'],
  jobTitle: 'Founder & Lead AI Instructor',
  /** The entity page — the byline target sitewide. */
  path: '/sardar-ghaffar',
  /** One sentence, used verbatim on /sardar-ghaffar, /about, /mastery and off-site profiles. */
  description:
    'Founder and CEO of Digital Services Program (DSP), Islamabad, and its lead AI instructor. Google-certified AI Agentic Trainer, Gemini Certified Educator and Anthropic (Claude)-verified educator; teaching technology since 2002, with 24+ years in IT across London, the UAE and Pakistan.',
  image: '/mastery/sardar.jpg',
  linkedin: 'https://www.linkedin.com/in/sardar-abdul-ghaffar-khan',
  /** Udemy instructor profile (live 2026-09-12). The slug is a legacy one
   *  from the account's old display name; the profile itself shows the
   *  canonical "Sardar Ghaffar". Do NOT change the slug before 20 Sep — it
   *  would break this sameAs and the course URL Class Central ingests. */
  udemy: 'https://www.udemy.com/user/abdul-55/',
  /** Public, verifiable credentials — the only ones the schema may list. */
  credentials: [
    {
      name: 'Gemini Certified Educator (Google for Education, valid 2025–2028)',
      url: 'https://www.credential.net/aae3459a-b0b9-463e-86cd-da7806e00e5d',
    },
    {
      name: 'Google/Kaggle AI Agents Intensive — Vibe Coding Course certification (2026)',
      url: 'https://www.kaggle.com/certification/badges/abdulghaffarkhan804/108',
    },
  ],
  knowsAbout: [
    'AI agents',
    'Claude',
    'Claude Code',
    'Vibe Coding',
    'prompt engineering',
    'context engineering',
    'MCP',
    'RAG',
    'business automation',
    'SEO',
  ],
} as const

export const cofounder = {
  name: 'Sundus Khan',
  jobTitle: 'Co-Founder & Course Director',
  description:
    'Co-founder and Course Director of Digital Services Program. Certified AI trainer and gold medallist in psychology; designs the DSP curriculum around how students actually learn.',
} as const

/** ─── DSP guides (Corroboration Engine, Day 2 — 2026-09-06) ───────────
 *  The query-shaped answer pages, in the order they ship. ONE registry feeds
 *  the footer "Guides" block, /llms.txt and the sitemap, so a guide is linked
 *  everywhere the moment `live` flips to true — and nowhere before. Never
 *  list a path here as live until its page.tsx exists on main.
 *
 *  Day 3 (2026-09-08): `footer: false` keeps a live guide out of the footer
 *  block (it still ships in /llms.txt and the sitemap). The three framework
 *  sub-pages are reached from the pages that teach them — /mastery/curriculum,
 *  /what-is-an-ai-employee and each other — not from every footer. */
export const guides = [
  { path: '/best-ai-courses-in-pakistan', title: 'Best AI Courses in Pakistan (2026)', updated: '2026-09-06', live: true, footer: true },
  { path: '/ai-agent-course-in-urdu', title: 'AI Agent Course in Urdu', updated: '2026-09-09', live: true, footer: true },
  { path: '/ai-training-islamabad', title: 'AI Training in Islamabad', updated: '2026-09-08', live: true, footer: true },
  { path: '/learn-ai-agents-pakistan', title: 'How to Learn AI Agents in Pakistan', updated: '2026-09-16', live: true, footer: true },
  { path: '/mastery/curriculum', title: 'Mastery Curriculum: All 16 Modules', updated: '2026-09-08', live: true, footer: true },
  { path: '/what-is-an-ai-employee', title: 'What Is an AI Employee?', updated: '2026-09-08', live: true, footer: true },
  { path: '/claude-code-course-pakistan', title: 'Claude Code Course in Pakistan (+ Anthropic certificates)', updated: '2026-09-16', live: true, footer: true },
  { path: '/ai-course-for-overseas-pakistanis', title: 'AI Course for Overseas Pakistanis', updated: '2026-09-10', live: true, footer: true },
  { path: '/research/pakistan-ai-skills-survey-2026', title: 'Pakistan AI Skills Survey 2026', updated: '2026-09-19', live: true, footer: true },
  { path: '/frameworks/7-part-job-description', title: 'The 7-Part Job Description', updated: '2026-09-08', live: true, footer: false },
  { path: '/frameworks/memory-ladder', title: 'The Memory Ladder', updated: '2026-09-08', live: true, footer: false },
  { path: '/frameworks/agent-idea-filter', title: 'The Agent Idea Filter', updated: '2026-09-08', live: true, footer: false },
] as const

export const liveGuides = guides.filter((g) => g.live)

/** The footer "Guides" block — live guides minus the framework sub-pages. */
export const footerGuides = liveGuides.filter((g) => g.footer)

/** ─── The eight blog pillars (2026-09-18) ───────────────────────────────
 *  Search Console, 18 Sep 2026: all 26 non-blog URLs are indexed, but only
 *  9 of the 43 blog posts are — 30 of them sit at "Discovered — currently
 *  not indexed". The cause is crawl starvation, not quality: the homepage
 *  takes ~95% of site clicks and linked to no post at all, and neither
 *  footer did either, so nothing downstream inherited any authority.
 *
 *  These eight posts are the fundamentals every other post and guide leans
 *  on. They get a site-wide footer link (both footers) and a card in the
 *  homepage reading block (§13), which is why one registry holds all three
 *  strings: `label` for the footer row, `title` + `blurb` for the card.
 *
 *  Slugs are frozen (CLAUDE.md) — these paths are the live post URLs and
 *  must match src/content/posts.json exactly. Nothing here may use price,
 *  enrol, Academy, course or bootcamp wording: the cards render on `/`,
 *  where that copy rule applies (owner ruling 15 Sep 2026). */
export const pillars = [
  {
    path: '/blog/what-is-an-ai-agent',
    label: 'What is an AI agent?',
    title: 'What is an AI agent?',
    blurb: 'The difference between a chatbot that answers and an agent that acts. Start here.',
  },
  {
    path: '/blog/multi-agent-systems-when-ais-work-as-a-team',
    label: 'AI agents working as a team',
    title: 'When AI agents work as a team',
    blurb: 'Why a single agent hits a ceiling, and what multi-agent systems solve.',
  },
  {
    path: '/blog/10-ways-businesses-can-use-agentic-ai-in-2026',
    label: 'Ten ways businesses use agentic AI',
    title: 'Ten ways businesses use agentic AI',
    blurb: 'The workflows that pay for themselves first.',
  },
  {
    path: '/blog/why-sales-is-the-first-job-ai-is-replacing',
    label: 'Why sales is being automated first',
    title: 'Why sales is the first job AI is replacing',
    blurb: 'The economics behind the AI Employee that answers your leads.',
  },
  {
    path: '/blog/vibe-coding-explained',
    label: 'What vibe coding actually is',
    title: 'What vibe coding actually is',
    blurb: 'The term, the method, and where it breaks down.',
  },
  {
    path: '/blog/machine-learning-vs-deep-learning-vs-ai-whats-the-difference',
    label: 'AI vs ML vs deep learning',
    title: 'AI, machine learning, deep learning',
    blurb: 'What the words mean, without the math.',
  },
  {
    path: '/blog/why-pakistan-needs-ai-agents',
    label: 'Why Pakistan’s entrepreneurs need AI agents',
    title: 'Why Pakistan’s entrepreneurs need AI agents',
    blurb: 'The local case: real costs, real constraints, what actually works here.',
  },
  {
    path: '/blog/the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake',
    label: 'Who’s responsible when an agent gets it wrong',
    title: 'Who is responsible when an agent gets it wrong',
    blurb: 'Accountability, bias, and keeping a digital workforce safe.',
  },
] as const

/** IndexNow (Bing, Yandex, Naver, Seznam — and therefore the index ChatGPT
 *  Search reads). The key is public by design: search engines verify it by
 *  fetching /{key}.txt, which lives in public/. scripts/indexnow-ping.mjs
 *  submits changed URLs after every production deploy. Rotate by generating
 *  a new 32-hex key, replacing the file in public/, and updating this. */
export const indexNow = {
  key: 'ef9f1cb9f2f84334b3d952b0d3f8cb05',
  endpoint: 'https://api.indexnow.org/indexnow',
} as const
