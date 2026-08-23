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
npm run test:nav            # Nav.tsx must keep /agents /academy /academy/bootcamp /blog /about links
npm run test:mobile-layout
npm run test:blog-cta
```

Pushing to `main` triggers `.github/workflows/deploy.yml`: build + deploy to Vercel production (www.digitalservicesprogram.com).

## What this is

Company site for DSP (Digital Services Program): a software division building AI agents (**DSP Agents**) and a training division (**DSP Academy**). Next.js 16.2.9 App Router, React 19, Tailwind 4, TypeScript.

Routes: `/` two-door homepage (13 locked sections: agency + Agentic Lab) · `/ai-employees` (AI Employees hub: Zara/Adam/Maya/Emma) · `/pricing` (published USD agency pricing) · `/agents` + `/agents/restaurant-ai` + `/agents/case-studies` (software division) · `/academy` + `/academy/bootcamp` (training — rebranded "DSP Agentic Lab" in nav labels; URL frozen for SEO) · `/about` · `/blog` (43 legacy posts) · `/contact` · `/channelops` (ChannelOps product: YouTube cleanup as a service + course). `/bootcamp` 301s to `/academy/bootcamp`; the retired 30-day program's URLs 301 to `/academy` (next.config.ts).

## Config-driven facts

**`src/config/site.ts` is the single source of truth** for prices, seat counts, batch dates, WhatsApp number, restaurant pricing tiers, and the Calendly URL (null = demo CTAs fall back to WhatsApp). Edit facts there, never in components. The bootcamp cohort start date is one config value (`bootcamp.nextBatchDate`/`nextBatchDisplay`) feeding the hero pill, pricing card, and Course JSON-LD together.

The `agency` export holds all AI Employees facts (employee cards, proof-bar numbers, USD tiers, founder bar) plus **publish-checklist gates that must stay gated until signed off**: `emmaDemoPhone`/`emmaDemoPhoneDisplay` (Checkpoint 5), `emmaPricingApproved` (Checkpoint 5 + paid Twilio number), `caseStudiesApproved` (written client permission). Components render placeholders while these are null/false. Resolved Aug 2026 by owner instruction: `zaraDemoWaNumber` is the main site WhatsApp (Zara is DSP's own admissions agent — the demo is her real job), and the Sundus leadership card publishes with first name only, "Gold Medalist" line, and no photo.

## Locked marketing facts — never change without explicit instruction

- Bootcamp: 7 days · 5 live Zoom classes Mon–Fri 9–10 PM PKT · PKR 10,000 one-time (fee shown ONLY in pricing sections — not nav/hero/meta; one approved exception: the homepage Agentic Lab door card, per owner instruction Aug 2026) · 4 certificates (3 Anthropic + 1 DSP) · 30 seats · new batch every Monday
- The 30-day "zero to master" program was removed in Aug 2026 — do not reintroduce it or link to its old pages
- WhatsApp: +92 342 0580864 everywhere on the site (Meta-approved WhatsApp Business number) · email info@digitalservicesprogram.com. +92 311 8122222 is used privately to reply to clients — never publish it on the site.
- Never reintroduce "15-Day", "5-day", or the old number 923253966799

## Architecture: three visual shells, deliberately isolated

- **Company pages** (`/`, `/agents/*`, `/academy`, `/about`) use `src/components/site/SiteShell.tsx` (SiteHeader/SiteFooter) with `src/app/site.css`, scoped under `.dsp-site`.
- **Bootcamp page** (`src/app/academy/bootcamp/` + `src/components/home/`) keeps the content/section order of the original designed page but renders on the shared `.dsp-site` system. Page-specific styles (console, day rows, FAQ, sticky CTA) live in `src/app/bootcamp.css`, scoped under `.page-bootcamp` — put new bootcamp-only CSS there, not in site.css.
- **Blog and contact** (`src/app/blog/`, `src/app/contact/`) keep the old dark theme: `globals.css` variables plus `src/components/Nav.tsx`/`Footer.tsx`, rendered by their **own route layouts**, not the root layout. The root layout intentionally renders no nav/footer.
- Root layout (`src/app/layout.tsx`) owns `metadataBase`, `alternates: { canonical: './' }`, the sitewide Organization JSON-LD, and GA4 (`src/components/site/Analytics.tsx`, active only when `NEXT_PUBLIC_GA4_ID` is set). Page-level JSON-LD: Course on the bootcamp page, Service on `/agents`, Product on `/agents/restaurant-ai`, Person on `/about`.

GA4 events: `whatsapp_cta_click`, `restaurant_demo_click`, `academy_cta_click`, `agents_cta_click`, `channelops_course_cta`, `channelops_service_cta`, `channelops_whatsapp_cta` — fired via `src/lib/track.ts` and `src/components/site/TrackedLink.tsx`.

## Blog

43 posts stored as data in `src/content/posts.json`, accessed via `src/lib/posts.ts`, rendered by `src/app/blog/[slug]/page.tsx`. Slugs are preserved exactly from the old PHP site so Google-indexed URLs keep working — never rename a slug. `dsp-blog-migration/` is the original migration bundle these files came from; it is not part of the app.

## Lead capture

`src/app/api/lead/route.ts` receives form posts (bootcamp `LeadForm.tsx` and contact `BookingForm.tsx`, distinguished by a `type` field) and forwards to a Google Sheets Apps Script webhook, plus optional email via Resend. Env vars in `.env.example`: `GOOGLE_SHEETS_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_EMAIL`. Failures are logged but never block the response.
