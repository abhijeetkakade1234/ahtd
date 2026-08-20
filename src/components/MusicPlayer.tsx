import { motion } from 'framer-motion'
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Heart } from 'lucide-react'
import { usePlayer } from '../hooks/usePlayer'

const sourceLinks = [
  { key: 'spotifyUrl' as const, label: 'Spotify' },
  { key: 'youtubeUrl' as const, label: 'YouTube' },
  { key: 'youtubeMusicUrl' as const, label: 'YT Music' },
]

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function MusicPlayer() {
  const {
    current,
    isPlaying,
    isLoading,
    error,
    engine,
    muted,
    progress,
    duration,
    seek,
    toggle,
    toggleMute,
    next,
    prev,
    accent,
    toggleFavorite,
    isFavorite,
    isGlitching,
  } = usePlayer()

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
        className="group/seek h-[3px] w-full cursor-pointer overflow-hidden bg-white/5 transition-[height] hover:h-[6px]"
        style={{ boxShadow: isPlaying ? `0 0 8px ${accent}` : 'none' }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          seek((e.clientX - r.left) / r.width)
        }}
        role="slider"
        aria-label="Seek"
        aria-valuenow={Math.round(progress * 100)}
      >
        {isLoading ? (
          <motion.div
            className="h-full w-1/3"
            style={{ background: accent }}
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <div
            className="h-full transition-[width] duration-200 ease-linear"
            style={{ background: accent, width: `${progress * 100}%` }}
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <img
            src={current.artwork}
            alt=""
            className="h-10 w-10 shrink-0 rounded-sm object-cover md:h-12 md:w-12"
          />
          <div className="min-w-0">
            <p className="font-serif-editorial truncate text-sm text-white/90 md:text-base">
              {current.title}
            </p>
            <p className="truncate text-[10px] text-white/40">
              {error ? (
                <span className="text-[#c9862f]">{error}</span>
              ) : isLoading ? (
                'Loading…'
              ) : (
                <>
                  The Weeknd · {current.album}
                  {engine === 'preview' && ' · 30s preview'}
                  {engine === 'youtube' && duration > 0 && (
                    <> · {fmt(progress * duration)} / {fmt(duration)}</>
                  )}
                </>
              )}
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
            onClick={toggleMute}
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
