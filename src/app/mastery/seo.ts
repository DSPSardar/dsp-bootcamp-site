// src/app/mastery/seo.ts — the search-facing strings for /mastery, shared by
// the page's `metadata` export (title / description / canonical / OG /
// Twitter) and the JSON-LD graph in ./schema.ts, so the two never drift.
// They live outside page.tsx because Next only allows route exports from a
// page file, and ./schema.ts must not import the page (circular).
import { site, mastery } from '@/config/site'

// Title and description lead with the query people actually type ("AI agent
// course for beginners") and carry the one modifier no competitor can use
// (Urdu + English) — Tier A on-page spec, Sept 2026. The title already ends
// in "| DSP" — page.tsx sets it with `absolute` so the root layout's
// '%s | DSP' template does not double the suffix.
export const SEO_TITLE = 'AI Agent Course for Beginners (Urdu + English) — Build, Deploy & Sell AI Agents | DSP'
export const SEO_DESCRIPTION =
  'Self-paced AI agent course for beginners, taught in Urdu and English. 15 modules, one real AI Employee built from an empty folder to a live URL, Anthropic Claude Academy badges, lifetime access. $100 one-time. Pay by bank transfer, JazzCash or Easypaisa.'

/** Absolute canonical URL of the landing page. */
export const CANONICAL = `${site.url}${mastery.url}`

/** When the visible page last changed. One constant feeds three places —
 *  the sitemap's `lastModified`, the WebPage node's `dateModified`, and the
 *  "Last updated" byline under the hero — so they can never disagree.
 *  Deliberately a fixed date, not `new Date()` (which re-stamps every deploy
 *  and tells Google nothing) and not derived from git at build time (a
 *  metadata-only commit would bump it too). Bump it by hand, to the day the
 *  content change ships:
 *    2026-09-05 · Tier A on-page upgrade (question H2s, at-a-glance,
 *                 comparison, Urdu section, running costs, 6 new FAQs)
 *    2026-08-28 · 1b552c5 · M05-L01 replaced with the 17 Aug re-recording */
export const PAGE_LAST_MODIFIED = '2026-09-05T12:00:00+05:00'

// Fixed month names so the byline renders identically on every Node/ICU
// build (toLocaleDateString gives "Sep" on some, "Sept" on others).
const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const [y, m, d] = PAGE_LAST_MODIFIED.slice(0, 10).split('-').map(Number)

/** "5 Sept 2026" — the byline under the hero. */
export const PAGE_UPDATED_DISPLAY = `${d} ${SHORT[m - 1]} ${y}`
/** "September 2026" — the "Updated …" note in the hero sub-line. */
export const PAGE_UPDATED_MONTH = `${LONG[m - 1]} ${y}`
