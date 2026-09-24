'use client'
// Mounted once in the root layout. Decides by pathname whether the SARDAR
// launcher belongs on this page, and loads it as a client-only chunk after
// hydration, so nothing about it is in the server HTML or the initial bundle.
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { isExcluded } from './config'

const Launcher = dynamic(() => import('./Launcher'), { ssr: false })
const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || ''

export default function LauncherMount() {
  const pathname = usePathname() ?? '/'
  if (!AGENT_ID || isExcluded(pathname)) return null
  return <Launcher pathname={pathname} />
}
