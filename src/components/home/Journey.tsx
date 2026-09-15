import Link from 'next/link'
import { agency, mastery } from '@/config/site'

// Homepage §10 — the DSP ecosystem in four steps. Each step links to the
// page that already exists for it; nothing here is a new offer.
const STEPS = [
  { step: 'Learn', name: mastery.shortName, line: `${mastery.modules} modules, one real AI Employee built from an empty folder to a live URL. ${mastery.priceDisplay}, lifetime access.`, href: '/mastery', go: 'Explore the program' },
  { step: 'Build', name: `AI Employees · ${agency.hubName}`, line: 'Build your own on the method DSP uses — or have DSP build one for you, live in 7 days on Agent Hub.', href: '/ai-employees', go: 'Meet the Employees' },
  { step: 'Deploy', name: 'Business automation', line: 'Sales, support, bookings and phone orders handled on the channels your customers already use.', href: '/pricing', go: 'See published pricing' },
  { step: 'Scale', name: 'AI Workforce', line: 'Several Employees on one number, handing work to each other — the AI Sales Team package.', href: '/pricing#team', go: 'The team package' },
]

export default function Journey() {
  return (
    <ol className="journey" data-reveal="stagger">
      {STEPS.map((s) => (
        <li key={s.step}>
          <Link className="card hover" href={s.href}>
            <span className="step">{s.name}</span>
            <h3>{s.step}</h3>
            <p>{s.line}</p>
            <span className="go">{s.go} →</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
