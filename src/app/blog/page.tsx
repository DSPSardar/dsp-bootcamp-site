// app/blog/page.tsx — blog index listing all posts
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'AI Agent Tutorials & Beginner Learning Guides',
  description:
    'Explore AI agent tutorials, beginner projects and Urdu learning guides. Compare courses and follow a practical path from your first idea to deployment.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'AI Agent Tutorials & Beginner Learning Guides',
    description:
      'Explore AI agent tutorials, beginner projects and Urdu learning guides. Compare courses and follow a practical path from your first idea to deployment.',
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
        <h1 className="dsp-blog__title">AI agent tutorials and learning guides.</h1>
        <p className="dsp-blog__sub">
          {posts.length} guides on AI agents, vibe coding, and practical AI.
        </p>
      </header>

      <nav className="dsp-blog__learning" aria-labelledby="learning-path-title">
        <h2 id="learning-path-title">New to building AI agents? Start here.</h2>
        <ol>
          <li><Link href="/learn-ai-agents-pakistan">Follow the beginner learning roadmap</Link></li>
          <li><Link href="/ai-agent-course-in-urdu">Explore learning AI agents in Urdu</Link></li>
          <li><Link href="/best-ai-courses-in-pakistan">Compare AI courses in Pakistan</Link></li>
          <li><Link href="/mastery/curriculum">See what you build in the Mastery curriculum</Link></li>
        </ol>
        <p><Link href="/mastery">Explore AI Agent Mastery</Link> for a guided path from your first idea to a deployed agent.</p>
      </nav>

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
