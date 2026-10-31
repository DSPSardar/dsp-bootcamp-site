import { redirect } from 'next/navigation'

// Ustad is hidden (1 Nov 2026). The tutor API, tables and index stay in place so it can
// be switched back on by restoring the widget and this page from git history.
export default function TutorPage() {
  redirect('/app')
}
