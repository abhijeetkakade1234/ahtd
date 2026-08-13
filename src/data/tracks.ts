export type Track = {
  id: string
  title: string
  album: string
  year: number
  era: string
  vibes: string[]
  artwork: string
  spotifyUrl?: string
  youtubeUrl?: string
  youtubeMusicUrl?: string
}

function links(title: string) {
  const q = encodeURIComponent(`The Weeknd ${title}`)
  return {
    spotifyUrl: `https://open.spotify.com/search/${q}`,
    youtubeUrl: `https://www.youtube.com/results?search_query=${q}`,
    youtubeMusicUrl: `https://music.youtube.com/search?q=${q}`,
  }
}

const albumArtwork: Record<string, string> = {
  'House Of Balloons': '/albums/house-of-balloons.png',
  Thursday: '/albums/thursday.png',
  'Echoes Of Silence': '/albums/echoes-of-silence.png',
  'Kiss Land': '/albums/kiss-land.png',
  'Beauty Behind The Madness': '/albums/beauty-behind-the-madness.png',
  Starboy: '/albums/starboy.png',
  'My Dear Melancholy,': '/albums/my-dear-melancholy.jpg',
  'After Hours': '/albums/after-hours.png',
  'Dawn FM': '/albums/dawn-fm.png',
  'Hurry Up Tomorrow': '/albums/hurry-up-tomorrow.png',
}

type Seed = {
  title: string
  album: string
  year: number
  era: string
  vibes: string[]
}

const seeds: Seed[] = [
  // Trilogy — 2011
  { title: 'High For This', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['2am', 'xo'] },
  { title: 'Wicked Games', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['heartbreak', '2am'] },
  { title: 'The Morning', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['2am', 'memories'] },
  { title: 'House Of Balloons / Glass Table Girls', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['xo', 'dance'] },
  { title: 'The Zone', album: 'Thursday', year: 2011, era: 'trilogy', vibes: ['2am', 'drive'] },
  { title: 'Twenty Eight', album: 'Echoes Of Silence', year: 2011, era: 'trilogy', vibes: ['heartbreak', 'memories'] },
  { title: 'Rolling Stone', album: 'Echoes Of Silence', year: 2011, era: 'trilogy', vibes: ['xo', 'drive'] },

  // Kiss Land — 2013
  { title: 'Kiss Land', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['2am', 'xo'] },
  { title: 'Belong To The World', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['dance', 'drive'] },
  { title: 'Wanderlust', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['drive', 'dance'] },
  { title: 'Live For', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['dance', 'xo'] },
  { title: 'Pretty', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['heartbreak', '2am'] },

  // Beauty Behind The Madness — 2015
  { title: 'Real Life', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['memories', 'drive'] },
  { title: 'Often', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['xo', 'dance'] },
  { title: 'The Hills', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['xo', 'after-hours'] },
  { title: "Can't Feel My Face", album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['dance'] },
  { title: 'In The Night', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['dance', '2am'] },
  { title: 'As You Are', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['heartbreak', '2am'] },

  // Starboy — 2016
  { title: 'Starboy', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['drive', 'dance'] },
  { title: 'Party Monster', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['2am', 'xo'] },
  { title: 'False Alarm', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['dance'] },
  { title: 'Reminder', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['xo', 'dance'] },
  { title: "Rockin'", album: 'Starboy', year: 2016, era: 'starboy', vibes: ['dance', 'drive'] },
  { title: 'Secrets', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['drive', 'memories'] },
  { title: 'True Colors', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['2am', 'heartbreak'] },
  { title: 'I Feel It Coming', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['drive', 'dawn'] },

  // My Dear Melancholy — 2018
  { title: 'Call Out My Name', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', '2am'] },
  { title: 'Try Me', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', 'xo'] },
  { title: 'Wasted Times', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', 'drive'] },
  { title: 'I Was Never There', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['2am', 'memories'] },
  { title: 'Hurt You', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak'] },
  { title: 'Privilege', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', '2am'] },

  // After Hours — 2020
  { title: 'Alone Again', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['2am', 'after-hours'] },
  { title: 'Too Late', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['heartbreak', 'after-hours'] },
  { title: 'Hardest To Love', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['heartbreak'] },
  { title: 'Scared To Live', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['memories', '2am'] },
  { title: 'Snowchild', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['memories', 'drive'] },
  { title: 'Escape From LA', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['2am', 'xo'] },
  { title: 'Heartless', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['xo', 'dance'] },
  { title: 'Faith', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['after-hours', '2am'] },
  { title: 'Blinding Lights', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['drive', 'dance'] },
  { title: 'In Your Eyes', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['dance', 'drive'] },
  { title: 'Save Your Tears', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['heartbreak', 'dance'] },
  { title: 'After Hours', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['after-hours', '2am'] },
  { title: 'Until I Bleed Out', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['after-hours', 'dawn'] },

  // Dawn FM — 2022
  { title: 'Dawn FM', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dawn', '2am'] },
  { title: 'Gasoline', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['xo', 'after-hours'] },
  { title: 'How Do I Make You Love Me?', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', 'dance'] },
  { title: 'Take My Breath', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dance', 'xo'] },
  { title: 'Sacrifice', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dance', 'drive'] },
  { title: 'Out Of Time', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['memories', 'drive'] },
  { title: "Here We Go... Again", album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['drive', '2am'] },
  { title: 'Best Friends', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', 'memories'] },
  { title: 'Is There Someone Else?', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', '2am'] },
  { title: 'Starry Eyes', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dawn', 'memories'] },
  { title: "Don't Break My Heart", album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', 'dance'] },
  { title: 'Less Than Zero', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['memories', 'dawn'] },
  { title: 'Phantom Regret By Jim', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dawn'] },

  // Hurry Up Tomorrow — 2025
  { title: 'Wake Me Up', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dawn', '2am'] },
  { title: 'Cry For Me', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['heartbreak', 'xo'] },
  { title: 'Enjoy The Show', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dance', 'xo'] },
  { title: 'Baptized In Fear', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['2am', 'after-hours'] },
  { title: 'Open Hearts', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['drive', 'memories'] },
  { title: 'Timeless', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['drive', 'dance'] },
  { title: 'Niagara Falls', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['memories', 'dawn'] },
  { title: 'São Paulo', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dance'] },
  { title: 'Hurry Up Tomorrow', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dawn', 'after-hours'] },
]

export const tracks: Track[] = seeds.map((s, i) => ({
  id: `t${i + 1}`,
  title: s.title,
  album: s.album,
  year: s.year,
  era: s.era,
  vibes: s.vibes,
  artwork: albumArtwork[s.album] ?? '/albums/after-hours.png',
  ...links(s.title),
}))
