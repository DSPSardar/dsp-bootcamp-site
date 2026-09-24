import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Emit each route's CSS as an inline <style> instead of render-blocking
    // <link> requests. PageSpeed measured the two /mastery stylesheets at
    // 490 ms + 160 ms of blocking latency on a cold edge; the trade is
    // ~11 KB of uncacheable CSS per HTML response (perf pass 2026-09-03).
    inlineCss: true,
  },
  async redirects() {
    // Friendly short URLs → canonical course pages.
    // /academy was retired at the bootcamp sunset (2026-08-30): education
    // intent now lands on /mastery, DSP's only educational product. The
    // retired FDE track's URLs point there directly (no redirect chains).
    // /academy/bootcamp itself stays live — an exact-match /academy source
    // does not catch it.
    return [
      { source: "/bootcamp", destination: "/academy/bootcamp", permanent: true },
      { source: "/academy", destination: "/mastery", permanent: true },
      { source: "/fde", destination: "/mastery", permanent: true },
      { source: "/academy/fde", destination: "/mastery", permanent: true },

      // Legacy URLs from the pre-2026 PHP site. Google still crawls them and
      // the platform answers 403, which parks them in Search Console's
      // "Blocked due to access forbidden" bucket indefinitely instead of
      // letting them resolve. Each has a real equivalent, so 301 is correct
      // and carries no soft-404 risk.
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      // /blog-post.php?id=<slug> is handled by a route handler instead of a
      // rule here: next.config redirects pass unmatched query params through
      // to the destination, so the crawler would land on /blog/<slug>?id=<slug>.
      // Crawled as a 404: the real page sits one level down. Nothing in this
      // repo links to it, so the reference is external or historic.
      { source: "/curriculum", destination: "/mastery/curriculum", permanent: true },

      // ── Blog consolidation, 2026-09-18 ──────────────────────────────
      // 43 posts became 12. Thirty-one of them were near-duplicates of six
      // stronger pages — Search Console had 9 of the 43 indexed and 30 at
      // "Discovered — currently not indexed", because the crawl budget was
      // spread across forty-three thin pages instead of twelve substantial
      // ones. Each source below was merged into its target and 301s there,
      // so all 43 URLs still resolve and the equity follows the redirect.
      // NOTHING was renamed and nothing was deleted: the six targets keep
      // their own slugs, which is why they are destinations and not sources.
      // Source and destination are both under /blog/, so no rule here can
      // catch a non-blog URL.
      // These use `statusCode: 301` rather than `permanent: true`. Next emits
      // 308 for `permanent` (it preserves the request method, which 301
      // historically did not). Google treats 308 and 301 alike, but the
      // consolidation spec calls for 301, third-party SEO crawlers are less
      // consistent about 308, and these destinations are GET-only pages, so
      // there is nothing for 308 to preserve. The legacy rules above keep
      // `permanent: true` — they are live and working, and churning them
      // buys nothing.
      //
      // -> /blog/what-is-an-ai-agent
      //    (the agent definition — four posts that defined the same thing)
      { source: "/blog/what-is-agentic-ai-the-shift-from-chatbots-to-autonomous-systems", destination: "/blog/what-is-an-ai-agent", statusCode: 301 },
      { source: "/blog/ai-vs-agentic-ai-a-side-by-side-comparison", destination: "/blog/what-is-an-ai-agent", statusCode: 301 },
      { source: "/blog/ai-assistants-vs-ai-agents-understanding-the-future-of-artificial-intelligence", destination: "/blog/what-is-an-ai-agent", statusCode: 301 },
      { source: "/blog/the-agent-loop-explained-how-ai-plans-acts-and-learns", destination: "/blog/what-is-an-ai-agent", statusCode: 301 },
      //
      // -> /blog/machine-learning-vs-deep-learning-vs-ai-whats-the-difference
      //    (the vocabulary post — how models work, and how the field got here)
      { source: "/blog/how-large-language-models-actually-work-no-math-required", destination: "/blog/machine-learning-vs-deep-learning-vs-ai-whats-the-difference", statusCode: 301 },
      { source: "/blog/a-brief-history-of-ai-from-alan-turing-to-chatgpt", destination: "/blog/machine-learning-vs-deep-learning-vs-ai-whats-the-difference", statusCode: 301 },
      //
      // -> /blog/10-ways-businesses-can-use-agentic-ai-in-2026
      //    (the business-use post — nine near-duplicates plus three industries)
      { source: "/blog/agentic-ai-in-business-7-workflows-you-can-automate-starting-today", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/ai-for-small-businesses-you-dont-need-a-tech-team-to-get-started", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/automated-operations-how-ai-is-rebuilding-the-way-businesses-run", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/ai-first-startups-the-new-generation-of-intelligent-businesses", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/small-teams-scaling-like-large-companies-with-ai-agents", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/solo-entrepreneurs-using-ai-agents-how-one-person-can-build-a-powerful-ai-driven-business", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/the-rise-of-ai-native-companies-how-artificial-intelligence-is-redefining-modern-business", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/real-business-execution-how-ai-agents-are-transforming-modern-companies", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/autonomous-workflows-the-future-of-ai-powered-business-automation", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/government-ai-how-public-institutions-are-adopting-intelligent-systems", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/ai-in-education-from-smart-tutors-to-autonomous-grading-systems", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      { source: "/blog/how-ai-agents-are-transforming-healthcare-what-it-means-for-patients", destination: "/blog/10-ways-businesses-can-use-agentic-ai-in-2026", statusCode: 301 },
      //
      // -> /blog/why-sales-is-the-first-job-ai-is-replacing
      //    (the sales post — the funnel, marketing and support halves of it)
      { source: "/blog/ai-sales-funnel-how-artificial-intelligence-is-automating-customer-acquisition", destination: "/blog/why-sales-is-the-first-job-ai-is-replacing", statusCode: 301 },
      { source: "/blog/ai-vs-traditional-sales-why-human-sales-teams-are-changing-forever", destination: "/blog/why-sales-is-the-first-job-ai-is-replacing", statusCode: 301 },
      { source: "/blog/ai-marketing-systems-how-agentic-ai-is-revolutionizing-digital-marketing", destination: "/blog/why-sales-is-the-first-job-ai-is-replacing", statusCode: 301 },
      { source: "/blog/ai-customer-support-how-ai-agents-are-transforming-customer-service-forever", destination: "/blog/why-sales-is-the-first-job-ai-is-replacing", statusCode: 301 },
      { source: "/blog/why-businesses-are-switching-to-ai-customer-support", destination: "/blog/why-sales-is-the-first-job-ai-is-replacing", statusCode: 301 },
      //
      // -> /blog/how-to-learn-ai-in-2026-a-roadmap-for-complete-beginners
      //    (the learning roadmap — literacy, programs and what pays)
      { source: "/blog/why-ai-literacy-is-the-most-important-skill-of-the-next-decade", destination: "/blog/how-to-learn-ai-in-2026-a-roadmap-for-complete-beginners", statusCode: 301 },
      { source: "/blog/what-to-expect-from-an-ai-agentic-ai-training-program", destination: "/blog/how-to-learn-ai-in-2026-a-roadmap-for-complete-beginners", statusCode: 301 },
      { source: "/blog/why-ai-skills-are-the-highest-paid-in-2025", destination: "/blog/how-to-learn-ai-in-2026-a-roadmap-for-complete-beginners", statusCode: 301 },
      //
      // -> /blog/the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake
      //    (the ethics post — bias, safety, myths and the jobs question)
      { source: "/blog/ai-bias-explained-what-it-is-where-it-comes-from-and-how-to-reduce-it", destination: "/blog/the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake", statusCode: 301 },
      { source: "/blog/how-to-keep-ai-safe-corrigibility-sandboxing-and-human-oversight", destination: "/blog/the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake", statusCode: 301 },
      { source: "/blog/the-10-most-common-myths-about-ai-debunked", destination: "/blog/the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake", statusCode: 301 },
      { source: "/blog/will-ai-take-my-job-an-honest-evidence-based-answer", destination: "/blog/the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake", statusCode: 301 },
      { source: "/blog/the-future-of-work-in-an-agentic-ai-world-skills-roles-and-opportunities", destination: "/blog/the-ethics-of-agentic-ai-who-is-responsible-when-an-agent-makes-a-mistake", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            // The site-wide SARDAR launcher (src/components/sardar) and
            // /sardar itself talk: the microphone is allowed same-origin only
            // (ElevenLabs Conversational AI). Camera and geolocation stay off.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
