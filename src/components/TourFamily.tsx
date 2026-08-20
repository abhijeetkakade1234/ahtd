import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { guestPoster, guests } from '../data/guests'

export default function TourFamily() {
  return (
    <section id="tour" className="px-5 py-20 md:px-14 md:py-28">
      <h2 className="font-serif-editorial max-w-lg text-2xl italic text-white/90 md:text-4xl">
        The family on stage.
      </h2>
      <p className="font-mono-meta mt-2 text-xs text-white/40">
        After Hours Til Dawn · 2022 → 2026 · the openers, the guests, the man on the synths
      </p>

      <div className="mt-14 flex gap-4 overflow-x-auto pb-8 md:gap-6">
        {guests.map((g, i) => (
          <motion.div
            key={g.slug}
            className="shrink-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
          >
            <Link
              to={`/tour/${g.slug}`}
              className="group block w-60 md:w-72"
              onMouseEnter={(e) => (e.currentTarget.style.setProperty('--g', g.accent))}
            >
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#0b0a0a]"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
              >
                <img
                  src={guestPoster(g)}
                  alt={g.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: g.accent }}
                />
                <span className="font-mono-meta absolute right-3 top-3 flex items-center gap-1 text-[10px] text-white/60">
                  {String(i + 1).padStart(2, '0')}
                  <ArrowUpRight size={11} className="opacity-60 transition-opacity group-hover:opacity-100" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="font-nav text-base uppercase tracking-[0.15em] text-white md:text-lg">{g.name}</p>
                  <p className="font-serif-editorial mt-1 text-xs italic text-white/60 md:text-sm">{g.role}</p>
                </div>
              </div>
              <p className="font-mono-meta mt-3 text-[10px] text-white/35">{g.legs}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
