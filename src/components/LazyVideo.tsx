import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster?: string
  className?: string
  /** Start loading this far before the element enters the viewport. */
  rootMargin?: string
}

/**
 * Muted looping background video that only fetches once it's about to be seen,
 * and pauses when scrolled away so it never competes with the music player for bandwidth/CPU.
 */
export default function LazyVideo({ src, poster, className, rootMargin = '600px' }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true)
          if (el.src) void el.play().catch(() => {})
        } else if (!el.paused) {
          el.pause()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return (
    <video
      ref={ref}
      src={armed ? src : undefined}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      aria-hidden
      className={className}
    />
  )
}
