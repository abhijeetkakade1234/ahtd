import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Pause, Play, Shuffle } from 'lucide-react'
import { vibes } from '../data/vibes'
import { tracks } from '../data/tracks'
import { usePlayer } from '../hooks/usePlayer'
import SongList from '../components/SongList'

export default function VibePage() {
  const { id = '' } = useParams()
  const vibe = vibes.find((v) => v.id === id)
  const { current, isPlaying, play, toggle, setShuffle } = usePlayer()

  const vibeTracks = useMemo(() => (vibe ? tracks.filter((t) => t.vibes.includes(vibe.id)) : []), [vibe])

  useEffect(() => {
    if (vibe) document.title = `${vibe.name} — The Weeknd`
    return () => {
      document.title = 'After Hours Til Dawn — The Weeknd'
    }
  }, [vibe])

  if (!vibe) return <Navigate to="/" replace />

  const inVibe = vibeTracks.some((t) => t.id === current.id)
  const vibeIsPlaying = isPlaying && inVibe
  const accent = vibe.accent

  function playAll() {
    if (inVibe) toggle()
    else if (vibeTracks[0]) play(vibeTracks[0])
  }

  function shuffle() {
    if (!vibeTracks.length) return
    const pool = vibeTracks.filter((t) => t.id !== current.id)
    setShuffle(true)
    play(pool[Math.floor(Math.random() * pool.length)] ?? vibeTracks[0], vibeTracks)
  }

  return (
    <div className="relative min-h-screen bg-[#060505] pb-32">
      <motion.div
        key={vibe.id}
        className="pointer-events-none fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ background: vibe.bg }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#060505]/40 to-[#060505]" />

      <div className="relative z-10">
        <section className="px-5 pt-28 md:px-14 md:pt-36">
          <Link
            to="/"
            className="font-nav inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={12} /> all moods
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:items-end md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square w-full max-w-[360px] overflow-hidden rounded-sm"
              style={{ boxShadow: `0 40px 120px -30px ${accent}80` }}
            >
              <img src={vibe.artwork} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: vibe.bg, opacity: 0.6 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="font-nav absolute bottom-5 left-5 text-2xl uppercase tracking-[0.2em] text-white">
                {vibe.name}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="font-mono-meta text-[11px] uppercase tracking-[0.3em] text-white/40">
                mood · {vibeTracks.length} songs
              </p>
              <h1 className="font-serif-editorial mt-3 text-4xl italic leading-[1.05] text-white md:text-6xl lg:text-7xl">
                {vibe.tagline}
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={playAll}
                  disabled={!vibeTracks.length}
                  className="font-nav flex items-center gap-3 rounded-full border px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-white transition-colors disabled:opacity-40"
                  style={{ borderColor: accent, background: vibeIsPlaying ? `${accent}33` : 'transparent' }}
                >
                  {vibeIsPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {vibeIsPlaying ? 'Pause' : 'Play mood'}
                </button>
                <button
                  type="button"
                  onClick={shuffle}
                  disabled={!vibeTracks.length}
                  className="font-nav flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:opacity-40"
                >
                  <Shuffle size={13} /> Shuffle
                </button>
                <span className="font-mono-meta text-[10px] text-white/35">full songs via YouTube</span>
              </div>
            </motion.div>
          </div>
        </section>

        <SongList tracks={vibeTracks} heading={vibe.name} subheading={vibe.tagline} />

        <section className="px-5 pb-10 md:px-14">
          <h2 className="font-nav text-[10px] uppercase tracking-[0.3em] text-white/40">Other moods</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {vibes
              .filter((v) => v.id !== vibe.id)
              .map((v) => (
                <Link
                  key={v.id}
                  to={`/vibe/${v.id}`}
                  className="font-nav flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-4 text-[10px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = v.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
                >
                  <img src={v.artwork} alt="" className="h-6 w-6 rounded-full object-cover" />
                  {v.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
