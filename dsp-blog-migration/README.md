# DSP Blog Migration — 43 Posts → Next.js

Migrates all 40 posts from your old PHP site (`posts.json`) **plus** your 3 existing
new-site posts into one clean Next.js blog. Slugs are preserved exactly, so the
blog URLs Google already indexed recover with **no redirects needed**.

## What's included
- `content/posts.json` — all 43 posts (author set to "Digital Services Program")
- `lib/posts.ts` — data access helpers
- `app/blog/page.tsx` — blog index (lists all posts)
- `app/blog/[slug]/page.tsx` — single post (canonical + OG + BlogPosting schema)
- `app/sitemap.ts` — sitemap covering all 43 posts
- `public/blog/*` — all 43 images (40 originals + 3 generated placeholders)
- `blog.css` — styles (DSP navy theme)

## Install (drop into DSPSardar/dsp-bootcamp-site)

1. **Copy files into the repo (same paths):**
   ```
   content/posts.json          → content/posts.json
   lib-posts.ts                → lib/posts.ts
   app/blog/page.tsx           → app/blog/page.tsx          (replaces current)
   app/blog/[slug]/page.tsx    → app/blog/[slug]/page.tsx
   app-sitemap.ts              → app/sitemap.ts             (replaces current)
   public/blog/*               → public/blog/
   blog.css                    → app/blog/blog.css
   ```

2. **Delete old hardcoded post files** if your 3 existing posts live as
   individual folders (e.g. `app/blog/what-is-an-ai-agent/page.tsx`) — they're
   now served by the `[slug]` route from `posts.json`. Leaving them will cause a
   route conflict.

3. **Import the CSS.** In `app/blog/layout.tsx` (create if absent):
   ```tsx
   import './blog.css'
   export default function BlogLayout({ children }: { children: React.ReactNode }) {
     return <>{children}</>
   }
   ```

4. **Confirm `@/` path alias** works (tsconfig `"paths": { "@/*": ["./*"] }`).
   If your repo uses `src/`, adjust imports to `@/content/...` accordingly.

5. **Replace the 3 placeholder images** in `public/blog/` whenever you have real
   ones: `what-is-an-ai-agent.jpg`, `vibe-coding-explained.jpg`,
   `why-pakistan-needs-ai-agents.jpg`.

## After deploy
- Visit `/blog` → all 43 posts should list.
- Spot-check an old indexed URL, e.g.
  `/blog/why-sales-is-the-first-job-ai-is-replacing` → should load (not 404).
- View Source on any post → `canonical` points to its own URL.
- In Google Search Console: resubmit `sitemap.xml`, then Request Indexing on a
  few recovered URLs to speed re-crawl.

## Note on content rendering
Post HTML is injected via `dangerouslySetInnerHTML`. This is safe here because
the content is your own authored CMS export, not user input. Do not pipe
untrusted content through this route.
