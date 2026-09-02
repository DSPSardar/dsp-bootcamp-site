// src/app/mastery/seo.ts — the search-facing strings for /mastery, shared by
// the page's `metadata` export (title / description / canonical / OG /
// Twitter) and the JSON-LD graph in ./schema.ts, so the two never drift.
// They live outside page.tsx because Next only allows route exports from a
// page file, and ./schema.ts must not import the page (circular).
import { site, mastery } from '@/config/site'

// Title and description lead with the query people actually type ("AI agent
// course for beginners") rather than the internal product name. The title
// already ends in "| DSP" — page.tsx sets it with `absolute` so the root
// layout's '%s | DSP' template does not double the suffix.
export const SEO_TITLE = 'AI Agent Course for Beginners — Build, Deploy & Sell AI Agents | DSP'
export const SEO_DESCRIPTION =
  'A self-paced AI agent course for beginners: 15 modules, one real AI Employee you build from scratch to a live URL, lifetime access, one year of support. $100 one-time. Taught in Urdu and English.'

/** Absolute canonical URL of the landing page. */
export const CANONICAL = `${site.url}${mastery.url}`

/** `lastModified` for /mastery in sitemap.xml.
 *  Deliberately a fixed date, not `new Date()` (which re-stamps every deploy
 *  and tells Google nothing) and not derived from git at build time (a
 *  metadata-only commit would bump it too). It is the date of the last
 *  commit on main that changed the page's *content*:
 *    1b552c5 · 2026-08-28 · "M05-L01 replaced with the 17 Aug re-recording"
 *  Bump it by hand when the visible page changes. */
export const PAGE_LAST_MODIFIED = '2026-08-28T12:43:16+05:00'
