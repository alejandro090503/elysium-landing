'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ScrollReveal } from '@/app/components/ui/ScrollReveal'
import { CountUp } from '@/app/components/ui/CountUp'

const DIFFERENTIATORS = [
  {
    headline: '$0 de anticipo',
    desc: 'Empezamos a trabajar de inmediato sin que pagues nada por adelantado.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    headline: 'Propuesta en <24h',
    desc: 'Desde que llenas el formulario, recibes tu propuesta en menos de 24 horas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    headline: 'Pagas hasta quedar satisfecho',
    desc: 'Iteramos el diseño hasta que te encante. Si no te convence, no pagas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    headline: 'Formulario flexible',
    desc: 'No necesitas todos los datos al inicio. Conforme los subes, actualizamos sin costo extra.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
] as const

export function WhyUs() {
  const reduced = useReducedMotion()

  return (
    <section
      className="py-24 md:py-32 px-6 bg-white"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2
            id="why-us-heading"
            className="font-heading text-5xl md:text-6xl text-rose-primary mb-4"
          >
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Hacemos que el proceso sea tan especial como tu celebración.
          </p>
        </ScrollReveal>

        {/* Price hero card */}
        <ScrollReveal className="mb-12">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-primary to-rose-dark p-10 md:p-14 text-center text-white shadow-2xl shadow-rose-primary/20"
            whileHover={reduced ? undefined : { scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative z-10">
              <p className="text-white/80 text-lg mb-2 font-medium">
                Todo por solo
              </p>
              <p className="text-6xl md:text-8xl font-bold tracking-tight mb-2">
                $<CountUp end={750} />
              </p>
              <p className="text-2xl md:text-3xl font-light text-white/90 mb-4">
                MXN
              </p>
              <p className="text-white/70 text-lg max-w-md mx-auto">
                Precio único, sin sorpresas. Incluye todo lo que ves en esta página.
              </p>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIFFERENTIATORS.map((d, i) => (
            <ScrollReveal key={d.headline} delay={i * 0.1}>
              <div className="flex gap-5 bg-rose-bg/50 border border-rose-primary/8 rounded-2xl p-6 md:p-8">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-rose-primary shadow-sm">
                  {d.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {d.headline}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
