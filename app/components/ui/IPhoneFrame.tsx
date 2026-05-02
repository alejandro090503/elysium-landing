'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function IPhoneFrame({ children, className = '' }: Props) {
  return (
    <div
      className={`relative bg-gray-900 rounded-[2.75rem] border-[10px] border-gray-900 shadow-xl shadow-rose-primary/10 ${className}`}
    >
      {/* Dynamic Island */}
      <div
        className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-30 shadow-inner"
        aria-hidden
      />

      {/* Side buttons */}
      <div
        className="absolute -left-[12px] top-[68px] w-[3px] h-[22px] bg-gray-700 rounded-l-sm"
        aria-hidden
      />
      <div
        className="absolute -left-[12px] top-[102px] w-[3px] h-[36px] bg-gray-700 rounded-l-sm"
        aria-hidden
      />
      <div
        className="absolute -left-[12px] top-[148px] w-[3px] h-[36px] bg-gray-700 rounded-l-sm"
        aria-hidden
      />
      <div
        className="absolute -right-[12px] top-[120px] w-[3px] h-[52px] bg-gray-700 rounded-r-sm"
        aria-hidden
      />

      {/* Screen */}
      <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-white">
        {children}
      </div>
    </div>
  )
}
