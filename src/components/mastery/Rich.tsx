import React from 'react'

/** Tiny markdown renderer — fenced code, inline code, bold, bullets, paragraphs.
 *  Built by hand instead of pulling a markdown dependency into the bundle, and it
 *  never uses dangerouslySetInnerHTML, so a model reply can't inject markup. */
export default function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = []
  const blocks = text.split(/```/)

  blocks.forEach((block, i) => {
    if (i % 2 === 1) {
      const nl = block.indexOf('\n')
      const code = nl >= 0 ? block.slice(nl + 1) : block
      out.push(<pre key={`c${i}`} className="ust-code"><code>{code.replace(/\n$/, '')}</code></pre>)
      return
    }
    for (const para of block.split(/\n{2,}/)) {
      const lines = para.split('\n').filter((l) => l.trim())
      if (lines.length === 0) continue
      const bullets = lines.every((l) => /^\s*([-*•]|\d+[.)])\s+/.test(l))
      if (bullets) {
        out.push(<ul key={`u${i}-${out.length}`} className="ust-ul">
          {lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*([-*•]|\d+[.)])\s+/, ''))}</li>)}
        </ul>)
      } else {
        const heading = lines.length === 1 && /^#{1,4}\s/.test(lines[0])
        out.push(heading
          ? <p key={`h${i}-${out.length}`} className="ust-h">{inline(lines[0].replace(/^#{1,4}\s/, ''))}</p>
          : <p key={`p${i}-${out.length}`}>{lines.map((l, j) => <React.Fragment key={j}>{j > 0 && <br />}{inline(l)}</React.Fragment>)}</p>)
      }
    }
  })
  return <>{out}</>
}

/** `code` and **bold** inside a line. */
function inline(s: string): React.ReactNode[] {
  return s.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean).map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i} className="ust-inline">{p.slice(1, -1)}</code>
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    return <React.Fragment key={i}>{p}</React.Fragment>
  })
}
