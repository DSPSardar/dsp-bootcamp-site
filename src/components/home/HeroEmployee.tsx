import { agency, mastery } from '@/config/site'

// Homepage hero visual: an AI Employee doing real work. This is an
// ILLUSTRATIVE conversation and is labelled as one — the messages are
// written, not captured. Every action Zara takes here is one she is
// already published as doing (agency.employees[zara].whatIDo: reply in
// seconds, answer from the price list, qualify, follow up, guide payment,
// mark won only once money is confirmed, escalate). No price or enrolment
// language: that lives on /mastery only. Server-rendered, CSS-animated.
export default function HeroEmployee() {
  const zara = agency.employees.find((e) => e.id === 'zara')!
  return (
    <div>
      <div className="emp-panel" role="figure" aria-label="Illustrative conversation: Zara, DSP's AI Sales Employee, handling a WhatsApp lead">
        <div className="ph">
          <span className="av" aria-hidden="true">Z</span>
          <span className="who">
            <b>{zara.name}</b>
            <small>{zara.role} · {zara.channel}</small>
          </span>
          <span className="status"><span className="dot" aria-hidden="true"></span> Working · 11:03 PM</span>
        </div>
        <div className="msgs">
          <p className="m in">
            Salaam, is the AI program still open? How does it work?
            <time>11:03 PM</time>
          </p>
          <p className="m out">
            Walaikum salaam! Yes — {mastery.shortName} is self-paced with lifetime access, and you build
            one real AI Employee. Are you learning for a job, your own business, or client work?
            <time>11:03 PM · replied in seconds</time>
          </p>
          <p className="m in">
            My own business. I run a salon in Rawalpindi.
            <time>11:05 PM</time>
          </p>
          <p className="m out">
            Good fit — in Module 7 you build a booking agent for your own WhatsApp. Want the details now,
            or a quick call with the team first?
            <time>11:05 PM</time>
          </p>
          <p className="sys">→ Lead qualified · CRM updated · Follow-up scheduled 10:00 tomorrow</p>
          <p className="m in">
            Send the details.
            <time>11:06 PM</time>
          </p>
          <p className="sys">→ Payment confirmed next morning · marked WON · handed to onboarding</p>
        </div>
        <div className="pf">
          <span className="tasks" aria-label="Tasks completed">
            <span>Qualified</span><span>CRM</span><span>Follow-up</span><span>Won on payment</span>
          </span>
          <span className="illus">Illustrative</span>
        </div>
      </div>
      <p className="hero-caption">
        Illustrative conversation. Zara&apos;s real job is DSP&apos;s own admissions line —{' '}
        <a href={`https://wa.me/${agency.zaraDemoWaNumber ?? ''}?text=${encodeURIComponent('Hi Zara!')}`} target="_blank" rel="noopener">
          message her on WhatsApp
        </a>{' '}
        and interview her yourself.
      </p>
    </div>
  )
}
