# DSP Bootcamp Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a production Next.js 15 marketing website for DSP's 15-Day AI Agents Bootcamp whose single purpose is getting visitors to book a free intro session via WhatsApp.

**Architecture:** App Router site with server components for all static sections and thin `'use client'` islands only for interactive pieces (Nav mobile menu, AgentConsole animation, AgentFlow glow, FAQ accordion, BookingForm, Reveal scroll wrapper). Lead capture hits `/api/lead` fire-and-forget then always opens WhatsApp regardless of API response.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS (whichever version the scaffold installs), next/font/google, Resend SDK (optional, only imported when env vars present), inline SVG icons, vanilla CSS animations.

## Global Constraints

- WhatsApp number: `+92 311 8122222` → always link to `https://wa.me/923118122222`
- Logo: `/public/logo.webp` via `next/image` (priority, ~32px tall); fall back to gold rounded "D" `<span>` if absent
- No extra UI/animation libraries — React + CSS only
- All timers/animations gated on `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- `npm run build` must pass clean — no TypeScript errors, no ESLint errors
- Mobile-first, responsive from 360px
- Semantic HTML, visible keyboard focus, good Lighthouse
- Never hardcode secrets — read from `process.env`
- Fonts: Space Grotesk 700 (`--font-display`), IBM Plex Sans 400/500/600/700 (`--font-body`), IBM Plex Mono 500/600 (`--font-mono`)

---

## File Map

```
/Users/abdulkhan/Desktop/Digital Services Program/
├── .env.example
├── content/
│   └── posts.ts
├── public/
│   └── logo.webp          ← user drops in; build works without it
├── src/
│   ├── app/
│   │   ├── globals.css    ← design tokens + keyframes + hero console styles
│   │   ├── layout.tsx     ← fonts, metadata, Nav, Footer
│   │   ├── page.tsx       ← landing page (all sections)
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── api/
│   │       └── lead/
│   │           └── route.ts
│   └── components/
│       ├── Nav.tsx            'use client'
│       ├── Footer.tsx         server
│       ├── Reveal.tsx         'use client'
│       ├── Hero.tsx           server shell
│       ├── AgentConsole.tsx   'use client'
│       ├── Shift.tsx          server
│       ├── Learn.tsx          server
│       ├── Roadmap.tsx        server
│       ├── Modules.tsx        server
│       ├── AgentFlow.tsx      'use client'
│       ├── Audience.tsx       server
│       ├── Outcomes.tsx       server
│       ├── Project.tsx        server
│       ├── Certificates.tsx   server
│       ├── About.tsx          server
│       ├── Faq.tsx            'use client'
│       ├── BookingForm.tsx    'use client'
│       └── Admission.tsx      server
```

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: entire project via `create-next-app`
- Modify: `next.config.ts` — verify image optimization on
- Create: `.env.example`

- [ ] **Step 1: Run scaffold in the working directory**

```bash
cd "/Users/abdulkhan/Desktop/Digital Services Program"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Expected output: scaffold completes, `package.json` present.

- [ ] **Step 2: Verify next.config.ts has images enabled (default)**

Read `next.config.ts`. If `images: { unoptimized: true }` appears, remove it. Default config is fine — optimization is on by default.

- [ ] **Step 3: Create .env.example**

```
# Optional — if set, leads are emailed to LEAD_EMAIL via Resend
RESEND_API_KEY=
LEAD_EMAIL=
```

- [ ] **Step 4: Install Resend SDK**

```bash
npm install resend
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — default Next.js page loads. Kill the server.

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 project"
```

---

### Task 2: Design system — globals.css + layout.tsx

**Files:**
- Modify: `src/app/globals.css` — design tokens, keyframes, hero console styles
- Modify: `src/app/layout.tsx` — fonts, metadata, body classes

**Interfaces:**
- Produces: CSS variables `--ink`, `--gold`, `--mint`, `--font-display`, `--font-body`, `--font-mono` available globally; `<body>` carries font class names

- [ ] **Step 1: Replace globals.css entirely**

```css
/* src/app/globals.css */
@import "tailwindcss";

:root {
  --ink: #0A0E1C;
  --ink-1: #0F1528;
  --panel: #141B33;
  --panel-2: #1A2240;
  --text: #E9EDF8;
  --muted: #969FBB;
  --line: rgba(255, 255, 255, 0.08);
  --gold: #FFC34D;
  --gold-deep: #E5A12C;
  --mint: #54E6C0;

  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-ibm-plex-sans);
  --font-mono: var(--font-ibm-plex-mono);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--ink);
  color: var(--text);
  font-family: var(--font-body), system-ui, sans-serif;
  background-image:
    radial-gradient(ellipse 60% 50% at 90% 0%, rgba(255, 195, 77, 0.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 10% 0%, rgba(84, 230, 192, 0.06) 0%, transparent 60%);
  background-attachment: fixed;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display), system-ui, sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Eyebrow label style */
.eyebrow {
  font-family: var(--font-mono), monospace;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--mint);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.eyebrow::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--mint);
  animation: pulse-dot 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow::before {
    animation: none;
  }
}

/* Gradient text utility */
.gradient-text {
  background: linear-gradient(135deg, var(--gold) 0%, var(--mint) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Button styles */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--gold);
  color: var(--ink);
  font-family: var(--font-body), sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}

.btn-primary:hover {
  background: var(--gold-deep);
  transform: translateY(-1px);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--text);
  font-family: var(--font-body), sans-serif;
  font-weight: 600;
  font-size: 0.9375rem;
  border-radius: 8px;
  border: 1px solid var(--line);
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}

.btn-ghost:hover {
  border-color: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.btn-ghost:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

/* Panel / card */
.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
}

.panel-2 {
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 12px;
}

/* Section spacing */
.section {
  padding: 5rem 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .section {
    padding: 6rem 2rem;
  }
}

/* AgentConsole terminal card */
.console-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  font-family: var(--font-mono), monospace;
}

.console-titlebar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--panel-2);
  border-bottom: 1px solid var(--line);
}

.console-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.console-label {
  font-size: 0.75rem;
  color: var(--muted);
  margin-left: 0.25rem;
}

.console-body {
  padding: 1.5rem;
}

.console-log {
  font-size: 0.75rem;
  line-height: 1.6;
  color: var(--mint);
  min-height: 1.2em;
}

.console-log-prefix {
  color: var(--muted);
}

/* Keyframes */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

@keyframes fade-rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes token-glow {
  0%, 100% { filter: drop-shadow(0 0 4px var(--gold)); }
  50%       { filter: drop-shadow(0 0 10px var(--gold)); }
}

@keyframes mint-glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 6px var(--mint)); opacity: 1; }
  50%       { filter: drop-shadow(0 0 14px var(--mint)); opacity: 0.8; }
}

/* Scroll reveal — initial hidden state set by JS, avoid FOUC */
.reveal-hidden {
  opacity: 0;
  transform: translateY(24px);
}

.reveal-visible {
  animation: fade-rise 0.55s ease forwards;
}
```

