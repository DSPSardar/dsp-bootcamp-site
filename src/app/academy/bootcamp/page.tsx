// src/app/academy/bootcamp/page.tsx — the DSP Agentic Lab (7-day Vibe
// Coding Bootcamp), sunset 2026-08-30. The URL is frozen and stays indexed;
// the page is an evergreen explainer of what the Lab was and what it taught,
// with a single CTA pointing to /mastery. No enrolment CTAs, no batch dates,
// no Course JSON-LD — DSP no longer runs live batches and must not emit
// enrolment signals for them. Page-specific styles still live in
// bootcamp.css under the .page-bootcamp co-scope.
import type { Metadata } from 'next'
import '@/app/site.css'
import '@/app/bootcamp.css'
import SiteHeader from '@/components/site/SiteHeader'
import HomeFaq from '@/components/home/HomeFaq'
import {
  Hero,
  FactStrip,
  ShiftSection,
  PersonaSection,
  WeekSchedule,
  InstructorSection,
  ProjectsSection,
  CertificatesSection,
  PoliciesSection,
  HomeFooter,
} from '@/components/home/sections'

export const metadata: Metadata = {
  title: {
    absolute: 'The DSP Agentic Lab — Our Live 7-Day AI Agents Bootcamp | DSP Academy',
  },
  description:
    'The Agentic Lab was DSP’s live 7-day AI agents bootcamp: five Zoom classes, a deployed agent, and four certificates. DSP now teaches this material as the self-paced DSP AI Agent Mastery program.',
  alternates: { canonical: '/academy/bootcamp' },
  openGraph: {
    type: 'website',
    url: '/academy/bootcamp',
    title: 'The DSP Agentic Lab — Our Live 7-Day AI Agents Bootcamp',
    description:
      'What the Agentic Lab was and what it taught. DSP now teaches this material as the self-paced DSP AI Agent Mastery program.',
    images: [
      {
        url: '/og-card.png',
        width: 1200,
        height: 630,
        alt: 'The DSP Agentic Lab — our live 7-day AI agents bootcamp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The DSP Agentic Lab — Our Live 7-Day AI Agents Bootcamp',
    description:
      'What the Agentic Lab was and what it taught. Now a self-paced program: DSP AI Agent Mastery.',
    images: ['/og-card.png'],
  },
}

// FAQPage schema: only the questions that stay accurate after the sunset —
// nothing about fees, batches, start dates, or joining a cohort.
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Did students need coding experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The bootcamp used vibe coding: students described what they wanted in plain English and directed AI to build it. No Python, no syntax.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certificates did students receive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "During the bootcamp students completed three of Anthropic's official Claude courses — guided live by DSP — and earned each course's certificate of completion. They also received the DSP Bootcamp Certificate after presenting their final project. Four certificates in total.",
      },
    },
    {
      '@type': 'Question',
      name: 'What language were classes taught in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Classes were taught in a mix of English and Urdu, so both terminology and explanation landed clearly.',
      },
    },
  ],
}

export default function BootcampPage() {
  return (
    <div className="dsp-site page-bootcamp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader />

      <main id="main">
        <Hero />
        <FactStrip />
        <ShiftSection />
        <PersonaSection />
        <WeekSchedule />
        <InstructorSection />
        <ProjectsSection />
        <CertificatesSection />

        {/* ============ FAQ ============ */}
        <section id="faq" style={{ paddingTop: 0 }}>
          <div className="wrap" style={{ maxWidth: 760 }}>
            <div className="sec-head">
              <p className="eyebrow">FAQ</p>
              <h2>The questions everyone asks.</h2>
            </div>
            <HomeFaq />
          </div>
        </section>

        <PoliciesSection />
      </main>

      <HomeFooter />
    </div>
  )
}
