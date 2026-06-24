// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts } from '../../../../content/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} — DSP Blog`, description: post.excerpt }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 1.25rem' }}>
      <Link
        href="/blog"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginBottom: '2rem',
        }}
      >
        ← All posts
      </Link>

      <time
        dateTime={post.date}
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--muted)',
          marginBottom: '0.75rem',
        }}
      >
        {new Date(post.date).toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          color: 'var(--text)',
          marginBottom: '1.5rem',
        }}
      >
        {post.title}
      </h1>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.0625rem',
          color: 'var(--muted)',
          lineHeight: 1.8,
          whiteSpace: 'pre-line',
        }}
      >
        {post.body.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return (
              <h2
                key={i}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  color: 'var(--text)',
                  marginTop: '2rem',
                  marginBottom: '0.75rem',
                }}
              >
                {line.replace('## ', '')}
              </h2>
            )
          }
          if (line.startsWith('- **')) {
            const match = line.match(/- \*\*(.+?)\*\* — (.+)/)
            if (match) {
              return (
                <p key={i} style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text)' }}>{match[1]}</strong>
                  {' — '}
                  {match[2]}
                </p>
              )
            }
          }
          if (line.trim() === '') return <br key={i} />
          return <p key={i} style={{ marginBottom: '0.75rem' }}>{line}</p>
        })}
      </div>
    </div>
  )
}
