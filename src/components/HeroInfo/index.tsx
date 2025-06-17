import { motion, useTransform, useScroll } from 'motion/react'
import { FaDatabase, FaRocket } from 'react-icons/fa'
import { FaCode } from 'react-icons/fa6'
import { TbServerBolt } from 'react-icons/tb'
import { LuBrain } from 'react-icons/lu'
import { GoZap } from 'react-icons/go'
import { Badge } from '../ui/badge'

export default function HeroInfo() {
  const { scrollYProgress } = useScroll()
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])
  return (
    <section className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <motion.div style={{ y: textY }} className='relative z-10 mx-auto max-w-6xl px-4 text-center'>
        {/* Profile Image with Advanced Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className='relative mb-4 md:mb-6'
        >
          <div className='relative mx-auto mb-4 h-32 w-32 md:mb-6 md:h-60 md:w-60'>
            {/* Rotating rings */}

            {/* Main profile circle */}
            <div className='absolute inset-4 rounded-full bg-gradient-to-br from-primary via-blue-500 to-purple-600 p-1 shadow-2xl'>
              <div className='relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background'>
                <img
                  src='/img/avatar.png'
                  alt='avatar'
                  width={100}
                  height={100}
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Title with Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='mb-6'
        >
          <h1 className='relative mb-4 text-3xl font-bold md:text-5xl'>Gwynn</h1>

          {/* Animated subtitle with typewriter effect */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 2 }}
            className='mx-auto overflow-hidden'
          >
            <h2 className='mb-2 text-xl font-light text-muted-foreground md:text-2xl'>
              独立开发者
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className='mb-4 flex flex-wrap justify-center gap-3 md:mb-6'
          >
            <Badge variant='outline' className='border-red-500/30 bg-red-500/10 px-4 py-2 text-sm'>
              <GoZap className='mr-2 h-4 w-4' />
              Golang
            </Badge>
            <Badge
              variant='outline'
              className='border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm'
            >
              <TbServerBolt className='mr-2 h-4 w-4' />
              Web3
            </Badge>
            <Badge
              variant='outline'
              className='border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm'
            >
              <LuBrain className='mr-2 h-4 w-4' />
              AI集成
            </Badge>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className='mx-auto mb-6 grid max-w-4xl grid-cols-2 gap-6 md:mb-12 md:grid-cols-4'
        >
          {[
            { number: '10+', label: '年经验', icon: <FaRocket className='h-6 w-6' /> },
            { number: '50+', label: '完成项目', icon: <FaCode className='h-6 w-6' /> },
            { number: '15+', label: '技术栈', icon: <FaDatabase className='h-6 w-6' /> },
            { number: '100%', label: '客户满意', icon: <GoZap className='h-6 w-6' /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                opacity: { delay: 1 + index * 0.1, duration: 0.6 },
                rotateY: { delay: 1 + index * 0.1, duration: 0.6 },
                scale: { delay: 0, duration: 0.2 } // 进场和恢复都快
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2, delay: 0 }
              }}
              className='rounded-xl border-2 border-solid border-border p-3 text-center hover:border-primary/100 md:p-6'
            >
              <div className='rounded-xl p-3 text-center md:p-6'>
                <div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center bg-gradient-to-br from-primary/20 to-blue-600/20 md:h-12 md:w-12'>
                  {stat.icon}
                </div>
                <div className='mb-1 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl'>
                  {stat.number}
                </div>
                <div className='text-xs text-muted-foreground md:text-sm'>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className='mx-auto mb-8 max-w-4xl space-y-1 leading-relaxed md:space-y-2'
        >
          <p className='text-xl md:text-2xl'>热爱创新与挑战 • 用代码改变世界</p>
          <p className='text-base md:text-lg'>"让每一行代码都有意义，让每一个项目都充满创意"</p>
        </motion.div>

        {/* Scroll Indicator with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className='flex flex-col items-center'
        >
          <p className='mb-2 text-sm md:mb-4'>向下滚动探索更多</p>
          <motion.div
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut'
            }}
            className='relative'
          >
            <div className='relative flex h-12 w-8 justify-center overflow-hidden rounded-full border-2 border-primary'>
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut'
                }}
                className='mt-2 h-3 w-1 rounded-full bg-gradient-to-b from-primary to-blue-600'
              />
            </div>

            {/* Glowing effect */}
            <div className='absolute inset-0 h-12 w-8 rounded-full border-2 border-primary/50 blur-sm' />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
