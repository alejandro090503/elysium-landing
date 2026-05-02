'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

interface Props {
  count?: number
  color?: string
  className?: string
}

export function Sparkles({ count = 18, color = '#A16207', className = '' }: Props) {
  const reduced = useReducedMotion()

  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 2.5,
      })),
    [count]
  )

  if (reduced) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {sparkles.map((s) => (
        <motion.svg
          key={s.id}
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          viewBox="0 0 24 24"
          fill={color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 1 + Math.random() * 3,
            ease: 'easeInOut',
          }}
        >
          <path d="M12 0L13.8 8.3L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.3L12 0Z" />
        </motion.svg>
      ))}
    </div>
  )
}
