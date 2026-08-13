export type Era = {
  id: string
  year: number
  name: string
  accent: string
  bg: string
  mood: string
  artwork: string
}

export const eras: Era[] = [
  {
    id: 'trilogy',
    year: 2011,
    name: 'Trilogy',
    accent: '#8a8a8a',
    bg: 'radial-gradient(ellipse at 30% 20%, #2a2a2a 0%, #050505 70%)',
    mood: 'black · grain · dirty film texture · deep shadows',
    artwork: '/albums/house-of-balloons.png',
  },
  {
    id: 'kiss-land',
    year: 2013,
    name: 'Kiss Land',
    accent: '#4f7a5a',
    bg: 'radial-gradient(ellipse at 70% 30%, #14251a 0%, #030503 75%)',
    mood: 'green · dark · strange · industrial',
    artwork: '/albums/kiss-land.png',
  },
  {
    id: 'beauty-behind-the-madness',
    year: 2015,
    name: 'Beauty Behind The Madness',
    accent: '#8a1620',
    bg: 'radial-gradient(ellipse at 50% 40%, #2a0508 0%, #050202 75%)',
    mood: 'crimson · cinematic red-black · moody',
    artwork: '/albums/beauty-behind-the-madness.png',
  },
  {
    id: 'starboy',
    year: 2016,
    name: 'Starboy',
    accent: '#c62828',
    bg: 'linear-gradient(160deg, #0a0a0a 0%, #1c1c1c 55%, #2a0a0a 100%)',
    mood: 'black · chrome · red',
    artwork: '/albums/starboy.png',
  },
  {
    id: 'my-dear-melancholy',
    year: 2018,
    name: 'My Dear Melancholy,',
    accent: '#5c6b7a',
    bg: 'radial-gradient(ellipse at 40% 60%, #0e141a 0%, #030405 75%)',
    mood: 'icy blue-grey · cold · minimal · sorrow',
    artwork: '/albums/my-dear-melancholy.jpg',
  },
  {
    id: 'after-hours',
    year: 2020,
    name: 'After Hours',
    accent: '#b30f22',
    bg: 'radial-gradient(ellipse at 50% 30%, #3a0509 0%, #050001 75%)',
    mood: 'deep red · night · neon · city',
    artwork: '/albums/after-hours.png',
  },
  {
    id: 'dawn-fm',
    year: 2022,
    name: 'Dawn FM',
    accent: '#c9a86a',
    bg: 'linear-gradient(160deg, #1a1a1e 0%, #302c26 55%, #050505 100%)',
    mood: 'chrome · radio · white light · dreamlike',
    artwork: '/albums/dawn-fm.png',
  },
  {
    id: 'hurry-up-tomorrow',
    year: 2025,
    name: 'Hurry Up Tomorrow',
    accent: '#d4af37',
    bg: 'radial-gradient(ellipse at 50% 50%, #241a05 0%, #030201 75%)',
    mood: 'surreal · futuristic · dark',
    artwork: '/albums/hurry-up-tomorrow.png',
  },
]
