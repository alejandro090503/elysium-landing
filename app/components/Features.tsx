'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { TextReveal } from '@/app/components/ui/TextReveal'

interface BentoItem {
  title: string
  desc: string
  icon: ReactNode
  span: 'sm' | 'md' | 'lg' | 'tall'
  accent?: 'rose' | 'gold' | 'dark'
}

const ITEMS: BentoItem[] = [
  {
    title: 'Cuenta regresiva',
    desc: 'Marca el momento exacto con un contador animado en tiempo real.',
    span: 'lg',
    accent: 'rose',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Galería de fotos',
    desc: 'Carrusel interactivo con tus mejores momentos.',
    span: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: 'Ubicaciones',
    desc: 'Mapa con ceremonia, recepción y enlaces a Google Maps.',
    span: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'RSVP por WhatsApp',
    desc: 'Tus invitados confirman asistencia directo desde la invitación. Tú recibes la respuesta al instante.',
    span: 'tall',
    accent: 'gold',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 1.67c2.21 0 4.28.86 5.84 2.42a8.218 8.218 0 012.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.69-8.24 8.22-8.24z" />
      </svg>
    ),
  },
  {
    title: 'Mesa de regalos',
    desc: 'Liverpool, Palacio, Amazon y CLABE — todo integrado.',
    span: 'md',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    title: 'Música',
    desc: 'La canción de tu evento de fondo.',
    span: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: 'Itinerario',
    desc: 'Horarios claros para cada momento del día.',
    span: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Dress code y paleta',
    desc: 'Tu paleta de colores visible para que todos vistan en armonía.',
    span: 'md',
    accent: 'rose',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="19" cy="11.5" r="2.5" />
        <circle cx="17" cy="18" r="2.5" />
        <circle cx="8.5" cy="18" r="2.5" />
        <circle cx="5" cy="11.5" r="2.5" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: 'Hospedaje sugerido',
    desc: 'Hoteles cercanos con precios y reservas directas.',
    span: 'sm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
      </svg>
    ),
  },
]

const spanClasses: Record<BentoItem['span'], string> = {
  sm: 'md:col-span-1 md:row-span-1',
  md: 'md:col-span-2 md:row-span-1',
  lg: 'md:col-span-2 md:row-span-1',
  tall: 'md:col-span-1 md:row-span-2',
}

const accentClasses: Record<NonNullable<BentoItem['accent']>, string> = {
  rose: 'bg-gradient-to-br from-rose-primary/[0.08] to-transparent border-rose-primary/20',
  gold: 'bg-gradient-to-br from-gold/[0.08] to-transparent border-gold/25',
  dark: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white border-gray-800',
}

export function Features() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative py-32 md:py-48 px-6"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-6"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Todo incluido
          </motion.p>
          <TextReveal
            as="h2"
            text="Una invitación que lo tiene todo."
            className="font-body text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 max-w-4xl mx-auto leading-[1.05] tracking-tight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[minmax(220px,_auto)] gap-4 md:gap-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              className={`${spanClasses[item.span]} ${
                item.accent ? accentClasses[item.accent] : 'bg-white border-gray-100'
              } group relative rounded-3xl border p-7 md:p-8 overflow-hidden hover:shadow-xl hover:shadow-rose-primary/5 transition-shadow duration-500`}
              initial={reduced ? undefined : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(219,39,119,0.08),transparent_70%)]"
                aria-hidden
              />

              <div className="relative h-full flex flex-col">
                <div
                  className={`mb-5 ${
                    item.accent === 'gold'
                      ? 'text-gold'
                      : item.accent === 'dark'
                      ? 'text-rose-primary'
                      : 'text-rose-primary'
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
