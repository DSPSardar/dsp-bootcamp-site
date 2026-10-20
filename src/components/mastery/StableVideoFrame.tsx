'use client'

import { useState, type ComponentProps } from 'react'

/** Progress refreshes can cross a signing-time bucket. Keep the mounted player's
 * URL unchanged until the student explicitly reloads or opens another video. */
export default function StableVideoFrame(props: ComponentProps<'iframe'>) {
  const [src] = useState(props.src)
  return (
    <>
      <iframe {...props} src={src} />
      <button
        type="button"
        onClick={() => window.location.reload()}
        style={{ position: 'absolute', right: 8, top: 8, zIndex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid #8893a5', background: '#0A1730', color: '#fff', cursor: 'pointer', fontSize: 12 }}
        title="Reload this lesson with a fresh video link. Playback will restart; saved lesson progress is kept."
      >
        Video stuck? Reload lesson
      </button>
    </>
  )
}
