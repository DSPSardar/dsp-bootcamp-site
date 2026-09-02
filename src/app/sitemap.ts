// app/sitemap.ts — includes all company pages and ALL blog posts
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { agency } from '@/config/site'
import { PAGE_LAST_MODIFIED as MASTERY_LAST_MODIFIED } from '@/app/mastery/seo'

const SITE = 'https://www.digitalservicesprogram.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    // Real content-change date (see PAGE_LAST_MODIFIED). /mastery/enrol is
    // deliberately NOT listed: it is noindex (checkout page) and a sitemap
    // entry for a noindex URL only produces a Search Console error.
    { url: `${SITE}/mastery`, lastModified: new Date(MASTERY_LAST_MODIFIED), changeFrequency: 'weekly', priority: 0.95 },
    // Evergreen explainer of the sunset Agentic Lab — stays indexed, but
    // it is a history page now, not a priority landing page.
    { url: `${SITE}/academy/bootcamp`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/ai-employees`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    ...agency.employees.map((e) => ({
      url: `${SITE}/ai-employees/${e.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    { url: `${SITE}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/agents/restaurant-ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/agents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE}/channelops`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/agents/case-studies`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...postPages]
}