- [ ] **Step 2: Rewrite layout.tsx with fonts + metadata**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DSP · 15-Day AI Agents & Vibe Coding Bootcamp',
  description:
    'Live Zoom bootcamp for beginners in Pakistan. Build real-world AI agents in 15 days — no coding experience needed.',
  openGraph: {
    title: 'DSP · 15-Day AI Agents & Vibe Coding Bootcamp',
    description:
      'Live Zoom bootcamp for beginners in Pakistan. Build real-world AI agents in 15 days.',
    images: ['/logo.webp'],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify build compiles**

```bash
npm run build
```

Expected: build succeeds (Nav and Footer will be stubbed next task — create empty stubs now if needed so the build passes).

Create `src/components/Nav.tsx`:
```tsx
'use client'
export default function Nav() { return <nav /> }
```

Create `src/components/Footer.tsx`:
```tsx
export default function Footer() { return <footer /> }
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: design system tokens, fonts, layout"
```

---

### Task 3: Nav + Footer

**Files:**
- Modify: `src/components/Nav.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Produces: sticky blurred Nav with mobile hamburger; Footer with brand + links

- [ ] **Step 1: Write Nav.tsx**

```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { label: 'The Shift', href: '#shift' },
  { label: 'Learn', href: '#learn' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Modules', href: '#modules' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '#faq' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10,14,28,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.25rem',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <LogoMark />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text)',
              whiteSpace: 'nowrap',
            }}
          >
            Digital Services Program
          </span>
        </Link>

        {/* Desktop links */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="md-nav"
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                textDecoration: 'none',
                padding: '0.375rem 0.625rem',
                borderRadius: 6,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--text)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--muted)')
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}
          >
            Join Bootcamp →
          </a>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: 6,
              padding: '0.375rem 0.5rem',
              cursor: 'pointer',
              color: 'var(--text)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
            className="hamburger"
          >
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                opacity: open ? 0 : 1,
                transition: 'opacity 0.2s',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 18,
                height: 2,
                background: 'currentColor',
                borderRadius: 2,
                transition: 'transform 0.2s, opacity 0.2s',
                transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          style={{
            background: 'var(--ink-1)',
            borderTop: '1px solid var(--line)',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text)',
                textDecoration: 'none',
                padding: '0.625rem 0.5rem',
                borderRadius: 6,
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        @media (min-width: 768px) {
          .md-nav { display: flex !important; }
          .hamburger { display: none !important; }
        }
      `}</style>
    </header>
  )
}

function LogoMark() {
  return (
    <div style={{ width: 32, height: 32, flexShrink: 0 }}>
      <Image
        src="/logo.webp"
        alt="DSP logo"
        width={32}
        height={32}
        priority
        style={{ objectFit: 'contain', borderRadius: 6 }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
          const fallback = el.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div
        aria-hidden
        style={{
          display: 'none',
          width: 32,
          height: 32,
          borderRadius: 6,
          background: 'var(--gold)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.125rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        D
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write Footer.tsx**

```tsx
// src/components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        padding: '3rem 1.25rem',
        marginTop: '4rem',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <FooterLogo />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--text)',
              fontSize: '0.9375rem',
            }}
          >
            Digital Services Program
          </span>
        </div>

        {/* Links */}
        <nav
          aria-label="Footer navigation"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem 1.5rem' }}
        >
          {[
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
            {
              label: 'WhatsApp',
              href: 'https://wa.me/923118122222',
              external: true,
            },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#top"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            Back to top ↑
          </a>
        </nav>

        {/* Legal */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            width: '100%',
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          © 2026 DSP · digitalservicesprogram.com · SECP Registered
        </p>
      </div>
    </footer>
  )
}

function FooterLogo() {
  return (
    <div style={{ width: 28, height: 28, flexShrink: 0 }}>
      <Image
        src="/logo.webp"
        alt=""
        width={28}
        height={28}
        style={{ objectFit: 'contain', borderRadius: 4 }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
          const fallback = el.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div
        aria-hidden
        style={{
          display: 'none',
          width: 28,
          height: 28,
          borderRadius: 4,
          background: 'var(--gold)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.875rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        D
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Nav and Footer components"
```

---

### Task 4: Reveal scroll-reveal wrapper

**Files:**
- Modify: `src/components/Reveal.tsx`

**Interfaces:**
- Produces: `<Reveal delay={0}>` wrapper component; adds `reveal-hidden` class initially, swaps to `reveal-visible` on intersection
- Consumes: `fade-rise` keyframe and `.reveal-hidden` / `.reveal-visible` classes from globals.css

- [ ] **Step 1: Write Reveal.tsx**

```tsx
'use client'
import { useEffect, useRef, ReactNode } from 'react'

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add('reveal-hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove('reveal-hidden')
            el.classList.add('reveal-visible')
            el.style.animationDelay = `${delay}ms`
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return <div ref={ref}>{children}</div>
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Reveal.tsx
git commit -m "feat: Reveal scroll-reveal wrapper"
```

---

### Task 5: Hero section + AgentConsole

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/AgentConsole.tsx`

**Interfaces:**
- Consumes: `Reveal`, `.eyebrow`, `.btn-primary`, `.btn-ghost`, `.console-card`, `.console-titlebar`, etc. from globals.css
- Produces: Hero section with id="hero"; AgentConsole with animated SVG pipeline

- [ ] **Step 1: Write AgentConsole.tsx**

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

const LOG_LINES = [
  'planning steps…',
  'calling tool · search()',
  'writing to memory',
  'evaluating ✓',
  'task complete ✓',
]

const NODES = [
  { id: 'user',    x: 60,  y: 130, label: 'User'    },
  { id: 'planner', x: 200, y: 60,  label: 'Planner' },
  { id: 'tool',    x: 200, y: 130, label: 'Tool'    },
  { id: 'memory',  x: 200, y: 200, label: 'Memory'  },
]

const EDGES = [
  { from: 'user', to: 'planner', path: 'M 90 120 Q 140 80 170 75' },
  { from: 'user', to: 'tool',    path: 'M 90 130 H 170'            },
  { from: 'user', to: 'memory',  path: 'M 90 140 Q 140 180 170 190'},
]

export default function AgentConsole() {
  const [activeNode, setActiveNode] = useState(0)
  const [logIdx, setLogIdx] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return

    const nodeTimer = setInterval(() => {
      setActiveNode((n) => (n + 1) % NODES.length)
    }, 1400)

    const logTimer = setInterval(() => {
      setLogIdx((i) => (i + 1) % LOG_LINES.length)
    }, 2000)

    return () => {
      clearInterval(nodeTimer)
      clearInterval(logTimer)
    }
  }, [])

  return (
    <div className="console-card" style={{ maxWidth: 420, width: '100%' }}>
      {/* Title bar */}
      <div className="console-titlebar">
        <span className="console-dot" style={{ background: '#FF5F57' }} />
        <span className="console-dot" style={{ background: '#FEBC2E' }} />
        <span className="console-dot" style={{ background: '#28C840' }} />
        <span className="console-label">dsp_agent_pipeline.run</span>
      </div>

      {/* SVG graph */}
      <div className="console-body">
        <svg
          viewBox="0 0 280 260"
          style={{ width: '100%', overflow: 'visible' }}
          aria-label="Agent pipeline diagram"
          role="img"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="var(--muted)" />
            </marker>
          </defs>

          {/* Edges */}
          {EDGES.map((e) => (
            <path
              key={e.from + e.to}
              d={e.path}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#arrow)"
              style={{
                animation: reduced.current
                  ? 'none'
                  : 'dash-flow 1.5s linear infinite',
              }}
            />
          ))}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const active = i === activeNode
            return (
              <g key={node.id}>
                <rect
                  x={node.x - 30}
                  y={node.y - 18}
                  width={60}
                  height={36}
                  rx={8}
                  fill={active ? 'rgba(255,195,77,0.15)' : 'var(--panel-2)'}
                  stroke={active ? 'var(--gold)' : 'var(--line)'}
                  strokeWidth={active ? 1.5 : 1}
                  style={{ transition: 'fill 0.3s, stroke 0.3s' }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={active ? 'var(--gold)' : 'var(--muted)'}
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  style={{ transition: 'fill 0.3s' }}
                >
                  {node.label}
                </text>
              </g>
            )
          })}

          {/* Animated token on first edge */}
          {!reduced.current && (
            <circle r={5} fill="var(--gold)" style={{ animation: 'token-glow 1s ease-in-out infinite' }}>
              <animateMotion
                dur="2.8s"
                repeatCount="indefinite"
                path={EDGES[1].path}
              />
            </circle>
          )}
        </svg>

        {/* Log line */}
        <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--line)', paddingTop: '0.75rem' }}>
          <p className="console-log">
            <span className="console-log-prefix">› </span>
            {LOG_LINES[logIdx]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -14; }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 2: Write Hero.tsx**

```tsx
// src/components/Hero.tsx
import AgentConsole from './AgentConsole'

const CHIPS = [
  'Live Zoom Training',
  'Beginner Friendly',
  'Hands-On Practice',
  'Final Project',
  '4 Certificates',
]

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '5rem 1.25rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '3rem',
        alignItems: 'center',
      }}
    >
      <style>{`
        @media (min-width: 900px) {
          #hero-inner { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div
        id="hero-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'center',
        }}
      >
        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p className="eyebrow">
            DSP Live Training Program · Cohort Open
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--text)',
              lineHeight: 1.05,
            }}
          >
            Build real-world{' '}
            <span className="gradient-text">AI agents</span>
            {' '}in 15&nbsp;days.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--muted)',
              lineHeight: 1.65,
              maxWidth: 520,
            }}
          >
            No coding experience needed. Learn how AI agents plan goals, use
            tools, remember context, and act autonomously — in a live Zoom
            bootcamp designed for beginners.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join the Bootcamp →
            </a>
            <a href="#roadmap" className="btn-ghost">
              View 15-Day Roadmap
            </a>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--muted)',
            }}
          >
            Or call / WhatsApp us:{' '}
            <a
              href="tel:+923118122222"
              style={{ color: 'var(--gold)', textDecoration: 'none' }}
            >
              +92 311 8122222
            </a>
          </p>

          {/* Trust chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CHIPS.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--mint)',
                  background: 'rgba(84,230,192,0.08)',
                  border: '1px solid rgba(84,230,192,0.2)',
                  borderRadius: 4,
                  padding: '0.25rem 0.625rem',
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Console */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AgentConsole />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add Hero to page.tsx (stub)**

Replace `src/app/page.tsx` with:

```tsx
import Hero from '@/components/Hero'

export default function Page() {
  return (
    <>
      <Hero />
    </>
  )
}
```

- [ ] **Step 4: Run dev and verify hero renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: hero text visible, AgentConsole card renders, token animates along connector, log lines cycle.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Hero section with AgentConsole animation"
```

---

### Task 6: Shift, Learn, Roadmap sections

**Files:**
- Create: `src/components/Shift.tsx`
- Create: `src/components/Learn.tsx`
- Create: `src/components/Roadmap.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Shift.tsx**

```tsx
// src/components/Shift.tsx
import Reveal from './Reveal'

const CARDS = [
  {
    title: 'Chatbot',
    desc: 'Replies to prompts, forgets after the chat.',
    accent: false,
  },
  {
    title: 'AI Agent',
    desc: 'Plans a goal, uses tools, remembers context, acts.',
    accent: true,
  },
  {
    title: 'Agentic Fleet',
    desc: 'Teams of agents passing work, running real workflows.',
    accent: false,
  },
]

export default function Shift() {
  return (
    <section id="shift" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Shift</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            From chatting to acting.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div
                style={{
                  position: 'relative',
                  padding: '2rem',
                  borderRadius: 14,
                  border: card.accent
                    ? '1.5px solid var(--gold)'
                    : '1px solid var(--line)',
                  background: card.accent
                    ? 'rgba(255,195,77,0.06)'
                    : 'var(--panel)',
                  textAlign: 'center',
                }}
              >
                {i < CARDS.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      right: -18,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted)',
                      fontSize: '1.25rem',
                      zIndex: 1,
                    }}
                  >
                    →
                  </span>
                )}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: card.accent ? 'var(--gold)' : 'var(--text)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write Learn.tsx**

```tsx
// src/components/Learn.tsx
import Reveal from './Reveal'

const ITEMS = [
  'AI Agent Thinking',
  'Vibe Coding',
  'Agent Tools & APIs',
  'Agent-to-Agent Comms',
  'Skills & Memory',
  'Testing & Evaluation',
  'Agent Security',
  'Deployment Readiness',
  'Production Workflows',
]

export default function Learn() {
  return (
    <section id="learn" style={{ padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Curriculum</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            What you will learn.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {ITEMS.map((item, i) => (
            <Reveal key={item} delay={i * 50}>
              <div
                className="panel"
                style={{ padding: '1.5rem' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--gold)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: 'var(--text)',
                  }}
                >
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write Roadmap.tsx**

```tsx
// src/components/Roadmap.tsx
import Reveal from './Reveal'

const STEPS = [
  { range: 'Days 1–6',  label: 'Live modules & guided learning' },
  { range: 'Days 7–8',  label: 'Weekend assignments & practice' },
  { range: 'Days 9–12', label: 'Build, implement & deploy prep' },
  { range: 'Days 13–14',label: 'Final project & review' },
  { range: 'Day 15',    label: 'Presentation, feedback & next steps' },
]

export default function Roadmap() {
  return (
    <section id="roadmap" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section" style={{ maxWidth: 700 }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Schedule</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            15-Day Roadmap.
          </h2>
        </Reveal>

        <ol style={{ listStyle: 'none', position: 'relative' }}>
          {/* Gradient spine */}
          <li
            aria-hidden
            style={{
              position: 'absolute',
              left: 19,
              top: 0,
              bottom: 0,
              width: 2,
              background:
                'linear-gradient(180deg, var(--gold) 0%, var(--mint) 100%)',
              borderRadius: 2,
            }}
          />

          {STEPS.map((step, i) => (
            <Reveal key={step.range} delay={i * 80}>
              <li
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  paddingBottom: i < STEPS.length - 1 ? '2rem' : 0,
                  position: 'relative',
                }}
              >
                {/* Pin */}
                <div
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--panel)',
                    border: '2px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: 'var(--gold)',
                      fontWeight: 600,
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div style={{ paddingTop: '0.5rem' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--gold)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.range}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text)',
                    }}
                  >
                    {step.label}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Add sections to page.tsx**

```tsx
import Hero from '@/components/Hero'
import Shift from '@/components/Shift'
import Learn from '@/components/Learn'
import Roadmap from '@/components/Roadmap'

export default function Page() {
  return (
    <>
      <Hero />
      <Shift />
      <Learn />
      <Roadmap />
    </>
  )
}
```

- [ ] **Step 5: Verify in dev**

```bash
npm run dev
```

Scroll through all three sections. Confirm cards render, roadmap spine is visible, Reveal animations fire.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Shift, Learn, Roadmap sections"
```

---

### Task 7: Modules + AgentFlow sections

**Files:**
- Create: `src/components/Modules.tsx`
- Create: `src/components/AgentFlow.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Modules.tsx**

```tsx
// src/components/Modules.tsx
import Reveal from './Reveal'

const MODULES = [
  { n: '01', title: 'Intro to AI Agents & Vibe Coding' },
  { n: '02', title: 'Agent Tools & Interoperability' },
  { n: '03', title: 'Agent Skills & Memory' },
  { n: '04', title: 'Vibe Coding, Security & Evaluation' },
  { n: '05', title: 'Production-Grade Agentic Fleets' },
  { n: '06', title: 'Deployment & Production Readiness' },
]

export default function Modules() {
  return (
    <section id="modules" style={{ padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Live Zoom Modules</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            Six live sessions.
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {MODULES.map((m, i) => (
            <Reveal key={m.n} delay={i * 60}>
              <div
                className="module-row"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  cursor: 'default',
                  transition: 'border-color 0.2s, background 0.2s',
                  overflow: 'hidden',
                }}
              >
                <span
                  className="ghost-num"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '5rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.04)',
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    lineHeight: 1,
                    userSelect: 'none',
                    transition: 'color 0.2s',
                    pointerEvents: 'none',
                  }}
                >
                  {m.n}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--gold)',
                    minWidth: '2rem',
                  }}
                >
                  {m.n}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--text)',
                  }}
                >
                  {m.title}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .module-row:hover {
          border-color: rgba(255,195,77,0.3) !important;
          background: rgba(255,195,77,0.03) !important;
        }
        .module-row:hover .ghost-num {
          color: rgba(255,195,77,0.12) !important;
        }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Write AgentFlow.tsx**

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

const FLOW_NODES = [
  'User', 'Planner', 'Research', 'Tool', 'Memory', 'Evaluation', 'Final Output',
]

export default function AgentFlow() {
  const [active, setActive] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return

    const t = setInterval(() => {
      setActive((a) => (a + 1) % FLOW_NODES.length)
    }, 900)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ background: 'var(--ink-1)', padding: '4rem 0' }}>
      <div className="section">
        <p className="eyebrow" style={{ marginBottom: '1rem' }}>Agent Communication</p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            color: 'var(--text)',
            marginBottom: '2.5rem',
          }}
        >
          How agents pass work.
        </h2>

        <div
          role="img"
          aria-label="Agent communication flow: User to Planner to Research to Tool to Memory to Evaluation to Final Output"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          {FLOW_NODES.map((node, i) => (
            <div
              key={node}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <div
                style={{
                  padding: '0.625rem 1rem',
                  borderRadius: 8,
                  border: `1.5px solid ${i === active ? 'var(--mint)' : 'var(--line)'}`,
                  background:
                    i === active
                      ? 'rgba(84,230,192,0.1)'
                      : 'var(--panel)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: i === active ? 'var(--mint)' : 'var(--muted)',
                  transition: 'all 0.3s',
                  boxShadow:
                    i === active
                      ? '0 0 16px rgba(84,230,192,0.25)'
                      : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {node}
              </div>
              {i < FLOW_NODES.length - 1 && (
                <span
                  aria-hidden
                  style={{
                    color: 'var(--muted)',
                    fontSize: '1rem',
                    opacity: 0.5,
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx**

```tsx
import Hero from '@/components/Hero'
import Shift from '@/components/Shift'
import Learn from '@/components/Learn'
import Roadmap from '@/components/Roadmap'
import Modules from '@/components/Modules'
import AgentFlow from '@/components/AgentFlow'

export default function Page() {
  return (
    <>
      <Hero />
      <Shift />
      <Learn />
      <Roadmap />
      <Modules />
      <AgentFlow />
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Modules and AgentFlow sections"
```

---

### Task 8: Audience, Outcomes, Project, Certificates, About sections

**Files:**
- Create: `src/components/Audience.tsx`
- Create: `src/components/Outcomes.tsx`
- Create: `src/components/Project.tsx`
- Create: `src/components/Certificates.tsx`
- Create: `src/components/About.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Audience.tsx**

```tsx
// src/components/Audience.tsx
import Reveal from './Reveal'

const PILLS = [
  'Beginners', 'Non-programmers', 'Marketers', 'Sales professionals',
  'Teachers', 'Entrepreneurs', 'Small business owners', 'Students',
  'Business teams', 'Future AI builders',
]

export default function Audience() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Who This Is For</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '2.5rem',
            }}
          >
            Anyone can start here.
          </h2>
        </Reveal>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
          {PILLS.map((pill, i) => (
            <Reveal key={pill} delay={i * 40}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  color: 'var(--text)',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 9999,
                  padding: '0.5rem 1.125rem',
                }}
              >
                {pill}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write Outcomes.tsx**

```tsx
// src/components/Outcomes.tsx
import Reveal from './Reveal'

const OUTCOMES = [
  'Understand how AI agents work',
  'Design agentic workflows',
  'Use tools and APIs conceptually',
  'Build with vibe coding',
  'Add memory and skills to agents',
  'Test and evaluate agents',
  'Understand agent security',
  'Prepare agents for deployment',
  'Present a final project',
]

export default function Outcomes() {
  return (
    <section id="outcomes" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Course Outcomes</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            What you'll walk away with.
          </h2>
        </Reveal>
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '0.75rem',
            listStyle: 'none',
          }}
        >
          {OUTCOMES.map((outcome, i) => (
            <Reveal key={outcome} delay={i * 50}>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  borderRadius: 10,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    color: 'var(--mint)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--text)',
                    lineHeight: 1.55,
                  }}
                >
                  {outcome}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write Project.tsx**

```tsx
// src/components/Project.tsx
import Reveal from './Reveal'

const STEPS = [
  { label: 'Task Planner',       desc: 'Define the agent\'s goal and plan its steps.' },
  { label: 'Tool Steps',         desc: 'Select and sequence the tools the agent will use.' },
  { label: 'Memory & Context',   desc: 'Add memory so the agent retains relevant information.' },
  { label: 'Final Review',       desc: 'Evaluate agent output and refine behaviour.' },
  { label: 'Presentation',       desc: 'Present your working agent to the cohort on Day 15.' },
]

export default function Project() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div
        className="section"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Copy */}
        <Reveal>
          <div>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Final Project</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--text)',
                marginBottom: '1.25rem',
              }}
            >
              Ship something real on Day&nbsp;15.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              Every student builds and presents a working AI agent. You'll plan
              it, tool it, give it memory, evaluate it, and demo it live to the
              cohort.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp Us →
              </a>
              <a
                href="tel:+923118122222"
                className="btn-ghost"
              >
                Call +92 311 8122222
              </a>
            </div>
          </div>
        </Reveal>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {STEPS.map((step, i) => (
            <Reveal key={step.label} delay={i * 70}>
              <div
                className="panel"
                style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--gold)',
                    background: 'rgba(255,195,77,0.1)',
                    border: '1px solid rgba(255,195,77,0.2)',
                    borderRadius: 4,
                    padding: '0.2rem 0.5rem',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: 'var(--text)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {step.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--muted)',
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write Certificates.tsx**

```tsx
// src/components/Certificates.tsx
import Reveal from './Reveal'

const CERTS = [
  { title: 'Claude Certificate',        by: 'Guided by DSP',  mint: false },
  { title: 'Claude Cowork Certificate', by: 'Guided by DSP',  mint: false },
  { title: 'Claude Code Certificate',   by: 'Guided by DSP',  mint: false },
  { title: 'DSP Completion Certificate',by: 'Awarded by DSP', mint: true  },
]

export default function Certificates() {
  return (
    <section id="certificates" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Certificate Pathway</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            Four certificates on completion.
          </h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {CERTS.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 80}>
              <div
                style={{
                  padding: '2rem 1.5rem',
                  borderRadius: 14,
                  border: `1.5px solid ${cert.mint ? 'var(--mint)' : 'var(--line)'}`,
                  background: cert.mint
                    ? 'rgba(84,230,192,0.06)'
                    : 'var(--panel)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontSize: '1.75rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  🏅
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: cert.mint ? 'var(--mint)' : 'var(--text)',
                    lineHeight: 1.3,
                  }}
                >
                  {cert.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--muted)',
                  }}
                >
                  {cert.by}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write About.tsx**

```tsx
// src/components/About.tsx
import Reveal from './Reveal'

export default function About() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="section" style={{ maxWidth: 720 }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>About DSP</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}
          >
            SECP-registered. Practically focused.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}
          >
            Digital Services Program (DSP) is a SECP-registered organisation
            that helps students, professionals, and entrepreneurs learn practical
            AI skills they can apply immediately.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
            }}
          >
            Top students receive a{' '}
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>
              1-month internship
            </span>{' '}
            and access to job opportunities within DSP's network.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Update page.tsx**

```tsx
import Hero from '@/components/Hero'
import Shift from '@/components/Shift'
import Learn from '@/components/Learn'
import Roadmap from '@/components/Roadmap'
import Modules from '@/components/Modules'
import AgentFlow from '@/components/AgentFlow'
import Audience from '@/components/Audience'
import Outcomes from '@/components/Outcomes'
import Project from '@/components/Project'
import Certificates from '@/components/Certificates'
import About from '@/components/About'

export default function Page() {
  return (
    <>
      <Hero />
      <Shift />
      <Learn />
      <Roadmap />
      <Modules />
      <AgentFlow />
      <Audience />
      <Outcomes />
      <Project />
      <Certificates />
      <About />
    </>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: Audience, Outcomes, Project, Certificates, About sections"
```

---

### Task 9: FAQ + BookingForm + Admission + /api/lead

**Files:**
- Create: `src/components/Faq.tsx`
- Create: `src/components/BookingForm.tsx`
- Create: `src/components/Admission.tsx`
- Create: `src/app/api/lead/route.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write Faq.tsx**

```tsx
'use client'
import { useState } from 'react'
import Reveal from './Reveal'

const FAQS = [
  {
    q: 'Do I need coding experience?',
    a: 'No. The bootcamp is designed for complete beginners. Vibe coding means you direct AI to write code for you — no syntax required.',
  },
  {
    q: 'Is this beginner-friendly?',
    a: 'Yes. Every concept is introduced from scratch with real-world examples. If you can use WhatsApp, you can start this bootcamp.',
  },
  {
    q: 'Are classes live?',
    a: 'Yes — all sessions run live over Zoom so you can ask questions, get feedback, and interact with your cohort in real time.',
  },
  {
    q: 'Are there assignments?',
    a: 'Days 7–8 are dedicated to assignments and guided practice. You'll apply each module before moving to the next.',
  },
  {
    q: 'What is the final project?',
    a: 'On Day 15 you build and present a working AI agent: task planner, tools, memory, evaluation, and a live demo to the cohort.',
  },
  {
    q: 'What certificates will I receive?',
    a: 'Four certificates: Claude Certificate, Claude Cowork Certificate, Claude Code Certificate (all guided by DSP), and the DSP Completion Certificate.',
  },
  {
    q: 'I'm a marketer or business owner — is this for me?',
    a: 'Absolutely. Understanding how agents work lets you automate workflows, build client tools, and make better decisions with AI — no technical background needed.',
  },
  {
    q: 'I'm a student — will this help my career?',
    a: 'Yes. Top students receive a 1-month internship and access to job opportunities within DSP's network.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" style={{ padding: '5rem 0' }}>
      <div className="section" style={{ maxWidth: 760 }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>FAQ</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '2.5rem',
            }}
          >
            Common questions.
          </h2>
        </Reveal>

        <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 10,
                overflow: 'hidden',
                background: open === i ? 'var(--panel)' : 'transparent',
                transition: 'background 0.2s',
              }}
            >
              <dt>
                <button
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.125rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: 'var(--text)',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      color: 'var(--gold)',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                      transform: open === i ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  >
                    +
                  </span>
                </button>
              </dt>
              {open === i && (
                <dd
                  style={{
                    padding: '0 1.25rem 1.25rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--muted)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {faq.a}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write BookingForm.tsx**

```tsx
'use client'
import { useState, FormEvent } from 'react'

const BACKGROUNDS = [
  'Student',
  'Marketer',
  'Entrepreneur',
  'Sales professional',
  'Teacher',
  'Business owner',
  'Other',
]

export default function BookingForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [background, setBackground] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setLoading(true)

    const waText = encodeURIComponent(
      `Hi DSP! I want to book a free intro session.\n\nName: ${name}\nPhone: ${phone}\nBackground: ${background || 'Not specified'}\n\nمیں بوٹ کیمپ میں شامل ہونا چاہتا/چاہتی ہوں۔`
    )
    const waUrl = `https://wa.me/923118122222?text=${waText}`

    // Fire-and-forget — never blocks WhatsApp open
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, background }),
    }).catch(() => {})

    window.open(waUrl, '_blank', 'noopener,noreferrer')

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        style={{
          padding: '2rem',
          background: 'rgba(84,230,192,0.08)',
          border: '1px solid rgba(84,230,192,0.25)',
          borderRadius: 12,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--mint)',
            marginBottom: '0.5rem',
          }}
        >
          ✓ Opening WhatsApp…
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--muted)',
          }}
        >
          We'll continue your registration on WhatsApp. See you there!
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label
          htmlFor="booking-name"
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--muted)',
            marginBottom: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Full name *
        </label>
        <input
          id="booking-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--panel-2)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
        />
      </div>

      <div>
        <label
          htmlFor="booking-phone"
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--muted)',
            marginBottom: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Phone *
        </label>
        <input
          id="booking-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 3XX XXXXXXX"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--panel-2)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--line)')}
        />
      </div>

      <div>
        <label
          htmlFor="booking-background"
          style={{
            display: 'block',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--muted)',
            marginBottom: '0.375rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          I am a…
        </label>
        <select
          id="booking-background"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--panel-2)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            color: background ? 'var(--text)' : 'var(--muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">Select your background</option>
          {BACKGROUNDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim() || !phone.trim()}
        className="btn-primary"
        style={{
          justifyContent: 'center',
          opacity: loading || !name.trim() || !phone.trim() ? 0.6 : 1,
          cursor: loading || !name.trim() || !phone.trim() ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Opening WhatsApp…' : 'Book Free Intro on WhatsApp →'}
      </button>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--muted)',
          textAlign: 'center',
        }}
      >
        You'll be taken to WhatsApp to complete your booking.
      </p>
    </form>
  )
}
```

- [ ] **Step 3: Write Admission.tsx**

```tsx
// src/components/Admission.tsx
import Reveal from './Reveal'
import BookingForm from './BookingForm'

