'use client'
import { createBrowserClient } from '@supabase/ssr'

/** Browser-side Supabase client (anon key, RLS applies). Used by the magic-link sign-in form. */
export const supabaseBrowser = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
