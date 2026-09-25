// src/app/agents/seo.ts — when the visible /agents page last changed. One
// constant feeds two places — the sitemap's `lastModified` and the WebPage
// node's `dateModified` — so they can never disagree (same rule as
// ../mastery/seo.ts). A fixed date, never `new Date()`; bump it by hand on
// every visible-copy change to /agents, in the same PR:
//   2026-09-22 · #35 (f168c5c, merged 14:21 PKT): /agents became the
//                commercial entity + answer page — answer-first definition,
//                dashboard-sourced proof band, six-question FAQ, buyer-led
//                title. sitemap.ts had hard-coded 2026-09-20 (the day the
//                branch was cut), and the page emitted no dateModified at all
//   2026-09-25 · one sentence added to the answer block: /agents now links
//                to /sardar, the live voice AI Employee anyone can call in
//                the browser. Visible copy changed, so the date moves with it
export const PAGE_LAST_MODIFIED = '2026-09-25T14:30:00+05:00'
