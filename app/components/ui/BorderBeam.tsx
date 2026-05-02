'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
}

export function BorderBeam({
  duration = 8,
  delay = 0,
  colorFrom = '#DB2777',
  colorTo = '#A16207',
}: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(135deg, ${colorFrom}40, ${colorTo}40)`,
        }}
      />
    )
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        inset: '-50%',
        background: `conic-gradient(from 0deg, transparent 0deg, transparent 250deg, ${colorFrom} 290deg, ${colorTo} 340deg, transparent 360deg)`,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        delay: -delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}
