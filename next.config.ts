import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Friendly short URLs → canonical course pages.
    // /academy/fde is retired but Google-indexed — 301 it (and its old
    // short URL) to /academy so the SEO equity isn't wasted on a 404.
    return [
      { source: "/bootcamp", destination: "/academy/bootcamp", permanent: true },
      { source: "/fde", destination: "/academy", permanent: true },
      { source: "/academy/fde", destination: "/academy", permanent: true },
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
