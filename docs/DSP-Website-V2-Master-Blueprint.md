# DSP WEBSITE V2 — MASTER BLUEPRINT

## 0. THREE RULINGS THAT OVERRIDE THE ORIGINAL BRIEF

**0.1 Do not delete the agency. Subordinate it.** /ai-employees, the four
employee pages and /pricing are the highest-margin line AND the only real
proof the course has. The problem was never two businesses — it was six
offers at equal weight. Fix hierarchy, not amputation.

**0.2 Do not rename the product.** It is DSP AI Agent Mastery — Zero to
Master, at /mastery. Indexed, with OG, Bunny library, Supabase dashboard and
ASOS pipeline behind it. No rename, no URL change.

**0.3 Do not sell it as "One Month."** Self-paced with lifetime access.
"About an hour a day for 30 days" is the pace promise, not the container.

## 0.4 SUPERSEDING DECISION (30 Aug 2026)
The live 7-day bootcamp / Agentic Lab is SUNSET. No more live batches.
Mastery is DSP's only educational product. /academy/bootcamp stays live,
frozen and indexed as an evergreen past-tense explainer with a Mastery CTA.
/academy 301s to /mastery. /learn and /learn/bootcamp are NOT built.

## 1. POSITIONING
DSP is where AI Employees come from. You can hire one, or learn to build them.
Category: AI Employees. Primary product: Mastery. Secondary: the agency.
Hero: "Don't just use AI. Build the employee."

## 2. NAVIGATION (7 items, one CTA)
AI Employees · Mastery · Student Work · Hire · Blog · About · [Enrol — $100]
Out of nav, still live: /agents, /channelops, /academy/bootcamp, /contact.

## 3. FROZEN URLS — never move, rename or noindex
/mastery, /mastery/enrol, /ai-employees, /ai-employees/[slug], /pricing,
/about, /blog + all 43 posts, /academy/bootcamp, /agents/case-studies,
/agents/restaurant-ai, /channelops, /verify/[code].
No redirect ever targets /.

## 4. HOMEPAGE V2 — section order
01 HERO — "Don't just use AI. Build the employee." [Enrol — $100]
02 EVOLUTION — Website(display) > Chatbot(talk) > Agent(act) >
   AI EMPLOYEE(work) > Workforce(collaborate). AI Employee 2x visual weight.
03 WHAT IS ONE — anatomy: brain + job description + knowledge + memory +
   tools + APIs + workflows + guardrails
04 IN THE WILD — 8 use-case tiles
05 OLD WAY / NEW WAY — augment, not replace. No replacement claims.
06 PROOF — server-rendered real numbers, as-of date, Anthropic badges,
   existing student videos
07 MASTERY PIVOT — the offer + [Enrol — $100]
08 WHAT YOU BUILD — customer > WhatsApp/web/voice > AI Employee >
   knowledge+memory+tools > CRM/calendar/sheets/email > outcome
09 WHO IT'S FOR — 6 audience tiles
10 INSTRUCTOR — Sardar
11 HIRE BAND — small, one sentence, one link. Not a door. No pricing.
12 FAQ — top 8 objections
13 FINAL CTA — [Enrol — $100]
Mobile layout written FIRST for every section.

## 5. DESIGN TOKENS
--ink #0E1116  --paper #FAF8F5  --navy #17204A  --accent #C15F3C
--muted #6B7280  --line #E5E1DA  --success #2F7A5A
Terracotta accent = CTAs only, max 2 uses per viewport.
Unify VALUES across the three shells; keep the SCOPES isolated.
/mastery accent swap is its own final revertable commit.
Banned: electric blue, neon gradients, purple cyberpunk, glow effects,
stock robots, glowing brains, 3D, particle backgrounds.

## 6. TYPOGRAPHY
Display serif (Instrument Serif / Fraunces) — hero + H2 only.
Inter or Geist for body. JetBrains Mono for code.
All self-hosted via next/font. Kill the runtime Google Fonts @import.
Scale 64/48/32/24/18/16/14. Body 18px, line-height 1.65, measure 66-72ch.

## 7. ANIMATION BUDGET
One interaction sitewide: the evolution scroll in section 02.
Everything else 150-200ms opacity/translate. prefers-reduced-motion
respected. No parallax, no scroll-jacking, no animation library.

## 8. PROOF INFRASTRUCTURE (Phase 5)
/verify/[code] — already exists, extend and style it. Never "coming soon."
/student-work — real live student URLs and repos only. Renders what exists.
/mastery/curriculum — crawlable child page, one H2 per module, ~200 words
  each. 15 ranking opportunities from content that already exists.
/mastery/certificate — what it proves, how verification works.
Lead magnet: the 7-Part Job Description template, email capture.

## 9. NEVER INVENT
No student counts, income figures, testimonials, client logos, case studies,
ratings or percentages not already in the repo or supplied explicitly.
If a number is missing, render nothing — never a zero, never "coming soon"
on a trust element. Every earnings claim keeps its individual-results
disclaimer.

## 10. SCHEMA
Typed builders in src/lib/schema.ts. Organization sitewide. Course + Offer +
FAQPage on /mastery (currently has NONE). Person on /about. Service on
agency pages. BreadcrumbList sitewide. No hand-written JSON-LD strings.
No CourseInstance or Schedule anywhere — no batches exist.

## 11. ANALYTICS
GA4: view_evolution_complete, view_mastery, expand_curriculum,
play_intro_video, play_student_video, begin_enrol, upload_payment_proof,
enrol_complete, whatsapp_click{type}, hire_band_click, lead_magnet_submit.
enrol_complete primary, lead_magnet_submit secondary. Meta CAPI server-side
for begin_enrol and enrol_complete.

## 12. PERFORMANCE GATES
LCP < 2.0s on 4G. CLS < 0.05. INP < 200ms. Lighthouse 90+ on performance,
accessibility, SEO. Bunny iframes lazy-loaded with posters. Hero image
AVIF/WebP under 100KB with explicit dimensions.

## 13. WHAT MAKES IT A $50,000 SITE
A category nobody else owns. One idea held for the whole page. Proof a
stranger can independently verify. Restraint that costs money. Honesty as a
conversion tool.
