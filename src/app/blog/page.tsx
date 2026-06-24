// src/app/blog/page.tsx
import type { Metadata } from 'next'
import { posts } from '../../../content/posts'
import BlogGrid from './BlogGrid'

export const metadata: Metadata = {
  title: 'Blog — Digital Services Program',
  description:
    'Articles on AI agents, vibe coding, and practical AI skills for Pakistani entrepreneurs and students.',
}

export default function BlogPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.25rem' }}>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--mint)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '1rem',
        }}
      >
        Blog
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--text)',
          marginBottom: '3rem',
        }}
      >
        Articles.
      </h1>

      <BlogGrid posts={posts} />
    </div>
  )
}
