'use client'

import Link from 'next/link'

export default function StudentProjects() {
  return (
    <section className="py-20 px-4 md:px-6" style={{ background: '#0f1419' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#ffffff' }}>
            What Students Ship on Day 15
          </h2>
          <p className="text-lg" style={{ color: '#d1d5db' }}>
            Real projects. Real deployment. No coding experience required. Here's what you'll build in the DSP bootcamp.
          </p>
        </div>

        {/* Featured Project */}
        <div style={{ 
          background: '#1a2332', 
          border: '1px solid #374151',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '64px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            {/* Left */}
            <div style={{ 
              padding: '48px',
              borderRight: '1px solid #374151'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>✈️</div>
                <h3 style={{ 
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '8px'
                }}>
                  DSP Travel Agent
                </h3>
                <p style={{ 
                  fontSize: '13px',
                  color: '#9ca3af',
                  margin: '0'
                }}>
                  Built by Sardar Ghaffar • Day 5 Project
                </p>
              </div>

              <p style={{
                fontSize: '16px',
                color: '#d1d5db',
                lineHeight: '1.6',
                margin: '16px 0 24px 0'
              }}>
                A production-ready AI travel planner powered by 4 specialized agents working together to plan perfect trips.
              </p>

              {/* Features */}
              <div style={{ marginBottom: '24px' }}>
                {[
                  { title: '✓ 4-Agent Orchestration', desc: 'Orchestrator, Researcher, Planner, Writer' },
                  { title: '✓ Live Deployment', desc: 'Vercel + Claude API + Next.js' },
                  { title: '✓ Zero Python Required', desc: 'Built entirely through Vibe Coding' },
                  { title: '✓ Production Ready', desc: 'Public URL + Custom domain + CI/CD' }
                ].map((feature, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <p style={{
                      fontWeight: '600',
                      color: '#ffffff',
                      fontSize: '14px',
                      marginBottom: '4px',
                      margin: '0 0 4px 0'
                    }}>
                      {feature.title}
                    </p>
                    <p style={{
                      fontSize: '13px',
                      color: '#9ca3af',
                      margin: '0'
                    }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Vibe Coding Explainer */}
              <div style={{
                background: '#111827',
                border: '1px solid #374151',
                borderRadius: '6px',
                padding: '16px',
                margin: '24px 0',
                fontSize: '14px',
                color: '#d1d5db',
                lineHeight: '1.6'
              }}>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>What is Vibe Coding?</span> You describe what you want in plain English. AI writes the code. This entire Travel Agent was built through prompts—zero Python written by hand.
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Link
                  href="https://travel.digitalservicesprogram.com"
                  target="_blank"
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: '#FFC107',
                    color: '#0f1419',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderRadius: '6px',
                    border: 'none',
                    textAlign: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#FFB300'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FFC107'}
                >
                  Try Live Demo →
                </Link>
                <Link
                  href="https://github.com/DSPSardar/travel-agent"
                  target="_blank"
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: '#374151',
                    color: '#ffffff',
                    fontWeight: '600',
                    fontSize: '14px',
                    borderRadius: '6px',
                    border: '1px solid #4b5563',
                    textAlign: 'center',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4b5563'
                    e.currentTarget.style.borderColor = '#6b7280'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#374151'
                    e.currentTarget.style.borderColor = '#4b5563'
                  }}
                >
                  View Code
                </Link>
              </div>
            </div>

            {/* Right - Stats */}
            <div style={{ 
              padding: '48px',
              background: '#111827'
            }}>
              <h4 style={{
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: '24px',
                fontSize: '14px'
              }}>
                Project Highlights
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Built in', value: '15', desc: 'Days' },
                  { label: 'Programming', value: 'Zero', desc: 'Vibe Coding' },
                  { label: 'Agents', value: '4', desc: 'Working together' },
                  { label: 'Status', value: '🟢 Live', desc: 'On Vercel' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    padding: '16px',
                    background: '#1a2332'
                  }}>
                    <p style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      margin: '0 0 8px 0'
                    }}>
                      {stat.label}
                    </p>
                    <p style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#FFC107',
                      marginBottom: '4px',
                      margin: '0 0 4px 0'
                    }}>
                      {stat.value}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#9ca3af',
                      margin: '0'
                    }}>
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid #374151',
                paddingTop: '24px'
              }}>
                <p style={{
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '8px',
                  margin: '0 0 8px 0'
                }}>
                  This could be your Day 15 project.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  margin: '0'
                }}>
                  No Python. No traditional coding. Just clear thinking and Vibe Coding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Student Projects */}
        <div style={{ marginBottom: '64px' }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '32px'
          }}>
            Other Student Projects
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {[
              {
                icon: '📊',
                title: 'Finance Account Agent',
                description: 'Automated financial tracking with multi-agent reconciliation',
                student: 'Ahmed K.'
              },
              {
                icon: '🏠',
                title: 'Real Estate Sales Agent',
                description: 'Property recommendations with market analysis and lead qualification',
                student: 'Fatima S.'
              },
              {
                icon: '📈',
                title: 'SEO Audit Agent',
                description: '7-agent orchestration for comprehensive website SEO analysis',
                student: 'Hassan M.'
              }
            ].map((project, i) => (
              <div 
                key={i}
                style={{
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  padding: '24px',
                  background: '#1a2332',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#4b5563'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#374151'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                  {project.icon}
                </div>
                <h4 style={{
                  fontWeight: '700',
                  color: '#ffffff',
                  fontSize: '16px',
                  marginBottom: '12px',
                  margin: '0 0 12px 0'
                }}>
                  {project.title}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  lineHeight: '1.5',
                  marginBottom: '16px',
                  margin: '0 0 16px 0'
                }}>
                  {project.description}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '600',
                  margin: '0'
                }}>
                  Built by: {project.student}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{
          border: '1px solid #374151',
          borderRadius: '8px',
          padding: '48px',
          background: '#1a2332',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Ready to Build Your Own?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#d1d5db',
            marginBottom: '32px',
            lineHeight: '1.6',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            You'll ship a real, production-ready AI agent by Day 15. Just like Sardar did. No coding experience required.
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '24px'
          }}>
            <Link
              href="https://wa.me/923118122222?text=Hi%20DSP%2C%20I%20want%20to%20join%20the%20bootcamp"
              style={{
                padding: '12px 28px',
                background: '#FFC107',
                color: '#0f1419',
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '6px',
                border: 'none',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#FFB300'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#FFC107'}
            >
              Join Next Cohort →
            </Link>
            <Link
              href="#faq"
              style={{
                padding: '12px 28px',
                background: '#374151',
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '6px',
                border: '1px solid #4b5563',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4b5563'
                e.currentTarget.style.borderColor = '#6b7280'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#374151'
                e.currentTarget.style.borderColor = '#4b5563'
              }}
            >
              View FAQ
            </Link>
          </div>
          <p style={{
            fontSize: '14px',
            color: '#9ca3af'
          }}>
            Or call / WhatsApp us:{' '}
            <Link 
              href="tel:+923118122222"
              style={{
                color: '#FFC107',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              +92 311 8122222
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
