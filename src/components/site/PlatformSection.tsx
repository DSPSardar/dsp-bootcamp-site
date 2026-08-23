import { agency } from '@/config/site'

// DSPAgentHub platform section — shared by the homepage (section 8) and every
// AI Employee profile page ("My dashboard"), so the platform claims are
// written once. Awaiting the real dashboard screenshot (publish checklist:
// real photos only); the frame reads as an intentional panel until it lands.
export default function PlatformSection({
  heading = 'Your AI Employee comes with its own office.',
  intro,
}: {
  heading?: string
  intro?: React.ReactNode
}) {
  return (
    <section className="band-dark">
      <div className="wrap split">
        <div>
          <p className="eyebrow">{agency.platformName}</p>
          <h2>{heading}</h2>
          <p style={{ marginTop: '.9rem' }}>
            {intro ?? (
              <>
                Every AI Employee runs on <strong>{agency.platformName}</strong>, our own platform —
                not rented no-code tools that bill you forever. Your dashboard shows every
                conversation, every qualified lead, every booking, and every sale in real time —
                with AI insights, sentiment analysis, and a weekly digest delivered to you.
              </>
            )}
          </p>
          <p style={{ marginTop: '1rem', fontWeight: 600, color: '#fff' }}>
            Owned platform. Your data. No third-party subscriptions.
          </p>
        </div>
        <div className="shot-placeholder" role="img" aria-label={`${agency.platformName} dashboard — live pipeline view`}>
          <span>
            <strong>{agency.platformName}</strong>
            <em>Live pipeline · conversations · outcomes</em>
            Your dashboard, updating in real time
          </span>
        </div>
      </div>
    </section>
  )
}
