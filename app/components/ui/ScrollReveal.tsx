'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

const offsets = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
} as const

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: keyof typeof offsets
}

export function ScrollReveal({ children, className, delay = 0, direction = 'up' }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
