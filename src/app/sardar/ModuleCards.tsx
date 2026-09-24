import { mastery } from '@/config/site'
import { DEMO_CHIPS, DEMO_MODULES } from './demo'

// "What you just saw, module by module": one card per Mastery module the
// demo touched, each pointing at the module's row on /mastery's curriculum.
export default function ModuleCards() {
  const chipLabel = (id: string) => DEMO_CHIPS.find((c) => c.id === id)?.label ?? id
  return (
    <section id="modules">
      <div className="wrap">
        <div className="eyebrow">What you just saw, module by module</div>
        <h2>Every answer maps to a lesson.</h2>
        <p className="lead" style={{ marginBottom: 28 }}>
          SARDAR is built from the same {mastery.modules} modules every {mastery.shortName} student works through. Tap a chip above, then find its module here.
        </p>
        <div className="cards">
          {DEMO_MODULES.map((m) => (
            <article className="card" key={m.code}>
              <div className="k">{m.code} · {m.title}</div>
              <span className="chipref">“{chipLabel(m.chip)}”</span>
              <p>{m.saw}</p>
              <a href={`${mastery.url}/curriculum#${m.code.toLowerCase()}`}>Learn this →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
