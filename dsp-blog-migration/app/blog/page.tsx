// app/blog/page.tsx — blog index listing all posts
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'DSP Blog — AI Agents, Vibe Coding & Practical AI Skills',
  description:
    'Practical guides on AI agents, vibe coding, and building with AI — for beginners, entrepreneurs, and students.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'DSP Blog — AI Agents, Vibe Coding & Practical AI Skills',
    description:
      'Practical guides on AI agents, vibe coding, and building with AI — for beginners.',
    url: 'https://www.digitalservicesprogram.com/blog',
    type: 'website',
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    })

  return (
    <main className="dsp-blog">
      <header className="dsp-blog__head">
        <p className="dsp-blog__eyebrow">Blog</p>
        <h1 className="dsp-blog__title">Articles.</h1>
        <p className="dsp-blog__sub">
          {posts.length} guides on AI agents, vibe coding, and practical AI.
        </p>
      </header>

      {featured && (
        <Link href={`/blog/${featured.slug}`} className="dsp-blog__featured">
          <div className="dsp-blog__featured-img">
            <Image
              src={featured.image}
              alt={featured.title}
              width={1200}
              height={630}
              priority
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>
          <div className="dsp-blog__featured-text">
            <p className="dsp-blog__meta">
              {featured.category} · {fmt(featured.date)}
            </p>
            <h2>{featured.title}</h2>
            <p className="dsp-blog__excerpt">{featured.excerpt}</p>
            <span className="dsp-blog__read">Read →</span>
          </div>
        </Link>
      )}

      <ul className="dsp-blog__grid">
        {rest.map((post) => (
          <li key={post.slug} className="dsp-blog__card">
            <Link href={`/blog/${post.slug}`}>
              <div className="dsp-blog__card-img">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={315}
                  sizes="(max-width: 700px) 100vw, 360px"
                />
              </div>
              <p className="dsp-blog__meta">
                {post.category} · {fmt(post.date)}
              </p>
              <h3>{post.title}</h3>
              <p className="dsp-blog__excerpt">{post.excerpt}</p>
              <span className="dsp-blog__read">Read →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
