'use client'
import Image from 'next/image'

export default function FooterLogo() {
  return (
    <div style={{ width: 28, height: 28, flexShrink: 0, position: 'relative' }}>
      <Image
        src="/logo.webp"
        alt=""
        width={28}
        height={28}
        style={{ objectFit: 'contain', borderRadius: 4 }}
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          el.style.display = 'none'
          const fallback = el.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div
        aria-hidden
        style={{
          display: 'none',
          width: 28,
          height: 28,
          borderRadius: 4,
          background: 'var(--gold)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.875rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        D
      </div>
    </div>
  )
}
