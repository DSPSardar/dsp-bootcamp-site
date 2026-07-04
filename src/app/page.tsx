// src/app/page.tsx — AI Agents Bootcamp homepage (ported from the July 2026 rebuild)
import type { Metadata } from 'next'
import './home.css'
import HomeHeader from '@/components/home/HomeHeader'
import HomeFaq from '@/components/home/HomeFaq'
import AnnouncementBar from '@/components/home/AnnouncementBar'
import {
  Hero,
  FactStrip,
  ShiftSection,
  PersonaSection,
  WeekSchedule,
  CompareSection,
  InstructorSection,
  ProjectsSection,
  CertificatesSection,
  PricingSection,
  JoinSection,
  PoliciesSection,
  HomeFooter,
  StickyCta,
} from '@/components/home/sections'

export const metadata: Metadata = {
  title: {
    absolute: 'AI Agents Bootcamp — 7 Days, 5 Live Zoom Classes | DSP',
  },
  description:
    'Build and deploy your first AI agent in 7 days — no code. 5 live Zoom classes (9–10 PM PKT), 4 certificates, final project showcase. Everything included in one fee.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'AI Agents Bootcamp — 7 Days · 5 Live Classes | DSP',
    description:
      'Live on Zoom, 9–10 PM PKT. No coding. 4 certificates. Ship a working AI agent by Day 7. Everything included in one fee.',
    images: [
      {
        url: '/og-card.png',
        width: 1200,
        height: 630,
        alt: 'DSP AI Agents Bootcamp — 7 days, 5 live Zoom classes, all-inclusive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agents Bootcamp — 7 Days · 5 Live Classes | DSP',
    description:
      'Live on Zoom, 9–10 PM PKT. No coding. 4 certificates. Ship a working AI agent by Day 7.',
    images: ['/og-card.png'],
  },
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digital Services Program',
  alternateName: 'DSP',
  url: 'https://www.digitalservicesprogram.com',
  logo: 'https://www.digitalservicesprogram.com/logo.webp',
  email: 'info@digitalservicesprogram.com',
  telephone: '+92-311-8122222',
  address: { '@type': 'PostalAddress', addressLocality: 'Islamabad', addressCountry: 'PK' },
  sameAs: [
    'https://www.youtube.com/@DigitalServicesProgram',
    'https://www.tiktok.com/@digitalservicesprogram',
    'https://www.facebook.com/DigitalServicesProgram',
    'https://www.instagram.com/digitalservicesprogram',
    'https://www.linkedin.com/company/digitalservicesprogram',
  ],
}

const courseLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AI Agents Bootcamp',
  description:
    '7-day live AI agents bootcamp for beginners. 5 live Zoom classes (9–10 PM PKT), hands-on projects, 4 certificates, final project showcase. No coding required.',
  provider: {
    '@type': 'Organization',
    name: 'Digital Services Program',
    url: 'https://www.digitalservicesprogram.com',
  },
  offers: {
    '@type': 'Offer',
    price: '10000',
    priceCurrency: 'PKR',
    availability: 'https://schema.org/InStock',
    url: 'https://www.digitalservicesprogram.com/#pricing',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseSchedule: {
      '@type': 'Schedule',
      startTime: '21:00',
      endTime: '22:00',
      scheduleTimezone: 'Asia/Karachi',
      repeatFrequency: 'P1W',
      byDay: [
        'https://schema.org/Monday',
        'https://schema.org/Tuesday',
        'https://schema.org/Wednesday',
        'https://schema.org/Thursday',
        'https://schema.org/Friday',
      ],
    },
    startDate: '2026-07-06',
    instructor: { '@type': 'Person', name: 'Sardar Abdul Ghaffar Khan' },
  },
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does the bootcamp cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PKR 10,000, one-time. That covers all 5 live Zoom classes, the Day 7 showcase, session replays, the syllabus, and all four certificates. No hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'When are the live classes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Five live Zoom classes, Monday to Friday, 9:00–10:00 PM Pakistan time. Day 6 is a guided build day and Day 7 is the live project showcase. A fresh batch starts every Monday.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need coding experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The bootcamp uses vibe coding: you describe what you want in plain English and direct AI to build it. No Python, no syntax.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the refund policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Attend Day 1 live. If the bootcamp is not for you, message us on WhatsApp before Day 2 begins and we refund the full fee.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certificates will I receive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "During the bootcamp you complete three of Anthropic's official Claude courses — guided live by DSP — and earn each course's certificate of completion. You also receive the DSP Bootcamp Certificate after presenting your final project. Four certificates in total.",
      },
    },
    {
      '@type': 'Question',
      name: 'What language are classes taught in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Classes are taught in a mix of English and Urdu, so both terminology and explanation land clearly.',
      },
    },
    {
      '@type': 'Question',
      name: 'I work / study during the day. Will I manage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — that’s why classes run 9–10 PM, just one hour a night. Homework takes 20–30 minutes. Every session is recorded, so if you miss a night, you catch up before the next class.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I need to join?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A laptop and an internet connection. That’s it. No software to install, no coding background, no technical setup — we start from zero together on Day 1.',
      },
    },
  ],
}

export default function Page() {
  return (
    <div className="dsp-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <a className="skip" href="#main">Skip to content</a>
      <AnnouncementBar />
      <HomeHeader />

      <main id="main">
        <Hero />
        <FactStrip />
        <ShiftSection />
        <PersonaSection />
        <WeekSchedule />
        <CompareSection />
        <InstructorSection />
        <ProjectsSection />
        <CertificatesSection />
        <PricingSection />

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

        <JoinSection />
        <PoliciesSection />
      </main>

      <HomeFooter />
      <StickyCta />
    </div>
  )
}
