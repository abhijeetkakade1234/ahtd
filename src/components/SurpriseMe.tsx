import { AnimatePresence, motion } from 'framer-motion'
import { usePlayer } from '../hooks/usePlayer'

export default function SurpriseMe() {
  const { isGlitching, current, accent } = usePlayer()

  return (
    <AnimatePresence>
      {isGlitching && (
        <>
          <motion.div
            className="pointer-events-none fixed inset-0 z-50 mix-blend-difference"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42 }}
          />
          <motion.div
            className="font-mono-meta pointer-events-none fixed left-1/2 top-1/2 z-50 w-64 -translate-x-1/2 -translate-y-1/2 border border-white/15 bg-black/70 px-6 py-5 text-center backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ borderColor: accent }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              changing the frequency
            </p>
            <p className="font-serif-editorial mt-3 text-lg italic text-white">
              {current.title}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
