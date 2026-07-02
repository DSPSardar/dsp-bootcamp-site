'use client'
import { useState } from 'react'
import { WhatsAppIcon } from './icons'

export default function HomeHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <div className="wrap nav">
        <a className="brand" href="#top" aria-label="Digital Services Program — home">
          <span className="brand-mark" aria-hidden="true">D</span> Digital Services Program
        </a>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <span className="sr-only">Menu</span>
        </button>
        <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links">
          <li><a href="#week">Schedule</a></li>
          <li><a href="#instructor">Instructor</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#pricing">Fee</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a className="btn btn-primary btn-sm" href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20Monday%27s%20batch">
          <WhatsAppIcon />
          Join the Bootcamp
        </a>
      </div>
    </header>
  )
}
