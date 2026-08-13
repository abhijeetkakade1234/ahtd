import { motion } from 'framer-motion'

const HERO_IMAGE = '/Futuristic Arena and Golden Android Statue.png'

const frames = [
  { id: 1, pos: '20% 30%', tall: true, rotate: -1.5, meta: 'MEMORY 01', time: '00:42 AM' },
  { id: 2, pos: '70% 50%', tall: false, rotate: 1, meta: 'MEMORY 02', time: '01:05 AM' },
  { id: 3, pos: '50% 10%', tall: true, rotate: -0.5, meta: 'MEMORY 03', time: '01:48 AM' },
  { id: 4, pos: '35% 70%', tall: false, rotate: 1.5, meta: 'MEMORY 04', time: '02:17 AM' },
  { id: 5, pos: '80% 20%', tall: true, rotate: -1, meta: 'MEMORY 05', time: '03:02 AM' },
  { id: 6, pos: '10% 60%', tall: false, rotate: 0.5, meta: 'MEMORY 06', time: '04:11 AM' },
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
            className={`relative shrink-0 overflow-hidden rounded-sm border border-white/10 ${
              f.tall ? 'h-80 w-52 md:h-[26rem] md:w-64' : 'h-56 w-72 md:h-72 md:w-96'
            }`}
            style={{ transform: `rotate(${f.rotate}deg)`, marginTop: i % 2 === 0 ? 0 : 24 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <img
              src={HERO_IMAGE}
              alt=""
              className="h-full w-full object-cover grayscale-[15%] contrast-125 saturate-75"
              style={{ objectPosition: f.pos }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <figcaption className="font-mono-meta absolute bottom-2 left-2 flex flex-col text-[9px] uppercase tracking-[0.15em] text-white/70">
              <span>Europe · After Hours Til Dawn</span>
              <span className="text-[#c9862f]">Live · {f.time}</span>
              <span className="text-white/40">{f.meta}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
