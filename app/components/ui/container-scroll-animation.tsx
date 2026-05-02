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

  const scaleStart = isMobile ? 0.7 : 1.05
  const scaleEnd = isMobile ? 0.9 : 1

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
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: '1000px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
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

function Card({
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
      className="relative max-w-5xl -mt-12 mx-auto h-[28rem] md:h-[40rem] w-full border-[6px] md:border-8 border-gray-900 p-2 md:p-3 bg-gray-900 rounded-[28px] md:rounded-[36px] overflow-hidden"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
        {children}
      </div>
    </motion.div>
  )
}