export default function Admission() {
  return (
    <section id="admission" style={{ background: 'var(--ink-1)', padding: '5rem 0' }}>
      <div
        className="section"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Copy */}
        <Reveal>
          <div>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Admissions</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                color: 'var(--text)',
                marginBottom: '1.25rem',
              }}
            >
              Join the next cohort.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              Fill the form and we'll open WhatsApp so you can book your free
              intro session. Seats are limited — register early.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                WhatsApp Us →
              </a>
              <a href="tel:+923118122222" className="btn-ghost">
                Call +92 311 8122222
              </a>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <div className="panel" style={{ padding: '2rem' }}>
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write /api/lead route**

```ts
// src/app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, phone, background } = body as Record<string, string>

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: 'name and phone required' }, { status: 400 })
  }

  // console.log is visible in Vercel → Logs (ephemeral).
  // For durable records, configure RESEND_API_KEY + LEAD_EMAIL (email below)
  // or add: // alt: store in Vercel KV/Postgres or a Google Sheet
  console.log('[DSP lead]', { name, phone, background, ts: new Date().toISOString() })

  const apiKey = process.env.RESEND_API_KEY
  const leadEmail = process.env.LEAD_EMAIL

  if (apiKey && leadEmail) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'DSP Leads <leads@digitalservicesprogram.com>',
        to: leadEmail,
        subject: `New bootcamp lead: ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nBackground: ${background ?? 'not specified'}\nTime: ${new Date().toISOString()}`,
      })
    } catch (err) {
      // Email failure must never fail the response
      console.error('[DSP lead] email failed', err)
    }
  }

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 5: Update page.tsx with remaining sections**

```tsx
import Hero from '@/components/Hero'
import Shift from '@/components/Shift'
import Learn from '@/components/Learn'
import Roadmap from '@/components/Roadmap'
import Modules from '@/components/Modules'
import AgentFlow from '@/components/AgentFlow'
import Audience from '@/components/Audience'
import Outcomes from '@/components/Outcomes'
import Project from '@/components/Project'
import Certificates from '@/components/Certificates'
import About from '@/components/About'
import Faq from '@/components/Faq'
import Admission from '@/components/Admission'

