export type Album = {
  slug: string
  title: string
  era: string
  year: number
  released: string
  kind: 'mixtape' | 'album' | 'ep'
  artwork: string
  tagline: string
  /** For compilations (Trilogy): the source album names whose tracks belong here. */
  albumNames?: string[]
  story: string[]
  facts: { label: string; value: string }[]
  quote?: string
}

export const albums: Album[] = [
  {
    slug: 'trilogy',
    title: 'Trilogy',
    era: 'trilogy',
    year: 2012,
    released: 'November 13, 2012 · mixtapes: March / August / December 2011',
    kind: 'mixtape',
    artwork: '/albums/house-of-balloons.webp',
    tagline: 'three tapes, one year, a whole new sound.',
    albumNames: ['House Of Balloons', 'Thursday', 'Echoes Of Silence'],
    story: [
      'In 2011 an anonymous Toronto kid dropped three free mixtapes in nine months — House Of Balloons in March, Thursday in August, Echoes Of Silence on the winter solstice — and quietly invented a genre. No face, no name, no interviews; just a black-and-white photo of a girl in a room full of balloons and music that sounded like a horror film scored for a bedroom.',
      'House Of Balloons bent Beach House, Siouxsie and Cocteau Twins samples into something cold and dangerous — people called it PBR&B and everyone who came after had to deal with it. Thursday went darker and looser, a relationship that only exists one day a week, with Drake turning up on "The Zone". Echoes Of Silence closed the year with a re-imagined "Dirty Diana" and the naked piano of the title track.',
      'In November 2012 the three tapes were remastered and packaged as Trilogy — his first physical release, and the end of the anonymous era. A free mixtape run ended up on the Polaris shortlist and platinum plaques on the wall.',
    ],
    facts: [
      { label: 'Producers', value: 'Doc McKinney · Illangelo · Cirkut · Clams Casino' },
      { label: 'Length', value: '3 tapes · 30 tracks · 2h 30m' },
      { label: 'Key tracks', value: 'Wicked Games · The Zone · D.D. · Montreal' },
      { label: 'Legacy', value: 'Polaris shortlist · Trilogy went platinum' },
    ],
    quote: 'Bring your love baby, I could bring my shame.',
  },
  {
    slug: 'kiss-land',
    title: 'Kiss Land',
    era: 'kiss-land',
    year: 2013,
    released: 'September 10, 2013',
    kind: 'album',
    artwork: '/albums/kiss-land.webp',
    tagline: 'a horror movie about touring.',
    story: [
      'The official debut. Abel described the concept as a kind of horror film — Kiss Land is the place you end up when a kid from Toronto suddenly finds himself in Tokyo, Paris and Bangkok with everything available and nobody he knows. The green-and-black neon, the Japanese text, the John Carpenter synths: it was all built to feel foreign.',
      'Songs stretch to seven minutes. "Belong To The World" sampled Portishead without asking and caught a public scolding for it. "Wanderlust" was the first time he let himself make something that sounded like pop radio — a preview of what was coming.',
      'Critics were mixed at the time. Fans weren’t. A decade later it’s the cult record in the catalogue, the one people use as a password.',
    ],
    facts: [
      { label: 'Producers', value: 'DannyBoyStyles · Illangelo · Jason Quenneville' },
      { label: 'Length', value: '55:31 · 10 tracks' },
      { label: 'Key tracks', value: 'Kiss Land · Belong To The World · Wanderlust' },
      { label: 'Chart', value: '#2 Billboard 200' },
    ],
    quote: 'This ain’t nothing to relate to.',
  },
  {
    slug: 'beauty-behind-the-madness',
    title: 'Beauty Behind The Madness',
    era: 'beauty-behind-the-madness',
    year: 2015,
    released: 'August 28, 2015',
    kind: 'album',
    artwork: '/albums/beauty-behind-the-madness.webp',
    tagline: 'the moment the underground became the biggest thing on earth.',
    story: [
      'He made a decision: keep the darkness, lose the distance. Max Martin came in. "Can’t Feel My Face" turned a cocaine metaphor into a wedding-reception song. "The Hills" — a horror-movie scream of a single — hit #1 on the Hot 100 right after it. For a week he held #1 and #2 at the same time.',
      'The album is the bridge between the tapes and the stadiums. "Often" and "Tell Your Friends" are still Trilogy-cold; "In The Night" is Thriller-era pop done with real fear underneath. Lana Del Rey shows up on "Prisoner" and it sounds like two people who understand each other completely.',
      'Two Grammys. Seven million copies. The hair became a silhouette you could recognise from the back of an arena.',
    ],
    facts: [
      { label: 'Producers', value: 'Max Martin · Illangelo · Kanye West · DaHeala' },
      { label: 'Length', value: '65:07 · 14 tracks' },
      { label: 'Singles', value: 'Earned It · The Hills · Can’t Feel My Face' },
      { label: 'Awards', value: '2× Grammy · #1 Billboard 200' },
    ],
    quote: 'I only love it when you touch me, not feel me.',
  },
  {
    slug: 'starboy',
    title: 'Starboy',
    era: 'starboy',
    year: 2016,
    released: 'November 25, 2016',
    kind: 'album',
    artwork: '/albums/starboy.webp',
    tagline: 'he cut the hair. everything changed.',
    story: [
      'The video for the title track opens with the old Weeknd being suffocated with a plastic bag. New haircut, new cross, new car, Daft Punk on the hook. Starboy is about what fame does to the person who wanted it — boastful on the surface, sick of itself underneath.',
      'It’s the longest and most eclectic record he’s made: "Secrets" is a Tears For Fears / Romantics mash-up, "False Alarm" is punk, "Rockin’" is French house, "True Colors" is pure quiet-storm. Kendrick Lamar, Future and Lana all pass through. Daft Punk bookend it with "Starboy" and "I Feel It Coming", their last great pop moments.',
      'Grammy for Best Urban Contemporary Album. A #1 single on both ends. The red jacket era — Legend of the Fall tour — started here.',
    ],
    facts: [
      { label: 'Producers', value: 'Daft Punk · Doc McKinney · Cirkut · Metro Boomin' },
      { label: 'Length', value: '68:25 · 18 tracks' },
      { label: 'Singles', value: 'Starboy · I Feel It Coming · Reminder · Party Monster' },
      { label: 'Awards', value: 'Grammy · #1 Billboard 200 · Juno Album of the Year' },
    ],
    quote: 'Look what you’ve done — I’m a motherf***in’ starboy.',
  },
  {
    slug: 'my-dear-melancholy',
    title: 'My Dear Melancholy,',
    era: 'my-dear-melancholy',
    year: 2018,
    released: 'March 30, 2018',
    kind: 'ep',
    artwork: '/albums/my-dear-melancholy.webp',
    tagline: 'six songs. one comma. no closure.',
    story: [
      'Announced the night before. Six tracks, twenty-two minutes, the comma in the title hanging like the start of a letter he never finished. After two years of stadium pop, this was a hard cut back to the Trilogy palette — cold synths, Gesaffelstein on two tracks, every song addressed to someone who’s no longer there.',
      '"Call Out My Name" is the centrepiece: a waltz-time ballad that sounds like it was recorded in an empty room at 4am. "I Was Never There" turns a Gesaffelstein siren into a breakdown. The EP doesn’t resolve; it just stops.',
      'It debuted at #1 anyway. Fans treat it as the secret fourth tape.',
    ],
    facts: [
      { label: 'Producers', value: 'Frank Dukes · Gesaffelstein · Skrillex · DaHeala' },
      { label: 'Length', value: '21:52 · 6 tracks' },
      { label: 'Key tracks', value: 'Call Out My Name · I Was Never There · Wasted Times' },
      { label: 'Chart', value: '#1 Billboard 200 — shortest #1 in years' },
    ],
    quote: 'I said I didn’t feel nothing, baby, but I lied.',
  },
  {
    slug: 'after-hours',
    title: 'After Hours',
    era: 'after-hours',
    year: 2020,
    released: 'March 20, 2020',
    kind: 'album',
    artwork: '/albums/after-hours.webp',
    tagline: 'red suit. broken nose. the biggest song ever made.',
    story: [
      'Released the week the world shut down. The character — red blazer, black gloves, face increasingly bandaged — lived in Las Vegas and never went to bed. The album is one long night: it opens alone in a hotel room and ends bleeding out on the floor.',
      '"Blinding Lights" became, by Billboard’s maths, the biggest single of all time — more weeks in the top ten than any song in history. But the record around it is stranger than the hit suggests: "Faith" collapses into sirens, "Escape From LA" runs six minutes of regret, "After Hours" itself is the best thing he’s written about wanting someone back.',
      'Super Bowl halftime. Zero Grammy nominations — and a public refusal to ever submit again. It didn’t matter. The album outlasted the awards.',
    ],
    facts: [
      { label: 'Producers', value: 'Max Martin · Oneohtrix Point Never · Metro Boomin · Illangelo' },
      { label: 'Length', value: '56:19 · 14 tracks' },
      { label: 'Singles', value: 'Heartless · Blinding Lights · In Your Eyes · Save Your Tears' },
      { label: 'Records', value: 'Blinding Lights: #1 Billboard Hot 100 song of all time' },
    ],
    quote: 'I’ve been on my own for long enough.',
  },
  {
    slug: 'dawn-fm',
    title: 'Dawn FM',
    era: 'dawn-fm',
    year: 2022,
    released: 'January 7, 2022',
    kind: 'album',
    artwork: '/albums/dawn-fm.webp',
    tagline: 'you are now listening to 103.5 Dawn FM.',
    story: [
      'You’re dead, stuck in traffic in purgatory, and the only thing on the radio is a station hosted by Jim Carrey gently walking you toward the light. That’s the whole concept, and he commits to it completely — an old-man Weeknd on the cover, station IDs between songs, a spoken-word poem to close.',
      'Produced almost entirely with Oneohtrix Point Never and Max Martin, it’s his most cohesive record: Quincy Jones tells a childhood story, Tyler, The Creator crashes "Here We Go… Again", and "Less Than Zero" might be the best pure pop song he’s written. The 80s aren’t a reference anymore; it’s just the sound.',
      'Part two of a trilogy that began with After Hours. Fans who sat with it call it his best — the one that rewards the full 52 minutes in order.',
    ],
    facts: [
      { label: 'Producers', value: 'Oneohtrix Point Never · Max Martin · Swedish House Mafia · Calvin Harris' },
      { label: 'Length', value: '51:49 · 16 tracks' },
      { label: 'Singles', value: 'Take My Breath · Sacrifice · Out Of Time' },
      { label: 'Narrator', value: 'Jim Carrey · poem "Phantom Regret By Jim"' },
    ],
    quote: 'Heaven’s closer than you know.',
  },
  {
    slug: 'hurry-up-tomorrow',
    title: 'Hurry Up Tomorrow',
    era: 'hurry-up-tomorrow',
    year: 2025,
    released: 'January 31, 2025',
    kind: 'album',
    artwork: '/albums/hurry-up-tomorrow.webp',
    tagline: 'the last Weeknd album.',
    story: [
      'Billed as the final chapter of the trilogy and possibly the final record under the name. It started with losing his voice on stage at SoFi in 2022 — the album is built around that moment, the fear of the thing that made you being taken away, and whether the character could be allowed to die.',
      'It’s huge and restless: Brazilian funk with Anitta on "São Paulo", Giorgio Moroder and Lana on "The Abyss", Playboi Carti on "Timeless", a full-orchestra ballad in "Open Hearts". The closing title track ends on the exact chords that open "High For This" — the whole catalogue loops back to the start.',
      'A companion film with Jenna Ortega and Barry Keoghan followed. Whether or not it’s really the end, it was written to sound like one.',
    ],
    facts: [
      { label: 'Producers', value: 'Oneohtrix Point Never · Mike Dean · Max Martin · Pharrell · Justice' },
      { label: 'Length', value: '84:27 · 22 tracks' },
      { label: 'Singles', value: 'Dancing In The Flames · Timeless · São Paulo · Cry For Me' },
      { label: 'Ending', value: 'Final track loops into "High For This" (2011)' },
    ],
    quote: 'I hope I find my peace, hurry up tomorrow.',
  },
]

export function albumBySlug(slug: string) {
  return albums.find((a) => a.slug === slug)
}

export function albumsForEra(eraId: string) {
  return albums.filter((a) => a.era === eraId)
}
