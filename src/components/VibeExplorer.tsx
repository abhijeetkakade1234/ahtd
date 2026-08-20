import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { vibes } from '../data/vibes'
import { tracks } from '../data/tracks'

export default function VibeExplorer() {
  return (
    <section id="vibes" className="px-5 py-24 md:px-14 md:py-32">
      <h2 className="font-serif-editorial max-w-xl text-3xl italic leading-tight text-white/90 md:text-5xl">
        What are you listening for?
      </h2>
      <p className="font-mono-meta mt-2 text-xs text-white/40">pick a mood — opens a playable list</p>

      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {vibes.map((vibe) => {
          const count = tracks.filter((t) => t.vibes.includes(vibe.id)).length
          return (
            <motion.div key={vibe.id} whileHover={{ scale: 1.015 }} transition={{ duration: 0.3 }}>
              <Link
                to={`/vibe/${vibe.id}`}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-sm p-4 text-left md:p-5"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${vibe.accent}, 0 0 24px -4px ${vibe.accent}`)
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.08)')}
              >
                <img loading="lazy" decoding="async"
                  src={vibe.artwork}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0" style={{ background: vibe.bg, opacity: 0.8 }} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <span className="font-mono-meta absolute right-3 top-3 flex items-center gap-1 text-[10px] text-white/50">
                  {count} <ArrowUpRight size={11} className="opacity-60 group-hover:opacity-100" />
                </span>
                <span className="font-nav relative text-base uppercase tracking-[0.15em] text-white md:text-xl">
                  {vibe.name}
                </span>
                <span className="font-serif-editorial relative mt-1 text-xs italic text-white/55 md:text-sm">
                  {vibe.tagline}
                </span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
