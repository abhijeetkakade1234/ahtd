export type Vibe = {
  id: string
  name: string
  tagline: string
  accent: string
  bg: string
  artwork: string
}

export const vibes: Vibe[] = [
  {
    id: '2am',
    name: '2AM',
    tagline: 'songs for when everyone is asleep.',
    accent: '#6b7fa3',
    bg: 'radial-gradient(circle at 30% 30%, #10192b 0%, #030308 70%)',
    artwork: '/albums/house-of-balloons.webp',
  },
  {
    id: 'heartbreak',
    name: 'HEARTBREAK',
    tagline: "you know why you're here.",
    accent: '#a3324a',
    bg: 'radial-gradient(circle at 60% 40%, #2a0713 0%, #050203 70%)',
    artwork: '/albums/my-dear-melancholy.webp',
  },
  {
    id: 'drive',
    name: 'DRIVE',
    tagline: 'windows down. city lights.',
    accent: '#c9862f',
    bg: 'radial-gradient(circle at 40% 60%, #2b1a05 0%, #030201 70%)',
    artwork: '/albums/starboy.webp',
  },
  {
    id: 'xo',
    name: 'XO',
    tagline: 'the darker side.',
    accent: '#8a0f1a',
    bg: 'radial-gradient(circle at 50% 50%, #260306 0%, #020000 70%)',
    artwork: '/albums/echoes-of-silence.webp',
  },
  {
    id: 'dance',
    name: 'DANCE',
    tagline: "you don't need a reason.",
    accent: '#c9a832',
    bg: 'radial-gradient(circle at 55% 35%, #241d05 0%, #040301 70%)',
    artwork: '/albums/beauty-behind-the-madness.webp',
  },
  {
    id: 'memories',
    name: 'MEMORIES',
    tagline: 'songs that take you somewhere.',
    accent: '#8a7a5a',
    bg: 'radial-gradient(circle at 45% 45%, #1c160c 0%, #030202 70%)',
    artwork: '/albums/kiss-land.webp',
  },
  {
    id: 'after-hours',
    name: 'AFTER HOURS',
    tagline: 'for the nights that keep going.',
    accent: '#b30f22',
    bg: 'radial-gradient(circle at 50% 30%, #300308 0%, #040001 70%)',
    artwork: '/albums/after-hours.webp',
  },
  {
    id: 'dawn',
    name: 'DAWN',
    tagline: 'when the night finally ends.',
    accent: '#c9a86a',
    bg: 'radial-gradient(circle at 60% 20%, #221f18 0%, #050504 70%)',
    artwork: '/albums/dawn-fm.webp',
  },
]
