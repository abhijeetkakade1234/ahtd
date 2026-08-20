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

type Engine = 'youtube' | 'preview' | 'none'

type PlayerState = {
  current: Track
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  engine: Engine
  muted: boolean
  progress: number
  duration: number
  favorites: Set<string>
  activeEra: string | null
  accent: string
  /** Play a track; pass the list it came from so Next/Prev walk that list. */
  play: (track: Track, queue?: Track[]) => void
  toggle: () => void
  toggleMute: () => void
  seek: (fraction: number) => void
  /** Document Picture-in-Picture: pop the video out so it keeps playing over other tabs/apps. */
  popOut: () => Promise<void>
  pipActive: boolean
  shuffle: boolean
  toggleShuffle: () => void
  setShuffle: (on: boolean) => void
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

// The list Next/Prev walk through. Defaults to the full catalogue; set by play().
let queue: Track[] = tracks

function stepTrack(track: Track, direction: 1 | -1) {
  const list = queue.length ? queue : tracks
  const index = list.findIndex((t) => t.id === track.id)
  if (index === -1) return list[0]
  return list[(index + direction + list.length) % list.length]
}

/* ------------------------------------------------------------------ */
/* Smart shuffle                                                       */
/* ------------------------------------------------------------------ */
/**
 * Not a coin flip. Every candidate is scored against the track that just played:
 *  - no repeats until the whole pool has been heard once
 *  - flows: prefers a shared mood (vibe) with what's playing
 *  - avoids the same album back-to-back, gently prefers staying in the era
 *  - favourites come round more often, the last few plays come round less
 *  - every ~6th pick is a deliberate "era jump" so it never gets samey
 * Then a weighted draw, so it's still surprising.
 */
type ShuffleCtx = {
  played: Set<string>
  history: Track[]
  favorites: Set<string>
  sinceJump: number
}

function pickSmart(from: Track | null, pool: Track[], ctx: ShuffleCtx, forceJump = false): Track | null {
  if (!pool.length) return null
  let candidates = pool.filter((t) => !ctx.played.has(t.id) && t.id !== from?.id)
  if (!candidates.length) {
    ctx.played.clear()
    candidates = pool.filter((t) => t.id !== from?.id)
    if (!candidates.length) candidates = pool
  }
  const jump = forceJump || ctx.sinceJump >= 5 + Math.floor(Math.random() * 3)
  const recent = new Set(ctx.history.slice(-8).map((t) => t.id))

  const weighted = candidates.map((t) => {
    let w = 1
    if (from) {
      const sharesVibe = t.vibes.some((v) => from.vibes.includes(v))
      const sameEra = t.era === from.era
      const sameAlbum = t.album === from.album
      if (jump) {
        w += sameEra ? -0.7 : 2.2
      } else {
        if (sharesVibe) w += 1.6
        if (sameEra) w += 0.4
        if (sameAlbum) w -= 0.9
      }
    }
    if (ctx.favorites.has(t.id)) w += 1.2
    if (recent.has(t.id)) w -= 0.8
    if (t.deluxe) w -= 0.3 // bonus cuts a little rarer
    return { t, w: Math.max(0.05, w) }
  })

  const total = weighted.reduce((s, c) => s + c.w, 0)
  let r = Math.random() * total
  let pick = weighted[weighted.length - 1].t
  for (const c of weighted) {
    r -= c.w
    if (r <= 0) {
      pick = c.t
      break
    }
  }
  ctx.sinceJump = jump ? 0 : ctx.sinceJump + 1
  return pick
}

/* ------------------------------------------------------------------ */
/* YouTube IFrame API — full-length official uploads                   */
/* ------------------------------------------------------------------ */

type YTPlayer = {
  loadVideoById: (id: string | { videoId: string; startSeconds?: number }) => void
  cueVideoById: (id: string | { videoId: string; startSeconds?: number }) => void
  playVideo: () => void
  pauseVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  mute: () => void
  unMute: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  destroy: () => void
}
type YTNamespace = {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer
  PlayerState: { ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 }
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
    __ahtdAudio?: HTMLAudioElement
    __ahtdYT?: YTPlayer
    documentPictureInPicture?: {
      requestWindow: (opts?: { width?: number; height?: number }) => Promise<Window>
      window: Window | null
    }
  }
}

