import { motion } from 'framer-motion'
import { vibes } from '../data/vibes'

type Props = {
  activeVibe: string | null
  onSelect: (id: string | null) => void
}

export default function VibeExplorer({ activeVibe, onSelect }: Props) {
  return (
    <section id="vibes" className="px-5 py-24 md:px-14 md:py-32">
      <h2 className="font-serif-editorial max-w-xl text-3xl italic leading-tight text-white/90 md:text-5xl">
        What are you listening for?
      </h2>

      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {vibes.map((vibe) => {
          const active = activeVibe === vibe.id
          return (
            <motion.button
              key={vibe.id}
              type="button"
              onClick={() => onSelect(active ? null : vibe.id)}
              className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-sm p-4 text-left md:p-5"
              whileHover={{ scale: 1.015 }}
              animate={{
                boxShadow: active
                  ? `inset 0 0 0 1px ${vibe.accent}, 0 0 24px -4px ${vibe.accent}`
                  : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
              }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={vibe.artwork}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: vibe.bg, opacity: active ? 0.55 : 0.8 }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <span className="font-nav relative text-base uppercase tracking-[0.15em] text-white md:text-xl">
                {vibe.name}
              </span>
              <span className="font-serif-editorial relative mt-1 text-xs italic text-white/55 md:text-sm">
                {vibe.tagline}
              </span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
