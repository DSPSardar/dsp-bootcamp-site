import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { moduleFor } from '@/lib/mastery/course'

const folderFor: Record<string, string> = {
  M01: 'M01-AI-Foundations', M02: 'M02-Prompting-Context-Engineering', M03: 'M03-Claude-ChatGPT-Gemini', M04: 'M04-Vibe-Coding', M05: 'M05-Websites',
  M06: 'M06-Git-GitHub', M07: 'M07-AI-Agents', M08: 'M08-APIs', M09: 'M09-RAG-Memory', M10: 'M10-MCP', M11: 'M11-Testing-Observability',
  M12: 'M12-Security', M13: 'M13-Deployment', M14: 'M14-Multi-Agent-Business-Automation', M15: 'M15-Selling-AI-Solutions',
}

/** Minimal markdown → HTML for vault docs (headings, lists, code, tables, bold). Good enough for templates; PDFs come later. */
function md(src: string) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  let out = esc(src)
  out = out.replace(/```[a-z]*\n([\s\S]*?)```/g, (_, c) => `<pre><code>${c}</code></pre>`)
  out = out.replace(/^### (.*)$/gm, '<h3>$1</h3>').replace(/^## (.*)$/gm, '<h2>$1</h2>').replace(/^# (.*)$/gm, '<h1>$1</h1>')
  out = out.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>')
  out = out.replace(/^(\|.*\|)\n\|[-| :]+\|\n((?:\|.*\|\n?)*)/gm, (_, head, body) => {
    const row = (r: string, t: string) => `<tr>${r.split('|').slice(1, -1).map((c) => `<${t}>${c.trim()}</${t}>`).join('')}</tr>`
    return `<table>${row(head, 'th')}${body.trim().split('\n').map((r: string) => row(r, 'td')).join('')}</table>`
  })
  out = out.replace(/^- \[ \] (.*)$/gm, '<div>☐ $1</div>').replace(/^- \[x\] (.*)$/gim, '<div>☑ $1</div>')
  out = out.replace(/(^- .*(\n|$))+/gm, (b) => `<ul>${b.trim().split('\n').map((l) => `<li>${l.replace(/^- /, '')}</li>`).join('')}</ul>`)
  out = out.replace(/(^\d+\. .*(\n|$))+/gm, (b) => `<ol>${b.trim().split('\n').map((l) => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('')}</ol>`)
  return out.split(/\n{2,}/).map((p) => (/^<(h\d|ul|ol|pre|table|div)/.test(p.trim()) ? p : `<p>${p.replace(/\n/g, '<br/>')}</p>`)).join('\n')
}

export default async function DocPage({ params, searchParams }: { params: Promise<{ moduleId: string }>; searchParams: Promise<{ f?: string }> }) {
  const { moduleId } = await params; const { f } = await searchParams
  const m = moduleFor(moduleId); if (!m || !f || !(m.vault_files ?? []).includes(f)) notFound()
  const file = path.join(process.cwd(), 'src/content/mastery/vault', folderFor[m.id], path.basename(f))
  if (!fs.existsSync(file)) notFound()
  const html = md(fs.readFileSync(file, 'utf8'))
  return (
    <div className="panel">
      <a className="muted" href={`/app/m/${m.id}`}>← {m.id} · {m.title}</a>
      <div className="md" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
