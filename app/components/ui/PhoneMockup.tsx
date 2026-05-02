'use client'

import { useRef, useState, useEffect } from 'react'

const PHONE_WIDTH = 280
const IFRAME_WIDTH = 375
const SCALE = PHONE_WIDTH / IFRAME_WIDTH
const PHONE_SCREEN_HEIGHT = 560
const IFRAME_HEIGHT = Math.ceil(PHONE_SCREEN_HEIGHT / SCALE)

interface Props {
  src: string
  title: string
  type: string
}

export function PhoneMockup({ src, title, type }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const url = `https://${src}`

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Phone frame */}
      <div
        className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl shadow-rose-primary/10"
        style={{ width: PHONE_WIDTH + 16 }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />

        {/* Screen */}
        <div
          className="relative rounded-[2rem] overflow-hidden bg-white"
          style={{ width: PHONE_WIDTH, height: PHONE_SCREEN_HEIGHT }}
        >
          {visible ? (
            <>
              <iframe
                src={url}
                title={`Vista previa: ${title}`}
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
        </div>

        {/* Home indicator */}
        <div className="mx-auto mt-2 w-24 h-1 rounded-full bg-gray-600" />
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <p className="font-heading text-2xl text-rose-primary">{title}</p>
        <p className="text-sm text-gray-500 font-medium">{type}</p>
      </div>

      {/* CTA */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors min-h-[44px] px-4"
        aria-label={`Ver invitación completa de ${title}`}
      >
        Ver invitación completa
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  )
}
