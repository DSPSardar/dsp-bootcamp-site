// src/app/pricing/seo.ts — when the visible /pricing page last changed. One
// constant feeds two places — the sitemap's `lastModified` and the WebPage
// node's `dateModified` — so they can never disagree. A fixed date, never
// `new Date()`; bump it by hand on every visible-copy change to /pricing, in
// the same PR (the PR-#26 rule):
//   2026-09-28 · /pricing became the cost-answer page: answer-first block
//                leading with the two real numbers read from
//                `agency.pricing.tiers`, a buyer-led title asking the
//                question the query asks, FAQ 4 -> 8 with a FAQPage node
//                (the page had none — the <details> list was invisible to
//                every engine), the id-less inline Organization in the
//                Service provider replaced by ORGANIZATION_ID, and
//                areaServed naming Islamabad / Pakistan / Worldwide instead
//                of the bare string 'Worldwide'. sitemap.ts had hard-coded
//                2026-08-30 — 29 days stale — and the page emitted no
//                dateModified at all
export const PAGE_LAST_MODIFIED = '2026-09-28T14:30:00+05:00'
