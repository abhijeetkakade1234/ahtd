import { motion } from 'framer-motion'
import { eras } from '../data/eras'

type Props = {
  activeEra: string | null
  onSelect: (id: string | null) => void
}

export default function EraTimeline({ activeEra, onSelect }: Props) {
  return (
    <section id="eras" className="px-5 py-20 md:px-14 md:py-28">
      <h2 className="font-serif-editorial text-2xl italic text-white/90 md:text-4xl">
        Every era changed the atmosphere.
      </h2>
      <p className="font-mono-meta mt-2 text-xs text-white/40">select an era to shift the room</p>

      <div className="mt-12 flex gap-6 overflow-x-auto pb-6 md:gap-10">
        {eras.map((era) => {
          const active = activeEra === era.id
          return (
            <motion.button
              key={era.id}
              type="button"
              onClick={() => onSelect(active ? null : era.id)}
              className="group flex shrink-0 flex-col items-start gap-3 border-b-2 pb-3 text-left"
              style={{ borderColor: active ? era.accent : 'transparent' }}
              whileHover={{ y: -2 }}
            >
              <span
                className="h-24 w-32 rounded-sm md:h-32 md:w-44"
                style={{ background: era.bg, opacity: active ? 1 : 0.55 }}
              />
              <span className="font-mono-meta text-[11px] text-white/40">{era.year}</span>
              <span
                className="font-nav text-sm uppercase tracking-[0.1em] md:text-base"
                style={{ color: active ? era.accent : 'rgba(255,255,255,0.85)' }}
              >
                {era.name}
              </span>
              <span className="font-mono-meta text-[10px] text-white/30">{era.mood}</span>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
