'use client'

import { motion, useReducedMotion } from 'framer-motion'

const SIZE = 36

export function DollarIcon() {
  const reduced = useReducedMotion()
  return (
    <div className="relative">
      <motion.svg
        width={SIZE}
        height={SIZE}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={reduced ? undefined : { y: [-2, 2, -2] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </motion.svg>
      {!reduced && (
        <motion.span
          className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-gold"
          animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
        />
      )}
    </div>
  )
}

export function ClockIcon() {
  const reduced = useReducedMotion()
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <motion.line
        x1="12"
        y1="12"
        x2="12"
        y2="6.5"
        animate={reduced ? undefined : { rotate: 360 }}
        style={{ originX: '12px', originY: '12px' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.line
        x1="12"
        y1="12"
        x2="16"
        y2="12"
        animate={reduced ? undefined : { rotate: 360 }}
        style={{ originX: '12px', originY: '12px' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  )
}

export function HeartIcon() {
  const reduced = useReducedMotion()
  return (
    <motion.svg
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="currentColor"
      animate={reduced ? undefined : { scale: [1, 1.18, 1, 1.12, 1] }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
        repeatDelay: 0.6,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.55, 1],
      }}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </motion.svg>
  )
}

export function FormIcon() {
  const reduced = useReducedMotion()
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <motion.path
        d="M9 13h6"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.75, 1],
        }}
      />
      <motion.path
        d="M9 17h4"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.7,
          times: [0, 0.25, 0.75, 1],
        }}
      />
    </svg>
  )
}
