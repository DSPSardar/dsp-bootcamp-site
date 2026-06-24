# DSP 15-Day AI Agents Bootcamp — Marketing Site Design

**Date:** 2026-06-24  
**Status:** Approved  
**Goal:** Convert visitors to WhatsApp conversations via a free intro session booking.

---

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript, Tailwind CSS v4, ESLint)
- **Scaffolded with:** `npx create-next-app@latest` — `src/` dir, App Router
- **Hosting:** Vercel (default output — server components + route handlers)
- **Fonts:** `next/font/google` — Space Grotesk 700, IBM Plex Sans 400/500/600/700, IBM Plex Mono 500/600
- **CSS vars:** `--font-display`, `--font-body`, `--font-mono` on `<body>`
- **Images:** `next/image` with optimization on; `/public/logo.webp` for brand + OG image
- **No extra UI/animation libraries** — vanilla React + CSS only; inline SVGs for icons

---

## Design Tokens (globals.css :root)

```
--ink: #0A0E1C       --ink-1: #0F1528      --panel: #141B33
--panel-2: #1A2240   --text: #E9EDF8       --muted: #969FBB
--line: rgba(255,255,255,.08)
--gold: #FFC34D      --gold-deep: #E5A12C
--mint: #54E6C0
```

Body: subtle radial-gradient glows (gold top-right, mint top-left) over dark base.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing page — all sections |
| `/contact` | Contact page with BookingForm + WhatsApp/email links |
| `/blog` | Blog index — cards from `content/posts.ts` |
| `/blog/[slug]` | Single post renderer |
| `/api/lead` | POST route — log lead + optional Resend email |

---

## Component Architecture

### Server Components (default)
- `Hero.tsx` — shell; renders AgentConsole
- `Shift.tsx` — chatbot → agent → fleet cards
- `Learn.tsx` — 9-card learning grid
- `Roadmap.tsx` — vertical timeline
- `Modules.tsx` — 6 live Zoom module rows
- `Audience.tsx` — pill chips
- `Outcomes.tsx` — checklist grid
- `Project.tsx` — final project split section
- `Certificates.tsx` — 4-card pathway
- `About.tsx` — SECP info
- `Admission.tsx` — wraps BookingForm
- `Footer.tsx`

### Client Components (`'use client'`)
- `Nav.tsx` — mobile menu toggle
- `AgentConsole.tsx` — SVG node graph + animateMotion + cycling log lines
- `AgentFlow.tsx` — 7-node row with mint glow chase
- `Faq.tsx` — accordion (one open at a time)
- `BookingForm.tsx` — lead form; reused on `/contact`
- `Reveal.tsx` — IntersectionObserver scroll-reveal wrapper (fade + rise + stagger)

---

## AgentConsole (signature element)

Faux terminal card with:
- Top bar: three colored dots + mono label `dsp_agent_pipeline.run`
- Inline SVG node graph: User → Planner / Tool / Memory
- `animateMotion` gold token travelling connectors
- Mint dashed-stroke flow animation on connector lines
- Nodes light up in sequence via `useEffect` interval
- Cycling log lines: `planning steps…` → `calling tool · search()` → `writing to memory` → `evaluating ✓` → `task complete ✓`
- All timers gated: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`

---

## BookingForm Flow

1. User fills: Full name, Phone, "I am a…" select
2. Submit → fire-and-forget `fetch POST /api/lead` with `.catch(() => {})`
3. **Always** open `https://wa.me/923118122222?text=...` (URL-encoded bilingual message) in new tab
4. Show inline "we'll continue on WhatsApp" success state

The POST never blocks the WhatsApp redirect.

---

## `/api/lead` Route Handler

- Accept `{ name, phone, background }` JSON
- Validate fields present
- `console.log` the lead (visible in Vercel → Logs)
- If `RESEND_API_KEY` + `LEAD_EMAIL` env vars set → email via Resend SDK
- Return `{ ok: true }`
- Comment: console logs are ephemeral; email/DB is the durable record
- Seam comment: `// alt: store in Vercel KV/Postgres or Google Sheet`

---

## Certificate Pathway (4 cards)

1. **Claude Certificate** — Guided by DSP
2. **Claude Cowork Certificate** — Guided by DSP
3. **Claude Code Certificate** — Guided by DSP
4. **DSP Completion Certificate** — Awarded by DSP (mint-accented)

---

## Key Facts (hardcoded, never change)

- WhatsApp/phone: `+92 311 8122222` → `https://wa.me/923118122222`
- 15-day bootcamp · 6 live Zoom modules · 4 certificates · SECP registered
- Blog: internal route `/blog`

---

## Environment Variables

```
RESEND_API_KEY=   # optional — skip emailing if absent
LEAD_EMAIL=       # optional — where to send lead notifications
```

---

## Metadata (layout.tsx)

- `title`: "DSP · 15-Day AI Agents & Vibe Coding Bootcamp"
- `description`: Live Zoom bootcamp for beginners in Pakistan — learn to build real-world AI agents in 15 days.
- `openGraph.images`: `/public/logo.webp`

---

## Logo Handling

`next/image` from `/public/logo.webp` (priority, ~32px tall). If file absent or errors, render a gold rounded "D" `<span>` so build never breaks.

---

## Sections (landing page order)

1. Nav
2. Hero + AgentConsole
3. The Shift (Chatbot → AI Agent → Agentic Fleet)
4. What You Will Learn (9 cards)
5. 15-Day Roadmap (vertical timeline)
6. Six Live Zoom Modules
7. Agent Communication (AgentFlow, 7 nodes)
8. Who This Is For (pill chips)
9. Course Outcomes (checklist)
10. Final Project
11. Certificate Pathway
12. About DSP
13. FAQ
14. Admissions (BookingForm)
15. Footer

---

## Accessibility & Quality

- Semantic HTML throughout
- Visible keyboard focus on all interactive elements
- `prefers-reduced-motion` respected (all animations paused)
- Mobile-first, responsive from 360px to desktop
- No hydration warnings
- `npm run build` passes clean
