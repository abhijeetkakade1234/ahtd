import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const HERO_IMAGE = '/Futuristic Arena and Golden Android Statue.png'

const dustParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  delay: (i % 9) * 0.9,
  duration: 9 + (i % 5) * 2,
  size: 1 + (i % 3),
}))

export default function Hero({ onEnter }: { onEnter: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 0.92])
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const darken = useTransform(scrollYProgress, [0, 1], [0, 0.72])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0])

  return (
    <section id="hero" ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale, y }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={HERO_IMAGE}
            alt="A massive chrome statue towers over a tiny performer on stage inside a golden-lit stadium"
            className="h-full w-full object-cover object-[center_38%]"
          />
        </motion.div>
      </motion.div>

      {/* cinematic contrast gradients, image left breathing */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(179,15,34,0.35),transparent_60%)]"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: darken, background: '#000' }}
      />

      <div className="pointer-events-none absolute inset-0">
        {dustParticles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 rounded-full bg-[#e9c98a]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="grain pointer-events-none absolute inset-0" />

      <motion.div
        className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 md:px-14 md:py-12"
        style={{ opacity: heroOpacity }}
      >
        <div className="max-w-xs md:max-w-sm">
          <p className="font-nav text-[11px] uppercase tracking-[0.28em] text-white/80 md:text-xs">
            After Hours Til Dawn
          </p>
          <p className="font-serif-editorial mt-3 text-sm italic leading-snug text-white/60 md:text-base">
            A collection of songs
            <br />
            for the nights that don&rsquo;t end.
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-white/90 md:text-sm">
              The Weeknd
            </p>
            <p className="font-nav mt-1 text-[10px] uppercase tracking-[0.4em] text-[#c9862f]">
              XO
            </p>
          </div>

          <button
            type="button"
            onClick={onEnter}
            className="font-nav group flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
          >
            <span>Enter</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
