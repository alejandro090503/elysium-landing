'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MeshGradient } from '@/app/components/ui/MeshGradient'
import { CharReveal, TextReveal } from '@/app/components/ui/TextReveal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], reduced ? [1, 1, 1] : [1, 0.6, 0])
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80])

  return (
    <section
      ref={ref}
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
      aria-label="Inicio"
    >
      <MeshGradient />

      <motion.div
        className="relative z-10 px-6 max-w-6xl mx-auto text-center"
        style={{ scale, opacity, y }}
      >
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-white/40 backdrop-blur-md px-5 py-2 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-gold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Invitaciones digitales
          </span>
        </motion.div>

        <h1 className="font-heading leading-[0.85] mb-8">
          <CharReveal
            text="Elysium"
            className="block bg-gradient-to-br from-rose-primary via-rose-dark to-gold bg-clip-text text-transparent text-[20vw] md:text-[16vw] lg:text-[14rem] font-normal"
          />
        </h1>

        <TextReveal
          as="p"
          delay={0.6}
          text="Cada celebración merece una invitación tan inolvidable como ella."
          className="text-xl md:text-3xl lg:text-4xl text-gray-700 max-w-3xl mx-auto leading-snug font-light"
        />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Desliza</span>
        <motion.div
          className="h-10 w-[2px] bg-gradient-to-b from-rose-primary/60 to-transparent"
          animate={reduced ? undefined : { scaleY: [0.4, 1, 0.4], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
