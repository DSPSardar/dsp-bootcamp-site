# DSP Website V2 — Progress

Working branch: `claude/dsp-website-v2-build-gkpkaw` · one PR per phase, title prefixed `[Phase N]` · owner merges, never Claude.
Governing document: `docs/DSP-Website-V2-Master-Blueprint.md` (supersedes the original brief; §0.4 records the bootcamp sunset; `/learn` is cancelled).

## Phase 4 — homepage v2 (PR #5)

| Unit | What | Notes |
|---|---|---|
| evolution | `src/components/home/Evolution.tsx` — §4-02 rail (AI Employee at 2x weight), the site's ONE animation (§7): IntersectionObserver reveal, 200ms, no library; SSR/no-JS/reduced-motion render fully lit; fires `view_evolution_complete` once | Dim happens via rAF after mount (lint: no sync setState in effects) |
| homepage | `/` rebuilt to the §4 thirteen-section locked order, Mastery-primary. Agency appears exactly twice (proof + hire band, §0.1). All proof pre-existing: `agency.proof` counters + as-of, 180+/6 cohort history, the /mastery Bunny student videos (existing `/api/video` allowlist, hidden when Bunny env is absent), Anthropic cert photos, earnings disclaimer kept. FAQ = 8 already-published answers + FAQPage LD. Enrol CTAs → `/mastery/enrol` (`begin_enrol` ×3); `hire_band_click`; hero italic uses `--t-accent-bright` (AA-large 3.45:1 on navy-deep) — the homepage's last legacy gold is gone | Sundus card moved off the homepage per §4 ("INSTRUCTOR — Sardar") — she stays on /about. Employee cards / live demo / platform / pricing teaser left the homepage, all still live on their own pages. Legacy classes (authority-bar, hero-pill, door-grid, teaser-tiers) stay in site.css — restaurant-ai and the bootcamp explainer still use them |

## Phase 3 — /ai-employees pillar (PR #4)

| Unit | What | Notes |
|---|---|---|
| learn band | The category pillar gains its second door per §1 ("hire one, or learn to build them"): one sentence + one ghost link to /mastery (`academy_cta_click {cta:'aiemp_learn_band'}`), no pricing — hire-band restraint mirrored | Existing agency copy (approved copy doc) untouched; employee slug pages deliberately left hire-only |
| FAQ schema | FAQPage LD on the hub via `faqPageLd` — the visible `faqs` array is the single source | Verified in built HTML: Organization + Service + BreadcrumbList + FAQPage(4) |

## Phase 2 — navigation (PR #3)

