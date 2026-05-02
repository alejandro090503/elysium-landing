'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { TextReveal } from '@/app/components/ui/TextReveal'
import { SparklesText } from '@/app/components/ui/sparkles-text'
import { IPhoneFrame } from '@/app/components/ui/IPhoneFrame'
import { EXAMPLES, type Example } from '@/app/lib/constants'

const PHONE_WIDTH = 280
const IFRAME_WIDTH = 375
const SCALE = PHONE_WIDTH / IFRAME_WIDTH
const PHONE_HEIGHT = 580
const IFRAME_HEIGHT = Math.ceil(PHONE_HEIGHT / SCALE)

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const reduced = useReducedMotion()

  // Scroll-driven 3D tilt: iPhones lean back when entering, flatten by mid-section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })
  const rotateX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, 0])
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.82, 1])
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, 0])

  const handleDotClick = (idx: number) => {
    if (!trackRef.current) return
    const cards = trackRef.current.querySelectorAll<HTMLElement>('[data-phone]')
    const target = cards[idx]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const cards = el.querySelectorAll<HTMLElement>('[data-phone]')
        let bestIdx = 0
        let bestDist = Infinity
        cards.forEach((card, i) => {
          const r = card.getBoundingClientRect()
          const c = r.left + r.width / 2
          const d = Math.abs(c - center)
          if (d < bestDist) {
            bestDist = d
            bestIdx = i
          }
        })
        setActiveIdx(bestIdx)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-gradient-to-b from-rose-bg via-white to-rose-bg overflow-hidden"
      aria-labelledby="showcase-heading"
    >
      {/* Title */}
      <motion.div
        className="px-5 max-w-5xl mx-auto text-center mb-12 md:mb-16"
        style={{ y: titleY }}
      >
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
            <SparklesText
              text="recibirla."
              sparklesCount={14}
              colors={{ first: '#DB2777', second: '#A16207' }}
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
          Invitaciones reales que ya entregamos. Desliza para elegir cuál ver y desliza dentro de cada iPhone para explorarla.
        </motion.p>
      </motion.div>

      {/* 3D-tilted horizontal scroll track */}
      <div className="relative" style={{ perspective: '1400px' }}>
        <motion.div
          style={{ rotateX, scale, transformOrigin: '50% 100%' }}
        >
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-[calc(50%-150px)] md:px-[calc(50%-160px)]"
            style={{ scrollPaddingInline: '50%' }}
          >
            {EXAMPLES.map((ex, i) => (
              <ShowcasePhone key={ex.slug} example={ex} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-rose-bg to-transparent z-10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-rose-bg to-transparent z-10"
          aria-hidden
        />
      </div>

      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-2 mb-8" role="tablist" aria-label="Cambiar invitación">
        {EXAMPLES.map((ex, i) => (
          <button
            key={ex.slug}
            type="button"
            onClick={() => handleDotClick(i)}
            aria-label={`Ver ${ex.name}`}
            aria-selected={activeIdx === i}
            role="tab"
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition-all`}
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                activeIdx === i ? 'w-8 bg-rose-primary' : 'w-2 bg-rose-primary/25'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-center text-xs md:text-sm text-gray-400 tracking-wide flex items-center justify-center gap-2">
        <ArrowIcon direction="left" />
        Desliza para elegir
        <ArrowIcon direction="right" />
      </p>
    </section>
  )
}

function ShowcasePhone({ example, index }: { example: Example; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const url = `https://${example.slug}.vercel.app`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-phone
      className="snap-center flex-shrink-0 flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <IPhoneFrame
          className="w-[280px] md:w-[300px] h-[580px] md:h-[620px]"
        >
          {visible ? (
            <>
              <iframe
                src={url}
                title={`Vista previa: ${example.name}`}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className="origin-top-left border-0"
                style={{
                  width: IFRAME_WIDTH,
                  height: IFRAME_HEIGHT,
                  transform: `scale(${SCALE})`,
                }}
              />
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-rose-bg">
                  <div className="w-8 h-8 border-2 border-rose-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-rose-bg animate-pulse" />
          )}
        </IPhoneFrame>
      </motion.div>

      {/* Label */}
      <div className="mt-6 text-center">
        <p className="font-heading text-2xl md:text-3xl text-rose-primary leading-tight">
          {example.name}
        </p>
        <p className="text-xs md:text-sm text-gray-500 font-medium mb-2">{example.type}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors min-h-[44px] px-3"
          aria-label={`Ver invitación completa de ${example.name}`}
        >
          Ver completa
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={direction === 'left' ? 'rotate-180' : ''}
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
