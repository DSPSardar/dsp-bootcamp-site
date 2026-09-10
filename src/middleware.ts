import { NextResponse } from 'next/server'

// Legacy WordPress surface from the pre-2026 site. Nothing WordPress is
// running here — these paths currently answer 403, which tells a crawler
// "forbidden, try again later", so they park in Search Console's "Blocked
// due to access forbidden" bucket indefinitely instead of resolving. 410
// Gone is the correct answer for a surface that has been removed, and both
// Google and Bing drop 410s far faster than they drop 403s.
//
// Same reasoning as the /index.php and /about.php redirects in
// next.config.ts, but those had real equivalents to point at; these do not.
// /feed already answers 404 and is deliberately left alone.
export function middleware() {
  return new NextResponse(null, { status: 410 })
}

export const config = {
  matcher: [
    '/wp-login.php',
    '/xmlrpc.php',
    '/wp-admin/:path*',
    '/wp-content/:path*',
    '/wp-includes/:path*',
  ],
}
