// src/app/about/seo.ts — when the visible /about page last changed. One
// constant feeds two places — the sitemap's `lastModified` and the AboutPage
// node's `dateModified` — so they can never disagree (same rule as
// ../mastery/seo.ts, ../agents/seo.ts, ../ai-employees/seo.ts). A fixed date,
// never `new Date()`; bump it by hand on every visible-copy change to /about,
// in the same PR (the PR-#26 rule):
//   2026-09-28 · /about became the entity answer + disambiguation page:
//                answer-first block rendering `entity.description` verbatim,
//                an eight-question FAQPage (government programme, the DSP
//                acronym collision, who runs it, where it is, what it sells),
//                a visible "Last updated" byline, and a title naming the
//                company, its category and its city. sitemap.ts had
//                hard-coded 2026-09-10 — the 4th page found with the PR-#26
//                defect — and the page emitted no dateModified at all
//   2026-10-04 · Answered the Digital Services Pakistan company-name and
//                Deputy Superintendent of Police acronym collisions, both
//                measured on the live brand SERP.
export const PAGE_LAST_MODIFIED = '2026-10-04T14:30:00+05:00'
