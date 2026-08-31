import { NextResponse } from 'next/server'
import { requireStudent } from '@/lib/mastery/auth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { moduleFor } from '@/lib/mastery/course'

/** Signed, short-lived download of a module's slide ZIP. Enrolled students only. */
export async function GET(req: Request) {
  await requireStudent()
  const id = new URL(req.url).searchParams.get('m') || ''
  if (!/^M\d{2}$/.test(id) || !moduleFor(id)) return NextResponse.json({ error: 'Unknown module' }, { status: 404 })

  const { data, error } = await supabaseAdmin()
    .storage.from('mastery-slides')
    .createSignedUrl(`${id}-slides.zip`, 300, { download: `DSP-Mastery-${id}-slides.zip` })

  if (error || !data?.signedUrl) return NextResponse.json({ error: 'Slides for this module are not up yet.' }, { status: 404 })
  return NextResponse.redirect(data.signedUrl)
}
