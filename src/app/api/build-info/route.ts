// src/app/api/build-info/route.ts — serves /api/build-info.
//
// Identifies which commit the live site is actually serving, so a deploy can
// be waited on instead of guessed at. `.github/workflows/deploy.yml` polls
// this after a push to main and only pings IndexNow once the SHA here matches
// the commit that was just merged.
//
// It replaced a date test (2026-09-20). The old gate polled the live sitemap
// for today's <lastmod>; with a merge landing most days the sitemap already
// carried today's date from an earlier deploy, so the poll matched instantly
// and IndexNow was told to recrawl the PREVIOUS build's HTML. A commit is the
// only thing that distinguishes one deploy from the next.
//
// `force-static` bakes the value in at build time, which is the point: the
// response identifies the build it shipped with, not the moment it was
// fetched. `no-store` keeps an intermediate cache from answering for a
// deployment that is no longer live — the one failure mode that would put the
// old bug straight back.
//
// Under /api/, so robots.ts already keeps crawlers off it (PRIVATE).

/**
 * Vercel exposes the build's commit through the NEXT_PUBLIC_ variant only when
 * "Automatically expose System Environment Variables" is on, so fall through to
 * the unprefixed one it always sets, then to GitHub Actions' own. Each has to
 * be written out in full: Next inlines NEXT_PUBLIC_* by literal match, so a
 * computed lookup would come back undefined.
 */
const SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  'unknown'

export const dynamic = 'force-static'

export function GET() {
  return new Response(JSON.stringify({ sha: SHA, builtAt: new Date().toISOString() }) + '\n', {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
