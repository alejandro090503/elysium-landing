'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { CountUp } from '@/app/components/ui/CountUp'
import { TextReveal } from '@/app/components/ui/TextReveal'

const PROMISES = [
  {
    headline: '$0 de anticipo',
    desc: 'Empezamos a trabajar de inmediato. Sin enganches.',
  },
  {
    headline: 'Propuesta en 24h',
    desc: 'Recibe tu invitación lista para revisar al día siguiente.',
  },
  {
    headline: 'Pagas si te encanta',
    desc: 'Iteramos hasta que sea perfecta. Si no te convence, no pagas.',
  },
  {
    headline: 'Datos sobre la marcha',
    desc: 'No necesitas tenerlo todo al inicio. Actualizamos sin costo extra.',
  },
] as const

export function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  })

  const cardScale = useTransform(smooth, [0, 1], reduced ? [1, 1] : [0.9, 1])
  const cardRotate = useTransform(smooth, [0, 1], reduced ? [0, 0] : [-1.5, 0])
  const glowOpacity = useTransform(smooth, [0, 0.6, 1], [0, 0.5, 0.9])

  return (
    <section
      className="relative py-32 md:py-48 px-6 bg-gradient-to-b from-rose-bg via-white to-rose-bg"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-6"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Sin sorpresas
          </motion.p>
          <TextReveal
            as="h2"
            text="Diseñado para que digas que sí."
            className="font-body text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 max-w-4xl mx-auto leading-[1.05] tracking-tight"
          />
        </div>

        {/* Sticky $750 climax */}
        <div ref={ref} className="relative mb-16 md:mb-20">
          {/* Glow */}
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ opacity: glowOpacity }}
            aria-hidden
          >
            <div className="absolute inset-x-12 inset-y-8 bg-gradient-to-br from-rose-primary via-rose-dark to-gold rounded-[3rem] opacity-40" />
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br from-rose-primary via-rose-dark to-rose-primary p-12 md:p-20 text-center text-white"
            style={{ scale: cardScale, rotate: cardRotate }}
          >
            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(800px circle at 50% 0%, rgba(255,255,255,0.18), transparent 50%)',
              }}
              aria-hidden
            />

            {/* Animated dots pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
              aria-hidden
            />

            <div className="relative">
              <p className="text-white/70 text-sm md:text-base tracking-[0.25em] uppercase font-semibold mb-6">
                Precio único
              </p>

              <div className="flex items-start justify-center gap-2 md:gap-4 mb-6">
                <span className="text-4xl md:text-6xl font-light mt-3 md:mt-5">$</span>
                <span className="text-7xl md:text-9xl lg:text-[12rem] font-bold leading-none tracking-tight">
                  <CountUp end={750} duration={2.2} />
                </span>
                <span className="text-2xl md:text-4xl font-light mt-4 md:mt-8 self-end mb-3">
                  MXN
                </span>
              </div>

              <p className="text-white/80 text-base md:text-xl max-w-md mx-auto font-light leading-relaxed">
                Todo lo que ves en esta página, sin costos ocultos.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Promises grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {PROMISES.map((p, i) => (
            <motion.div
              key={p.headline}
              className="relative rounded-2xl bg-white border border-gray-100 p-6 md:p-7"
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="text-3xl md:text-4xl font-bold text-rose-primary mb-2 tracking-tight">
                0{i + 1}
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                {p.headline}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
