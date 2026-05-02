'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ContainerScroll } from '@/app/components/ui/container-scroll-animation'
import { TextReveal } from '@/app/components/ui/TextReveal'

const SHOWCASE_URL = 'https://boda-carlos-victoria.vercel.app'

export function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-rose-bg via-white to-rose-bg overflow-hidden"
      aria-labelledby="showcase-heading"
    >
      <ContainerScroll
        titleComponent={
          <div className="px-5">
            <motion.p
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Vista previa
            </motion.p>
            <h2 id="showcase-heading" className="font-body font-light text-gray-900 leading-[1.05] tracking-tight">
              <TextReveal
                as="span"
                text="Así se siente"
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              />
              <span className="block mt-2">
                <TextReveal
                  as="span"
                  delay={0.2}
                  text="recibirla."
                  className="font-heading text-6xl sm:text-7xl md:text-9xl bg-gradient-to-br from-rose-primary via-rose-dark to-gold bg-clip-text text-transparent leading-none"
                />
              </span>
            </h2>
            <motion.p
              className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-gray-500 max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Una invitación real entregada. Desliza para verla cobrar vida.
            </motion.p>
          </div>
        }
      >
        <div className="relative h-full w-full">
          {visible ? (
            <>
              <iframe
                src={SHOWCASE_URL}
                title="Vista previa: Carlos & Victoria"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className="h-full w-full border-0"
              />
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-rose-bg">
                  <div className="w-10 h-10 border-2 border-rose-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <div className="h-full w-full bg-rose-bg animate-pulse" />
          )}
        </div>
      </ContainerScroll>

      {/* CTA below the showcase */}
      <div className="text-center pb-16 md:pb-24 px-5">
        <a
          href={SHOWCASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-gold hover:text-gold-light transition-colors"
        >
          Ver invitación completa de Carlos & Victoria
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
