'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({ text, className = '', delay = 0, as = 'p' }: Props) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.06,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: '50%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const Tag = motion[as] as typeof motion.p

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={child} className="inline-block">
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

interface CharProps {
  text: string
  className?: string
  delay?: number
}

export function CharReveal({ text, className = '', delay = 0 }: CharProps) {
  const reduced = useReducedMotion()
  const chars = Array.from(text)

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : 0.04,
            delayChildren: delay,
          },
        },
      }}
    >
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
              },
            }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
