'use client'

import React, { useRef } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useReducedMotion,
} from 'framer-motion'

interface ContainerScrollProps {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: containerRef })

  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scaleStart = isMobile ? 0.75 : 0.95
  const scaleEnd = isMobile ? 0.95 : 1.05

  const rotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [22, 0])
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [scaleStart, scaleEnd]
  )
  const translate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -90])

  return (
    <div
      className="relative h-[55rem] md:h-[80rem] flex items-center justify-center p-4 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-32 w-full relative"
        style={{ perspective: '1200px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <IPhoneCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </IPhoneCard>
      </div>
    </div>
  )
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | React.ReactNode
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

function IPhoneCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="relative mx-auto mt-8 w-[300px] md:w-[400px] h-[640px] md:h-[820px] bg-gray-900 rounded-[3rem] md:rounded-[3.75rem] border-[12px] md:border-[14px] border-gray-900"
    >
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] md:w-[120px] h-[26px] md:h-[32px] bg-black rounded-full z-30 shadow-inner shadow-black/50" />

      {/* Side buttons (silent toggle + volume) */}
      <div
        className="absolute -left-[14px] md:-left-[16px] top-[100px] md:top-[130px] w-[3px] h-[28px] md:h-[34px] bg-gray-700 rounded-l-sm"
        aria-hidden
      />
      <div
        className="absolute -left-[14px] md:-left-[16px] top-[150px] md:top-[185px] w-[3px] h-[44px] md:h-[54px] bg-gray-700 rounded-l-sm"
        aria-hidden
      />
      <div
        className="absolute -left-[14px] md:-left-[16px] top-[210px] md:top-[260px] w-[3px] h-[44px] md:h-[54px] bg-gray-700 rounded-l-sm"
        aria-hidden
      />

      {/* Power button (right side) */}
      <div
        className="absolute -right-[14px] md:-right-[16px] top-[160px] md:top-[200px] w-[3px] h-[60px] md:h-[74px] bg-gray-700 rounded-r-sm"
        aria-hidden
      />

      {/* Screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.25rem] md:rounded-[2.875rem] bg-white">
        {children}
      </div>
    </motion.div>
  )
}
