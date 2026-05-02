'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
}

export function CountUp({ end, prefix = '', suffix = '', duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (reduced) {
      setCount(end)
      return
    }

    const totalFrames = duration * 60
    let frame = 0

    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))

      if (frame >= totalFrames) {
        setCount(end)
        clearInterval(timer)
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [isInView, end, duration, reduced])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString('es-MX')}
      {suffix}
    </span>
  )
}
