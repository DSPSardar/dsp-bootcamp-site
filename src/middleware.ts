import { NextResponse, type NextRequest } from 'next/server'

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
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl
  // Supabase auth links can come back to the Site URL (the homepage) carrying ?code= or
  // ?token_hash=. Nothing on the homepage exchanges them, so the student saw "nothing
  // happened". Hand them to /auth/callback, which signs them in and sends them to set a password.
  if (pathname === '/' && (searchParams.has('code') || searchParams.has('token_hash'))) {
    const to = req.nextUrl.clone()
    to.pathname = '/auth/callback'
    if (!to.searchParams.has('next')) to.searchParams.set('next', '/app/account')
    return NextResponse.redirect(to)
  }
  if (pathname === '/') return NextResponse.next()
  return new NextResponse(null, { status: 410 })
}

export const config = {
  matcher: [
    '/',
    '/wp-login.php',
    '/xmlrpc.php',
    '/wp-admin/:path*',
    '/wp-content/:path*',
    '/wp-includes/:path*',
  ],
}
