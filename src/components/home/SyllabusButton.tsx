'use client'

// "Send me the syllabus" CTA: flags the lead form's hidden intent field as
// a syllabus request (intent=syllabus), then jumps to the #join form.
export default function SyllabusButton() {
  return (
    <a
      className="btn btn-ghost"
      href="#join"
      onClick={() => {
        const intent = document.getElementById('f-intent') as HTMLInputElement | null
        if (intent) intent.value = 'syllabus'
      }}
    >
      Send me the syllabus
    </a>
  )
}
