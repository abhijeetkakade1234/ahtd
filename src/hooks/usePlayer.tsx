import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { tracks, type Track } from '../data/tracks'
import { eras } from '../data/eras'

type PlayerState = {
  current: Track
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  muted: boolean
  progress: number
  favorites: Set<string>
  activeEra: string | null
  accent: string
  play: (track: Track) => void
  toggle: () => void
  toggleMute: () => void
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

// 30s official previews via the iTunes Search API (no key, CORS-enabled).
const previewCache = new Map<string, Promise<string | null>>()

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

type ITunesResult = { artistName?: string; trackName?: string; previewUrl?: string }

async function searchITunes(title: string): Promise<ITunesResult[]> {
  const term = encodeURIComponent(`The Weeknd ${title}`)
  const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=25`)
  if (!res.ok) throw new Error(`iTunes ${res.status}`)
  const data = (await res.json()) as { results?: ITunesResult[] }
  return (data.results ?? []).filter((r) => r.previewUrl && /weeknd/i.test(r.artistName ?? ''))
}

function pickMatch(results: ITunesResult[], title: string): string | null {
  const want = normalize(title)
  const names = results.map((r) => ({ r, n: normalize(r.trackName ?? '') }))
  const hit =
    names.find((x) => x.n === want) ??
    names.find((x) => x.n.startsWith(want)) ??
    names.find((x) => x.n.includes(want))
  return hit?.r.previewUrl ?? null
}

function fetchPreview(track: Track): Promise<string | null> {
  const cached = previewCache.get(track.id)
  if (cached) return cached

  // Try the full title, then each half of "A / B" medley titles.
  const variants = [track.title, ...track.title.split('/').map((s) => s.trim())].filter(
    (v, i, arr) => v && arr.indexOf(v) === i,
  )

  const req = (async () => {
    try {
      for (const title of variants) {
        const url = pickMatch(await searchITunes(title), title)
        if (url) return url
      }
      return null
    } catch {
      previewCache.delete(track.id)
      return null
    }
  })()

  previewCache.set(track.id, req)
  return req
}

function stepTrack(track: Track, direction: 1 | -1) {
  const index = tracks.findIndex((t) => t.id === track.id)
  return tracks[(index + direction + tracks.length) % tracks.length]
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Track>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [activeEra, setActiveEra] = useState<string | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const loadedTrackId = useRef<string | null>(null)
  const isPlayingRef = useRef(false)
  isPlayingRef.current = isPlaying
  const skipStreak = useRef(0)
  const skipTimer = useRef<number | null>(null)

  // One shared audio element for the app lifetime.
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'auto'
    audioRef.current = audio
    // Exposed for smoke tests / debugging; harmless in production.
    ;(window as Window & { __ahtdAudio?: HTMLAudioElement }).__ahtdAudio = audio

    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onEnded = () => {
      setProgress(0)
      setCurrent((t) => stepTrack(t, 1))
      setIsPlaying(true)
    }
    const onError = () => {
      setError('Preview unavailable')
      setIsPlaying(false)
      setIsLoading(false)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  // Load the preview when the track changes; play/pause when isPlaying changes.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    let cancelled = false

    async function sync(el: HTMLAudioElement) {
      if (loadedTrackId.current !== current.id) {
        el.pause()
        setProgress(0)
        setError(null)
        setIsLoading(true)
        const src = await fetchPreview(current)
        if (cancelled) return
        setIsLoading(false)
        loadedTrackId.current = current.id
        if (!src) {
          el.removeAttribute('src')
          // No preview for this one — tell the user and move on to the next track
          // (bounded, so a run of misses can't loop forever).
          if (isPlayingRef.current && skipStreak.current < 3) {
            skipStreak.current += 1
            setError('No preview — skipping…')
            skipTimer.current = window.setTimeout(() => {
              setCurrent((t) => stepTrack(t, 1))
            }, 900)
          } else {
            skipStreak.current = 0
            setError('Preview unavailable')
            setIsPlaying(false)
          }
          return
        }
        skipStreak.current = 0
        el.src = src
      }

      if (!el.src) return

      if (isPlayingRef.current) {
        try {
          await el.play()
        } catch {
          // Autoplay blocked or load aborted — reflect reality in the UI.
          if (!cancelled) setIsPlaying(false)
        }
      } else {
        el.pause()
      }
    }

    void sync(audio)
    return () => {
      cancelled = true
      if (skipTimer.current) {
        window.clearTimeout(skipTimer.current)
        skipTimer.current = null
      }
    }
  }, [current, isPlaying])

  const play = useCallback((track: Track) => {
    setCurrent(track)
    setIsPlaying(true)
  }, [])

  const toggle = useCallback(() => setIsPlaying((p) => !p), [])
  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  const step = useCallback((direction: 1 | -1) => {
    setCurrent((track) => stepTrack(track, direction))
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
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle, next, prev, surpriseMe, toggleFavorite, toggleMute, current.id])

  const accent = useMemo(() => eraAccent(current.era), [current.era])

  const value = useMemo<PlayerState>(
    () => ({
      current,
      isPlaying,
      isLoading,
      error,
      muted,
      progress,
      favorites,
      activeEra,
      accent,
      play,
      toggle,
      toggleMute,
      next,
      prev,
      surpriseMe,
      toggleFavorite,
      isFavorite,
      setActiveEra,
      isGlitching,
    }),
    [
      current,
      isPlaying,
      isLoading,
      error,
      muted,
      progress,
      favorites,
      activeEra,
      accent,
      play,
      toggle,
      toggleMute,
      next,
      prev,
      surpriseMe,
      toggleFavorite,
      isFavorite,
      isGlitching,
    ],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
