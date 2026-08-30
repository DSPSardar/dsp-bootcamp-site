# DSP Website V2 — Progress

Working branch: `claude/dsp-website-v2-build-gkpkaw` · one PR per phase, title prefixed `[Phase N]` · owner merges, never Claude.

## Phase 0 — Audit + emergency fixes

| # | Task | Status | Commit |
|---|------|--------|--------|
| 0A | Repo audit (read-only) | done — reported in session | — |
| Fix 1 | noindex `/mastery/enrol` + `/app` nofollow + `robots.ts` (option B: enrol not robots-disallowed yet) | done | see git log |
| Fix 2 | Add `/mastery` to sitemap (`/verify` deferred to Phase 5) | done | see git log |
| Fix 3 (replaced) | **Bootcamp sunset pass** (owner ruling 2026-08-30): Course/CourseInstance/Schedule JSON-LD removed from `/academy/bootcamp`; FAQPage pruned to 3 evergreen questions; page rewritten as past-tense explainer with a single `/mastery` CTA; homepage Agentic Lab door + final-band bootcamp CTA removed; `nextBatchDate`/`nextBatchDisplay`/`nextBatchOrdinal`/fee fields removed from config; enrolment components (LeadForm, AnnouncementBar, StickyCta, SyllabusButton, ConsoleClock, Compare/Pricing/Join sections) deleted; CLAUDE.md locked facts updated to Mastery-only | done | see git log |
| Fix 4 | Proof counters: server-render real values + `asOf: '2026-08-23'` shown visibly | done | see git log |
| Fix 5 | Bunny tokens on `/mastery` → per-request signing via allowlisted `/api/video/[videoId]` 307 route; key stays server-side | done | see git log |
| Fix 6 | Removed duplicate 4-part formula block on `/mastery` (5-part hero version kept) | done | see git log |
| Fix 7 | Homepage dead CTAs removed: case-studies teaser section gone; Emma placeholder hidden on the homepage only (`emmaPlaceholder={false}`), still shown on /ai-employees; real Emma button auto-appears everywhere once `emmaDemoPhone` is set | done | see git log |

## Sunset reference audit — executed under the owner's blanket ruling (2026-08-30)

One commit per surface: **C** `/academy` retired, 301 → `/mastery` (FDE redirects re-pointed there too, no chains) · **B** sitewide + homepage metadata and hero lead with AI Employees + Mastery · **D** `/about` past-tensed, CTA → `/mastery` · **A** Agentic Lab left primary nav; SiteFooter carries the history entry "The Agentic Lab (2025–2026)"; blog-shell "Join Bootcamp" CTA → Mastery; `test:nav` updated in the same commit · **blog** post CTA → `/mastery`, `test:blog-cta` rewritten (app copy only; `dsp-blog-migration/` is a frozen archive) · **E** ChannelOps "Bootcamp" → "Agentic Lab alumni", perk + PKR 25,000 alumni fee kept live (meaning-preserving, flagged) · **G** bootcamp PDF + DOCX handouts removed from `public/` (the PDF printed the private phone number, the fee, and weekly batches), syllabus-download block removed, bootcamp sitemap entry demoted to monthly/0.5.

Untouched by owner exception: `/mastery` "Weekly live Q&A, recorded" (+ same promise in its FAQ), "recorded live with real students", all student testimonials referencing the bootcamp, and the `/academy/bootcamp` URL (live, indexed, no 301).

## Open items

- Add `/mastery/enrol` to the robots.txt disallow list after confirming de-index in Google Search Console — earliest 4 weeks from 2026-08-30 (owner ruling: option B; see TODO in `src/app/robots.ts`).
- Lint cleanup: 25 pre-existing `react/no-unescaped-entities` errors in `mastery/page.tsx` + three `/app` pages — dedicated cleanup commit at the end of Phase 0, not before.

## Notes

- Bunny token finding (0A): no hardcoded embed URLs anywhere; all embeds sign via `signedEmbedUrl()` (server-only key). `/app` lessons and `/mastery/preview` sign per request. `/mastery` signs at ISR regeneration (daily) with a 7-day TTL — regeneration is confirmed working in prod, so this is a structural risk, not a deadline. Fix 5 moves `/mastery` to per-request signing.
- `DSP-Website-V2-Master-Blueprint.md` not yet on `origin/main` as of Fix 1 — to be read once committed.
- Ruling recorded: `/academy/bootcamp` stays frozen (no move, no 301); `/learn` will link to it. Homepage lock lifted for Phase 4 only, CLAUDE.md updated in that PR. `test:nav` updated in the same commit as any nav change, never deleted.
