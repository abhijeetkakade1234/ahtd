import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { guestBySlug, guestTracks, guests, ytThumb } from '../data/guests'
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

export default function GuestPage() {
  const { slug = '' } = useParams()
  const guest = guestBySlug(slug)
  const { current, isPlaying, play, toggle } = usePlayer()
  const [heroMuted, setHeroMuted] = useState(true)

  const songs = useMemo(() => (guest ? guestTracks(guest) : []), [guest])

  useEffect(() => {
    if (guest) document.title = `${guest.name} — After Hours Til Dawn`
    return () => {
      document.title = 'After Hours Til Dawn — The Weeknd'
    }
  }, [guest])

  // Reset hero sound when switching guests.
  useEffect(() => {
    setHeroMuted(true)
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
    // Don't fight the music player: pause it when the clip gets sound.
    if (heroMuted && isPlaying) toggle()
    setHeroMuted((m) => !m)
  }

  const others = guests.filter((g) => g.slug !== guest.slug)

  return (
    <div className="relative min-h-screen bg-[#060505] pb-32">
      {/* Video hero */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0">
          <iframe
            key={`${guest.slug}-${heroMuted ? 'm' : 'u'}`}
            title={guest.heroCaption}
            src={heroSrc(guest.heroVideoId, heroMuted)}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.15]"
          />
          {/* Fallback / poster behind the iframe while it boots */}
          <img
            src={ytThumb(guest.heroVideoId, 'maxres')}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
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
                  {heroMuted ? 'Unmute clip' : 'Mute clip'}
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
                  src={ytThumb(g.heroVideoId)}
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
