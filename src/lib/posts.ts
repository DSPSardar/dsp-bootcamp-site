// lib/posts.ts — single source of truth for all blog posts
import postsData from '@/content/posts.json'

export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  date: string
  image: string
  published: boolean
}

const posts = (postsData as Post[]).filter((p) => p.published)

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.category))).sort()
}
