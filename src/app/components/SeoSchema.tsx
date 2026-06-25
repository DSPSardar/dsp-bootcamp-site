export default function SeoSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Course',
        name: 'AI Agents Bootcamp — 15-Day Live Program',
        description:
          'Build real-world AI agents in 15 days. Live Zoom training, beginner friendly, 4 certificates. No coding required.',
        provider: {
          '@type': 'Organization',
          name: 'Digital Services Program',
          sameAs: 'https://www.digitalservicesprogram.com',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'P15D',
          instructor: {
            '@type': 'Person',
            name: 'Sardar Ghaffar',
          },
        },
      },
      {
        '@type': 'Organization',
        name: 'Digital Services Program',
        url: 'https://www.digitalservicesprogram.com',
        logo: 'https://www.digitalservicesprogram.com/assets/logo.webp',
        description:
          'SECP-registered program helping students, professionals, and businesses learn practical AI skills.',
        sameAs: ['https://wa.me/923118122222'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do I need coding experience?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The course is beginner friendly and explains concepts in simple language.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this course beginner friendly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. It is designed for beginners, non-programmers, and practical learners.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will classes be live?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The bootcamp includes 6 live Zoom modules with guided learning.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will I build a project?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every student completes and presents a final AI agent workflow project.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will I get a certificate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. DSP guides students to complete 3 Claude/Anthropic USA certificates and awards 1 official DSP Bootcamp Completion Certificate.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can marketers and business owners join?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The course suits marketers, sales professionals, entrepreneurs, and business teams.',
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
