import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { albumBySlug, albums } from '../data/albums'
import { eras } from '../data/eras'
import { tracks } from '../data/tracks'
import { usePlayer } from '../hooks/usePlayer'
import SongList from '../components/SongList'

export default function AlbumPage() {
  const { slug = '' } = useParams()
  const album = albumBySlug(slug)
  const { current, isPlaying, play, toggle } = usePlayer()

  const era = useMemo(() => eras.find((e) => e.id === album?.era), [album])
  const albumTracks = useMemo(
    () => (album ? tracks.filter((t) => t.album === album.title) : []),
    [album],
  )

  const index = albums.findIndex((a) => a.slug === slug)
  const prevAlbum = index > 0 ? albums[index - 1] : null
  const nextAlbum = index >= 0 && index < albums.length - 1 ? albums[index + 1] : null

  useEffect(() => {
    if (album) document.title = `${album.title} — The Weeknd`
    return () => {
      document.title = 'After Hours Til Dawn'
    }
  }, [album])

  if (!album || !era) return <Navigate to="/" replace />

  const albumIsPlaying = isPlaying && albumTracks.some((t) => t.id === current.id)
  const accent = era.accent

  function playAlbum() {
    if (albumIsPlaying) toggle()
    else if (albumTracks.some((t) => t.id === current.id)) toggle()
    else if (albumTracks[0]) play(albumTracks[0])
  }

  return (
    <div className="relative min-h-screen bg-[#060505] pb-32">
      <motion.div
        key={album.slug}
        className="pointer-events-none fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ background: era.bg }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#060505]/40 to-[#060505]" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="px-5 pt-28 md:px-14 md:pt-36">
          <Link
            to="/"
            className="font-nav inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={12} /> all eras
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:items-end md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-sm"
              style={{ boxShadow: `0 40px 120px -30px ${accent}80` }}
            >
              <img src={album.artwork} alt={album.title} className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="font-mono-meta text-[11px] uppercase tracking-[0.3em] text-white/40">
                {album.kind} · {album.released}
              </p>
              <h1 className="font-serif-editorial mt-3 text-4xl italic leading-[1.05] text-white md:text-6xl lg:text-7xl">
                {album.title}
              </h1>
              <p className="font-mono-meta mt-4 text-sm text-white/55 md:text-base">{album.tagline}</p>
              <p className="font-mono-meta mt-2 text-[10px] text-white/30">{era.mood}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={playAlbum}
                  disabled={!albumTracks.length}
                  className="font-nav flex items-center gap-3 rounded-full border px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-white transition-colors disabled:opacity-40"
                  style={{ borderColor: accent, background: albumIsPlaying ? `${accent}33` : 'transparent' }}
                >
                  {albumIsPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {albumIsPlaying ? 'Pause' : 'Play album'}
                </button>
                <span className="font-mono-meta text-[10px] text-white/35">
                  {albumTracks.length} tracks here · 30s previews
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story + facts */}
        <section className="px-5 py-20 md:px-14 md:py-28">
          <div className="grid gap-12 md:grid-cols-[1fr_minmax(0,320px)] md:gap-20">
            <div>
              <h2 className="font-nav text-[10px] uppercase tracking-[0.3em] text-white/40">The story</h2>
              <div className="mt-6 space-y-6">
                {album.story.map((p, i) => (
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
              {album.quote && (
                <blockquote
                  className="font-serif-editorial mt-12 max-w-xl border-l-2 pl-6 text-2xl italic leading-snug text-white/90 md:text-3xl"
                  style={{ borderColor: accent }}
                >
                  “{album.quote}”
                </blockquote>
              )}
            </div>

            <aside className="font-mono-meta">
              <h2 className="font-nav text-[10px] uppercase tracking-[0.3em] text-white/40">Liner notes</h2>
              <dl className="mt-6 divide-y divide-white/8 border-y border-white/8">
                {album.facts.map((f) => (
                  <div key={f.label} className="py-4">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/35">{f.label}</dt>
                    <dd className="mt-1 text-sm text-white/80">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <SongList
          tracks={albumTracks}
          heading="Tracklist"
          subheading="click any track — previews play in the bar below"
        />

        {/* Prev / next */}
        <nav className="flex items-stretch justify-between gap-4 border-t border-white/8 px-5 py-10 md:px-14">
          {prevAlbum ? (
            <Link to={`/album/${prevAlbum.slug}`} className="group flex items-center gap-4 text-left">
              <ArrowLeft size={14} className="text-white/40 transition-colors group-hover:text-white" />
              <img src={prevAlbum.artwork} alt="" className="h-12 w-12 rounded-sm object-cover opacity-70 group-hover:opacity-100" />
              <div>
                <p className="font-mono-meta text-[10px] uppercase tracking-[0.2em] text-white/35">previous</p>
                <p className="font-serif-editorial text-base text-white/85 md:text-lg">{prevAlbum.title}</p>
              </div>
            </Link>
          ) : (
            <span />
          )}
          {nextAlbum ? (
            <Link to={`/album/${nextAlbum.slug}`} className="group flex items-center gap-4 text-right">
              <div>
                <p className="font-mono-meta text-[10px] uppercase tracking-[0.2em] text-white/35">next</p>
                <p className="font-serif-editorial text-base text-white/85 md:text-lg">{nextAlbum.title}</p>
              </div>
              <img src={nextAlbum.artwork} alt="" className="h-12 w-12 rounded-sm object-cover opacity-70 group-hover:opacity-100" />
              <ArrowRight size={14} className="text-white/40 transition-colors group-hover:text-white" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  )
}
