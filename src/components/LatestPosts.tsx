import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3)

  if (posts.length === 0) {
    return null
  }

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem 5rem' }}>
      <div
        style={{
          border: '1px solid var(--line)',
          borderRadius: 20,
          background: 'linear-gradient(145deg, rgba(20,27,51,0.95), rgba(12,18,36,0.9))',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p className="eyebrow">Latest from the Blog</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: '0.35rem' }}>
              Fresh reads on AI agents and practical AI.
            </h2>
          </div>
          <Link href="/blog" className="btn-ghost" style={{ whiteSpace: 'nowrap' }}>
            Browse all posts
          </Link>
        </div>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '1rem',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--mint)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.45rem',
                }}
              >
                {post.category}
              </p>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                {post.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
