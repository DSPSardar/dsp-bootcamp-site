import { NextRequest, NextResponse } from "next/server";

// Legacy permalink from the pre-2026 PHP site: /blog-post.php?id=<slug>.
// Google still crawls it and the platform answers 403, which parks it in
// Search Console indefinitely. A next.config redirect would work, but it
// passes the unmatched ?id= through to the destination, so the crawler
// would land on /blog/<slug>?id=<slug>. This handler drops the query.
export function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")?.trim();
  const slug = id && /^[a-z0-9-]+$/i.test(id) ? id : null;
  const destination = slug ? `/blog/${slug}` : "/blog";
  return NextResponse.redirect(new URL(destination, request.nextUrl.origin), 308);
}
