import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { tracks, type Track } from '../data/tracks'
import { eras } from '../data/eras'

type PlayerState = {
  current: Track
  isPlaying: boolean
  favorites: Set<string>
  activeEra: string | null
  accent: string
  play: (track: Track) => void
  toggle: () => void
  next: () => void
  prev: () => void
  surpriseMe: () => Track
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  setActiveEra: (id: string | null) => void
  isGlitching: boolean
}

const PlayerContext = createContext<PlayerState | null>(null)

function eraAccent(eraId: string) {
  return eras.find((e) => e.id === eraId)?.accent ?? '#b30f22'
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Track>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [activeEra, setActiveEra] = useState<string | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)

  const play = useCallback((track: Track) => {
    setCurrent(track)
    setIsPlaying(true)
  }, [])

  const toggle = useCallback(() => setIsPlaying((p) => !p), [])

  const step = useCallback((direction: 1 | -1) => {
    setCurrent((track) => {
      const index = tracks.findIndex((t) => t.id === track.id)
      const nextIndex = (index + direction + tracks.length) % tracks.length
      return tracks[nextIndex]
    })
    setIsPlaying(true)
  }, [])

  const next = useCallback(() => step(1), [step])
  const prev = useCallback(() => step(-1), [step])

  const surpriseMe = useCallback(() => {
    setIsGlitching(true)
    const pick = tracks[Math.floor(Math.random() * tracks.length)]
    window.setTimeout(() => {
      setCurrent(pick)
      setIsPlaying(true)
      setIsGlitching(false)
    }, 420)
    return pick
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return
      if (e.code === 'Space') {
        e.preventDefault()
        toggle()
      } else if (e.key === 'ArrowRight') {
        next()
      } else if (e.key === 'ArrowLeft') {
        prev()
      } else if (e.key.toLowerCase() === 'r') {
        surpriseMe()
      } else if (e.key.toLowerCase() === 'f') {
        toggleFavorite(current.id)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle, next, prev, surpriseMe, toggleFavorite, current.id])

  const accent = useMemo(() => eraAccent(current.era), [current.era])

  const value = useMemo<PlayerState>(
    () => ({
      current,
      isPlaying,
      favorites,
      activeEra,
      accent,
      play,
      toggle,
      next,
      prev,
      surpriseMe,
      toggleFavorite,
      isFavorite,
      setActiveEra,
      isGlitching,
    }),
    [current, isPlaying, favorites, activeEra, accent, play, toggle, next, prev, surpriseMe, toggleFavorite, isFavorite, isGlitching],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
