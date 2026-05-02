'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MeshGradient } from '@/app/components/ui/MeshGradient'
import { CharReveal, TextReveal } from '@/app/components/ui/TextReveal'
import { Sparkles } from '@/app/components/ui/Sparkles'
import { WordRotate } from '@/app/components/ui/WordRotate'

const EVENT_TYPES = ['boda', 'XV años', 'bautizo'] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], reduced ? [1, 1, 1] : [1, 0.5, 0])
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 100])
  const orbY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -150])

  return (
    <section
      ref={ref}
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
      aria-label="Inicio"
    >
      <motion.div className="absolute inset-0" style={{ y: orbY }}>
        <MeshGradient />
      </motion.div>

      <motion.div
        className="relative z-10 px-5 max-w-6xl mx-auto text-center"
        style={{ scale, opacity, y }}
      >
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-white/50 backdrop-blur-md px-4 py-1.5 text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-gold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Invitaciones digitales
          </span>
        </motion.div>

        {/* Brand wordmark with sparkles */}
        <div className="relative mb-6 md:mb-10">
          <Sparkles count={8} color="#A16207" />
          <h1 className="relative font-heading leading-[0.85]">
            <CharReveal
              text="Elysium"
              className="block bg-gradient-to-br from-rose-primary via-rose-dark to-gold bg-clip-text text-transparent text-[26vw] md:text-[16vw] lg:text-[14rem] font-normal"
            />
          </h1>
        </div>

        {/* Tagline with rotating word */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="space-y-2"
        >
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-gray-800 leading-[1.1] tracking-tight">
            <span className="font-light">Para tu </span>
            <WordRotate
              words={EVENT_TYPES}
              className="font-semibold bg-gradient-to-br from-rose-primary to-gold bg-clip-text text-transparent"
            />
          </p>
          <p className="text-sm sm:text-base md:text-xl text-gray-500 max-w-md mx-auto leading-relaxed font-light">
            Inolvidable. Personalizada. En tu mano.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-hidden
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Desliza</span>
        <motion.div
          className="h-10 w-[2px] bg-gradient-to-b from-rose-primary/60 to-transparent"
          animate={reduced ? undefined : { scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
