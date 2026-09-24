'use client'
// 2D SARDAR: the placeholder for step 2 and the permanent fallback for
// devices that cannot run the R3F scene (low memory, WebGL failure, reduced
// motion). Everything animates in CSS (sardar.css): breathing, blinking, a
// mouth that opens while `speaking`, and a head/pupil offset driven by the
// --look-x / --look-y variables the stage sets from the cursor.

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  d: `${7 + (i % 5) * 1.6}s`,
  delay: `${-(i * 1.3) % 9}s`,
}))

export default function Avatar2D({ speaking }: { speaking: boolean }) {
  return (
    <>
      <div className="particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <i key={i} style={{ left: p.left, ['--d' as string]: p.d, ['--delay' as string]: p.delay }} />
        ))}
      </div>
      <div className="floor" aria-hidden="true" />
      <div className={`avatar2d${speaking ? ' speaking' : ''}`} role="img" aria-label="SARDAR, an illustrated AI voice assistant">
        <div className="head">
          <svg viewBox="0 0 200 200">
            <circle className="ring" cx="100" cy="100" r="96" />
            <circle className="ring b" cx="100" cy="100" r="84" />
            {/* head */}
            <path d="M100 26c-34 0-56 26-56 62 0 30 14 52 34 62v18h44v-18c20-10 34-32 34-62 0-36-22-62-56-62z"
              fill="rgba(11,22,48,.9)" stroke="#3FE0F5" strokeOpacity=".9" strokeWidth="1.6" />
            {/* neck / shoulders */}
            <path d="M40 190c10-16 30-24 60-24s50 8 60 24" fill="none" stroke="#3FE0F5" strokeOpacity=".5" strokeWidth="1.6" />
            {/* brow line */}
            <path d="M66 82q34-16 68 0" fill="none" stroke="#3FE0F5" strokeOpacity=".5" strokeWidth="1.2" />
            {/* eyes */}
            <g className="eye l"><ellipse cx="78" cy="98" rx="11" ry="7" fill="#0B1630" stroke="#3FE0F5" strokeWidth="1.4" /><circle className="pupil" cx="78" cy="98" r="3.4" fill="#3FE0F5" /></g>
            <g className="eye r"><ellipse cx="122" cy="98" rx="11" ry="7" fill="#0B1630" stroke="#3FE0F5" strokeWidth="1.4" /><circle className="pupil" cx="122" cy="98" r="3.4" fill="#3FE0F5" /></g>
            {/* nose */}
            <path d="M100 104v14l-5 4" fill="none" stroke="#3FE0F5" strokeOpacity=".5" strokeWidth="1.2" />
            {/* mouth: scaled on Y while speaking */}
            <g className="mouth"><rect x="84" y="130" width="32" height="12" rx="6" fill="#3FE0F5" fillOpacity=".85" /></g>
          </svg>
        </div>
      </div>
    </>
  )
}
