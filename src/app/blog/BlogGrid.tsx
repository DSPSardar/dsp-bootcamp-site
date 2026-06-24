'use client'
import Link from 'next/link'
import type { Post } from '../../../content/posts'

export default function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          style={{ textDecoration: 'none' }}
        >
          <article
            style={{
              height: '100%',
              padding: '1.75rem',
              background: 'var(--panel)',
              border: '1px solid var(--line)',
              borderRadius: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                'rgba(255,195,77,0.35)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor =
                'var(--line)')
            }
          >
            <time
              dateTime={post.date}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                color: 'var(--muted)',
              }}
            >
              {new Date(post.date).toLocaleDateString('en-PK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.0625rem',
                color: 'var(--text)',
                lineHeight: 1.3,
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              {post.excerpt}
            </p>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--gold)',
              }}
            >
              Read →
            </span>
          </article>
        </Link>
      ))}
    </div>
  )
}
