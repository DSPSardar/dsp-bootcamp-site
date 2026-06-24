'use client'
import { useEffect, useRef, useState } from 'react'

const LOG_LINES = [
  'planning steps…',
  'calling tool · search()',
  'writing to memory',
  'evaluating ✓',
  'task complete ✓',
]

const NODES = [
  { id: 'user',    x: 60,  y: 130, label: 'User'    },
  { id: 'planner', x: 200, y: 60,  label: 'Planner' },
  { id: 'tool',    x: 200, y: 130, label: 'Tool'    },
  { id: 'memory',  x: 200, y: 200, label: 'Memory'  },
]

const EDGES = [
  { from: 'user', to: 'planner', path: 'M 90 120 Q 140 80 170 75' },
  { from: 'user', to: 'tool',    path: 'M 90 130 H 170'            },
  { from: 'user', to: 'memory',  path: 'M 90 140 Q 140 180 170 190'},
]

export default function AgentConsole() {
  const [activeNode, setActiveNode] = useState(0)
  const [logIdx, setLogIdx] = useState(0)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return

    const nodeTimer = setInterval(() => {
      setActiveNode((n) => (n + 1) % NODES.length)
    }, 1400)

    const logTimer = setInterval(() => {
      setLogIdx((i) => (i + 1) % LOG_LINES.length)
    }, 2000)

    return () => {
      clearInterval(nodeTimer)
      clearInterval(logTimer)
    }
  }, [])

  return (
    <div className="console-card" style={{ maxWidth: 420, width: '100%' }}>
      {/* Title bar */}
      <div className="console-titlebar">
        <span className="console-dot" style={{ background: '#FF5F57' }} />
        <span className="console-dot" style={{ background: '#FEBC2E' }} />
        <span className="console-dot" style={{ background: '#28C840' }} />
        <span className="console-label">dsp_agent_pipeline.run</span>
      </div>

      {/* SVG graph */}
      <div className="console-body">
        <svg
          viewBox="0 0 280 260"
          style={{ width: '100%', overflow: 'visible' }}
          aria-label="Agent pipeline diagram"
          role="img"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="var(--muted)" />
            </marker>
          </defs>

          {/* Edges */}
          {EDGES.map((e) => (
            <path
              key={e.from + e.to}
              d={e.path}
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#arrow)"
              style={{
                animation: reduced.current
                  ? 'none'
                  : 'dash-flow 1.5s linear infinite',
              }}
            />
          ))}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const active = i === activeNode
            return (
              <g key={node.id}>
                <rect
                  x={node.x - 30}
                  y={node.y - 18}
                  width={60}
                  height={36}
                  rx={8}
                  fill={active ? 'rgba(255,195,77,0.15)' : 'var(--panel-2)'}
                  stroke={active ? 'var(--gold)' : 'var(--line)'}
                  strokeWidth={active ? 1.5 : 1}
                  style={{ transition: 'fill 0.3s, stroke 0.3s' }}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={active ? 'var(--gold)' : 'var(--muted)'}
                  fontSize={11}
                  fontFamily="var(--font-mono)"
                  style={{ transition: 'fill 0.3s' }}
                >
                  {node.label}
                </text>
              </g>
            )
          })}

          {/* Animated token on first edge */}
          {!reduced.current && (
            <circle r={5} fill="var(--gold)" style={{ animation: 'token-glow 1s ease-in-out infinite' }}>
              <animateMotion
                dur="2.8s"
                repeatCount="indefinite"
                path={EDGES[1].path}
              />
            </circle>
          )}
        </svg>

        {/* Log line */}
        <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--line)', paddingTop: '0.75rem' }}>
          <p className="console-log">
            <span className="console-log-prefix">› </span>
            {LOG_LINES[logIdx]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -14; }
        }
      `}</style>
    </div>
  )
}
