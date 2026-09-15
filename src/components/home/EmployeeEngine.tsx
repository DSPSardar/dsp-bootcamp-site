// Homepage §07 — how an AI model becomes an AI Employee. The nine parts
// are the anatomy the site already teaches (the eight on the previous
// homepage plus the Loop from the /mastery formula). Descriptive only, no
// claims; the cycling highlight is CSS, paused under reduced motion.
const PARTS = [
  { part: 'Role', line: 'One job, written down: who it is, what it never does, how it speaks.' },
  { part: 'Knowledge', line: 'Your prices, policies, menu and FAQs — so answers are yours.' },
  { part: 'Memory', line: 'Remembers the customer and the conversation across visits.' },
  { part: 'Tools', line: 'The systems it can actually operate: calendar, sheets, email.' },
  { part: 'APIs', line: 'How it connects to the tools your business already runs on.' },
  { part: 'Workflow', line: 'The steps it follows for each job, every time.' },
  { part: 'Guardrails', line: 'The rules it cannot break, and when it must hand to a human.' },
  { part: 'Loop', line: 'Plans, acts, checks the result, and keeps going until done.' },
  { part: 'Channel', line: 'Where customers already are: WhatsApp, phone, web, email.' },
]

export default function EmployeeEngine() {
  return (
    <div className="engine-board" data-reveal="" role="figure" aria-label="The DSP AI Employee engine: a model plus nine parts equals an AI Employee">
      <div className="lab"><span>The DSP AI Employee engine</span><i>model → employee</i></div>
      <div className="engine-io">
        <div className="part io">
          <b>Model</b>
          <small>The brain: reasons, reads, writes. Claude, in DSP&apos;s builds.</small>
        </div>
        <div className="engine-op" aria-hidden="true">+</div>
        <ol className="engine-parts">
          {PARTS.map((p, i) => (
            <li className="part" key={p.part}>
              <span className="k" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <b>{p.part}</b>
              <small>{p.line}</small>
            </li>
          ))}
        </ol>
        <div className="engine-op" aria-hidden="true">=</div>
        <div className="part io out">
          <b>AI Employee</b>
          <small>Doing one real job in your business, around the clock, and reporting its work.</small>
        </div>
      </div>
    </div>
  )
}
