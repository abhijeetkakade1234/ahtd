import { motion } from 'framer-motion'

const HERO_IMAGE = '/Futuristic Arena and Golden Android Statue.png'

const frames = [
  {
    id: 1,
    src: HERO_IMAGE,
    fit: 'cover' as const,
    pos: '20% 30%',
    tall: true,
    rotate: -1.5,
    label: 'Europe · After Hours Til Dawn',
    tag: 'Live',
    meta: 'Memory 01',
  },
  {
    id: 2,
    src: '/tours/after-hours-til-dawn.jpeg',
    fit: 'contain' as const,
    tall: false,
    rotate: 1,
    label: 'After Hours Til Dawn Tour',
    tag: 'Leg 01 · North America',
    meta: '2022',
  },
  {
    id: 3,
    src: '/tours/starboy-legend-of-the-fall.png',
    fit: 'contain' as const,
    tall: true,
    rotate: -0.5,
    label: 'Starboy: Legend Of The Fall',
    tag: 'Tour Poster',
    meta: '2016',
  },
  {
    id: 4,
    src: '/tours/madness-fall-tour.png',
    fit: 'contain' as const,
    tall: false,
    rotate: 1.5,
    label: 'The Madness Fall Tour',
    tag: 'Tour Poster',
    meta: '2015',
  },
  {
    id: 5,
    src: '/tours/asia-tour.jpg',
    fit: 'contain' as const,
    tall: true,
    rotate: -1,
    label: 'The Weeknd Asia Tour',
    tag: 'Tour Poster',
    meta: '2018',
  },
  {
    id: 6,
    src: HERO_IMAGE,
    fit: 'cover' as const,
    pos: '75% 45%',
    tall: false,
    rotate: 0.5,
    label: 'Europe · After Hours Til Dawn',
    tag: 'Live',
    meta: 'Memory 06',
  },
]

export default function MemoryGallery() {
  return (
    <section id="memories" className="px-5 py-20 md:px-14 md:py-28">
      <h2 className="font-serif-editorial max-w-lg text-2xl italic text-white/90 md:text-4xl">
        Some nights stay with you.
      </h2>

      <div className="mt-14 flex gap-4 overflow-x-auto pb-8 md:gap-6">
        {frames.map((f, i) => (
          <motion.figure
            key={f.id}
            className={`relative shrink-0 overflow-hidden rounded-sm border border-white/10 bg-black ${
              f.tall ? 'h-80 w-52 md:h-[26rem] md:w-64' : 'h-56 w-72 md:h-72 md:w-96'
            }`}
            style={{ transform: `rotate(${f.rotate}deg)`, marginTop: i % 2 === 0 ? 0 : 24 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <img
              src={f.src}
              alt=""
              className={`h-full w-full ${f.fit === 'cover' ? 'object-cover grayscale-[15%] contrast-125 saturate-75' : 'object-contain'}`}
              style={f.pos ? { objectPosition: f.pos } : undefined}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <figcaption className="font-mono-meta absolute bottom-2 left-2 flex flex-col text-[9px] uppercase tracking-[0.15em] text-white/70">
              <span>{f.label}</span>
              <span className="text-[#c9862f]">{f.tag}</span>
              <span className="text-white/40">{f.meta}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
