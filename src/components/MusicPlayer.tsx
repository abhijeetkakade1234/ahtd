import { motion } from 'framer-motion'
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Heart } from 'lucide-react'
import { useState } from 'react'
import { usePlayer } from '../hooks/usePlayer'

const sourceLinks = [
  { key: 'spotifyUrl' as const, label: 'Spotify' },
  { key: 'youtubeUrl' as const, label: 'YouTube' },
  { key: 'youtubeMusicUrl' as const, label: 'YT Music' },
]

export default function MusicPlayer() {
  const { current, isPlaying, toggle, next, prev, accent, toggleFavorite, isFavorite, isGlitching } =
    usePlayer()
  const [muted, setMuted] = useState(false)

  return (
    <motion.div
      className={`font-mono-meta fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/70 backdrop-blur-md ${
        isGlitching ? 'animate-glitch' : ''
      }`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div
        className="h-[2px] w-full overflow-hidden bg-white/5"
        style={{ boxShadow: isPlaying ? `0 0 8px ${accent}` : 'none' }}
      >
        <motion.div
          className="h-full w-1/3"
          style={{ background: accent }}
          animate={{ x: isPlaying ? ['-100%', '400%'] : '-100%' }}
          transition={{ duration: 3.4, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <div
            className="h-10 w-10 shrink-0 rounded-sm md:h-12 md:w-12"
            style={{ background: current.artwork }}
          />
          <div className="min-w-0">
            <p className="font-serif-editorial truncate text-sm text-white/90 md:text-base">
              {current.title}
            </p>
            <p className="truncate text-[10px] text-white/40">
              The Weeknd · {current.album}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(current.id)}
            className="hidden text-white/30 transition-colors hover:text-[#c9862f] sm:block"
          >
            <Heart size={13} fill={isFavorite(current.id) ? accent : 'none'} color={isFavorite(current.id) ? accent : 'currentColor'} />
          </button>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button type="button" onClick={prev} className="text-white/60 transition-colors hover:text-white">
            <SkipBack size={16} />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[color:var(--accent)]"
            style={{ ['--accent' as string]: accent }}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button type="button" onClick={next} className="text-white/60 transition-colors hover:text-white">
            <SkipForward size={16} />
          </button>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="text-white/50 transition-colors hover:text-white"
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-white/40">
            {sourceLinks.map((s) => {
              const url = current[s.key]
              if (!url) return null
              return (
                <a
                  key={s.key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#c9862f]"
                >
                  {s.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