export default function Page() {
  return (
    <>
      <Hero />
      <Shift />
      <Learn />
      <Roadmap />
      <Modules />
      <AgentFlow />
      <Audience />
      <Outcomes />
      <Project />
      <Certificates />
      <About />
      <Faq />
      <Admission />
    </>
  )
}
```

- [ ] **Step 6: Test the booking flow**

```bash
npm run dev
```

1. Fill out the form with a test name and phone number.
2. Click submit.
3. Verify: terminal shows `[DSP lead] { name: ..., phone: ..., ... }`.
4. Verify: WhatsApp opens in a new tab with the pre-filled message.
5. Verify: success state shows inline "Opening WhatsApp…".

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: FAQ, BookingForm, Admission, /api/lead route"
```

---

### Task 10: /contact and /blog pages

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `content/posts.ts`

- [ ] **Step 1: Create content/posts.ts**

```ts
// content/posts.ts
// Seed posts — move to MDX or a headless CMS (Sanity, Contentlayer) later.

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
}

export const posts: Post[] = [
  {
    slug: 'what-is-an-ai-agent',
    title: 'What Is an AI Agent? (And Why Chatbots Are Not Agents)',
    date: '2026-06-01',
    excerpt:
      'Most people think AI = chatbot. But real agents plan goals, use tools, remember context, and act. Here's the difference in plain language.',
    body: `
