'use client'

import { ScrollReveal } from '@/app/components/ui/ScrollReveal'
import { FORM_URL } from '@/app/lib/constants'

const STEPS = [
  {
    number: '01',
    title: 'Llenas el formulario',
    desc: 'Nos compartes los datos de tu evento: nombres, fecha, lugar, colores, fotos. No necesitas tenerlo todo — puedes ir completándolo después.',
  },
  {
    number: '02',
    title: 'Recibes tu propuesta',
    desc: 'En menos de 24 horas recibes tu invitación digital lista para revisar. Sin pagar un solo peso.',
  },
  {
    number: '03',
    title: 'Iteramos juntos',
    desc: 'Revisas la invitación y nos dices qué ajustar. Hacemos cambios hasta que quedes completamente satisfecho.',
  },
  {
    number: '04',
    title: 'Pagas y disfrutas',
    desc: 'Solo cuando te encante, pagas los $750 MXN y recibes tu link personalizado listo para compartir.',
  },
] as const

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-6" aria-labelledby="how-heading">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-20">
          <h2
            id="how-heading"
            className="font-heading text-5xl md:text-6xl text-rose-primary mb-4"
          >
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-gray-500">
            De tu idea a tu invitación en 4 pasos simples.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-primary/20 via-rose-primary/40 to-rose-primary/20 md:-translate-x-px"
            aria-hidden
          />

          <div className="space-y-12 md:space-y-16">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <ScrollReveal
                  key={step.number}
                  delay={i * 0.12}
                  direction={isEven ? 'left' : 'right'}
                >
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Number badge */}
                    <div className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-rose-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-rose-primary/20 md:absolute md:left-1/2 md:-translate-x-1/2">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-rose-primary/8 ${
                        isEven
                          ? 'md:mr-[calc(50%+2rem)] md:text-right'
                          : 'md:ml-[calc(50%+2rem)]'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        <ScrollReveal className="text-center mt-16" delay={0.5}>
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold-light transition-colors min-h-[48px] shadow-lg shadow-gold/20"
          >
            Comenzar ahora
            <svg
              width="20"
              height="20"
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
        </ScrollReveal>
      </div>
    </section>
  )
}
