# DSP Website V2 — Progress

Working branch: `claude/dsp-website-v2-build-gkpkaw` · one PR per phase, title prefixed `[Phase N]` · owner merges, never Claude.

## Phase 0 — Audit + emergency fixes

| # | Task | Status | Commit |
|---|------|--------|--------|
| 0A | Repo audit (read-only) | done — reported in session | — |
| Fix 1 | noindex `/mastery/enrol` + `/app` nofollow + `robots.ts` (option B: enrol not robots-disallowed yet) | done | see git log |
| Fix 2 | Add `/mastery` to sitemap | not started | |
| Fix 3 | Stale bootcamp `nextBatchDate` feeding Course JSON-LD | blocked — needs owner decision (see below) | |
| Fix 4 | Proof counters: server-render real values + `asOf: '2026-08-23'` | not started | |
| Fix 5 | Bunny tokens on `/mastery` → per-request signing | not started | |
| Fix 6 | Remove duplicate 4-part formula block on `/mastery` | not started | |
| Fix 7 | Remove homepage dead CTAs (case-studies teaser, Emma phone button) | not started | |

## Decisions needed from the owner

- **Fix 3**: correct next batch date for `bootcamp.nextBatchDate` (currently `2026-07-27`, in the past) — or confirm batches are continuous so the schema can drop the hardcoded date (proposal to follow at Fix 3 time).

## Open items

- Add `/mastery/enrol` to the robots.txt disallow list after confirming de-index in Google Search Console — earliest 4 weeks from 2026-08-30 (owner ruling: option B; see TODO in `src/app/robots.ts`).
- Lint cleanup: 25 pre-existing `react/no-unescaped-entities` errors in `mastery/page.tsx` + three `/app` pages — dedicated cleanup commit at the end of Phase 0, not before.

## Notes

- Bunny token finding (0A): no hardcoded embed URLs anywhere; all embeds sign via `signedEmbedUrl()` (server-only key). `/app` lessons and `/mastery/preview` sign per request. `/mastery` signs at ISR regeneration (daily) with a 7-day TTL — regeneration is confirmed working in prod, so this is a structural risk, not a deadline. Fix 5 moves `/mastery` to per-request signing.
- `DSP-Website-V2-Master-Blueprint.md` not yet on `origin/main` as of Fix 1 — to be read once committed.
- Ruling recorded: `/academy/bootcamp` stays frozen (no move, no 301); `/learn` will link to it. Homepage lock lifted for Phase 4 only, CLAUDE.md updated in that PR. `test:nav` updated in the same commit as any nav change, never deleted.
