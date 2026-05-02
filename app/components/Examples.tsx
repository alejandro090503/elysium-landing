'use client'

import { ScrollReveal } from '@/app/components/ui/ScrollReveal'
import { PhoneMockup } from '@/app/components/ui/PhoneMockup'
import { EXAMPLES } from '@/app/lib/constants'

export function Examples() {
  return (
    <section className="py-24 md:py-32 px-6 bg-white" aria-labelledby="examples-heading">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2
            id="examples-heading"
            className="font-heading text-5xl md:text-6xl text-rose-primary mb-4"
          >
            Ejemplos reales
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Invitaciones que ya entregamos. Desliza dentro de cada una para explorarla.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 justify-items-center">
          {EXAMPLES.map((ex, i) => (
            <ScrollReveal key={ex.slug} delay={i * 0.1}>
              <PhoneMockup
                src={`${ex.slug}.vercel.app`}
                title={ex.name}
                type={ex.type}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
