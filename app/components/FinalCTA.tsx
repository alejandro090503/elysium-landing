'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MeshGradient } from '@/app/components/ui/MeshGradient'
import { TextReveal } from '@/app/components/ui/TextReveal'
import { WHATSAPP_URL, FORM_URL } from '@/app/lib/constants'

export function FinalCTA() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden py-32 md:py-48 px-6 bg-gray-950"
      aria-labelledby="cta-heading"
    >
      <MeshGradient intensity="rich" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold-light mb-8"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Empieza hoy
        </motion.p>

        <h2 id="cta-heading" className="mb-8">
          <TextReveal
            as="span"
            text="Tu historia merece"
            className="block font-body text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] tracking-tight"
          />
          <span className="block mt-2 md:mt-4">
            <TextReveal
              as="span"
              delay={0.3}
              text="contarse bonito."
              className="font-heading text-7xl md:text-9xl lg:text-[12rem] bg-gradient-to-br from-rose-primary via-rose-dark to-gold bg-clip-text text-transparent leading-none"
            />
          </span>
        </h2>

        <motion.p
          className="text-base md:text-xl text-white/70 mb-12 max-w-xl mx-auto leading-relaxed"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Empieza el formulario ahora. Recibe tu propuesta en menos de 24 horas
          y paga solo si te encanta.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-9 py-5 rounded-full text-base md:text-lg font-semibold min-h-[56px] overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Llenar formulario</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md bg-white/5 text-white px-9 py-5 rounded-full text-base md:text-lg font-semibold min-h-[56px] hover:bg-white/10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 1.67c2.21 0 4.28.86 5.84 2.42a8.218 8.218 0 012.42 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.69-8.24 8.22-8.24z" />
            </svg>
            Escribir por WhatsApp
          </a>
        </motion.div>

        <motion.p
          className="mt-10 text-xs md:text-sm text-white/40 tracking-wide"
          initial={reduced ? undefined : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Sin anticipos · Cambios ilimitados · Solo $750 MXN
        </motion.p>
      </div>
    </section>
  )
}
