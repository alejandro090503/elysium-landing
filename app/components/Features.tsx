'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { TextReveal } from '@/app/components/ui/TextReveal'

interface Feature {
  title: string
  desc: string
  accent: string
  bg: string
  icon: ReactNode
}

const FEATURES: Feature[] = [
  {
    title: 'Cuenta regresiva',
    desc: 'Cada segundo cuenta. Un contador animado que sube la emoción día tras día hasta tu evento.',
    accent: 'text-rose-primary',
    bg: 'from-rose-primary/15 via-rose-bg to-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Galería viva',
    desc: 'Tus mejores fotos en un carrusel elegante. Tus invitados se enamoran de tu historia antes del evento.',
    accent: 'text-gold',
    bg: 'from-gold/15 via-rose-bg to-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: 'RSVP por WhatsApp',
    desc: 'Tus invitados confirman desde la invitación. Tú recibes la respuesta al instante, sin spreadsheets.',
    accent: 'text-rose-primary',
    bg: 'from-rose-dark/15 via-rose-bg to-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 1.67c2.21 0 4.28.86 5.84 2.42a8.218 8.218 0 012.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.69-8.24 8.22-8.24z" />
      </svg>
    ),
  },
  {
    title: 'Mesa de regalos',
    desc: 'Liverpool, Palacio, Amazon y CLABE — todo en un solo botón. Tus invitados eligen sin complicarse.',
    accent: 'text-gold',
    bg: 'from-gold/15 via-rose-bg to-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    title: 'Mapa, música, dress code',
    desc: 'Ubicaciones con Google Maps, tu canción de fondo, paleta de colores y hospedaje sugerido. Todo incluido.',
    accent: 'text-rose-primary',
    bg: 'from-rose-primary/15 via-rose-bg to-white',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
] as const

export function Features() {
  return (
    <section
      className="relative py-24 md:py-40 px-5 md:px-6"
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Todo incluido
          </motion.p>
          <TextReveal
            as="h2"
            text="Una invitación que lo tiene todo."
            className="font-body text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 max-w-4xl mx-auto leading-[1.05] tracking-tight"
          />
        </div>

        {/* Stacked scroll cards */}
        <div className="relative">
          {FEATURES.map((feature, i) => (
            <StackedCard
              key={feature.title}
              feature={feature}
              index={i}
              total={FEATURES.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StackedCard({
  feature,
  index,
  total,
}: {
  feature: Feature
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduced ? [1, 1, 1] : [0.92, 1, 0.95]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.5]
  )

  const stickyTop = `calc(20vh + ${index * 12}px)`

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: stickyTop, marginBottom: index < total - 1 ? '12vh' : '0' }}
    >
      <motion.article
        style={{ scale, opacity }}
        className={`relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-rose-primary/10 bg-gradient-to-br ${feature.bg} backdrop-blur-xl p-8 md:p-14 shadow-xl shadow-rose-primary/5`}
      >
        {/* Number */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 text-[10px] md:text-xs font-mono text-gray-400 tracking-[0.3em]">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        <div className={`${feature.accent} mb-6 md:mb-8`}>{feature.icon}</div>

        <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-4 md:mb-6 leading-[1.05] tracking-tight max-w-3xl">
          {feature.title}
        </h3>
        <p className="text-base sm:text-lg md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
          {feature.desc}
        </p>
      </motion.article>
    </div>
  )
}
