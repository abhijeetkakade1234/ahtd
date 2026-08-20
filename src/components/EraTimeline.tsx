import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { eras } from '../data/eras'
import { albumsForEra } from '../data/albums'
import HorizontalScroll from './HorizontalScroll'

type Props = {
  activeEra: string | null
  onSelect: (id: string | null) => void
}

export default function EraTimeline({ activeEra, onSelect }: Props) {
  return (
    <HorizontalScroll
      id="eras"
      header={
        <div>
          <h2 className="font-serif-editorial text-2xl italic text-white/90 md:text-4xl">
            Every era changed the atmosphere.
          </h2>
          <p className="font-mono-meta mt-2 text-xs text-white/40">
            select an era to shift the room · open an album for the full story
          </p>
        </div>
      }
    >
      <>
        {eras.map((era) => {
          const active = activeEra === era.id
          return (
            <div key={era.id} className="flex shrink-0 flex-col gap-3">
            <motion.button
              type="button"
              onClick={() => onSelect(active ? null : era.id)}
              className="group flex flex-col items-start gap-3 border-b-2 pb-3 text-left"
              style={{ borderColor: active ? era.accent : 'transparent' }}
              whileHover={{ y: -2 }}
            >
              <span
                className="relative block h-24 w-32 overflow-hidden rounded-sm md:h-32 md:w-44"
                style={{ opacity: active ? 1 : 0.55 }}
              >
                <img loading="lazy" decoding="async"
                  src={era.artwork}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span
                  className="absolute inset-0"
                  style={{ background: era.bg, opacity: 0.55, mixBlendMode: 'multiply' }}
                />
              </span>
              <span className="font-mono-meta text-[11px] text-white/40">{era.year}</span>
              <span
                className="font-nav text-sm uppercase tracking-[0.1em] md:text-base"
                style={{ color: active ? era.accent : 'rgba(255,255,255,0.85)' }}
              >
                {era.name}
              </span>
              <span className="font-mono-meta text-[10px] text-white/30">{era.mood}</span>
              </motion.button>

              <div className="flex flex-wrap gap-2">
                {albumsForEra(era.id).map((album) => (
                  <Link
                    key={album.slug}
                    to={`/album/${album.slug}`}
                    className="font-nav group/chip flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-3 text-[9px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
                    style={{ ['--accent' as string]: era.accent }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = era.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
                  >
                    <img loading="lazy" decoding="async" src={album.artwork} alt="" className="h-5 w-5 rounded-full object-cover" />
                    {albumsForEra(era.id).length > 1 ? album.title : 'Open album'}
                    <ArrowUpRight size={10} className="opacity-50 group-hover/chip:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </>
    </HorizontalScroll>
  )
}