## The Chatbot Trap

When you open ChatGPT and type a question, you get an answer. That's it. The conversation ends when the tab closes — no memory, no follow-up, no action taken in the real world.

That's a chatbot.

## What Makes Something an Agent?

An AI agent does four things a chatbot doesn't:

1. **Plans** — it breaks a goal into steps.
2. **Uses tools** — it can search the web, read files, run code.
3. **Remembers** — it keeps context across steps and sessions.
4. **Acts** — it executes tasks, not just generates text.

## Why This Matters for You

You don't need to be a developer to direct an agent. In DSP's bootcamp, you'll learn to design workflows, choose the right tools, and evaluate whether your agent did what you asked.

That's a skill every marketer, entrepreneur, and student can use.
    `.trim(),
  },
  {
    slug: 'vibe-coding-explained',
    title: 'Vibe Coding: Build Software by Describing What You Want',
    date: '2026-06-10',
    excerpt:
      'Vibe coding lets you build real software without writing a single line yourself. You describe the goal; AI writes the code. Here's how it works.',
    body: `
## No Syntax Required

Traditional coding means learning a language, memorising functions, and debugging cryptic errors.

Vibe coding flips this. You describe what you want in plain language and AI writes the code. You review, test, and refine — but you never need to write syntax yourself.

## What You Actually Do

