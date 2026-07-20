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
npm run test:nav            # Nav.tsx must keep /agents /academy /academy/bootcamp /academy/fde /blog /about links
npm run test:mobile-layout
npm run test:blog-cta
```

Pushing to `main` triggers `.github/workflows/deploy.yml`: build + deploy to Vercel production (www.digitalservicesprogram.com).

## What this is

Company site for DSP (Digital Services Program): a software division building AI agents (**DSP Agents**) and a training division (**DSP Academy**). Next.js 16.2.9 App Router, React 19, Tailwind 4, TypeScript.

Routes: `/` dual-engine homepage · `/agents` + `/agents/restaurant-ai` + `/agents/case-studies` (software division) · `/academy` + `/academy/bootcamp` + `/academy/fde` (training) · `/about` · `/blog` (43 legacy posts) · `/contact`. `/bootcamp` and `/fde` 301 to their `/academy/*` pages (next.config.ts).

## Config-driven facts

**`src/config/site.ts` is the single source of truth** for prices, seat counts, batch dates, WhatsApp number, restaurant pricing tiers, and the Calendly URL (null = demo CTAs fall back to WhatsApp). Edit facts there, never in components. The bootcamp cohort start date is one config value (`bootcamp.nextBatchDate`/`nextBatchDisplay`) feeding the hero pill, pricing card, and Course JSON-LD together.

## Locked marketing facts — never change without explicit instruction

- Bootcamp: 7 days · 5 live Zoom classes Mon–Fri 9–10 PM PKT · PKR 10,000 one-time (fee shown ONLY in pricing sections — not nav/hero/meta) · 4 certificates (3 Anthropic + 1 DSP) · 30 seats · new batch every Monday
- FDE program: 30 days · PKR 100,000 · 20 seats per batch · monthly batches · PKR 10,000 bootcamp-alumni credit
- WhatsApp: +92 311 8122222 everywhere · email info@digitalservicesprogram.com
- Never reintroduce "15-Day", "5-day", or the old number 923253966799

## Architecture: three visual shells, deliberately isolated

- **Company pages** (`/`, `/agents/*`, `/academy`, `/academy/fde`, `/about`) use `src/components/site/SiteShell.tsx` (SiteHeader/SiteFooter) with `src/app/site.css`, scoped under `.dsp-site`.
- **Bootcamp page** (`src/app/academy/bootcamp/` + `src/components/home/`) is the 1:1 port of the designed single-file `index.html` (formerly the homepage). All of its CSS lives in `src/app/home.css`, scoped under `.dsp-home`. When editing it, stay inside that scope.
- **Blog and contact** (`src/app/blog/`, `src/app/contact/`) keep the old dark theme: `globals.css` variables plus `src/components/Nav.tsx`/`Footer.tsx`, rendered by their **own route layouts**, not the root layout. The root layout intentionally renders no nav/footer.
- Root layout (`src/app/layout.tsx`) owns `metadataBase`, `alternates: { canonical: './' }`, the sitewide Organization JSON-LD, and GA4 (`src/components/site/Analytics.tsx`, active only when `NEXT_PUBLIC_GA4_ID` is set). Page-level JSON-LD: Course on both course pages, Service on `/agents`, Product on `/agents/restaurant-ai`, Person on `/about`.

GA4 events: `whatsapp_cta_click`, `fde_apply_submit`, `restaurant_demo_click`, `academy_cta_click`, `agents_cta_click` — fired via `src/lib/track.ts` and `src/components/site/TrackedLink.tsx`.

## Blog

43 posts stored as data in `src/content/posts.json`, accessed via `src/lib/posts.ts`, rendered by `src/app/blog/[slug]/page.tsx`. Slugs are preserved exactly from the old PHP site so Google-indexed URLs keep working — never rename a slug. `dsp-blog-migration/` is the original migration bundle these files came from; it is not part of the app.

## Lead capture

`src/app/api/lead/route.ts` receives form posts (bootcamp `LeadForm.tsx`, contact `BookingForm.tsx`, and FDE applications via `src/components/site/FdeApplicationForm.tsx`, distinguished by a `type` field) and forwards to a Google Sheets Apps Script webhook, plus optional email via Resend. Env vars in `.env.example`: `GOOGLE_SHEETS_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_EMAIL`. Failures are logged but never block the response.
