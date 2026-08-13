import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import VibeExplorer from '../components/VibeExplorer'
import EraTimeline from '../components/EraTimeline'
import SongList from '../components/SongList'
import MemoryGallery from '../components/MemoryGallery'
import MusicPlayer from '../components/MusicPlayer'
import SurpriseMe from '../components/SurpriseMe'
import { tracks } from '../data/tracks'
import { vibes } from '../data/vibes'
import { eras } from '../data/eras'
import { usePlayer } from '../hooks/usePlayer'
import { useLocalTime } from '../hooks/useLocalTime'

export default function Home() {
  const [activeVibe, setActiveVibe] = useState<string | null>(null)
  const [activeEra, setActiveEra] = useState<string | null>(null)
  const { accent } = usePlayer()
  const { message } = useLocalTime()

  const filtered = useMemo(() => {
    if (activeEra) return tracks.filter((t) => t.era === activeEra)
    if (activeVibe) return tracks.filter((t) => t.vibes.includes(activeVibe))
    return tracks.slice(0, 12)
  }, [activeVibe, activeEra])

  const heading = useMemo(() => {
    if (activeEra) return eras.find((e) => e.id === activeEra)?.name ?? 'Songs'
    if (activeVibe) return vibes.find((v) => v.id === activeVibe)?.name ?? 'Songs'
    return 'From The Catalogue'
  }, [activeVibe, activeEra])

  const subheading = activeEra
    ? eras.find((e) => e.id === activeEra)?.mood
    : activeVibe
      ? vibes.find((v) => v.id === activeVibe)?.tagline
      : 'a starting point. explore a vibe or an era above.'

  useEffect(() => {
    if (activeEra) setActiveVibe(null)
  }, [activeEra])
  useEffect(() => {
    if (activeVibe) setActiveEra(null)
  }, [activeVibe])

  return (
    <div className="relative min-h-screen bg-[#060505] pb-24">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        animate={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}14, transparent 60%)` }}
        transition={{ duration: 1.2 }}
      />

      <Navigation />
      <SurpriseMe />

      <Hero onEnter={() => document.getElementById('vibes')?.scrollIntoView({ behavior: 'smooth' })} />

      {message && (
        <p className="font-mono-meta px-5 pt-16 text-xs italic text-white/35 md:px-14">
          {message}
        </p>
      )}

      <VibeExplorer activeVibe={activeVibe} onSelect={setActiveVibe} />

      <SongList tracks={filtered} heading={heading} subheading={subheading} />

      <EraTimeline activeEra={activeEra} onSelect={setActiveEra} />

      <MemoryGallery />

      <section id="about" className="px-5 py-24 md:px-14 md:py-32">
        <p className="font-serif-editorial max-w-lg text-xl italic leading-relaxed text-white/70 md:text-2xl">
          A beautiful little corner of the internet made by someone who really loves The Weeknd.
        </p>
        <p className="font-mono-meta mt-6 text-[11px] text-white/30">
          fan-made. not affiliated with The Weeknd, XO, or Republic Records.
          <br />
          all songs link out to Spotify / YouTube — nothing is hosted here.
        </p>
      </section>

      <MusicPlayer />
    </div>
  )
}
