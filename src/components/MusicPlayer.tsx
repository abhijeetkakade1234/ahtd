import { motion } from 'framer-motion'
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Heart, PictureInPicture2, Shuffle } from 'lucide-react'
import { supportsPopOut, usePlayer } from '../hooks/usePlayer'

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
    popOut,
    pipActive,
    shuffle,
    toggleShuffle,
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
        className="group/seek h-[4px] w-full cursor-pointer overflow-hidden bg-white/5 transition-[height] hover:h-[8px]"
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

      <div className="flex items-center justify-between gap-3 px-4 py-4 md:px-8 md:py-5">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <img
            src={current.artwork}
            alt=""
            className="h-12 w-12 shrink-0 rounded-sm object-cover md:h-16 md:w-16"
          />
          <div className="min-w-0">
            <p className="font-serif-editorial truncate text-base text-white/90 md:text-xl">
              {current.title}
            </p>
            <p className="truncate text-[11px] text-white/45 md:text-xs">
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
            <Heart size={16} fill={isFavorite(current.id) ? accent : 'none'} color={isFavorite(current.id) ? accent : 'currentColor'} />
          </button>
        </div>

        <div className="flex items-center gap-4 md:gap-7">
          <button
            type="button"
            onClick={toggleShuffle}
            title={shuffle ? 'Smart shuffle on (S)' : 'Smart shuffle (S)'}
            aria-pressed={shuffle}
            className="relative transition-colors hover:text-white"
            style={{ color: shuffle ? accent : 'rgba(255,255,255,0.5)' }}
          >
            <Shuffle size={17} />
            {shuffle && (
              <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" style={{ background: accent }} />
            )}
          </button>
          <button type="button" onClick={prev} className="text-white/60 transition-colors hover:text-white">
            <SkipBack size={20} />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[color:var(--accent)] md:h-14 md:w-14"
            style={{ ['--accent' as string]: accent }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <button type="button" onClick={next} className="text-white/60 transition-colors hover:text-white">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {supportsPopOut && engine === 'youtube' && (
            <button
              type="button"
              onClick={() => void popOut()}
              title={pipActive ? 'Playing in pop-out window' : 'Pop out — keeps playing over other tabs & apps'}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors hover:text-white"
              style={{ color: pipActive ? accent : 'rgba(255,255,255,0.5)' }}
            >
              <PictureInPicture2 size={17} />
              <span className="hidden xl:inline">{pipActive ? 'Popped out' : 'Pop out'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={toggleMute}
            className="text-white/50 transition-colors hover:text-white"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.15em] text-white/45">
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
