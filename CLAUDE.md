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
npm run test:nav            # both navs (Nav.tsx + SiteHeader.tsx) must keep AI Employees · Agent Hub · Pricing · Mastery · Case Studies · About · Blog + the "Talk to Zara" WhatsApp CTA; both footers keep /contact /agents /channelops (+ /academy/bootcamp) reachable; "DSP Academy" / "Agentic Lab" / "AI Agents" may never return as nav or footer headings
npm run test:mobile-layout
npm run test:blog-cta
npm run test:schema         # /mastery JSON-LD graph: FAQ + curriculum text mirrors the page, every @id resolves, required fields, locked-facts guards; prints the graph for Rich Results Test (needs Node 22.18+)
```

Pushing to `main` triggers `.github/workflows/deploy.yml`: build + deploy to Vercel production (www.digitalservicesprogram.com).

## What this is

Company site for DSP (Digital Services Program), positioned since 15 Sep 2026 as an **AI Employee company**: DSP builds AI Employees for business — and teaches people how to build them. Three things the site must keep distinct: **DSP** (the parent company), **DSP Agent Hub** (the product — `ASOS, AI Sales OS` at dspagenthub.com, the platform every AI Employee runs on; facts in `agency.hub*`) and **DSP AI Agent Mastery** (the education product at `/mastery`). The spine is Learn → Build → Deploy. The older division names (**DSP Agents** software division, **DSP Academy** training division) still describe `/agents/*` and `/mastery`. Next.js 16.2.9 App Router, React 19, Tailwind 4, TypeScript.

Routes: `/mastery` (self-paced AI Agent Mastery — DSP's only educational product, own shell) · `/` homepage (**V3, 15 Sep 2026, owner instruction: AI-Employee-primary**, 12 sections in the brief's order — hero · evolution · AI Employees · DSP Agent Hub · proof · distribution engine · AI Employee engine · Mastery · what you build · Learn→Build→Deploy→Scale · global · final CTA, then FAQ + survey; `src/app/home.css` holds its page-only styles) · `/ai-employees` (AI Employees hub: Zara/Adam/Maya/Emma) · `/pricing` (published USD agency pricing) · `/agents` + `/agents/restaurant-ai` + `/agents/case-studies` (software division) · `/academy/bootcamp` (the sunset Agentic Lab's evergreen explainer — see locked facts below; URL frozen for SEO) · `/about` · `/blog` (43 legacy posts) · `/contact` · `/channelops` (ChannelOps product: YouTube cleanup as a service + course). `/bootcamp` 301s to `/academy/bootcamp`; `/academy` (retired at the sunset) and the retired 30-day program's URLs 301 to `/mastery` (next.config.ts).

## Config-driven facts

**`src/config/site.ts` is the single source of truth** for prices, WhatsApp number, restaurant pricing tiers, and the Calendly URL (null = demo CTAs fall back to WhatsApp). Edit facts there, never in components. The `bootcamp` export holds only historical facts for the evergreen explainer page and `/about` — there are no batch dates or enrolment fields any more, and none may be added back.

The `agency` export holds all AI Employees facts (employee cards, proof-bar numbers, USD tiers, founder bar) plus **publish-checklist gates that must stay gated until signed off**: `emmaDemoPhone`/`emmaDemoPhoneDisplay` (Checkpoint 5), `emmaPricingApproved` (Checkpoint 5 + paid Twilio number), `caseStudiesApproved` (written client permission). Components render placeholders while these are null/false. Resolved Aug 2026 by owner instruction: `zaraDemoWaNumber` is the main site WhatsApp (Zara is DSP's own admissions agent — the demo is her real job), and the Sundus leadership card publishes with first name only, "Gold Medalist" line, and no photo.

## Locked marketing facts — never change without explicit instruction

- **The live bootcamp (DSP Agentic Lab) was sunset on 2026-08-30** by owner instruction. No more live batches, ever mentioned in future tense. `/academy/bootcamp` stays live, indexed, and URL-frozen as an evergreen explainer of what the Lab was (historical facts: 7 days, 5 live Zoom classes, 4 certificates — 3 Anthropic + 1 DSP, 6 batches, 180+ students); its single CTA points to `/mastery`. Do not reintroduce batch dates, seat counts, fees, or enrolment CTAs for it anywhere.
- **Student count: 350 total enrolled** (owner screenshot of DSP's ASOS student dashboard on DSP Agent Hub, 15 Sep 2026; `entity.studentsEnrolled` + `studentsEnrolledAsOf`; was 338 on 10 Sep). The ONE student number the site uses; the old "180+" was an estimate and is retired. 300+ of them hold the three free Anthropic Academy certificates. Never estimate this figure — update it only from that dashboard, and move the as-of date with it.
- **Revenue: PKR 4.2M+ (Rs. 4,232,000)** — the ASOS dashboard header, owner figures (DSP tenant) 15 Sep 2026, in `agency.revenue`, labelled "closed through DSP Agent Hub" and always printed with its footnote ("DSP's own sales, recorded in the platform. Direct payments outside the system are not included."). Never manufacture a second revenue figure.
- **Agent Hub proof** (`agency.proof`): sales closed 350 and 7 days to live, as of 15 Sep 2026. `leads` (868) and `zeroTakeoverPct` (50.7) are the 23 Aug readings awaiting the owner's all-time KPI paste — update them from the Dashboard overview, never estimate.
- **Homepage copy rule (owner ruling 15 Sep 2026):** no price ("$100"), enrol/enrolment, "Academy", "course" or "bootcamp" wording on `/`. Price and enrolment language live only on `/mastery` and `/mastery/enrol`.
- **Audience metrics** live only in `distribution` (site.ts) and are read off named dashboards with the platform's own metric name and period: Facebook **Views 8,544,189** and **Messaging conversations started 556**, both Page Insights, 17 Jun–14 Sep 2026. Views are views — never "reach", "people" or "visitors"; never sum platforms; never use the Facebook Content/monetisation block. A stage with no verified figure is left out, never estimated. The retired `socialProof` / `founderBar` figures must not come back.
- **`/mastery` is DSP's only educational product**: the self-paced **DSP AI Agent Mastery — Zero to Master** (approved by owner 25 Aug 2026): recorded lectures, 16 modules, $100 one-time, lifetime access, 12 months group support. Facts live in `src/config/site.ts` (`mastery`). Page shell is its own (`src/app/mastery/mastery.css`, scoped `.page-mastery`, dark navy) and does not use SiteShell.
- The live 30-day program was removed in Aug 2026 — do not reintroduce it or link to its old pages.
- WhatsApp: +92 342 0580864 everywhere on the site (Meta-approved WhatsApp Business number) · email info@digitalservicesprogram.com. +92 311 8122222 is used privately to reply to clients — never publish it on the site.
- Never reintroduce "15-Day" or "5-day". The number 0325 3966799 (923253966799) was previously banned outright; by owner instruction 10 Sep 2026 it is published in ONE place only — the JazzCash account on `/mastery/enrol` (a noindex page), from `mastery.pkr.jazzCash`. It is a payment field, never a contact number: keep it out of WhatsApp links, the footer, schema `telephone` and all marketing copy. The only published contact number remains +92 342 0580864

## Architecture: three visual shells, deliberately isolated

- **Company pages** (`/`, `/agents/*`, `/about`) use `src/components/site/SiteShell.tsx` (SiteHeader/SiteFooter) with `src/app/site.css`, scoped under `.dsp-site`. V3 palette (`src/app/tokens.css`): ink / paper / deep navy / neutral gray + one terracotta accent; the legacy `--teal` / `--gold` variable names are kept but re-pointed (navy / warm accent tint) so bootcamp.css and guides.css need no edits — never reintroduce teal, gold or blue gradients. Homepage-only CSS lives in `src/app/home.css` (imported by `page.tsx` alone, so `inlineCss` ships it on `/` only). Scroll reveal is progressive enhancement: `RevealObserver` sets `data-js` on `.dsp-site` after mount and only then may `[data-reveal]` elements start hidden — server HTML, no-JS and reduced-motion render everything visible. Every non-captured visual (the hero conversation, the Agent Hub workflow rail) is labelled "Illustrative"; the real Agent Hub screenshot (`agency.hubScreenshot` → `public/agent-hub/pipeline.png`) replaces the rail whenever the file exists at build time.
- **Bootcamp page** (`src/app/academy/bootcamp/` + `src/components/home/`) is the sunset Agentic Lab's evergreen explainer, rendered on the shared `.dsp-site` system. Page-specific styles (day rows, FAQ) live in `src/app/bootcamp.css`, scoped under `.page-bootcamp` — put new bootcamp-only CSS there, not in site.css.
- **Blog and contact** (`src/app/blog/`, `src/app/contact/`) keep the old dark theme: `globals.css` variables plus `src/components/Nav.tsx`/`Footer.tsx`, rendered by their **own route layouts**, not the root layout. The root layout intentionally renders no nav/footer.
- Root layout (`src/app/layout.tsx`) owns `metadataBase`, `alternates: { canonical: './' }`, the sitewide Organization JSON-LD, and GA4 (`src/components/site/Analytics.tsx`, active only when `NEXT_PUBLIC_GA4_ID` is set). Page-level JSON-LD: FAQPage on the bootcamp page (Course schema was removed at the sunset — do not re-add it), Service on `/agents`, Product on `/agents/restaurant-ai`, Person on `/about`. `/mastery` renders one `@graph` from `src/app/mastery/schema.ts` (Organization · WebSite · WebPage · Person · Course with its single **self-paced** CourseInstance — never add dates, seats or a location to it · FAQPage · VideoObject for the welcome tour, **gated** on `mastery.welcomePoster` — no poster, no node), linked by `@id`; its FAQ and syllabus text is mirrored from the page via `faqs.ts` / `curriculum.ts` and guarded by `test:schema`. The page's student-build cards come from `students.ts` (only students on camera, names only with consent) and the running-cost section from `running-costs.ts`, whose numeric table is **gated** (`RUNNING_COST_ROWS` stays `null` until real dashboard figures exist — never estimates). `seo.ts` holds `PAGE_LAST_MODIFIED`, which feeds the sitemap, the WebPage `dateModified` and the visible "Last updated" byline — bump it when the page content changes. The sitewide Organization (root layout) and the `/mastery` graph's share `@id …/#organization` so parsers merge them; the inline `provider`/`worksFor`/`publisher` Organization literals on other pages do not carry it yet.

GA4 events: `whatsapp_cta_click` (incl. the sitewide "Talk to Zara" header CTA, `{cta:'site_header_zara'|'site_menu_zara'|'blog_header_zara'}`), `restaurant_demo_click`, `academy_cta_click`, `agents_cta_click`, `agent_hub_click` (outbound to dspagenthub.com), `channelops_course_cta`, `channelops_service_cta`, `channelops_whatsapp_cta`, `begin_enrol` (`/mastery/enrol` links only, `{cta, location}`), `whatsapp_click` (`/mastery` primary CTAs, `{location}` — WhatsApp-first by owner ruling 2026-08-30), `view_evolution_complete`, `hire_band_click` — fired via `src/lib/track.ts` and `src/components/site/TrackedLink.tsx`.

## Blog

43 posts stored as data in `src/content/posts.json`, accessed via `src/lib/posts.ts`, rendered by `src/app/blog/[slug]/page.tsx`. Slugs are preserved exactly from the old PHP site so Google-indexed URLs keep working — never rename a slug. `dsp-blog-migration/` is the original migration bundle these files came from; it is not part of the app.

## Lead capture

`src/app/api/lead/route.ts` receives form posts (contact `BookingForm.tsx`; the bootcamp `LeadForm.tsx` was deleted at the sunset, and the route still accepts a `type` field) and forwards to a Google Sheets Apps Script webhook, plus optional email via Resend. Env vars in `.env.example`: `GOOGLE_SHEETS_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_EMAIL`. Failures are logged but never block the response.