- Describe the feature: "I want a form that collects a name and phone number and sends it to WhatsApp."
- The AI generates the code.
- You test it, tell the AI what to fix, and repeat.

## It's a Real Skill

Knowing *how* to direct AI — what to ask for, how to break down problems, how to evaluate output — is a skill in itself. That's what DSP's bootcamp teaches.
    `.trim(),
  },
  {
    slug: 'why-pakistan-needs-ai-agents',
    title: 'Why Pakistan's Entrepreneurs Need AI Agents Now',
    date: '2026-06-18',
    excerpt:
      'AI agents are already automating work in global markets. Here's why Pakistani entrepreneurs, marketers, and students should get ahead of the curve.',
    body: `
## The Opportunity Window

Global companies are already deploying agents to handle research, customer support, lead qualification, and data analysis. This is not the future — it's happening now.

Pakistan has a massive talent pool and a growing freelance market. The question is: who builds the skills to work with these tools first?

## What Agents Can Do for a Small Business

- Research competitors automatically
- Qualify leads from a contact form
- Generate reports from raw data
- Draft and send follow-up messages

None of this requires a full engineering team. It requires someone who understands how agents work and can direct them effectively.

## DSP's Bootcamp Is Designed for This

15 days. Live Zoom. No coding background needed. Designed specifically for Pakistani entrepreneurs, marketers, and students who want to lead — not follow — in the AI shift.
    `.trim(),
  },
]
```

