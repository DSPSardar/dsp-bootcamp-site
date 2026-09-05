# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server — MUST keep the --webpack flag (Next 16 removed --no-turbopack)
npm run build    # production build
npm run lint     # eslint
```

There is no test framework. Tests are standalone Node scripts that statically check source files and exit non-zero on failure:

```bash
npm run test:nav            # both navs (Nav.tsx + SiteHeader.tsx) must keep /ai-employees /mastery /pricing /blog /about + the /mastery/enrol CTA
npm run test:mobile-layout
npm run test:blog-cta
npm run test:schema         # /mastery JSON-LD graph: FAQ + curriculum text mirrors the page, every @id resolves, required fields, locked-facts guards; prints the graph for Rich Results Test (needs Node 22.18+)
```

Pushing to `main` triggers `.github/workflows/deploy.yml`: build + deploy to Vercel production (www.digitalservicesprogram.com).

## What this is

Company site for DSP (Digital Services Program): a software division building AI agents (**DSP Agents**) and a training division (**DSP Academy**). Next.js 16.2.9 App Router, React 19, Tailwind 4, TypeScript.

Routes: `/mastery` (self-paced AI Agent Mastery — DSP's only educational product, own shell) · `/` homepage (Mastery-primary, 13 sections in the blueprint §4 locked order; the agency appears only in the proof section and the hire band) · `/ai-employees` (AI Employees hub: Zara/Adam/Maya/Emma) · `/pricing` (published USD agency pricing) · `/agents` + `/agents/restaurant-ai` + `/agents/case-studies` (software division) · `/academy/bootcamp` (the sunset Agentic Lab's evergreen explainer — see locked facts below; URL frozen for SEO) · `/about` · `/blog` (43 legacy posts) · `/contact` · `/channelops` (ChannelOps product: YouTube cleanup as a service + course). `/bootcamp` 301s to `/academy/bootcamp`; `/academy` (retired at the sunset) and the retired 30-day program's URLs 301 to `/mastery` (next.config.ts).

## Config-driven facts

**`src/config/site.ts` is the single source of truth** for prices, WhatsApp number, restaurant pricing tiers, and the Calendly URL (null = demo CTAs fall back to WhatsApp). Edit facts there, never in components. The `bootcamp` export holds only historical facts for the evergreen explainer page and `/about` — there are no batch dates or enrolment fields any more, and none may be added back.

The `agency` export holds all AI Employees facts (employee cards, proof-bar numbers, USD tiers, founder bar) plus **publish-checklist gates that must stay gated until signed off**: `emmaDemoPhone`/`emmaDemoPhoneDisplay` (Checkpoint 5), `emmaPricingApproved` (Checkpoint 5 + paid Twilio number), `caseStudiesApproved` (written client permission). Components render placeholders while these are null/false. Resolved Aug 2026 by owner instruction: `zaraDemoWaNumber` is the main site WhatsApp (Zara is DSP's own admissions agent — the demo is her real job), and the Sundus leadership card publishes with first name only, "Gold Medalist" line, and no photo.

## Locked marketing facts — never change without explicit instruction

- **The live bootcamp (DSP Agentic Lab) was sunset on 2026-08-30** by owner instruction. No more live batches, ever mentioned in future tense. `/academy/bootcamp` stays live, indexed, and URL-frozen as an evergreen explainer of what the Lab was (historical facts: 7 days, 5 live Zoom classes, 4 certificates — 3 Anthropic + 1 DSP, 6 batches, 180+ students); its single CTA points to `/mastery`. Do not reintroduce batch dates, seat counts, fees, or enrolment CTAs for it anywhere.
- **`/mastery` is DSP's only educational product**: the self-paced **DSP AI Agent Mastery — Zero to Master** (approved by owner 25 Aug 2026): recorded lectures, 15 modules, $100 one-time, lifetime access, 12 months group support. Facts live in `src/config/site.ts` (`mastery`). Page shell is its own (`src/app/mastery/mastery.css`, scoped `.page-mastery`, dark navy) and does not use SiteShell.
- The live 30-day program was removed in Aug 2026 — do not reintroduce it or link to its old pages.
- WhatsApp: +92 342 0580864 everywhere on the site (Meta-approved WhatsApp Business number) · email info@digitalservicesprogram.com. +92 311 8122222 is used privately to reply to clients — never publish it on the site.
- Never reintroduce "15-Day", "5-day", or the old number 923253966799

## Architecture: three visual shells, deliberately isolated

- **Company pages** (`/`, `/agents/*`, `/about`) use `src/components/site/SiteShell.tsx` (SiteHeader/SiteFooter) with `src/app/site.css`, scoped under `.dsp-site`.
- **Bootcamp page** (`src/app/academy/bootcamp/` + `src/components/home/`) is the sunset Agentic Lab's evergreen explainer, rendered on the shared `.dsp-site` system. Page-specific styles (day rows, FAQ) live in `src/app/bootcamp.css`, scoped under `.page-bootcamp` — put new bootcamp-only CSS there, not in site.css.
- **Blog and contact** (`src/app/blog/`, `src/app/contact/`) keep the old dark theme: `globals.css` variables plus `src/components/Nav.tsx`/`Footer.tsx`, rendered by their **own route layouts**, not the root layout. The root layout intentionally renders no nav/footer.
- Root layout (`src/app/layout.tsx`) owns `metadataBase`, `alternates: { canonical: './' }`, the sitewide Organization JSON-LD, and GA4 (`src/components/site/Analytics.tsx`, active only when `NEXT_PUBLIC_GA4_ID` is set). Page-level JSON-LD: FAQPage on the bootcamp page (Course schema was removed at the sunset — do not re-add it), Service on `/agents`, Product on `/agents/restaurant-ai`, Person on `/about`. `/mastery` renders one `@graph` from `src/app/mastery/schema.ts` (Organization · WebSite · WebPage · Person · Course with its single **self-paced** CourseInstance — never add dates, seats or a location to it · FAQPage · VideoObject for the welcome tour, **gated** on `mastery.welcomePoster` — no poster, no node), linked by `@id`; its FAQ and syllabus text is mirrored from the page via `faqs.ts` / `curriculum.ts` and guarded by `test:schema`. The page's student-build cards come from `students.ts` (only students on camera, names only with consent) and the running-cost section from `running-costs.ts`, whose numeric table is **gated** (`RUNNING_COST_ROWS` stays `null` until real dashboard figures exist — never estimates). `seo.ts` holds `PAGE_LAST_MODIFIED`, which feeds the sitemap, the WebPage `dateModified` and the visible "Last updated" byline — bump it when the page content changes. The sitewide Organization (root layout) and the `/mastery` graph's share `@id …/#organization` so parsers merge them; the inline `provider`/`worksFor`/`publisher` Organization literals on other pages do not carry it yet.

GA4 events: `whatsapp_cta_click`, `restaurant_demo_click`, `academy_cta_click`, `agents_cta_click`, `channelops_course_cta`, `channelops_service_cta`, `channelops_whatsapp_cta`, `begin_enrol` (nav CTAs + `/mastery` "Pay directly" links, `{cta, location}`), `whatsapp_click` (`/mastery` primary CTAs, `{location}` — WhatsApp-first by owner ruling 2026-08-30), `view_evolution_complete`, `hire_band_click` — fired via `src/lib/track.ts` and `src/components/site/TrackedLink.tsx`.

## Blog

43 posts stored as data in `src/content/posts.json`, accessed via `src/lib/posts.ts`, rendered by `src/app/blog/[slug]/page.tsx`. Slugs are preserved exactly from the old PHP site so Google-indexed URLs keep working — never rename a slug. `dsp-blog-migration/` is the original migration bundle these files came from; it is not part of the app.

## Lead capture

`src/app/api/lead/route.ts` receives form posts (contact `BookingForm.tsx`; the bootcamp `LeadForm.tsx` was deleted at the sunset, and the route still accepts a `type` field) and forwards to a Google Sheets Apps Script webhook, plus optional email via Resend. Env vars in `.env.example`: `GOOGLE_SHEETS_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_EMAIL`. Failures are logged but never block the response.
