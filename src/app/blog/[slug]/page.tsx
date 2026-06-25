// app/blog/[slug]/page.tsx — single blog post (Server Component)
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/posts'

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
  const related = getAllPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

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
    dateModified: post.date,
    articleSection: post.category,
    author: { '@type': 'Organization', name: post.author, url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Services Program',
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.webp` },
    },
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

      <div className="dsp-post__inner">
        <Link href="/blog" className="dsp-post__back">← All posts</Link>

        <p className="dsp-post__eyebrow">
          <span>{post.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{dateLabel}</time>
        </p>

        <h1 className="dsp-post__title">{post.title}</h1>
        <p className="dsp-post__byline">By {post.author}</p>

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

        <div className="dsp-post__cta">
          <h2>Ready to build AI agents yourself?</h2>
          <p>Join DSP&apos;s 15-day live bootcamp — no coding needed.</p>
          <a
            href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
            className="dsp-post__cta-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Bootcamp →
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
      </div>
    </article>
  )
}
