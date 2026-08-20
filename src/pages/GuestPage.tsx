import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUp, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { guestBySlug, guestPoster, guestTracks, guests } from '../data/guests'
import { usePlayer } from '../hooks/usePlayer'
import SongList from '../components/SongList'

function heroSrc(id: string, muted: boolean) {
  const p = new URLSearchParams({
    autoplay: '1',
    mute: muted ? '1' : '0',
    loop: '1',
    playlist: id,
    controls: '0',
    rel: '0',
    playsinline: '1',
    modestbranding: '1',
    iv_load_policy: '3',
    disablekb: '1',
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`
}

function canAutoplaySound() {
  const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation
  return !!ua?.hasBeenActive
}

export default function GuestPage() {
  const { slug = '' } = useParams()
  const guest = guestBySlug(slug)
  const { current, isPlaying, play, toggle } = usePlayer()
  // Sound on by default. Browsers only allow unmuted autoplay once the page has been
  // interacted with; on a cold deep-link we start muted and flip on the first tap.
  const [heroMuted, setHeroMuted] = useState(() => !canAutoplaySound())
  const [waitingForTap, setWaitingForTap] = useState(() => !canAutoplaySound())
  const [docked, setDocked] = useState(false) // hero scrolled away -> floating mini player
  const [dockDismissed, setDockDismissed] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const pausedMusicRef = useRef(false)

  const songs = useMemo(() => (guest ? guestTracks(guest) : []), [guest])

  useEffect(() => {
    if (guest) document.title = `${guest.name} — After Hours Til Dawn`
    return () => {
      document.title = 'After Hours Til Dawn — The Weeknd'
    }
  }, [guest])

  // Reset per guest.
  useEffect(() => {
    const ok = canAutoplaySound()
    setHeroMuted(!ok)
    setWaitingForTap(!ok)
    setDockDismissed(false)
  }, [slug])

  // Cold load without a prior gesture: unmute on the first interaction anywhere.
  useEffect(() => {
    if (!waitingForTap) return
    const arm = () => {
      setHeroMuted(false)
      setWaitingForTap(false)
    }
    window.addEventListener('pointerdown', arm, { once: true })
    window.addEventListener('keydown', arm, { once: true })
    return () => {
      window.removeEventListener('pointerdown', arm)
      window.removeEventListener('keydown', arm)
    }
  }, [waitingForTap])

  // The clip has sound -> the music player steps aside; resume it when leaving the page.
  useEffect(() => {
    if (!heroMuted && isPlaying) {
      pausedMusicRef.current = true
      toggle()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroMuted])
  // ...and if the user starts a song while the clip has sound, the clip mutes itself.
  const wasPlayingRef = useRef(isPlaying)
  useEffect(() => {
    const started = isPlaying && !wasPlayingRef.current
    wasPlayingRef.current = isPlaying
    if (started && !heroMuted) {
      pausedMusicRef.current = false
      setHeroMuted(true)
      setWaitingForTap(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])
  useEffect(
    () => () => {
      if (pausedMusicRef.current) {
        pausedMusicRef.current = false
        toggle()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Scroll past the hero -> dock the clip bottom-right and keep it playing (same iframe, no reload).
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setDocked(e.intersectionRatio < 0.25), {
      threshold: [0, 0.25, 0.5],
    })
    io.observe(el)
    return () => io.disconnect()
  }, [slug])

  if (!guest) return <Navigate to="/" replace />

  const inList = songs.some((t) => t.id === current.id)
  const listPlaying = isPlaying && inList
  const accent = guest.accent

  function playAll() {
    if (inList) toggle()
    else if (songs[0]) play(songs[0], songs)
  }

  function toggleHeroSound() {
    setWaitingForTap(false)
    setHeroMuted((m) => !m)
  }

  const showDock = docked && !dockDismissed

  const others = guests.filter((g) => g.slug !== guest.slug)

  return (
    <div className="relative min-h-screen bg-[#060505] pb-32">
      {/* Video hero */}
      <section ref={heroRef} className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-black">
        {/* Poster behind the iframe while it boots */}
        <img loading="eager" decoding="async" fetchPriority="high"
          src={guestPoster(guest, 'maxres')}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        {/* The clip. Same element in both modes; only CSS changes, so playback never restarts. */}
        <div
          className={
            showDock
              ? 'fixed bottom-28 right-4 z-40 aspect-video w-[min(420px,calc(100vw-2rem))] overflow-hidden rounded-md border border-white/15 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] md:bottom-32 md:right-8'
              : 'pointer-events-none absolute inset-0 overflow-hidden'
          }
        >
          {guest.heroVideo ? (
            <video
              key={guest.slug}
              src={guest.heroVideo}
              poster={guestPoster(guest, 'maxres')}
              autoPlay
              loop
              playsInline
              muted={heroMuted}
              className={
                showDock
                  ? 'pointer-events-none absolute inset-0 h-full w-full object-cover'
                  : 'absolute inset-0 h-full w-full object-cover'
              }
            />
          ) : (
            <iframe
              key={`${guest.slug}-${heroMuted ? 'm' : 'u'}`}
              title={guest.heroCaption}
              src={heroSrc(guest.heroVideoId, heroMuted)}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className={
                showDock
                  ? 'pointer-events-none absolute inset-0 h-full w-full'
                  : 'absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.15]'
              }
            />
          )}
          {showDock && (
            <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-2">
              <p className="font-mono-meta truncate pl-1 text-[10px] text-white/70">
                {guest.name} · {guest.heroCaption}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={toggleHeroSound}
                  className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                  title={heroMuted ? 'Unmute' : 'Mute'}
                >
                  {heroMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                  title="Back to the clip"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setDockDismissed(true)}
                  className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                  title="Close"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060505] via-[#060505]/40 to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-10 pt-24 md:px-14 md:pb-14 md:pt-32">
          <Link
            to="/"
            className="font-nav inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={12} /> tour family
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono-meta text-[11px] uppercase tracking-[0.3em] text-white/55">{guest.role}</p>
              <h1 className="font-nav mt-3 text-4xl uppercase leading-[0.95] tracking-[0.08em] text-white md:text-7xl lg:text-8xl">
                {guest.name}
              </h1>
              <p className="font-serif-editorial mt-4 text-base italic text-white/70 md:text-lg">{guest.legs}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={playAll}
                  disabled={!songs.length}
                  className="font-nav flex items-center gap-3 rounded-full border px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-colors disabled:opacity-40"
                  style={{ borderColor: accent, background: listPlaying ? `${accent}33` : 'rgba(0,0,0,0.35)' }}
                >
                  {listPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {listPlaying ? 'Pause' : `Play ${songs.length === 1 ? 'the song' : 'the songs'}`}
                </button>
                <button
                  type="button"
                  onClick={toggleHeroSound}
                  className="font-nav flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
                >
                  {heroMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  {waitingForTap ? 'Tap anywhere for sound' : heroMuted ? 'Unmute clip' : 'Mute clip'}
                </button>
              </div>
            </motion.div>

            <p className="font-mono-meta max-w-[220px] text-right text-[10px] leading-relaxed text-white/40">
              {guest.heroCaption}
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="relative z-10 px-5 py-16 md:px-14 md:py-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)] md:gap-20">
          <div>
            <h2 className="font-nav text-[10px] uppercase tracking-[0.3em] text-white/40">On the tour</h2>
            <div className="mt-6 space-y-6">
              {guest.bio.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="font-serif-editorial max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
          <aside className="font-mono-meta">
            <h2 className="font-nav text-[10px] uppercase tracking-[0.3em] text-white/40">Card</h2>
            <dl className="mt-6 divide-y divide-white/8 border-y border-white/8">
              <div className="py-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/35">Role</dt>
                <dd className="mt-1 text-sm text-white/80">{guest.role}</dd>
              </div>
              <div className="py-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/35">Dates</dt>
                <dd className="mt-1 text-sm text-white/80">{guest.legs}</dd>
              </div>
              <div className="py-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/35">With The Weeknd</dt>
                <dd className="mt-1 text-sm text-white/80">
                  {songs.length} {songs.length === 1 ? 'track' : 'tracks'}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <SongList tracks={songs} heading="With The Weeknd" subheading="click a track — plays in the bar below" />

      {/* Others */}
      <section className="px-5 pb-10 md:px-14">
        <h2 className="font-nav text-[10px] uppercase tracking-[0.3em] text-white/40">Also on the tour</h2>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-4">
          {others.map((g) => (
            <Link
              key={g.slug}
              to={`/tour/${g.slug}`}
              className="group flex w-40 shrink-0 flex-col gap-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <img
                  src={guestPoster(g)}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: g.accent }}
                />
              </div>
              <p className="font-nav text-[11px] uppercase tracking-[0.15em] text-white/80">{g.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
