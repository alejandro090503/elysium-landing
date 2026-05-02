'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface Props {
  words: readonly string[]
  className?: string
  duration?: number
}

export function WordRotate({ words, className = '', duration = 2400 }: Props) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, duration)
    return () => clearInterval(id)
  }, [words.length, duration, reduced])

  if (reduced) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={`inline-block ${className}`}
          initial={{ opacity: 0, y: '50%', filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-50%', filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
