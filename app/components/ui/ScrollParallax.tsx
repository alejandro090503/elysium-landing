'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion'

interface Props {
  children: ReactNode
  speed?: number
  className?: string
}

export function ScrollParallax({ children, speed = 0.3, className = '' }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [-100 * speed, 100 * speed]
  )

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}

export function useParallaxY(scrollYProgress: MotionValue<number>, distance: number) {
  return useTransform(scrollYProgress, [0, 1], [0, distance])
}
