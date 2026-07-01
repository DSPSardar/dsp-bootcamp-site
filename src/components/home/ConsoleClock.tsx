'use client'
import { useEffect, useState } from 'react'

// Live PKT clock in the hero console. Renders the static 21:00 on the
// server so hydration matches, then ticks with the real Pakistan time.
export default function ConsoleClock() {
  const [time, setTime] = useState('21:00')

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-PK', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Karachi',
        })
      )
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  return <span className="clock">{time}</span>
}
