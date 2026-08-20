import type { Track } from './tracks'

export type GuestSong = {
  title: string
  youtubeId: string
  year: number
  credit: string // e.g. "The Weeknd feat. Playboi Carti"
}

export type Guest = {
  slug: string
  name: string
  role: string
  legs: string
  accent: string
  heroVideoId: string
  heroCaption: string
  bio: string[]
  songs: GuestSong[]
}

export const ytThumb = (id: string, size: 'hq' | 'maxres' = 'hq') =>
  `https://img.youtube.com/vi/${id}/${size === 'maxres' ? 'maxresdefault' : 'hqdefault'}.jpg`

export const guests: Guest[] = [
  {
    slug: 'mike-dean',
    name: 'Mike Dean',
    role: 'Producer · synths · opening set',
    legs: 'Every leg · 2022 → 2026',
    accent: '#c9a86a',
    heroVideoId: 'gjduVn8FSh4',
    heroCaption: 'Mike Dean live · San Antonio 2025',
    bio: [
      'The man behind the wall of modular synths. Mike Dean has been the sound of the After Hours Til Dawn tour since night one — opening the show with a solo synth set, then stepping on stage for the big moments: the Call Out My Name build, the Faith / After Hours sirens, the Moth To A Flame drop.',
      'Off stage he’s one of the most decorated producers alive — Kanye, Travis, Madonna, Beyoncé, Lana — and the co-architect of Hurry Up Tomorrow, where his analog textures run through the whole record.',
      'He’s the only name besides Abel’s that has been on every date of the tour.',
    ],
    songs: [
      { title: 'Wake Me Up', youtubeId: 'QNGCMgvcbpA', year: 2025, credit: 'The Weeknd & Justice · prod. Mike Dean' },
      { title: 'Cry For Me', youtubeId: 'ljxYE-aJD3A', year: 2025, credit: 'The Weeknd · prod. Mike Dean' },
      { title: 'Open Hearts', youtubeId: 'll6sBa3Dafs', year: 2025, credit: 'The Weeknd · prod. Mike Dean' },
      { title: 'Baptized In Fear', youtubeId: 'WH7L9e07uSQ', year: 2025, credit: 'The Weeknd · prod. Mike Dean' },
      { title: 'Call Out My Name (Live at SoFi)', youtubeId: 'xLeMvXEiNhw', year: 2023, credit: 'The Weeknd · Mike Dean on synths' },
    ],
  },
  {
    slug: 'playboi-carti',
    name: 'Playboi Carti',
    role: 'Special guest · stadium legs',
    legs: 'North America 2025 · Europe 2026',
    accent: '#b30f22',
    heroVideoId: 'SRVsesZamZw',
    heroCaption: 'Timeless · live from São Paulo 2024',
    bio: [
      'The loudest opener the tour has had. Carti joined the stadium run in 2025, turning the first hour of every night into a rage set before Abel walked out — and then coming back for Timeless, the Hurry Up Tomorrow single they share.',
      'The São Paulo livestream in September 2024 was the preview: 80,000 people, Carti on FE!N, Abel on Timeless, the whole thing broadcast live. It’s the night that set the tone for the 2025 and 2026 legs.',
      'Abel returned the favour on Carti’s MUSIC, singing the hook on RATHER LIE.',
    ],
    songs: [
      { title: 'Timeless', youtubeId: 'mX19AV35PhI', year: 2024, credit: 'The Weeknd & Playboi Carti' },
      { title: 'RATHER LIE', youtubeId: 'fYD7YsSRHOY', year: 2025, credit: 'Playboi Carti & The Weeknd' },
      { title: 'Timeless (Live From São Paulo)', youtubeId: 'SRVsesZamZw', year: 2024, credit: 'The Weeknd & Playboi Carti' },
    ],
  },
  {
    slug: 'travis-scott',
    name: 'Travis Scott',
    role: 'Surprise guest',
    legs: 'Chicago · Soldier Field 2025',
    accent: '#8a4b1f',
    heroVideoId: 'JhxJXOdm1ZY',
    heroCaption: 'Chicago night two · full stadium POV',
    bio: [
      'Not on the poster — that’s the point. Travis showed up unannounced on the second Chicago night of the 2025 leg, brought out mid-set, and the stadium footage from that night went everywhere within the hour.',
      'He and Abel go back to Astroworld: Wake Up is the closest thing to a Weeknd ballad on that album, Pray 4 Love opens JACKBOYS with Abel’s falsetto, and Circus Maximus closed the loop on Utopia.',
    ],
    songs: [
      { title: 'WAKE UP', youtubeId: 'FAO8ZAUBx0c', year: 2018, credit: 'Travis Scott feat. The Weeknd' },
      { title: 'Pray 4 Love', youtubeId: 'EivJ5hpQzms', year: 2019, credit: 'Travis Scott feat. The Weeknd' },
      { title: 'CIRCUS MAXIMUS', youtubeId: 'BwhRWpHxKdM', year: 2023, credit: 'Travis Scott feat. The Weeknd & Swae Lee' },
    ],
  },
  {
    slug: 'kavinsky',
    name: 'Kavinsky',
    role: 'Opening act',
    legs: 'North America 2022 · Europe 2023',
    accent: '#c62828',
    heroVideoId: 'N70DRo8_WwA',
    heroCaption: 'Odd Look feat. The Weeknd',
    bio: [
      'If After Hours sounds like a night drive, Kavinsky is why. The French producer’s Nightcall — the Drive soundtrack — is the blueprint for the whole red-jacket era, and Abel has said as much.',
      'They first worked together in 2013 on Odd Look, a Weeknd verse over a Kavinsky synth line that predates After Hours by seven years. Bringing him out as the opener for the 2022 and 2023 legs was Abel showing the receipts.',
    ],
    songs: [
      { title: 'Odd Look', youtubeId: 'N70DRo8_WwA', year: 2013, credit: 'Kavinsky feat. The Weeknd' },
    ],
  },
  {
    slug: 'anitta',
    name: 'Anitta',
    role: 'Guest · from Brazil',
    legs: 'São Paulo 2024 · San Antonio 2025',
    accent: '#2e9e6b',
    heroVideoId: 'zEqLXGE_re4',
    heroCaption: 'São Paulo · live from São Paulo 2024',
    bio: [
      'The São Paulo livestream needed a São Paulo moment, and Anitta delivered it — walking out at Morumbis to a home crowd for the first live performance of the Brazilian-funk single that carries her name’s city.',
      'She came back for the 2025 US leg in San Antonio, and the song has become one of the tour’s biggest crowd moments wherever she isn’t — the baile beat does the work on its own.',
    ],
    songs: [
      { title: 'São Paulo', youtubeId: 'AQ5NlI-SJR0', year: 2024, credit: 'The Weeknd feat. Anitta' },
      { title: 'São Paulo (Live From São Paulo)', youtubeId: 'zEqLXGE_re4', year: 2024, credit: 'The Weeknd & Anitta' },
    ],
  },
  {
    slug: 'kaytranada',
    name: 'KAYTRANADA',
    role: 'Opening act',
    legs: 'Toronto 2022 · Latin America 2023',
    accent: '#6b7fa3',
    heroVideoId: 'riROj9j0sn4',
    heroCaption: 'KAYTRANADA · Rogers Centre, Toronto 2022',
    bio: [
      'Toronto opening for Toronto. Kaytranada’s set at Rogers Centre was the hometown warm-up for the first leg, and he carried the opening slot across the Latin America run in 2023 — Mexico City, Guadalajara, Lima.',
      'His Out Of Time remix is the official flip — the Dawn FM single rebuilt as a house record, the version the tour crowd actually dances to.',
    ],
    songs: [
      { title: 'Out Of Time (KAYTRANADA Remix)', youtubeId: 'zuUNNu3z5Uk', year: 2022, credit: 'The Weeknd & KAYTRANADA' },
    ],
  },
  {
    slug: 'swedish-house-mafia',
    name: 'Swedish House Mafia',
    role: 'Coachella 2022 co-headliners',
    legs: 'The night the tour era started',
    accent: '#d4af37',
    heroVideoId: 'L8ZoGtAQ1mw',
    heroCaption: 'Coachella 2022 · full set',
    bio: [
      'Three weeks before the first After Hours Til Dawn date, Abel and Swedish House Mafia closed Coachella together — a replacement headline slot announced on a week’s notice that turned into the dress rehearsal for the whole tour.',
      'Moth To A Flame, their shared single, has been the encore drop on most nights since. The Coachella set is where the stage, the statue and the setlist first came together.',
    ],
    songs: [
      { title: 'Moth To A Flame', youtubeId: 'u9n7Cw-4_HQ', year: 2021, credit: 'Swedish House Mafia & The Weeknd' },
    ],
  },
  {
    slug: 'doja-cat',
    name: 'Doja Cat',
    role: 'Announced opener · North America 2022',
    legs: 'Withdrew before the first leg',
    accent: '#a3324a',
    heroVideoId: 'QeRsc6pqdEM',
    heroCaption: 'In Your Eyes (Remix) feat. Doja Cat',
    bio: [
      'Doja was billed as the main support for the 2022 North American leg, then had to pull out weeks before opening night for tonsil surgery. Kaytranada and Mike Dean covered the slot.',
      'The collaborations still stand: the In Your Eyes remix from the After Hours cycle, and You Right from Planet Her, where the two trade verses over a Dr. Luke beat.',
    ],
    songs: [
      { title: 'In Your Eyes (Remix)', youtubeId: 'ozMBCFd7fFM', year: 2020, credit: 'The Weeknd feat. Doja Cat' },
      { title: 'You Right', youtubeId: 'JXgV1rXUoME', year: 2021, credit: 'Doja Cat & The Weeknd' },
    ],
  },
  {
    slug: 'chxrry22',
    name: 'Chxrry22',
    role: 'XO Records · opening act',
    legs: 'Europe 2023 · Australia 2024',
    accent: '#8a1620',
    heroVideoId: '8B3ephrmnDk',
    heroCaption: 'Tour diaries · opening for The Weeknd',
    bio: [
      'The first woman signed to XO. Chxrry22 is from Scarborough, Toronto — same east end as Abel — and went from a 2022 EP to opening stadiums on the European and Australian legs within a year.',
      'No official duet yet. The Other Side is the XO release that got her the slot.',
    ],
    songs: [
      { title: 'The Other Side', youtubeId: 'QE7pHKzZZcY', year: 2022, credit: 'Chxrry22 · XO Records' },
    ],
  },
]

export function guestBySlug(slug: string) {
  return guests.find((g) => g.slug === slug)
}

/** Songs as Track objects so the shared player can play them. */
export function guestTracks(guest: Guest): Track[] {
  return guest.songs.map((s, i) => ({
    id: `guest-${guest.slug}-${i}`,
    title: s.title,
    album: s.credit,
    year: s.year,
    era: 'after-hours',
    vibes: [],
    artwork: ytThumb(s.youtubeId),
    youtubeId: s.youtubeId,
    youtubeUrl: `https://www.youtube.com/watch?v=${s.youtubeId}`,
  }))
}
