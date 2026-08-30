import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
