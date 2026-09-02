// Shared inline SVG icons for the homepage (stroke style, consistent).
// Rendered exactly as in the source design: class="ic", viewBox 24, aria-hidden.

export function WhatsAppIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-4.2-7.6L21 3l-1.3 4.6A8.96 8.96 0 0 1 21 12z" />
      <path d="M8.5 9.5c.5 2.5 3.5 5.5 6 6l1.5-1.5 2 1-1 2c-4.5.5-9.5-4.5-10-9l2-1 1 2-1.5 1.5z" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function ChevronIcon() {
  return (
    <svg className="ic chev" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
