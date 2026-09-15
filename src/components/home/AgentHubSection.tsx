import Image from 'next/image'
import Link from 'next/link'
import TrackedLink from '@/components/site/TrackedLink'
import { agency } from '@/config/site'

// Homepage §04 — DSP Agent Hub, the product. Facts from agency.hub* in
// src/config/site.ts (the live app's own sidebar and product name, from the
// owner's screenshots). The visual is a DIAGRAM of the workflow the
// platform runs — labelled as such — never a mock dashboard with invented
// data. When a real UI capture exists (agency.hubScreenshot), it replaces
// the diagram automatically.
const FLOW = [
  { step: 'Lead', line: 'A message lands on your WhatsApp — at 11 PM, on a Sunday, mid-rush.', who: 'Customer' },
  { step: 'AI qualification', line: 'Zara replies in seconds, answers from your price list, and finds out what they need.', who: 'AI', ai: true },
  { step: 'Conversation', line: 'A real back-and-forth, in English or Urdu, not a scripted menu.', who: 'AI', ai: true },
  { step: 'CRM', line: 'Every lead, message and outcome logged in your Agent Hub pipeline.', who: 'Platform' },
  { step: 'Follow-up', line: 'The second and third message that a human team forgets — sent on schedule.', who: 'AI', ai: true },
  { step: 'Conversion', line: 'Payment guided and confirmed before a sale is ever marked won.', who: 'AI', ai: true },
  { step: 'Human handoff', line: 'Anything sensitive or unusual goes to your team with the full conversation attached.', who: 'Your team' },
]

export default function AgentHubSection() {
  return (
    <section className="band-ink hub" id="agent-hub">
      <div className="wrap">
        <div data-reveal="">
          <p className="eyebrow">{agency.hubName}</p>
          <h2>Your first AI Sales Employee.</h2>
          <p className="product"><b>{agency.hubProduct}</b> · {agency.hubTagline}</p>
          <p style={{ marginTop: '1rem' }}>
            {agency.hubName} is the platform every DSP AI Employee runs on — and the system DSP runs its
            own admissions on. Leads, conversations, follow-ups and sales in one pipeline, with AI
            insights and a weekly digest. Zara works inside it; so does your data, in your own isolated
            tenant.
          </p>
          <div className="modules" aria-label="Agent Hub modules">
            {agency.hubModules.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="hero-ctas">
            <TrackedLink
              className="btn btn-gold"
              href={agency.hubUrl}
              target="_blank"
              rel="noopener"
              event="agent_hub_click"
              params={{ cta: 'home_hub' }}
            >
              Explore {agency.hubName} ↗
            </TrackedLink>
            <Link className="btn btn-ghost-light" href="/ai-employees">Hire an AI Employee</Link>
          </div>
          <p className="note">
            Modules listed are the live product&apos;s own. Everything a DSP Employee reports — every
            conversation and every outcome — lands here.
          </p>
        </div>

        {agency.hubScreenshot ? (
          <figure className="hub-shot" data-reveal="">
            <Image
              src={agency.hubScreenshot.src}
              alt={agency.hubScreenshot.alt}
              width={agency.hubScreenshot.width}
              height={agency.hubScreenshot.height}
              sizes="(max-width: 960px) 100vw, 50vw"
            />
            <figcaption>{agency.hubName} — real product screen</figcaption>
          </figure>
        ) : (
          <div className="hub-flow" data-reveal="" role="figure" aria-label="How a lead moves through DSP Agent Hub — illustrative workflow">
            <div className="lab"><span>Lead → sale, inside Agent Hub</span><span className="illus">Illustrative workflow</span></div>
            <ol>
              {FLOW.map((f) => (
                <li key={f.step}>
                  <span className="n" aria-hidden="true"></span>
                  <div>
                    <b>{f.step}</b>
                    <span>{f.line}</span>
                  </div>
                  <span className={`who${f.ai ? ' ai' : ''}`}>{f.who}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  )
}
