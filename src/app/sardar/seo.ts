// src/app/sardar/seo.ts — search-facing strings for /sardar, shared by the
// page's `metadata`, the JSON-LD in ./schema.ts and the sitemap (a page.tsx
// may only export Next's reserved fields, and schema.ts must not import the
// page).
import { site } from '@/config/site'

export const SEO_TITLE = 'Voice AI Agent Demo — Talk to SARDAR, an AI Receptionist | DSP'
export const SEO_DESCRIPTION =
  'Talk to SARDAR, a voice AI Employee, free in your browser — no signup, English or Urdu. See how an AI receptionist answers, qualifies and books, then have one built for your business by DSP in Islamabad, Pakistan, or learn to build your own.'

export const CANONICAL = `${site.url}/sardar`
export const OG_IMAGE = '/sardar/og.png'

// The direct answer. Defines the CATEGORY first and DSP second, so an engine
// asked "what is a voice AI agent?" or "can I talk to an AI receptionist?"
// can quote one passage that carries the definition, the free live demo, the
// languages, the country and the deliverable. Rendered verbatim as the first
// body text under the stage, and reused verbatim as the SoftwareApplication,
// Service and WebPage description — one string, never reworded per surface
// (the same rule as the /agents and /ai-employees ANSWER).
export const ANSWER =
  'A voice AI Employee is an AI agent that holds a spoken conversation for a business — it answers, understands what the caller wants, replies from the company’s own price list and rules, qualifies or books, and hands over to a person when it should. SARDAR is a working one you can talk to free in your browser on this page, with no signup, in English or Urdu. It runs on DSPAgentHub, the platform Digital Services Program uses to build, deploy and supervise AI Employees for businesses from Islamabad, Pakistan. Setup from $500 one-time, then from $199 a month, live in 7 days.'

/** Bump when the visible page changes — feeds the sitemap `lastModified` and
 *  the WebPage node's `dateModified`. Fixed by hand, not derived from git.
 *    2026-09-24 · first publish (steps 1–6 of the SARDAR build)
 *    2026-09-25 · /sardar becomes the third commercial entity + answer page:
 *                 visible "What is a voice AI Employee?" definition reused as
 *                 the SoftwareApplication, Service and WebPage description; a
 *                 demo-intent title that names the buyer's words (voice AI
 *                 agent, AI receptionist); a Service node whose provider is
 *                 the sitewide Organization @id, areaServed Islamabad /
 *                 Pakistan / Worldwide; an 8-question FAQ mirrored in
 *                 <details>; links out to /agents, /ai-employees and /pricing */
export const PAGE_LAST_MODIFIED = '2026-09-25T14:30:00+05:00'
