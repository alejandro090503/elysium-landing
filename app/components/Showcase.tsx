'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { TextReveal } from '@/app/components/ui/TextReveal'
import { SparklesText } from '@/app/components/ui/sparkles-text'
import { IPhoneFrame } from '@/app/components/ui/IPhoneFrame'
import { EXAMPLES, type Example } from '@/app/lib/constants'

const PHONE_WIDTH = 280
const IFRAME_WIDTH = 430
const SCALE = PHONE_WIDTH / IFRAME_WIDTH
const PHONE_HEIGHT = 580
const IFRAME_HEIGHT = Math.ceil(PHONE_HEIGHT / SCALE)

const REPEAT = 3

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const reduced = useReducedMotion()

  // Triple the EXAMPLES so the carousel feels infinite. We start scrolled into
  // the middle copy and silently teleport to the equivalent slot whenever the
  // user reaches a boundary copy. Identical phones make the jump invisible.
  const items = useMemo(
    () => Array.from({ length: REPEAT }, () => EXAMPLES).flat(),
    []
  )
  const middleStart = EXAMPLES.length

  // Scroll-driven 3D tilt with spring smoothing for buttery animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  })
  const rotateX = useTransform(smooth, [0, 1], reduced ? [0, 0] : [22, 0])
  const scale = useTransform(smooth, [0, 1], reduced ? [1, 1] : [0.85, 1])
  const titleY = useTransform(smooth, [0, 1], reduced ? [0, 0] : [40, 0])

  // Center on a specific original index — scrolls ONLY the horizontal track,
  // never the window. (scrollIntoView would scroll the page vertically too.)
  const scrollToOriginal = (originalIdx: number, behavior: ScrollBehavior = 'smooth') => {
    const el = trackRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('[data-phone]')
    const target = cards[middleStart + originalIdx]
    if (!target) return
    const targetLeft =
      target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2
    el.scrollTo({ left: targetLeft, behavior })
  }

  // Initial position: middle copy. Uses scrollLeft (no window scroll side-effect).
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('[data-phone]')
    const target = cards[middleStart]
    if (!target) return
    el.scrollLeft = target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Detect closest card to center → activeIdx (modular). Teleport on boundary.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf = 0
    let teleportTimer: ReturnType<typeof setTimeout> | null = null
    let isTeleporting = false

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const cards = el.querySelectorAll<HTMLElement>('[data-phone]')
        if (!cards.length) return

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
        setActiveIdx(bestIdx % EXAMPLES.length)

        // Schedule teleport check on scroll end
        if (teleportTimer) clearTimeout(teleportTimer)
        teleportTimer = setTimeout(() => {
          if (isTeleporting) return
          // If active card is in copy 0 or copy 2, teleport to equivalent in copy 1
          if (bestIdx < EXAMPLES.length || bestIdx >= EXAMPLES.length * 2) {
            const targetIdx = middleStart + (bestIdx % EXAMPLES.length)
            const target = cards[targetIdx]
            if (target) {
              isTeleporting = true
              const offset = target.offsetLeft - cards[bestIdx].offsetLeft
              el.scrollLeft += offset
              // Brief lockout to avoid re-triggering on the synthetic scroll
              setTimeout(() => {
                isTeleporting = false
              }, 80)
            }
          }
        }, 180)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      if (teleportTimer) clearTimeout(teleportTimer)
    }
  }, [middleStart])

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
              sparklesCount={8}
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

      {/* 3D-tilted infinite horizontal scroll track */}
      <div className="relative" style={{ perspective: '1400px' }}>
        <motion.div style={{ rotateX, scale, transformOrigin: '50% 100%' }}>
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-[calc(50%-150px)] md:px-[calc(50%-160px)]"
            style={{ scrollPaddingInline: '50%' }}
          >
            {items.map((ex, i) => {
              const original = i % EXAMPLES.length
              return (
                <ShowcasePhone
                  key={`${ex.slug}-${i}`}
                  example={ex}
                  originalIdx={original}
                  activeIdx={activeIdx}
                />
              )
            })}
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

      {/* Animated horizontal "Desliza" hint */}
      <HorizontalScrollHint />

      {/* Dots navigation (one per unique invitation) */}
      <div
        className="mt-2 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Cambiar invitación"
      >
        {EXAMPLES.map((ex, i) => (
          <button
            key={ex.slug}
            type="button"
            onClick={() => scrollToOriginal(i)}
            aria-label={`Ver ${ex.name}`}
            aria-selected={activeIdx === i}
            role="tab"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                activeIdx === i ? 'w-8 bg-rose-primary' : 'w-2 bg-rose-primary/25'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function HorizontalScrollHint() {
  const reduced = useReducedMotion()
  return (
    <div
      className="flex items-center justify-center gap-3 text-gray-400 mt-2"
      aria-hidden
    >
      <motion.div
        className="h-[2px] w-12 bg-gradient-to-l from-rose-primary/70 to-transparent"
        animate={reduced ? undefined : { scaleX: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'right center' }}
      />
      <span className="text-[10px] tracking-[0.3em] uppercase whitespace-nowrap">
        Desliza
      </span>
      <motion.div
        className="h-[2px] w-12 bg-gradient-to-r from-rose-primary/70 to-transparent"
        animate={reduced ? undefined : { scaleX: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        style={{ transformOrigin: 'left center' }}
      />
    </div>
  )
}

function ShowcasePhone({
  example,
  originalIdx,
  activeIdx,
}: {
  example: Example
  originalIdx: number
  activeIdx: number
}) {
  const [hasEverLoaded, setHasEverLoaded] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const url = `https://${example.slug}.vercel.app`

  // Modular distance so neighbors wrap around (last ↔ first)
  const rawDistance = Math.abs(originalIdx - activeIdx)
  const distance = Math.min(rawDistance, EXAMPLES.length - rawDistance)
  const shouldRenderIframe = hasEverLoaded || distance <= 1

  useEffect(() => {
    if (shouldRenderIframe) setHasEverLoaded(true)
  }, [shouldRenderIframe])

  return (
    <div
      data-phone
      className="snap-center flex-shrink-0 flex flex-col items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          delay: originalIdx * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <IPhoneFrame className="w-[280px] md:w-[300px] h-[580px] md:h-[620px]">
          {shouldRenderIframe ? (
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
                  transform: `scale(${SCALE}) translateZ(0)`,
                  willChange: 'transform',
                }}
              />
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-rose-bg">
                  <div className="w-8 h-8 border-2 border-rose-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-rose-bg to-rose-bg-dark flex items-center justify-center">
              <div className="text-center px-6">
                <p className="font-heading text-3xl text-rose-primary mb-1">
                  {example.name}
                </p>
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  Desliza para cargar
                </p>
              </div>
            </div>
          )}
        </IPhoneFrame>
      </motion.div>

      {/* Label */}
      <div className="mt-6 text-center">
        <p className="font-heading text-2xl md:text-3xl text-rose-primary leading-tight">
          {example.name}
        </p>
        <p className="text-xs md:text-sm text-gray-500 font-medium mb-2">
          {example.type}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors min-h-[44px] px-3"
          aria-label={`Ver invitación completa de ${example.name}`}
        >
          Ver completa
          <svg
            width="14"
            height="14"
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
    </div>
  )
}
