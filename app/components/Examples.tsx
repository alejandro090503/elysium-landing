'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Marquee } from '@/app/components/ui/Marquee'
import { PhoneMockup } from '@/app/components/ui/PhoneMockup'
import { TextReveal } from '@/app/components/ui/TextReveal'
import { EXAMPLES } from '@/app/lib/constants'

export function Examples() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative py-32 md:py-48 overflow-hidden bg-rose-bg"
      aria-labelledby="examples-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 md:mb-24">
          <motion.p
            className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-6"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ejemplos reales
          </motion.p>
          <TextReveal
            as="h2"
            text="Invitaciones que ya entregamos."
            className="font-body text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 max-w-4xl mx-auto leading-[1.05] tracking-tight"
          />
          <motion.p
            className="mt-6 text-base md:text-lg text-gray-500 max-w-xl mx-auto"
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Desliza dentro de cada teléfono para explorarla. Pasa el cursor para pausar.
          </motion.p>
        </div>
      </div>

      <Marquee speed={28} className="py-8">
        {EXAMPLES.map((ex) => (
          <div key={ex.slug} className="px-3">
            <PhoneMockup src={`${ex.slug}.vercel.app`} title={ex.name} type={ex.type} />
          </div>
        ))}
      </Marquee>
    </section>
  )
}
