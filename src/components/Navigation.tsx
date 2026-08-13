import { Radio } from 'lucide-react'
import { useLocalTime } from '../hooks/useLocalTime'
import { usePlayer } from '../hooks/usePlayer'

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'vibes', label: 'Vibes' },
  { id: 'songs', label: 'Songs' },
  { id: 'eras', label: 'Eras' },
  { id: 'memories', label: 'Memories' },
  { id: 'about', label: 'About' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation() {
  const { time } = useLocalTime()
  const { surpriseMe } = usePlayer()

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
      <nav className="font-nav hidden gap-6 text-[10px] uppercase tracking-[0.25em] text-white/75 md:flex">
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            className="transition-colors hover:text-white"
          >
            {l.label}
          </button>
        ))}
      </nav>

      <div className="font-nav md:hidden text-[10px] uppercase tracking-[0.25em] text-white/75">
        AHTD
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono-meta hidden text-[10px] text-white/50 sm:inline">
          {time}
        </span>
        <button
          type="button"
          onClick={() => surpriseMe()}
          title="Surprise Me (R)"
          className="font-nav flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/75 transition-colors hover:text-[#c9862f]"
        >
          <Radio size={13} />
          <span className="hidden sm:inline">Surprise Me</span>
        </button>
      </div>
    </header>
  )
}
