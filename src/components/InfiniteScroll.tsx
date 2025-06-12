import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useMotionValue } from 'motion/react'

export default function InfiniteScroll({
  technologies,
  direction = 'left',
  speed = 25
}: {
  technologies: Array<{ name: string; icon: React.ReactNode; category: string }>
  direction?: 'left' | 'right'
  speed?: number
}) {
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const isPausedRef = useRef(isPaused)
  const mounted = useRef(false)

  // 复制内容，确保无缝滚动
  const duplicatedTech = [...technologies, ...technologies]

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2)
    }
  }, [technologies])

  useEffect(() => {
    if (contentWidth === 0) return

    const animateScroll = (from: number, to: number) => {
      if (isPausedRef.current) return
      const distance = Math.abs(to - from)
      const duration = (distance / contentWidth) * speed
      controls.start({
        x: to,
        transition: {
          x: {
            duration,
            ease: 'linear',
            onComplete: () => {
              if (isPausedRef.current) return
              if (direction === 'left') {
                if (mounted.current) controls.set({ x: 0 })
                animateScroll(0, -contentWidth)
              } else {
                if (mounted.current) controls.set({ x: -contentWidth })
                animateScroll(-contentWidth, 0)
              }
            }
          }
        }
      })
    }

    if (!isPaused) {
      const currentX = x.get()
      if (direction === 'left') {
        animateScroll(currentX, -contentWidth)
      } else {
        animateScroll(currentX, 0)
      }
    }
  }, [isPaused, direction, speed, contentWidth])

  return (
    <div className='relative overflow-hidden py-6' ref={containerRef as any}>
      {/* 左侧渐变阴影 */}
      <div className='absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent'></div>

      <motion.div className='flex gap-6 whitespace-nowrap' animate={controls} style={{ x }}>
        {duplicatedTech.map((tech, index) => (
          <motion.div
            key={`${tech.name}-${index}`}
            whileHover={{ scale: 1.1, y: -5 }}
            className='flex cursor-pointer items-center gap-3 rounded-full border border-border/50 bg-card/70 px-6 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50'
          >
            <div className='flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20'>
              {tech.icon}
            </div>
            <div>
              <span className='text-sm font-medium'>{tech.name}</span>
              <div className='text-xs'>{tech.category}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 右侧渐变阴影 */}
      <div className='absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent'></div>
    </div>
  )
}
