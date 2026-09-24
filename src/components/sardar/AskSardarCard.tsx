'use client'
// /mastery, under the hero: one line and a button that opens the site-wide
// SARDAR launcher (the same instance the pill opens). Renders nothing when
// the voice agent is not configured, so the button can never do nothing.
import { mastery } from '@/config/site'
import { OPEN_EVENT } from './config'

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || ''

export default function AskSardarCard() {
  if (!AGENT_ID) return null
  return (
    <div className="ask-sardar" role="group" aria-label="Ask SARDAR">
      <p><b>Not sure yet?</b> Ask SARDAR — he knows all {mastery.modules} modules.</p>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { source: 'mastery_card' } }))}
      >
        Ask SARDAR
      </button>
    </div>
  )
}
