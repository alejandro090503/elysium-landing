'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  href: string
  target?: string
  rel?: string
}

export function ShineButton({ children, className = '', href, target, rel }: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group relative inline-flex items-center justify-center overflow-hidden isolate ${className}`}
    >
      {/* Shine sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
          mixBlendMode: 'overlay',
        }}
        aria-hidden
      />
      <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
    </a>
  )
}
