'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { WHATSAPP_URL, FORM_URL } from '@/app/lib/constants'

export function Hero() {
  const reduced = useReducedMotion()

  const fadeUp = reduced
    ? {}
    : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } }

  return (
    <section
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
      aria-label="Inicio"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-bg via-white to-rose-bg" />

      {/* Decorative orbs */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold/[0.04]"
        animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-48 -left-32 w-[600px] h-[600px] rounded-full bg-rose-primary/[0.04]"
        animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          className="text-gold font-semibold tracking-[0.25em] uppercase text-sm md:text-base mb-4"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0 }}
        >
          Elysium Invitaciones
        </motion.p>

        <motion.h1
          className="font-heading text-7xl md:text-8xl lg:text-9xl text-rose-primary mb-6 leading-none"
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Elysium
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Invitaciones digitales que cuentan tu historia
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-rose-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-rose-primary/25 hover:bg-rose-dark transition-colors min-h-[48px]"
          >
            <WhatsAppIcon />
            Pedir informes
          </a>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold hover:text-white transition-colors min-h-[48px]"
          >
            Llenar formulario
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