- [ ] **Step 2: Write /contact/page.tsx**

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next'
import BookingForm from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Contact DSP — Book a Free Intro Session',
  description:
    'Get in touch with Digital Services Program. Book a free intro session via WhatsApp or reach us by phone.',
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.25rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--mint)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '1rem',
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--text)',
            marginBottom: '1rem',
          }}
        >
          Get in touch.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            color: 'var(--muted)',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}
        >
          Book a free intro session, ask a question, or just say hi. We're
          available on WhatsApp every day.
        </p>

        {/* Quick links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem',
          }}
        >
          <a
            href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20learn%20more"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            WhatsApp Us →
          </a>
          <a href="tel:+923118122222" className="btn-ghost">
            +92 311 8122222
          </a>
        </div>

        <div
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--line)',
            borderRadius: 14,
            padding: '2rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              color: 'var(--text)',
              marginBottom: '1.5rem',
            }}
          >
            Book a free intro session
          </h2>
          <BookingForm />
        </div>

        {/* Info */}
        <div
          style={{
            marginTop: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            lineHeight: 2,
          }}
        >
          <p>SECP Registered · Digital Services Program</p>
          <p>digitalservicesprogram.com</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write /blog/page.tsx**

```tsx
// src/app/blog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '../../../content/posts'

export const metadata: Metadata = {
  title: 'Blog — Digital Services Program',
  description:
    'Articles on AI agents, vibe coding, and practical AI skills for Pakistani entrepreneurs and students.',
}

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.25rem' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--mint)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '1rem',
        }}
      >
        Blog
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text)',
          marginBottom: '3rem',
        }}
      >
        Articles.
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <article
              style={{
                height: '100%',
                padding: '1.75rem',
                background: 'var(--panel)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,195,77,0.35)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  'var(--line)')
              }
            >
              <time
                dateTime={post.date}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: 'var(--muted)',
                }}
              >
                {new Date(post.date).toLocaleDateString('en-PK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.0625rem',
                  color: 'var(--text)',
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--gold)',
                }}
              >
                Read →
              </span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Write /blog/[slug]/page.tsx**

```tsx
// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts } from '../../../../content/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} — DSP Blog`, description: post.excerpt }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 1.25rem' }}>
      <Link
        href="/blog"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginBottom: '2rem',
        }}
      >
        ← All posts
      </Link>

      <time
        dateTime={post.date}
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--muted)',
          marginBottom: '0.75rem',
        }}
      >
        {new Date(post.date).toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: 'var(--text)',
          marginBottom: '1.5rem',
        }}
      >
        {post.title}
      </h1>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.0625rem',
          color: 'var(--muted)',
          lineHeight: 1.8,
          whiteSpace: 'pre-line',
        }}
      >
        {post.body.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return (
              <h2
                key={i}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  color: 'var(--text)',
                  marginTop: '2rem',
                  marginBottom: '0.75rem',
                }}
              >
                {line.replace('## ', '')}
              </h2>
            )
          }
          if (line.startsWith('- **')) {
            const match = line.match(/- \*\*(.+?)\*\* — (.+)/)
            if (match) {
              return (
                <p key={i} style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text)' }}>{match[1]}</strong>
                  {' — '}
                  {match[2]}
                </p>
              )
            }
          }
          if (line.trim() === '') return <br key={i} />
          return <p key={i} style={{ marginBottom: '0.75rem' }}>{line}</p>
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Verify blog + contact in dev**