| Unit | What | Notes |
|---|---|---|
| header (company shell) | SiteHeader rebuilt per blueprint §2: AI Employees · Mastery · Hire · Blog · About + one CTA **[Enrol — $100]** → `/mastery/enrol` (fires `begin_enrol`, price from `mastery.priceUsd`); WhatsApp button out of the header | **Hire → `/pricing`** (judgment call: §2 rules /agents and /contact out of nav; /pricing is the agency's commercial page — one-line change if ruled otherwise). **Student Work deferred** until `/student-work` ships in Phase 5 — never link a 404 |
| header (blog shell) | Nav.tsx mirrors the same five items + Enrol CTA; `test:nav` extended to guard both nav components and the CTA in the same commit | /contact left the header, stays in Footer |
| footer reachability | blog-shell Footer picks up /agents + /channelops (their only links on that shell after the rebuild); SiteFooter already carries all out-of-nav pages | Out of nav, still live: /agents, /channelops, /academy/bootcamp, /contact |

## Phase 1 — fonts + design tokens (PR #2)

| Unit | What | Notes |
|---|---|---|
| fonts | Instrument Serif (h1/h2 only, single 400 weight + italic) · Inter (body + UI display) · JetBrains Mono — all via next/font in the root layout; both runtime Google Fonts @imports killed; preconnects removed | Noto Nastaliq Urdu **dropped, not ported** — zero Urdu-script glyphs remain in src/ after the sunset (owner notified pre-merge) |
| fonts fix | /mastery, /mastery/enrol, /app had their own Bricolage/IBM Plex next/font loads shadowing the root mapping — removed; everything cascades from the root trio | |
| tokens | `src/app/tokens.css`: blueprint §5 palette + type scale at `:root`; shells re-point VALUES, scopes stay isolated; body 17→18px; h2 caps at 48px; light + dark shell CTAs → terracotta/white | **WCAG**: blueprint `#C15F3C` fails AA at 16px (3.99:1 on paper, 4.23:1 under white); shipped accent is the proposed darker `#B0522F` (4.84 / 5.13 — both pass). `#C15F3C` kept as `--t-accent-bright` for large/decorative only |
| mastery swap | Gold → terracotta on the mastery shell, one revertable commit; dark-shell tints `#D97B52`/`#E08D66` (AA on ink/panel), enrol button `#B0522F` + white | Revert this commit alone to restore gold |

| schema | `src/lib/schema.ts` typed builders (organization/breadcrumb/faqPage/masteryCourse — **no CourseInstance/Schedule, ever**); /mastery gains Course+Offer+FAQPage(9)+breadcrumb (it had none); breadcrumbs on all major indexed pages + every blog post; Organization + bootcamp FAQ migrated to builders | Page-unique Service/Product/Person/BlogPosting stay as typed literals in their pages |

Accent-restraint pass (max 2 accent uses/viewport) lands with the Phase 4 homepage rebuild; decorative golds on the light shell stay until then.

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

## SEO pass — /mastery (target query "AI agent course for beginners", 2026-09-02)

| Step | What | Notes |
|---|---|---|
| 2 metadata | `title` (absolute, 68 chars — the ≤60 variant would drop "Deploy"), query-led description, absolute canonical, explicit `robots index/follow`, OG/Twitter restated (Next merges `openGraph` shallowly, so `og-card.png` had to be restated) | H1 and page copy untouched. `og-card.png` is still the **old bootcamp banner** (PKR 10,000 · 7 days) — replace before sharing the URL |
| 3 schema | One `@graph` from `src/app/mastery/schema.ts`: Organization (`#organization`, shared @id with the root layout's script) · WebSite · WebPage · Person (`#sardar-ghaffar`) · Course + one **self-paced** CourseInstance (owner ruling — no dates/seats/location, ever) + Offer + 15 Syllabus · FAQPage (verbatim from the page). Text mirrored via `faqs.ts` / `curriculum.ts`; `test:schema` diffs them against the page and prints the graph for Rich Results Test | **No VideoObject**: the repo has no thumbnail for any of the four Bunny embeds (rule: real title + thumbnail + uploadDate or skip). Logo points at `/logo.webp`, which is a 1×1 placeholder — drop the real mark there. `repeatFrequency: Self-paced` and `instructor` on Course are per spec; Google documents Daily/Weekly/Monthly + `repeatCount`, and the FAQ's "an hour a day for 30 days" is the valid fallback if RRT objects |

## Open items

- Add `/mastery/enrol` to the robots.txt disallow list after confirming de-index in Google Search Console — earliest 4 weeks from 2026-08-30 (owner ruling: option B; see TODO in `src/app/robots.ts`).
- ~~Lint cleanup~~ done (end of Phase 0): the 25 pre-existing `react/no-unescaped-entities` errors in `mastery/page.tsx` + three `/app` pages are fixed (JSX escaping only — rendered copy unchanged), plus two genuinely unused `supabaseServer` imports removed. `npm run lint` is now error-free; the one remaining warning is the deliberate `<img>` on `/mastery`.

## Notes

- Bunny token finding (0A): no hardcoded embed URLs anywhere; all embeds sign via `signedEmbedUrl()` (server-only key). `/app` lessons and `/mastery/preview` sign per request. `/mastery` signs at ISR regeneration (daily) with a 7-day TTL — regeneration is confirmed working in prod, so this is a structural risk, not a deadline. Fix 5 moves `/mastery` to per-request signing.
- `DSP-Website-V2-Master-Blueprint.md` not yet on `origin/main` as of Fix 1 — to be read once committed.
- Ruling recorded: `/academy/bootcamp` stays frozen (no move, no 301); `/learn` will link to it. Homepage lock lifted for Phase 4 only, CLAUDE.md updated in that PR. `test:nav` updated in the same commit as any nav change, never deleted.
