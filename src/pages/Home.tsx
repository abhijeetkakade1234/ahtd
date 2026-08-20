import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import VibeExplorer from '../components/VibeExplorer'
import EraTimeline from '../components/EraTimeline'
import SongList from '../components/SongList'
import TourFamily from '../components/TourFamily'
import LazyVideo from '../components/LazyVideo'
import { tracks } from '../data/tracks'
import { eras } from '../data/eras'
import { usePlayer } from '../hooks/usePlayer'
import { useLocalTime } from '../hooks/useLocalTime'

export default function Home() {
  const [activeEra, setActiveEra] = useState<string | null>(null)
  const { accent } = usePlayer()
  const { message } = useLocalTime()

  const filtered = useMemo(() => {
    if (activeEra) return tracks.filter((t) => t.era === activeEra)
    // One or two defining tracks per album as the starting point.
    const picks = [
      'Wicked Games', 'The Zone', 'D.D.', 'Kiss Land', 'The Hills', 'Starboy', 'Call Out My Name',
      'Blinding Lights', 'After Hours', 'Less Than Zero', 'Timeless', 'Hurry Up Tomorrow',
    ]
    return picks.map((t) => tracks.find((x) => x.title === t)).filter((t): t is (typeof tracks)[number] => !!t)
  }, [activeEra])

  const heading = useMemo(
    () => (activeEra ? (eras.find((e) => e.id === activeEra)?.name ?? 'Songs') : 'From The Catalogue'),
    [activeEra],
  )

  const subheading = activeEra
    ? eras.find((e) => e.id === activeEra)?.mood
    : 'a starting point. pick a mood above or an era below.'

  return (
    <div className="relative min-h-screen bg-[#060505] pb-32">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        animate={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}14, transparent 60%)` }}
        transition={{ duration: 1.2 }}
      />

      <Hero onEnter={() => document.getElementById('vibes')?.scrollIntoView({ behavior: 'smooth' })} />

      {message && (
        <p className="font-mono-meta px-5 pt-16 text-xs italic text-white/35 md:px-14">
          {message}
        </p>
      )}

      <VibeExplorer />

      <SongList tracks={filtered} heading={heading} subheading={subheading} />

      <EraTimeline activeEra={activeEra} onSelect={setActiveEra} />

      <TourFamily />

      <section id="about" className="relative mb-16 overflow-hidden px-5 py-28 md:mb-24 md:px-14 md:py-40">
        {/* Muted looping clip behind the sign-off */}
        <LazyVideo
          src="/about.mp4"
          poster="/about-poster.jpg"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060505] via-[#060505]/55 to-[#060505]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060505]/80 via-transparent to-transparent" />

        <p className="font-serif-editorial relative max-w-lg text-xl italic leading-relaxed text-white/85 md:text-2xl">
          A beautiful little corner of the internet made by someone who really loves The Weeknd.
        </p>
        <p className="font-mono-meta relative mt-6 text-[11px] text-white/40">
          fan-made. not affiliated with The Weeknd, XO, or Republic Records.
          <br />
          songs stream from The Weeknd’s official YouTube uploads — nothing is hosted here.
        </p>
      </section>
    </div>
  )
}
