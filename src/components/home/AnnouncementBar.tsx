'use client'
import { useEffect, useState } from 'react'
import { bootcamp } from '@/config/site'

// Top announcement bar: days remaining until the coming Monday batch,
// computed in Asia/Karachi so it matches the cohort clock. Renders a
// timezone-neutral fallback on the server so hydration matches, then
// fills in the live count on mount (same pattern as ConsoleClock).
export default function AnnouncementBar() {
  const [text, setText] = useState(
    `${bootcamp.nextBatchOrdinal} batch starts Monday · ${bootcamp.studentsTrained} students already trained · ${bootcamp.seats} seats`
  )

  useEffect(() => {
    function update() {
      const weekday = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        timeZone: 'Asia/Karachi',
      })
      const idx = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(weekday)
      const days = (1 - idx + 7) % 7
      setText(
        days === 0
          ? 'Batch starts TODAY — message us on WhatsApp now'
          : `${bootcamp.nextBatchOrdinal} batch starts Monday — ${days} days left · ${bootcamp.studentsTrained} students already trained · ${bootcamp.seats} seats`
      )
    }
    update()
    // Re-check hourly so a tab left open overnight rolls to the new day.
    const id = setInterval(update, 60 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="announce" role="status">
      {text}
    </div>
  )
}
