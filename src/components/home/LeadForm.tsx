'use client'

// Admissions form: builds a contextual WhatsApp message AND posts the lead
// to /api/lead before the redirect, so abandoned handoffs are still captured.
// Includes a honeypot field ("company") that silently drops bots.
export default function LeadForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const company = (f.elements.namedItem('company') as HTMLInputElement).value
    if (company) return // honeypot — silently drop bots

    const name = (f.elements.namedItem('name') as HTMLInputElement).value.trim()
    const phone = (f.elements.namedItem('phone') as HTMLInputElement).value.trim()
    const bg = (f.elements.namedItem('background') as HTMLSelectElement).value
    if (!name || !phone || !bg) {
      f.reportValidity()
      return
    }

    const intentValue = (document.getElementById('f-intent') as HTMLInputElement).value
    const intent =
      intentValue === 'syllabus'
        ? 'Please send me the full syllabus PDF.'
        : "I want to join Monday's batch."
    const msg = `Hi DSP, I'm ${name} (${bg}). ${intent} My number: ${phone}`

    // Store the lead server-side BEFORE the redirect (keepalive survives navigation).
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        name,
        phone,
        background: bg,
        intent: intentValue,
        source: window.location.pathname,
      }),
    }).catch(() => {})

    window.location.href = 'https://wa.me/923118122222?text=' + encodeURIComponent(msg)
  }

  return (
    <form id="lead-form" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="f-name">Full name</label>
        <input id="f-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div>
        <label htmlFor="f-phone">WhatsApp number</label>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="03XX XXXXXXX" required />
      </div>
      <div>
        <label htmlFor="f-bg">I am a…</label>
        <select id="f-bg" name="background" required defaultValue="">
          <option value="" disabled>Select your background</option>
          <option>Student</option>
          <option>Marketer</option>
          <option>Entrepreneur</option>
          <option>Sales professional</option>
          <option>Teacher</option>
          <option>Business owner</option>
          <option>Other</option>
        </select>
      </div>
      {/* honeypot: bots fill this, humans never see it */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" id="f-intent" defaultValue="seat" />
      <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center' }}>
        <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-4.2-7.6L21 3l-1.3 4.6A8.96 8.96 0 0 1 21 12z" />
          <path d="M8.5 9.5c.5 2.5 3.5 5.5 6 6l1.5-1.5 2 1-1 2c-4.5.5-9.5-4.5-10-9l2-1 1 2-1.5 1.5z" />
        </svg>
        Continue on WhatsApp
      </button>
      <p className="form-note">
        You&apos;ll be taken to WhatsApp to finish. By continuing you agree to our{' '}
        <a href="#policies">privacy policy</a>. Prefer email?{' '}
        <a href="mailto:info@digitalservicesprogram.com">info@digitalservicesprogram.com</a>
      </p>
    </form>
  )
}
