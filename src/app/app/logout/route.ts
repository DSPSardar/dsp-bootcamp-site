import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
export async function GET(req: Request) {
  const sb = await supabaseServer(); await sb.auth.signOut()
  return NextResponse.redirect(new URL('/app/login', new URL(req.url).origin))
}
