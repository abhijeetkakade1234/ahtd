import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  id?: string
  /** Heading block shown above the row (stays pinned with it on desktop). */
  header: ReactNode
  children: ReactNode
  /** Gap between items — Tailwind classes. */
  rowClassName?: string
}

function useDesktop() {
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}

/**
 * Scroll down → the row slides sideways until the last item is in view → page continues down.
 * On mobile it's a normal swipeable row.
 */
export default function HorizontalScroll({ id, header, children, rowClassName = 'gap-6 md:gap-10' }: Props) {
  const desktop = useDesktop()
  const outer = useRef<HTMLElement | null>(null)
  const track = useRef<HTMLDivElement | null>(null)
  const [range, setRange] = useState(0)

  // How far the row must travel so its last item ends flush with the right edge.
  useLayoutEffect(() => {
    if (!desktop) return
    const measure = () => {
      const el = track.current
      if (!el) return
      const overflow = el.scrollWidth - el.clientWidth
      setRange(Math.max(0, overflow))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [desktop, children])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -range])

  if (!desktop) {
    return (
      <section id={id} className="px-5 py-20">
        {header}
        <div className={`mt-12 flex overflow-x-auto pb-6 ${rowClassName}`}>{children}</div>
      </section>
    )
  }

  return (
    <section id={id} ref={outer} className="relative" style={{ height: `calc(100vh + ${range}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-14">
        {header}
        <motion.div ref={track} style={{ x }} className={`mt-12 flex w-full ${rowClassName}`}>
          {children}
          {/* trailing breathing room so the last card isn't glued to the edge */}
          <div className="w-6 shrink-0" aria-hidden />
        </motion.div>
        <p className="font-mono-meta mt-8 text-[10px] uppercase tracking-[0.3em] text-white/25">
          keep scrolling →
        </p>
      </div>
    </section>
  )
}
