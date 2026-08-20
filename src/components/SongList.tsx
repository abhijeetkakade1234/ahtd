import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Heart } from 'lucide-react'
import type { Track } from '../data/tracks'
import { usePlayer } from '../hooks/usePlayer'

type Props = {
  tracks: Track[]
  heading?: string
  subheading?: string
}

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="waveform-bar w-[2px] bg-[#c9862f]"
          style={{
            height: '100%',
            animationPlayState: active ? 'running' : 'paused',
            animationDelay: `${i * 0.12}s`,
            opacity: active ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  )
}

export default function SongList({ tracks, heading, subheading }: Props) {
  const { current, isPlaying, play, toggle, toggleFavorite, isFavorite } = usePlayer()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="songs" className="px-5 py-20 md:px-14 md:py-28">
      {heading && (
        <div className="mb-10 md:mb-14">
          <h2 className="font-serif-editorial text-2xl italic text-white/90 md:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="font-mono-meta mt-2 text-xs text-white/40">{subheading}</p>
          )}
        </div>
      )}

      <div className="divide-y divide-white/8">
        {tracks.map((track, i) => {
          const isCurrent = current.id === track.id
          const isHovered = hovered === track.id
          return (
            <motion.div
              key={track.id}
              onMouseEnter={() => setHovered(track.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => (isCurrent ? toggle() : play(track, tracks))}
              className="group relative flex cursor-pointer items-center justify-between gap-4 py-4 md:py-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.03 }}
            >
              <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                <span className="font-mono-meta w-6 shrink-0 text-xs text-white/35">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p
                    className={`font-serif-editorial truncate text-lg tracking-wide md:text-2xl ${
                      isCurrent ? 'text-[#c9862f]' : 'text-white/90'
                    }`}
                  >
                    {track.title}
                  </p>
                  <p className="font-mono-meta mt-1 flex items-center gap-2 truncate text-[11px] text-white/40">
                    <span className="truncate">
                      {track.album} · {track.year}
                    </span>
                    {track.deluxe && (
                      <span className="shrink-0 rounded-sm border border-[#c9862f]/40 px-1.5 py-[1px] text-[9px] uppercase tracking-[0.15em] text-[#c9862f]/80">
                        deluxe
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <AnimatePresence>
                  {(isHovered || isCurrent) && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="hidden items-center gap-3 md:flex"
                    >
                      <img loading="lazy" decoding="async"
                        src={track.artwork}
                        alt=""
                        className="h-10 w-10 rounded-sm object-cover"
                      />
                      <Waveform active={isCurrent && isPlaying} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(track.id)
                  }}
                  className="text-white/30 transition-colors hover:text-[#c9862f]"
                >
                  <Heart
                    size={14}
                    fill={isFavorite(track.id) ? '#c9862f' : 'none'}
                    color={isFavorite(track.id) ? '#c9862f' : 'currentColor'}
                  />
                </button>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors group-hover:border-[#c9862f] group-hover:text-[#c9862f]"
                >
                  {isCurrent && isPlaying ? <Pause size={13} /> : <Play size={13} />}
                </button>
              </div>
            </motion.div>
          )
        })}
        {tracks.length === 0 && (
          <p className="font-mono-meta py-10 text-xs text-white/40">
            nothing here yet. try another vibe.
          </p>
        )}
      </div>
    </section>
  )
}
