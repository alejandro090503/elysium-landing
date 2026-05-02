'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { NumberTicker } from '@/app/components/ui/NumberTicker'

const STATS = [
  { value: 50, suffix: '+', label: 'Invitaciones entregadas' },
  { value: 24, suffix: 'h', label: 'Tiempo promedio' },
  { value: 100, suffix: '%', label: 'Clientas felices' },
] as const

export function StatsStrip() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative py-20 md:py-28 px-6 bg-white"
      aria-label="Datos clave"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-3 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="relative text-center"
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="font-body text-5xl sm:text-6xl md:text-8xl font-bold leading-none mb-2 md:mb-3 bg-gradient-to-br from-rose-primary via-rose-dark to-gold bg-clip-text text-transparent tracking-tight">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 leading-tight tracking-wide">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
