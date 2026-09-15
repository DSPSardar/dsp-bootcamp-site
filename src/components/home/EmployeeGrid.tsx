import Link from 'next/link'
import { agency } from '@/config/site'

// Homepage §03 — the AI Employees as digital staff: ROLE · TASKS · TOOLS ·
// OUTCOME. Everything comes from agency.employees (src/config/site.ts),
// where every line rephrases copy already published on /ai-employees and
// /pricing. Prices are the published tier prices; Emma is quoted per
// restaurant (gated), so her card says so instead of inventing one.
export default function EmployeeGrid() {
  return (
    <div className="emp-grid" data-reveal="stagger">
      {agency.employees.map((emp) => {
        const tier = emp.tierId ? agency.pricing.tiers.find((t) => t.id === emp.tierId) : undefined
        return (
          <article className="card emp-v2 hover" key={emp.id} aria-labelledby={`emp-${emp.id}`}>
            <div className="top">
              <span className="emp-avatar" aria-hidden="true">{emp.name[0]}</span>
              <div>
                <h3 id={`emp-${emp.id}`}>{emp.name}</h3>
                <span className="role">{emp.role}</span>
              </div>
              <span className="status"><span className="dot" aria-hidden="true"></span> Live in 7 days</span>
            </div>
            <dl>
              <div>
                <dt>Tasks</dt>
                <dd>
                  <ul>
                    {emp.whatIDo.slice(0, 3).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>
                  <div className="chips">
                    {emp.tools.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt>Outcome</dt>
                <dd><p className="outcome">{emp.outcome}</p></dd>
              </div>
            </dl>
            <div className="foot">
              <span className="price">
                {tier ? (
                  <>
                    {emp.tierId === 'team' ? 'In the ' : ''}<b>{tier.name}</b> · from ${tier.monthlyUsd}/mo
                  </>
                ) : (
                  <>Quoted per restaurant</>
                )}
              </span>
              <Link className="arrow-link" href={`/ai-employees/${emp.id}`}>Meet {emp.name} →</Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}
