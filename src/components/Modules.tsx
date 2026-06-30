// src/components/Modules.tsx
import Reveal from './Reveal'

const MODULES = [
  {
    n: '01',
    title: 'Intro to AI Agents & Vibe Coding',
    video: '/course-videos/module-01-intro-to-ai-agents-and-vibe-coding.mp4',
  },
  {
    n: '02',
    title: 'Agent Tools & Interoperability',
    video: '/course-videos/module-02-agent-tools-and-interoperability.mp4',
  },
  {
    n: '03',
    title: 'Agent Skills & Memory',
    video: '/course-videos/module-03-agent-skills-and-memory.mp4',
  },
  {
    n: '04',
    title: 'Vibe Coding, Security & Evaluation',
    video: '/course-videos/module-04-vibe-coding-security-and-evaluation.mp4',
  },
  {
    n: '05',
    title: 'Production-Grade Agentic Fleets',
    video: '/course-videos/module-05-production-grade-agentic-fleets.mp4',
  },
  {
    n: '06',
    title: 'Deployment & Production Readiness',
    video: '/course-videos/module-06-deployment-and-production-readiness.mp4',
  },
]

export default function Modules() {
  return (
    <section id="modules" style={{ padding: '5rem 0' }}>
      <div className="section">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Live Zoom Modules</p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--text)',
              marginBottom: '3rem',
            }}
          >
            Six live sessions.
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {MODULES.map((m, i) => (
            <Reveal key={m.n} delay={i * 60}>
              <details
                className="module-row"
                open={i === 0}
                style={{
                  position: 'relative',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                  transition: 'border-color 0.2s, background 0.2s',
                  overflow: 'hidden',
                }}
              >
                <summary
                  className="module-summary"
                  style={{
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <span
                    className="ghost-num"
                    aria-hidden
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '5rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.04)',
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      lineHeight: 1,
                      userSelect: 'none',
                      transition: 'color 0.2s',
                      pointerEvents: 'none',
                    }}
                  >
                    {m.n}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--gold)',
                      minWidth: '2rem',
                    }}
                  >
                    {m.n}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text)',
                      minWidth: 0,
                    }}
                  >
                    {m.title}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span aria-hidden>▶</span>
                    Replay
                  </span>
                </summary>

                <div style={{ padding: '0 1.5rem 1.5rem' }}>
                  <video
                    controls
                    preload="none"
                    playsInline
                    className="module-video"
                  >
                    <source src={m.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginTop: '0.875rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      Module {m.n} replay
                    </p>
                    <a
                      href={m.video}
                      download
                      className="module-download"
                    >
                      Download video
                    </a>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .module-row[open] {
          border-color: rgba(255,195,77,0.28);
          background: rgba(255,195,77,0.03);
        }
        .module-summary::-webkit-details-marker {
          display: none;
        }
        .module-row:hover {
          border-color: rgba(255,195,77,0.3) !important;
          background: rgba(255,195,77,0.03) !important;
        }
        .module-row:hover .ghost-num {
          color: rgba(255,195,77,0.12) !important;
        }
        .module-row:hover .module-summary {
          cursor: pointer;
        }
        .module-video {
          width: 100%;
          aspect-ratio: 16 / 9;
          display: block;
          border-radius: 8px;
          border: 1px solid var(--line);
          background: #000;
        }
        .module-download {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          color: var(--text);
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .module-download:hover {
          border-color: rgba(255,195,77,0.3);
          background: rgba(255,195,77,0.05);
          color: #fff;
        }
        @media (max-width: 640px) {
          .module-summary {
            grid-template-columns: auto 1fr;
          }
          .module-summary span:last-child {
            grid-column: 1 / -1;
            justify-self: start;
          }
          .ghost-num {
            font-size: 4rem !important;
          }
        }
      `}</style>

      {/* Course Outline Download */}
      <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--panel)', borderRadius: 12, border: '1px solid var(--line)', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--mint)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            📄 Full Curriculum
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
            Download Course Outline
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
            Get the complete 5-day curriculum, learning objectives, and project requirements
          </p>
          <a
            href="/DSP_Bootcamp_Course_Outline.docx"
            download="DSP_Bootcamp_Course_Outline.docx"
            className="btn-primary"
            style={{ display: 'inline-flex', gap: '0.5rem' }}
          >
            ⬇️ Download Course Outline
          </a>
        </Reveal>
      </div>
    </section>
  )
}
