import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const token_hash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type') as 'magiclink' | 'email' | 'recovery' | 'invite' | null
  const next = url.searchParams.get('next') ?? '/app'
  const err = url.searchParams.get('error_description')
  if (err) return NextResponse.redirect(new URL(`/app/login?err=${encodeURIComponent(err)}`, url.origin))

  const sb = await supabaseServer()
  if (code) {
    const { error } = await sb.auth.exchangeCodeForSession(code)
    if (error) return NextResponse.redirect(new URL(`/app/login?err=${encodeURIComponent(error.message)}`, url.origin))
  } else if (token_hash && type) {
    const { error } = await sb.auth.verifyOtp({ token_hash, type })
    if (error) return NextResponse.redirect(new URL(`/app/login?err=${encodeURIComponent(error.message)}`, url.origin))
  }
  return NextResponse.redirect(new URL(next, url.origin))
}
