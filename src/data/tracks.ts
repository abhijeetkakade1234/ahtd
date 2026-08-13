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

function art(from: string, to: string, angle = 145) {
  return `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`
}

type Seed = {
  title: string
  album: string
  year: number
  era: string
  vibes: string[]
  artwork: string
}

const seeds: Seed[] = [
  // Trilogy — 2011
  { title: 'High For This', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['2am', 'xo'], artwork: art('#3a3a3a', '#0a0a0a') },
  { title: 'Wicked Games', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['heartbreak', '2am'], artwork: art('#4a3a3a', '#0a0505') },
  { title: 'The Morning', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['2am', 'memories'], artwork: art('#33302c', '#08070a') },
  { title: 'House Of Balloons / Glass Table Girls', album: 'House Of Balloons', year: 2011, era: 'trilogy', vibes: ['xo', 'dance'], artwork: art('#403838', '#0c0808') },
  { title: 'The Zone', album: 'Thursday', year: 2011, era: 'trilogy', vibes: ['2am', 'drive'], artwork: art('#2f2f38', '#07070c') },
  { title: 'Twenty Eight', album: 'Echoes Of Silence', year: 2011, era: 'trilogy', vibes: ['heartbreak', 'memories'], artwork: art('#392f2f', '#0a0707') },
  { title: 'Rolling Stone', album: 'Echoes Of Silence', year: 2011, era: 'trilogy', vibes: ['xo', 'drive'], artwork: art('#302f2f', '#080808') },

  // Kiss Land — 2013
  { title: 'Kiss Land', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['2am', 'xo'], artwork: art('#1f3324', '#050a06') },
  { title: 'Belong To The World', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['dance', 'drive'], artwork: art('#233d29', '#060c07') },
  { title: 'Wanderlust', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['drive', 'dance'], artwork: art('#1c3020', '#040805') },
  { title: 'Live For', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['dance', 'xo'], artwork: art('#274430', '#060c07') },
  { title: 'Pretty', album: 'Kiss Land', year: 2013, era: 'kiss-land', vibes: ['heartbreak', '2am'], artwork: art('#1d2f22', '#040705') },

  // Beauty Behind The Madness — 2015
  { title: 'Real Life', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['memories', 'drive'], artwork: art('#3a0a10', '#0a0203') },
  { title: 'Often', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['xo', 'dance'], artwork: art('#420c14', '#0a0203') },
  { title: 'The Hills', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['xo', 'after-hours'], artwork: art('#4a0e16', '#0a0203') },
  { title: "Can't Feel My Face", album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['dance'], artwork: art('#3e0d13', '#0a0203') },
  { title: 'In The Night', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['dance', '2am'], artwork: art('#350b10', '#080203') },
  { title: 'As You Are', album: 'Beauty Behind The Madness', year: 2015, era: 'beauty-behind-the-madness', vibes: ['heartbreak', '2am'], artwork: art('#2f0a0f', '#070202') },

  // Starboy — 2016
  { title: 'Starboy', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['drive', 'dance'], artwork: art('#1c1c1c', '#3a0a0a') },
  { title: 'Party Monster', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['2am', 'xo'], artwork: art('#171717', '#300808') },
  { title: 'False Alarm', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['dance'], artwork: art('#1a1a1a', '#360909') },
  { title: 'Reminder', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['xo', 'dance'], artwork: art('#161616', '#2c0808') },
  { title: "Rockin'", album: 'Starboy', year: 2016, era: 'starboy', vibes: ['dance', 'drive'], artwork: art('#1e1e1e', '#3a0a0a') },
  { title: 'Secrets', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['drive', 'memories'], artwork: art('#191919', '#320909') },
  { title: 'True Colors', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['2am', 'heartbreak'], artwork: art('#151515', '#2a0707') },
  { title: 'I Feel It Coming', album: 'Starboy', year: 2016, era: 'starboy', vibes: ['drive', 'dawn'], artwork: art('#202020', '#3c0b0b') },

  // My Dear Melancholy — 2018
  { title: 'Call Out My Name', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', '2am'], artwork: art('#131a20', '#050809') },
  { title: 'Try Me', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', 'xo'], artwork: art('#101820', '#040708') },
  { title: 'Wasted Times', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', 'drive'], artwork: art('#141b21', '#050809') },
  { title: 'I Was Never There', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['2am', 'memories'], artwork: art('#0f161c', '#030607') },
  { title: 'Hurt You', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak'], artwork: art('#121a20', '#040708') },
  { title: 'Privilege', album: 'My Dear Melancholy,', year: 2018, era: 'my-dear-melancholy', vibes: ['heartbreak', '2am'], artwork: art('#0d141a', '#030506') },

  // After Hours — 2020
  { title: 'Alone Again', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['2am', 'after-hours'], artwork: art('#3a0509', '#080001') },
  { title: 'Too Late', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['heartbreak', 'after-hours'], artwork: art('#40060a', '#080001') },
  { title: 'Hardest To Love', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['heartbreak'], artwork: art('#360509', '#070001') },
  { title: 'Scared To Live', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['memories', '2am'], artwork: art('#320409', '#070001') },
  { title: 'Snowchild', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['memories', 'drive'], artwork: art('#3c0509', '#080001') },
  { title: 'Escape From LA', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['2am', 'xo'], artwork: art('#420509', '#090001') },
  { title: 'Heartless', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['xo', 'dance'], artwork: art('#4a060a', '#090001') },
  { title: 'Faith', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['after-hours', '2am'], artwork: art('#38050a', '#070001') },
  { title: 'Blinding Lights', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['drive', 'dance'], artwork: art('#5a070c', '#0a0001') },
  { title: 'In Your Eyes', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['dance', 'drive'], artwork: art('#4e060b', '#090001') },
  { title: 'Save Your Tears', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['heartbreak', 'dance'], artwork: art('#440509', '#080001') },
  { title: 'After Hours', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['after-hours', '2am'], artwork: art('#500609', '#090001') },
  { title: 'Until I Bleed Out', album: 'After Hours', year: 2020, era: 'after-hours', vibes: ['after-hours', 'dawn'], artwork: art('#300409', '#060001') },

  // Dawn FM — 2022
  { title: 'Dawn FM', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dawn', '2am'], artwork: art('#2a2620', '#08070a') },
  { title: 'Gasoline', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['xo', 'after-hours'], artwork: art('#28241e', '#070609') },
  { title: 'How Do I Make You Love Me?', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', 'dance'], artwork: art('#2c2822', '#08070a') },
  { title: 'Take My Breath', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dance', 'xo'], artwork: art('#302c25', '#09080a') },
  { title: 'Sacrifice', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dance', 'drive'], artwork: art('#26221c', '#070609') },
  { title: 'Out Of Time', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['memories', 'drive'], artwork: art('#2e2a23', '#08070a') },
  { title: "Here We Go... Again", album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['drive', '2am'], artwork: art('#242019', '#060509') },
  { title: 'Best Friends', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', 'memories'], artwork: art('#221e18', '#060509') },
  { title: 'Is There Someone Else?', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', '2am'], artwork: art('#282419', '#070609') },
  { title: 'Starry Eyes', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dawn', 'memories'], artwork: art('#302a1e', '#08070a') },
  { title: "Don't Break My Heart", album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['heartbreak', 'dance'], artwork: art('#26201a', '#060509') },
  { title: 'Less Than Zero', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['memories', 'dawn'], artwork: art('#2a241c', '#07060a') },
  { title: 'Phantom Regret By Jim', album: 'Dawn FM', year: 2022, era: 'dawn-fm', vibes: ['dawn'], artwork: art('#201c16', '#050408') },

  // Hurry Up Tomorrow — 2025
  { title: 'Wake Me Up', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dawn', '2am'], artwork: art('#241a05', '#060401') },
  { title: 'Cry For Me', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['heartbreak', 'xo'], artwork: art('#2a1e06', '#070501') },
  { title: 'Enjoy The Show', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dance', 'xo'], artwork: art('#2e2107', '#070501') },
  { title: 'Baptized In Fear', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['2am', 'after-hours'], artwork: art('#221804', '#060401') },
  { title: 'Open Hearts', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['drive', 'memories'], artwork: art('#261c05', '#060401') },
  { title: 'Timeless', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['drive', 'dance'], artwork: art('#2c2006', '#070501') },
  { title: 'Niagara Falls', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['memories', 'dawn'], artwork: art('#201703', '#050301') },
  { title: 'São Paulo', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dance'], artwork: art('#302307', '#080501') },
  { title: 'Hurry Up Tomorrow', album: 'Hurry Up Tomorrow', year: 2025, era: 'hurry-up-tomorrow', vibes: ['dawn', 'after-hours'], artwork: art('#1e1503', '#050301') },
]

export const tracks: Track[] = seeds.map((s, i) => ({
  id: `t${i + 1}`,
  title: s.title,
  album: s.album,
  year: s.year,
  era: s.era,
  vibes: s.vibes,
  artwork: s.artwork,
  ...links(s.title),
}))
