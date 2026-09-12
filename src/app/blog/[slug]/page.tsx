// app/blog/[slug]/page.tsx — single blog post (Server Component)
import type { Metadata } from 'next'
import { ORGANIZATION_ID, PERSON_ID, breadcrumbLd, ref } from '@/lib/schema'
import Byline from '@/components/Byline'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/posts'
import { getPostRefit } from '@/content/post-refits'
import { footerGuides } from '@/config/site'

const SITE = 'https://www.digitalservicesprogram.com'

// Pre-render every post at build time
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

// Per-post SEO metadata: self-referencing canonical + unique OG tags
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post not found — DSP' }

  const url = `${SITE}/blog/${post.slug}`
  const img = `${SITE}${post.image}`
  const refit = getPostRefit(post.slug)
  return {
    title: `${post.title} — DSP Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      images: [{ url: img, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      ...(refit ? { modifiedTime: refit.updated } : {}),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [img],
    },
  }
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const url = `${SITE}/blog/${post.slug}`
  // Answer-first refit (Day 3, 2026-09-08) — only the money-intent posts
  // listed in src/content/post-refits.ts; every other post renders as before.
  const refit = getPostRefit(post.slug)
  // Related posts are picked as a ring, not as the first three of the
  // category. .slice(0, 3) handed every post in a category the SAME three
  // siblings, so 13 of 43 posts received no inbound internal link at all.
  const allPosts = getAllPosts()
  const sameCategory = allPosts.filter((p) => p.category === post.category)
  const related: typeof allPosts = []
  const startInCategory = Math.max(
    0,
    sameCategory.findIndex((p) => p.slug === post.slug),
  )
  for (let i = 1; i < sameCategory.length && related.length < 3; i++) {
    related.push(sameCategory[(startInCategory + i) % sameCategory.length])
  }
  const startInAll = Math.max(
    0,
    allPosts.findIndex((p) => p.slug === post.slug),
  )
  for (let i = 1; i < allPosts.length && related.length < 3; i++) {
    const candidate = allPosts[(startInAll + i) % allPosts.length]
    if (
      candidate.slug !== post.slug &&
      !related.some((r) => r.slug === candidate.slug)
    ) {
      related.push(candidate)
    }
  }

  // Crawl paths to the guides (Day 7, 2026-09-12). The 43 legacy posts keep
  // their old PHP slugs and are the part of this site Google has actually
  // crawled for years; the guides are the part it has not crawled at all
  // (31 URLs sat at "Discovered — currently not indexed" on 11 Sep). The
  // footer "Guides" block lives in SiteFooter, which the blog shell never
  // renders, so until now only the six refit posts pointed at a guide at all.
  // Three per post, picked as a ring off the post's own position, so the 43
  // posts spread their links across the whole set instead of every post
  // naming the same three. Refit posts skip the guides their "Go deeper"
  // block already links, so no post links the same URL twice.
  const refitHrefs = new Set<string>(
    refit ? refit.goDeeper.map((l) => l.href) : [],
  )
  const guidePool = footerGuides.filter((g) => !refitHrefs.has(g.path))
  const guideLinks = guidePool.slice(0, 3).map(
    (_, i) => guidePool[(startInAll + i) % guidePool.length],
  )

  // BlogPosting structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    image: `${SITE}${post.image}`,
    datePublished: post.date,
    dateModified: refit?.updated ?? post.date,
    articleSection: post.category,
    // Entity Lock (2026-09-06): every post is authored by the founder's ONE
    // Person node and published by the ONE Organization node — both defined
    // in the root layout's entity graph and referenced here by @id, so
    // authorship accrues to a single entity instead of a per-page literal.
    author: ref(PERSON_ID),
    publisher: ref(ORGANIZATION_ID),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  const dateLabel = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const heroImage = post.image || '/blog/what-is-an-ai-agent.jpg'

  return (
    <article className="dsp-post">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }])) }}
      />

      <div className="dsp-post__inner">
        <Link href="/blog" className="dsp-post__back">← All posts</Link>

        <p className="dsp-post__eyebrow">
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{dateLabel}</time>
        </p>

        <h1 className="dsp-post__title">{post.title}</h1>
        <Byline date={post.date} updated={refit?.updated} />

        {refit && (
          <div className="dsp-post__answer" id="answer">
            <p className="dsp-post__answer-kicker">Short answer</p>
            <p>{refit.answer}</p>
          </div>
        )}

        <div className="dsp-post__hero">
          <Image
            src={heroImage}
            alt={post.title}
            width={1200}
            height={630}
            priority
            sizes="(max-width: 768px) 100vw, 760px"
          />
        </div>

        {/* Content is trusted, pre-authored HTML from your own CMS export */}
        <div
          className="dsp-post__body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {refit && (
          <aside className="dsp-post__deeper" aria-labelledby="deeper-h">
            <h2 id="deeper-h">Go deeper</h2>
            <ul>
              {refit.goDeeper.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </aside>
        )}

        <div className="dsp-post__cta">
          <h2>Ready to build AI agents yourself?</h2>
          <p>DSP AI Agent Mastery — self-paced, 16 modules, starts from zero.</p>
          <a href="/mastery" className="dsp-post__cta-btn">
            Start AI Agent Mastery →
          </a>
        </div>

        {related.length > 0 && (
          <section className="dsp-post__related">
            <h2>More in {post.category}</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {guideLinks.length > 0 && (
          <section
            className="dsp-post__related dsp-post__guides"
            aria-labelledby="guides-h"
          >
            <h2 id="guides-h">DSP guides</h2>
            <ul>
              {guideLinks.map((g) => (
                <li key={g.path}>
                  <Link href={g.path}>{g.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  )
}
