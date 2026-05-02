'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = '',
  pauseOnHover = true,
}: Props) {
  const reduced = useReducedMotion()
  const innerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!innerRef.current) return
    const ro = new ResizeObserver(() => {
      if (innerRef.current) setWidth(innerRef.current.scrollWidth / 2)
    })
    ro.observe(innerRef.current)
    return () => ro.disconnect()
  }, [])

  const duration = width > 0 ? width / speed : 30

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <motion.div
        ref={innerRef}
        className="flex w-max gap-6"
        animate={
          reduced
            ? undefined
            : { x: reverse ? [width ? -width : 0, 0] : [0, width ? -width : 0] }
        }
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={
          pauseOnHover && !reduced
            ? { animationPlayState: 'var(--play-state, running)' }
            : undefined
        }
      >
        {children}
        {children}
      </motion.div>
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-rose-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-rose-bg to-transparent" />
    </div>
  )
}
