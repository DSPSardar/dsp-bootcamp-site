// app/robots.ts — serves /robots.txt.
// Keeps private routes out of crawlers: the student dashboard, the internal
// lesson preview, auth plumbing, and API endpoints. The HTML routes listed
// here also carry noindex metadata of their own.
//
// TODO (deliberately deferred — do NOT add yet): disallow '/mastery/enrol'.
// The page is noindex,nofollow but was indexable before Aug 2026; Google must
// be able to CRAWL it to see the noindex and drop it from the index. Add the
// disallow only after GSC confirms de-index — earliest 4 weeks from
// 2026-08-30. Tracked in V2-PROGRESS.md.
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/app', '/app/', '/mastery/preview', '/auth/', '/api/'],
      },
    ],
    sitemap: 'https://www.digitalservicesprogram.com/sitemap.xml',
  }
}
