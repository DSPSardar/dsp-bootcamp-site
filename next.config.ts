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
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