export const supportsPopOut = typeof window !== 'undefined' && 'documentPictureInPicture' in window

let ytReady: Promise<YTNamespace> | null = null
function loadYouTubeApi(): Promise<YTNamespace> {
  if (ytReady) return ytReady
  ytReady = new Promise<YTNamespace>((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      if (window.YT) resolve(window.YT)
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    s.async = true
    s.onerror = () => reject(new Error('YouTube API failed to load'))
    document.head.appendChild(s)
    window.setTimeout(() => reject(new Error('YouTube API timeout')), 15000)
  })
  ytReady.catch(() => {
    ytReady = null
  })
  return ytReady
}

/* ------------------------------------------------------------------ */
/* iTunes 30s previews — fallback when a video can't be embedded       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Track>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [engine, setEngine] = useState<Engine>('none')
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [activeEra, setActiveEra] = useState<string | null>(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const [shuffle, setShuffleState] = useState(false)
  const shuffleRef = useRef(false)
  shuffleRef.current = shuffle
  const favoritesRef = useRef<Set<string>>(new Set())
  const shuffleCtx = useRef<ShuffleCtx>({ played: new Set(), history: [], favorites: new Set(), sinceJump: 0 })
  // Bumped when a YouTube video fails so the sync effect re-runs with the fallback.
  const [fallbackTick, setFallbackTick] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ytRef = useRef<YTPlayer | null>(null)
  const ytCreating = useRef<Promise<YTPlayer> | null>(null)
  const ytFailed = useRef<Set<string>>(new Set()) // track ids whose video can't embed
  const loadedKey = useRef<string | null>(null) // `${engine}:${trackId}` currently loaded
  const currentRef = useRef(current)
  currentRef.current = current
  const isPlayingRef = useRef(false)
  isPlayingRef.current = isPlaying
  const mutedRef = useRef(false)
  mutedRef.current = muted
  const skipStreak = useRef(0)
  const skipTimer = useRef<number | null>(null)
  // Document PiP: a second YT player living in the pop-out window. While it exists it is
  // the active engine and the hidden main player stays paused.
  const pipRef = useRef<YTPlayer | null>(null)
  const pipWinRef = useRef<Window | null>(null)
  const [pipActive, setPipActive] = useState(false)
  const pendingStart = useRef<number | null>(null) // seconds to resume at after a hand-over

  /** Next track: smart pick when shuffle is on, otherwise the next row in the list. */
  const nextTrack = useCallback((from: Track, forceJump = false): Track => {
    if (!shuffleRef.current && !forceJump) return stepTrack(from, 1)
    const ctx = shuffleCtx.current
    ctx.favorites = favoritesRef.current
    const pool = queue.length ? queue : tracks
    const pick = pickSmart(from, pool, ctx, forceJump) ?? stepTrack(from, 1)
    ctx.played.add(from.id)
    ctx.played.add(pick.id)
    ctx.history.push(from)
    if (ctx.history.length > 200) ctx.history.shift()
    return pick
  }, [])

  const advance = useCallback(() => {
    setProgress(0)
    setCurrent(nextTrack(currentRef.current))
    setIsPlaying(true)
  }, [nextTrack])

  /* ---------- <audio> for previews ---------- */
  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'auto'
    audioRef.current = audio
    window.__ahtdAudio = audio

    const onTime = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration)
        setDuration(audio.duration)
      }
    }
    const onError = () => {
      setError('Preview unavailable')
      setIsPlaying(false)
      setIsLoading(false)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', advance)
    audio.addEventListener('error', onError)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', advance)
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [advance])

  /* ---------- shared event wiring for any YT player (main or pop-out) ---------- */
  const ytEvents = useCallback(
    (YT: YTNamespace, getPlayer: () => YTPlayer | null) => ({
      onStateChange: (e: { data: number }) => {
        const S = YT.PlayerState
        const p = getPlayer()
        if (e.data === S.ENDED) advance()
        else if (e.data === S.PLAYING) {
          setIsLoading(false)
          setError(null)
          if (p) setDuration(p.getDuration())
        } else if (e.data === S.BUFFERING) setIsLoading(true)
      },
      onError: () => {
        // 2/5/100/101/150 — bad id, removed, or embedding disabled. Fall back to preview.
        ytFailed.current.add(currentRef.current.id)
        loadedKey.current = null
        setFallbackTick((n) => n + 1)
      },
    }),
    [advance],
  )

  /* ---------- Document Picture-in-Picture pop-out ---------- */
  const popOut = useCallback(async () => {
    const dpip = window.documentPictureInPicture
    if (!dpip) return
    if (pipWinRef.current) {
      pipWinRef.current.focus()
      return
    }
    const track = currentRef.current
    if (!track.youtubeId) return
    const main = ytRef.current
    const startAt = main ? main.getCurrentTime() : 0

    const win = await dpip.requestWindow({ width: 420, height: 236 })
    pipWinRef.current = win
    const doc = win.document
    doc.title = `${track.title} — The Weeknd`
    doc.body.style.cssText = 'margin:0;background:#060505;overflow:hidden'
    const host = doc.createElement('div')
    host.style.cssText = 'position:fixed;inset:0'
    doc.body.appendChild(host)

    // The IFrame API must be loaded inside the pop-out document.
    const YT = await new Promise<YTNamespace>((resolve, reject) => {
      const w = win as Window & { YT?: YTNamespace; onYouTubeIframeAPIReady?: () => void }
      w.onYouTubeIframeAPIReady = () => w.YT && resolve(w.YT)
      const s = doc.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      s.onerror = () => reject(new Error('YouTube API failed in pop-out'))
      doc.head.appendChild(s)
      win.setTimeout(() => reject(new Error('pop-out timeout')), 15000)
    }).catch((err) => {
      win.close()
      pipWinRef.current = null
      throw err
    })

    main?.pauseVideo()
    let player: YTPlayer | null = null
    player = new YT.Player(host, {
      width: '100%',
      height: '100%',
      videoId: track.youtubeId,
      host: 'https://www.youtube-nocookie.com',
      playerVars: {
        autoplay: 1,
        start: Math.floor(startAt),
        controls: 1,
        rel: 0,
        playsinline: 1,
        iv_load_policy: 3,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          pipRef.current = player
          if (mutedRef.current) player?.mute()
          loadedKey.current = `yt:${track.id}`
          setPipActive(true)
          setEngine('youtube')
          if (isPlayingRef.current) player?.playVideo()
        },
        ...ytEvents(YT, () => player),
      },
    })

    // When the pop-out closes, hand playback back to the hidden main player at the same spot.
    win.addEventListener('pagehide', () => {
      let t = 0
      try {
        t = player?.getCurrentTime() ?? 0
      } catch {
        /* window already gone */
      }
      pipRef.current = null
      pipWinRef.current = null
      setPipActive(false)
      pendingStart.current = t
      loadedKey.current = null
      setFallbackTick((n) => n + 1) // re-run the sync effect against the main player
    })
  }, [ytEvents])

  /* ---------- YouTube player (lazy, created on first play) ---------- */
  const getYT = useCallback((): Promise<YTPlayer> => {
    if (ytRef.current) return Promise.resolve(ytRef.current)
    if (ytCreating.current) return ytCreating.current
    ytCreating.current = loadYouTubeApi().then(
      (YT) =>
        new Promise<YTPlayer>((resolve) => {
          let host = document.getElementById('yt-engine')
          if (!host) {
            host = document.createElement('div')
            host.id = 'yt-engine'
            // Must stay rendered (not display:none) or playback is throttled/blocked.
            host.style.cssText =
              'position:fixed;bottom:0;left:0;width:1px;height:1px;opacity:0.01;pointer-events:none;overflow:hidden;z-index:-1'
            document.body.appendChild(host)
          }
          const inner = document.createElement('div')
          host.appendChild(inner)
          const player = new YT.Player(inner, {
            width: '1',
            height: '1',
            host: 'https://www.youtube-nocookie.com',
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              rel: 0,
              playsinline: 1,
              iv_load_policy: 3,
              origin: window.location.origin,
            },
            events: {
              onReady: () => {
                ytRef.current = player
                window.__ahtdYT = player
                if (mutedRef.current) player.mute()
                resolve(player)
              },
              ...ytEvents(YT, () => (pipRef.current ? null : player)),
            },
          })
        }),
    )
    ytCreating.current.catch(() => {
      ytCreating.current = null
    })
    return ytCreating.current
  }, [ytEvents])

  /* ---------- progress polling for YouTube ---------- */
  useEffect(() => {
    if (engine !== 'youtube' || !isPlaying) return
    const id = window.setInterval(() => {
      const p = pipRef.current ?? ytRef.current
      if (!p) return
      const d = p.getDuration()
      if (d > 0) {
        setProgress(p.getCurrentTime() / d)
        setDuration(d)
      }
    }, 500)
    return () => window.clearInterval(id)
  }, [engine, isPlaying])

  /* ---------- mute ---------- */
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
    for (const p of [ytRef.current, pipRef.current]) {
      if (p) (muted ? p.mute : p.unMute).call(p)
    }
  }, [muted])

  /* ---------- core sync: track / isPlaying → engines ---------- */
  useEffect(() => {
    let cancelled = false
    const audio = audioRef.current
    const track = current
    const useYouTube = !!track.youtubeId && !ytFailed.current.has(track.id)

    async function syncYouTube(videoId: string) {
      // Silence the other engine.
      audio?.pause()
      const key = `yt:${track.id}`
      let player: YTPlayer
      try {
        setIsLoading(true)
        player = pipRef.current ?? (await getYT())
      } catch {
        if (cancelled) return
        ytFailed.current.add(track.id)
        setFallbackTick((n) => n + 1)
        return
      }
      if (cancelled) return
      setEngine('youtube')
      setError(null)
      if (loadedKey.current !== key) {
        loadedKey.current = key
        const startSeconds = pendingStart.current ?? 0
        pendingStart.current = null
        setProgress(0)
        if (isPlayingRef.current) player.loadVideoById({ videoId, startSeconds })
        else {
          player.cueVideoById({ videoId, startSeconds })
          setIsLoading(false)
        }
        return
      }
      if (isPlayingRef.current) player.playVideo()
      else {
        player.pauseVideo()
        setIsLoading(false)
      }
    }

    async function syncPreview() {
      if (!audio) return
      ytRef.current?.pauseVideo()
      const key = `pv:${track.id}`
      if (loadedKey.current !== key) {
        audio.pause()
        setProgress(0)
        setError(null)
        setIsLoading(true)
        const src = await fetchPreview(track)
        if (cancelled) return
        setIsLoading(false)
        loadedKey.current = key
        if (!src) {
          audio.removeAttribute('src')
          setEngine('none')
          if (isPlayingRef.current && skipStreak.current < 3) {
            skipStreak.current += 1
            setError('Not available — skipping…')
            skipTimer.current = window.setTimeout(() => setCurrent((t) => stepTrack(t, 1)), 900)
          } else {
            skipStreak.current = 0
            setError('Not available here')
            setIsPlaying(false)
          }
          return
        }
        skipStreak.current = 0
        audio.src = src
      }
      setEngine('preview')
      if (!audio.src) return
      if (isPlayingRef.current) {
        try {
          await audio.play()
        } catch {
          if (!cancelled) setIsPlaying(false)
        }
      } else audio.pause()
    }

    if (useYouTube) void syncYouTube(track.youtubeId as string)
    else void syncPreview()

    return () => {
      cancelled = true
      if (skipTimer.current) {
        window.clearTimeout(skipTimer.current)
        skipTimer.current = null
      }
    }
  }, [current, isPlaying, fallbackTick, getYT])

  /* ---------- public actions ---------- */
  const play = useCallback((track: Track, list?: Track[]) => {
    if (list?.length) queue = list
    setCurrent(track)
    setIsPlaying(true)
  }, [])

  const toggle = useCallback(() => setIsPlaying((p) => !p), [])
  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  const seek = useCallback(
    (fraction: number) => {
      const f = Math.min(1, Math.max(0, fraction))
      const yt = pipRef.current ?? ytRef.current
      if (engine === 'youtube' && yt) {
        yt.seekTo(f * yt.getDuration(), true)
      } else if (engine === 'preview' && audioRef.current?.duration) {
        audioRef.current.currentTime = f * audioRef.current.duration
      }
      setProgress(f)
    },
    [engine],
  )

  favoritesRef.current = favorites

  const next = useCallback(() => {
    setCurrent(nextTrack(currentRef.current))
    setIsPlaying(true)
  }, [nextTrack])

  const prev = useCallback(() => {
    const ctx = shuffleCtx.current
    if (shuffleRef.current && ctx.history.length) {
      // Walk back through what actually played, not the list order.
      const back = ctx.history.pop() as Track
      ctx.played.delete(currentRef.current.id)
      setCurrent(back)
    } else {
      setCurrent((track) => stepTrack(track, -1))
    }
    setIsPlaying(true)
  }, [])

  const toggleShuffle = useCallback(() => {
    setShuffleState((s) => {
      if (!s) {
        // Fresh cycle each time shuffle is switched on.
        shuffleCtx.current.played = new Set([currentRef.current.id])
        shuffleCtx.current.sinceJump = 0
      }
      return !s
    })
  }, [])
  const setShuffle = useCallback((on: boolean) => {
    setShuffleState((s) => {
      if (on && !s) {
        shuffleCtx.current.played = new Set([currentRef.current.id])
        shuffleCtx.current.sinceJump = 0
      }
      return on
    })
  }, [])

  // Surprise Me = a forced era jump from the whole catalogue, using the same brain.
  const surpriseMe = useCallback(() => {
    setIsGlitching(true)
    const ctx = shuffleCtx.current
    ctx.favorites = favoritesRef.current
    const pick = pickSmart(currentRef.current, tracks, ctx, true) ?? tracks[0]
    ctx.played.add(pick.id)
    ctx.history.push(currentRef.current)
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
      } else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key.toLowerCase() === 'r') surpriseMe()
      else if (e.key.toLowerCase() === 'f') toggleFavorite(current.id)
      else if (e.key.toLowerCase() === 'm') toggleMute()
      else if (e.key.toLowerCase() === 's') toggleShuffle()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toggle, next, prev, surpriseMe, toggleFavorite, toggleMute, toggleShuffle, current.id])

  const accent = useMemo(() => eraAccent(current.era), [current.era])

  const value = useMemo<PlayerState>(
    () => ({
      current,
      isPlaying,
      isLoading,
      error,
      engine,
      muted,
      progress,
      duration,
      favorites,
      activeEra,
      accent,
      play,
      toggle,
      toggleMute,
      seek,
      popOut,
      pipActive,
      shuffle,
      toggleShuffle,
      setShuffle,
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
      engine,
      muted,
      progress,
      duration,
      favorites,
      activeEra,
      accent,
      play,
      toggle,
      toggleMute,
      seek,
      popOut,
      pipActive,
      shuffle,
      toggleShuffle,
      setShuffle,
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
