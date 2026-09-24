// src/app/ai-employees/seo.ts — when the visible /ai-employees page last
// changed. One constant feeds two places — the sitemap's `lastModified` and
// the WebPage node's `dateModified` — so they can never disagree (same rule
// as ../mastery/seo.ts and ../agents/seo.ts). A fixed date, never
// `new Date()`; bump it by hand on every visible-copy change to
// /ai-employees, in the same PR:
//   2026-09-24 · /ai-employees became the second commercial entity + answer
//                page: visible "What is an AI Employee?" definition reused as
//                the Service and WebPage description, buyer-led title that
//                names Pakistan, provider merged into the sitewide
//                Organization @id, areaServed Islamabad / Pakistan /
//                Worldwide, FAQ 5 → 9 with the buyer questions first.
//                sitemap.ts had hard-coded 2026-09-23 and the page emitted no
//                dateModified at all
export const PAGE_LAST_MODIFIED = '2026-09-24T14:30:00+05:00'
