import { CheckIcon } from '@/components/home/icons'
import { entity, site } from '@/config/site'

// Homepage §11 — international positioning without invented presence.
// The regions are entity.areaServed ("where students and clients come
// from", owner's list) — never offices, partners or customer logos. The
// three facts are already published on /about and in the Organization
// schema (registered office, languages, founder's career).
const NAMES: Record<string, { name: string; note: string }> = {
  PK: { name: 'Pakistan', note: 'Registered office' },
  AE: { name: 'United Arab Emirates', note: 'Students & clients' },
  SA: { name: 'Saudi Arabia', note: 'Students & clients' },
  GB: { name: 'United Kingdom', note: 'Students & clients' },
  US: { name: 'United States', note: 'Students & clients' },
  CA: { name: 'Canada', note: 'Students & clients' },
  AU: { name: 'Australia', note: 'Students & clients' },
  MY: { name: 'Malaysia', note: 'Students & clients' },
}

export default function GlobalSection() {
  return (
    <section className="band-dark global">
      <div className="wrap">
        <div data-reveal="">
          <p className="eyebrow">Global</p>
          <h2>Built for a global business environment.</h2>
          <p style={{ marginTop: '1rem' }}>
            AI Employees work on WhatsApp and phone lines in any time zone, in English and Urdu.
            DSP&apos;s students and clients come from {entity.areaServed.length} countries; the company itself is
            registered in {site.city}, {site.country}.
          </p>
          <ul className="global-facts">
            <li><CheckIcon /> SECP-registered company, {site.city} — the only office DSP claims.</li>
            <li><CheckIcon /> Lectures in Urdu and English; Employees answer customers in either.</li>
            <li><CheckIcon /> Founded by a trainer who taught technology in London and the UAE before Pakistan.</li>
          </ul>
        </div>
        <ul className="regions" data-reveal="stagger" aria-label="Where DSP's students and clients are">
          {entity.areaServed.map((code) => (
            <li key={code}>
              <b>{NAMES[code]?.name ?? code}</b>
              <small>{NAMES[code]?.note ?? 'Students & clients'}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
