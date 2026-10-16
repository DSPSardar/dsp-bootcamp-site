'use client'
import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client'

/** Supabase can return the session in the URL *fragment* (#access_token=…), which servers never see.
 *  This client page reads it, stores the session, and forwards to the dashboard. */
export default function AuthConfirm() {
  const [msg, setMsg] = useState('Signing you in…')
  useEffect(() => {
    const run = async () => {
      const sb = supabaseBrowser()
      const qs = new URLSearchParams(window.location.search)
      const next = qs.get('next') || '/app'
      // PKCE links arrive as ?code= (or ?token_hash=&type=) — only the server can exchange those.
      if (qs.has('code') || qs.has('token_hash')) {
        if (!qs.has('next')) qs.set('next', next)
        window.location.replace(`/auth/callback?${qs.toString()}`)
        return
      }
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
      const access_token = hash.get('access_token'), refresh_token = hash.get('refresh_token')
      const err = hash.get('error_description') || new URLSearchParams(window.location.search).get('error_description')
      if (err) { setMsg(`${err}. Please request a new sign-in link.`); setTimeout(() => (window.location.href = '/app/login'), 2500); return }
      if (access_token && refresh_token) {
        const { error } = await sb.auth.setSession({ access_token, refresh_token })
        if (error) { setMsg(error.message); return }
      }
      const { data } = await sb.auth.getSession()
      window.location.href = data.session ? next : '/app/login'
    }
    void run()
  }, [])
  return <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', fontFamily: 'system-ui', padding: 24 }}><p>{msg}</p></main>
}
