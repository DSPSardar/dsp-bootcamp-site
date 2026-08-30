import type { Metadata } from 'next'
import { mastery } from '@/config/site'
import EnrolForm from './EnrolForm'
import '../mastery.css'

// Fonts cascade from the root layout's next/font trio — no local loads.
export const metadata: Metadata = {
  title: 'Enrol — DSP AI Agent Mastery',
  description: 'Pay in PKR by bank transfer, JazzCash or Easypaisa and get your dashboard access.',
  alternates: { canonical: '/mastery/enrol' },
  // Transactional page showing payment/bank details — keep out of search.
  robots: { index: false, follow: false },
}

export default function EnrolPage() {
  const p = mastery.pkr
  return (
    <div className="page-mastery">
      <section style={{ paddingTop: '56px' }}><div className="wrap" style={{ maxWidth: 900 }}>
        <a className="muted" href="/mastery">← Back to the program</a>
        <div className="eyebrow" style={{ marginTop: 18 }}>Enrol · pay in PKR</div>
        <h1 style={{ fontSize: 'clamp(30px,4vw,46px)' }}>Two steps and you&apos;re in.</h1>
        <p className="lead">Lifetime access, one year of support in the DSP group, and a certificate at the end. {p.price} one-time.</p>

        <div className="panel" style={{ marginTop: 32 }}>
          <h2>Step 1 — Send {p.price}</h2>
          <div className="dl" style={{ marginTop: 12 }}>
            <div style={{ padding: '16px 18px', border: '1px solid var(--line)', borderRadius: 10, lineHeight: 1.9 }}>
              <b>Bank transfer</b> — {p.bank.name}, {p.bank.branch}<br />
              <span className="muted">Account title</span> <span style={{ fontFamily: 'var(--mono)' }}>{p.bank.title}</span><br />
              <span className="muted">Account number</span> <span style={{ fontFamily: 'var(--mono)' }}>{p.bank.account}</span><br />
              <span className="muted">IBAN</span> <span style={{ fontFamily: 'var(--mono)' }}>{p.bank.iban}</span>
            </div>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>JazzCash / Easypaisa work with the IBAN above via &quot;bank transfer&quot; in the app.</p>
          <p className="muted" style={{ marginTop: 14 }}>Outside Pakistan and want to pay by card? Email info@digitalservicesprogram.com — card checkout is coming shortly.</p>
        </div>

        <div className="panel">
          <h2>Step 2 — Tell us where to send your access</h2>
          <p className="muted">We verify the payment, then email you a sign-in link. No password to remember.</p>
          <EnrolForm />
        </div>

        <div className="panel">
          <h2>What happens next</h2>
          <p className="md">You get an email with a sign-in link. Click it and you&apos;re in the dashboard — 15 modules, the Resource Vault, and your progress saved as you go. The link works on any device; if it expires, request a new one from the sign-in page.</p>
        </div>
      </div></section>
    </div>
  )
}
