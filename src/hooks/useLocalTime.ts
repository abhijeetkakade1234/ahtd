import { useEffect, useState } from 'react'

function format(date: Date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const h12 = hours % 12 === 0 ? 12 : hours % 12
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const mm = minutes.toString().padStart(2, '0')
  return `${h12}:${mm} ${suffix}`
}

const nightMessages = [
  "it's late. you probably shouldn't be listening to this.",
  'still awake?',
  'this one hits differently at night.',
  'you were supposed to sleep.',
]

export function useLocalTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 15)
    return () => window.clearInterval(id)
  }, [])

  const hour = now.getHours()
  const isLateNight = hour >= 0 && hour < 5
  const message = isLateNight
    ? nightMessages[now.getMinutes() % nightMessages.length]
    : null

  return {
    time: format(now),
    isLateNight,
    message,
  }
}
