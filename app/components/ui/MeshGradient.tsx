'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  className?: string
  intensity?: 'subtle' | 'rich'
}

export function MeshGradient({ className = '', intensity = 'subtle' }: Props) {
  const reduced = useReducedMotion()
  const opacityScale = intensity === 'rich' ? 1 : 0.55

  const orbs = [
    {
      className: 'top-[-20%] left-[-10%] bg-rose-primary',
      size: 'w-[55vw] h-[55vw]',
      blur: 'blur-[120px]',
      opacity: 0.35 * opacityScale,
      duration: 18,
      x: [0, 60, 0],
      y: [0, -40, 0],
    },
    {
      className: 'top-[30%] right-[-15%] bg-gold',
      size: 'w-[50vw] h-[50vw]',
      blur: 'blur-[140px]',
      opacity: 0.22 * opacityScale,
      duration: 22,
      x: [0, -50, 0],
      y: [0, 50, 0],
    },
    {
      className: 'bottom-[-20%] left-[20%] bg-rose-dark',
      size: 'w-[60vw] h-[60vw]',
      blur: 'blur-[160px]',
      opacity: 0.18 * opacityScale,
      duration: 25,
      x: [0, 40, 0],
      y: [0, 30, 0],
    },
  ]

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${orb.className} ${orb.size} ${orb.blur}`}
          style={{ opacity: orb.opacity }}
          animate={reduced ? undefined : { x: orb.x, y: orb.y }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
