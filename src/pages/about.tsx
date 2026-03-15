import { motion } from 'motion/react'
import { FaGithub, FaTwitter, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { SiGo, SiReact, SiDocker, SiKubernetes, SiMysql } from 'react-icons/si'
import { RiNextjsFill } from 'react-icons/ri'
import { DiRedis } from 'react-icons/di'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import Layout from '@theme/Layout'

const skills = [
  { name: 'Go', icon: <SiGo className='h-5 w-5' />, color: 'border-cyan-500/30 bg-cyan-500/10' },
  { name: 'React', icon: <SiReact className='h-5 w-5' />, color: 'border-blue-500/30 bg-blue-500/10' },
  { name: 'Next.js', icon: <RiNextjsFill className='h-5 w-5' />, color: 'border-gray-500/30 bg-gray-500/10' },
  { name: 'MySQL', icon: <SiMysql className='h-5 w-5' />, color: 'border-orange-500/30 bg-orange-500/10' },
  { name: 'Redis', icon: <DiRedis className='h-5 w-5' />, color: 'border-red-500/30 bg-red-500/10' },
  { name: 'Docker', icon: <SiDocker className='h-5 w-5' />, color: 'border-blue-600/30 bg-blue-600/10' },
  { name: 'Kubernetes', icon: <SiKubernetes className='h-5 w-5' />, color: 'border-purple-500/30 bg-purple-500/10' }
]

const timeline = [
  {
    year: '2024',
    title: '独立开发者',
    description: '专注于 Web3 基础设施开发'
  },
  {
    year: '2022',
    title: '高级工程师',
    description: '负责区块链核心系统架构设计'
  },
  {
    year: '2020',
    title: '后端开发',
    description: '参与多个大规模分布式系统建设'
  }
]

export default function About() {
  return (
    <Layout>
      <main className='min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-20'>
        <div className='container mx-auto max-w-5xl px-4'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-16 text-center'
          >
            <h1 className='mb-4 text-4xl font-bold md:text-5xl'>关于我</h1>
            <p className='text-lg text-muted-foreground'>
              热爱技术，专注区块链与基础设施
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className='mb-12 overflow-hidden border-2 border-border'>
              <CardContent className='p-0'>
                <div className='grid gap-0 md:grid-cols-5'>
                  {/* Avatar Section */}
                  <div className='flex items-center justify-center bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-600/10 p-8 md:col-span-2 md:p-12'>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className='text-center'
                    >
                      <div className='relative mx-auto mb-4 h-40 w-40'>
                        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-primary via-blue-500 to-purple-600 p-1'>
                          <div className='flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background'>
                            <img
                              src='/img/avatar.png'
                              alt='avatar'
                              className='h-full w-full rounded-full object-cover'
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className='text-2xl font-bold'>Gwynn</h2>
                      <p className='text-muted-foreground'>独立开发者</p>
                    </motion.div>
                  </div>

                  {/* Info Section */}
                  <div className='p-8 md:col-span-3 md:p-12'>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className='space-y-6'
                    >
                      <div>
                        <h3 className='mb-3 text-xl font-semibold'>你好，我是 Gwynn</h3>
                        <p className='text-muted-foreground leading-relaxed'>
                          一名热爱技术的独立开发者，专注于区块链基础设施、高性能后端系统开发。致力于构建安全、高效、可扩展的分布式系统。
                        </p>
                      </div>

                      <div className='space-y-3'>
                        <div className='flex items-center gap-3 text-muted-foreground'>
                          <FaMapMarkerAlt className='text-primary' />
                          <span>中国</span>
                        </div>
                        <div className='flex items-center gap-3 text-muted-foreground'>
                          <FaCalendarAlt className='text-primary' />
                          <span>10+ 年开发经验</span>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className='flex gap-4'>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href='https://github.com/ledboot'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-muted/80'
                        >
                          <FaGithub className='h-5 w-5' />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href='https://x.com/ledboot_'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex h-10 w-10 items-center justify-center rounded-lg bg-muted hover:bg-muted/80'
                        >
                          <FaTwitter className='h-5 w-5' />
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='mb-12'
          >
            <h2 className='mb-6 text-2xl font-bold'>技术栈</h2>
            <div className='flex flex-wrap gap-3'>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    className={`${skill.color} border-2 px-4 py-2 text-sm`}
                  >
                    {skill.icon}
                    <span className='ml-2'>{skill.name}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className='mb-8 text-2xl font-bold'>经历</h2>
            <div className='relative'>
              {/* Vertical line */}
              <div className='absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-purple-500 to-purple-600' />
              
              <div className='space-y-8'>
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                    className='relative flex items-start gap-6'
                  >
                    {/* Dot */}
                    <div className='relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25'>
                      <span className='text-sm font-bold text-white'>{item.year.slice(-2)}</span>
                    </div>

                    {/* Content */}
                    <Card className='flex-1 border-2 border-border bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10'>
                      <CardContent className='p-5'>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-lg font-semibold'>{item.title}</h3>
                          <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'>
                            {item.year}
                          </span>
                        </div>
                        <p className='mt-2 text-sm text-muted-foreground'>{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </Layout>
  )
}
