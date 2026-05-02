'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { TextReveal } from '@/app/components/ui/TextReveal'

const STEPS = [
  {
    number: '01',
    title: 'Llenas el formulario',
    desc: 'Compártenos los datos de tu evento. No necesitas tenerlo todo — puedes ir completando después.',
  },
  {
    number: '02',
    title: 'Recibes tu propuesta',
    desc: 'En menos de 24 horas, tu invitación lista para revisar. Cero adelanto.',
  },
  {
    number: '03',
    title: 'Iteramos juntos',
    desc: 'Nos dices qué ajustar. Hacemos cambios hasta que quedes completamente enamorada.',
  },
  {
    number: '04',
    title: 'Pagas y disfrutas',
    desc: 'Solo cuando te encante. Recibes tu link personalizado listo para compartir.',
  },
] as const

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 70%'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative py-32 md:py-48 px-6" aria-labelledby="how-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-6"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Cómo funciona
          </motion.p>
          <TextReveal
            as="h2"
            text="De tu idea a tu invitación en 4 pasos."
            className="font-body text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 max-w-4xl mx-auto leading-[1.05] tracking-tight"
          />
        </div>

        <div ref={ref} className="relative">
          {/* Background line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px"
            aria-hidden
          />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-rose-primary via-rose-dark to-gold md:-translate-x-px origin-top"
            style={{ height: lineHeight }}
            aria-hidden
          />

          <div className="space-y-20 md:space-y-32">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <Step
                  key={step.number}
                  step={step}
                  isEven={isEven}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  step,
  isEven,
  index,
  scrollYProgress,
}: {
  step: (typeof STEPS)[number]
  isEven: boolean
  index: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const reduced = useReducedMotion()
  const total = STEPS.length
  const start = index / total
  const end = (index + 0.6) / total

  const dotScale = useTransform(scrollYProgress, [start, end], reduced ? [1, 1] : [0.7, 1.15])
  const dotBg = useTransform(
    scrollYProgress,
    [start, end],
    ['rgb(243 244 246)', 'rgb(219 39 119)']
  )
  const dotColor = useTransform(
    scrollYProgress,
    [start, end],
    ['rgb(156 163 175)', 'rgb(255 255 255)']
  )

  return (
    <motion.div
      className={`relative flex items-start gap-6 md:gap-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={reduced ? undefined : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Number badge */}
      <motion.div
        className="relative z-10 shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-base md:text-lg shadow-xl shadow-rose-primary/15 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-2"
        style={{ scale: dotScale, backgroundColor: dotBg, color: dotColor }}
      >
        {step.number}
      </motion.div>

      {/* Content */}
      <div
        className={`flex-1 ${
          isEven
            ? 'md:mr-[calc(50%+3rem)] md:text-right'
            : 'md:ml-[calc(50%+3rem)]'
        }`}
      >
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 tracking-tight leading-tight">
          {step.title}
        </h3>
        <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-md md:max-w-none">
          {step.desc}
        </p>
      </div>
    </motion.div>
  )
}