```bash
npm run dev
```

1. Visit `http://localhost:3000/blog` — three cards appear.
2. Click one card — post content renders.
3. Click "← All posts" — navigates back.
4. Visit `http://localhost:3000/contact` — form renders, WhatsApp link works.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: /contact, /blog, /blog/[slug] pages with seed posts"
```

---

### Task 11: Final polish — build verification + deploy instructions

**Files:**
- Verify: all components render cleanly
- Verify: `npm run build` passes

- [ ] **Step 1: Drop a placeholder logo so build never breaks**

If `/public/logo.webp` doesn't exist yet, the `next/image` component will still work (it'll show the fallback "D" mark). Confirm the fallback renders in dev by temporarily renaming or checking the file is absent; the gold "D" should appear in its place.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Linting and checking validity of types
Route (app)              Size
...
```

Fix any TypeScript or ESLint errors before proceeding.

- [ ] **Step 3: Run production preview**

```bash
npm run start
```

Open `http://localhost:3000`. Check:
- [ ] Hero animation loops
- [ ] Booking form: fill name + phone → submit → WhatsApp opens with pre-filled message → success state shows
- [ ] `/api/lead` POST: check terminal for `[DSP lead] {...}` log
- [ ] Nav links scroll to sections
- [ ] `/blog` renders 3 cards
- [ ] `/blog/what-is-an-ai-agent` renders post
- [ ] `/contact` renders form
- [ ] No hydration warnings in browser console
- [ ] Keyboard navigation: tab through all interactive elements, focus rings visible
- [ ] Resize to 360px width: all sections wrap cleanly

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: production build verified"
```

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git remote add origin https://github.com/<your-username>/dsp-bootcamp-site.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import the GitHub repo you just pushed
3. Vercel auto-detects Next.js — click **Deploy** (no config needed)
4. Once deployed, go to **Project → Settings → Environment Variables** and add:
   - `RESEND_API_KEY` — your Resend key (get one free at resend.com)
   - `LEAD_EMAIL` — the inbox that should receive lead notifications (e.g. `rabco007@gmail.com`)
5. **Redeploy** the project after adding env vars (Settings → Deployments → Redeploy)

### 3. Connect your GoDaddy domain

1. In Vercel → **Project → Settings → Domains**, click **Add Domain** and enter `digitalservicesprogram.com`
2. Vercel shows you two DNS records — typically an **A record** pointing to `76.76.21.21` and a **CNAME** for `www`
3. In GoDaddy → **My Domains → DNS → Manage DNS**:
   - Delete the existing `@` A record (if any)
   - Add the A record: `Type: A · Name: @ · Value: 76.76.21.21 · TTL: 600`
   - Add the CNAME: `Type: CNAME · Name: www · Value: cname.vercel-dns.com · TTL: 600`
4. The domain stays **registered** at GoDaddy — only the DNS points at Vercel
5. Wait 5–30 minutes for DNS to propagate. Vercel issues an SSL certificate automatically — HTTPS works without any extra config.

### 4. Verify

Visit `https://digitalservicesprogram.com` — you should see the site over HTTPS with a valid certificate.

---

*End of plan.*
