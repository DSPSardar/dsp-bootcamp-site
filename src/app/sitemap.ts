// app/sitemap.ts — includes all company pages and ALL blog posts
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const SITE = 'https://www.digitalservicesprogram.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/academy/fde`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE}/academy/bootcamp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE}/agents/restaurant-ai`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/academy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE}/agents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
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
