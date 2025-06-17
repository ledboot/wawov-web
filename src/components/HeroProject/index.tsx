import { motion } from 'motion/react'
import AnimatedSection from '../AnimatedSection'
import { Card } from '../ui/card'
import { FaChevronRight, FaGithub } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { FiExternalLink } from 'react-icons/fi'
import { Button } from '../ui/button'
import SectionTitle from '../SectionTitle'

const projects = [
  {
    title: '号角',
    description: '号角HOJO是集游戏社交、电竞信息大全的一站式聚合平台',
    tech: ['Kubernetes', 'React', 'TypeScript', 'Golang', 'MongoDB'],
    github: '',
    demo: 'https://haojiao.cc',
    image: '/img/haojiao.png',
    features: ['电竞赛事', '游戏资讯', '游戏社区', '游戏攻略', '游戏工具']
  },
  {
    title: 'CryptoHub',
    description:
      'CryptoHub是一个web3聚合工具平台，提供多链地址钱包Token余额查询、NFT资产查询、钱包生成等功能',
    tech: ['NextJS', 'web3.js', 'TailwindCSS', 'ShadcnUI', 'TypeScript'],
    github: 'https://github.com/CryptoHub-web3/CryptoHub',
    demo: 'https://cryptohub.lol',
    image: '/img/cryptohub.png',
    features: [
      '多链地址钱包Token余额查询',
      'NFT资产查询',
      '钱包生成',
      '钱包地址生成',
      '钱包地址查询'
    ]
  },
  {
    title: 'SmartIMG',
    description:
      '使用大模型轻松移除水印,AI算法优化,几秒钟内完成水印移除,完全客户端处理,保护隐私安全',
    tech: ['NextJS', 'AI', 'TypeScript', 'Tailwind CSS', 'ShadcnUI'],
    github: '',
    demo: 'https://smartimg.wawov.com/',
    image: '/img/smartimg.png',
    features: ['AI算法优化', '几秒钟内完成水印移除', '完全客户端处理', '保护隐私安全']
  },
  {
    title: 'SmartPDF',
    description:
      '基于AI完整保留排版的PDF双语翻译,支持多种语言,支持Google/DeepL/Ollama/OpenAI 等服务',
    tech: ['Python', 'NextJS', 'TypeScript', 'AI', 'ShadcnUI'],
    github: '',
    demo: '',
    image: '/img/placeholder.svg?height=400&width=700',
    features: ['完整保留排版', '双语翻译', '支持多种语言', '支持Google/DeepL/Ollama/OpenAI 等服务']
  }
]

export default function HeroProject() {
  return (
    <section id='projects' className='relative overflow-hidden px-4 py-20'>
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-br from-background to-muted/10' />
        <motion.div
          animate={{
            rotate: [0, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          className='absolute right-1/4 top-1/4 h-96 w-96 rounded-full border border-primary/20'
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
          className='absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full border border-blue-500/20'
        />
      </div>

      <div className='container relative z-10 mx-auto max-w-6xl'>
        <SectionTitle title='项目展示' subtitle='一些过往的项目，以及最近正在进行的项目' />

        <div className='space-y-16'>
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 0.2} className='relative'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='transition-transform duration-200'
              >
                <Card className='overflow-hidden py-0 shadow-2xl'>
                  <div className='grid gap-6 md:grid-cols-2'>
                    <div className='relative overflow-hidden md:order-last'>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className='absolute inset-0 h-full w-full rounded-br-lg rounded-tr-lg object-cover'
                        initial={{ scale: 1.2, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        aria-hidden='true'
                      />
                    </div>

                    <div className='px-8 py-10'>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className='mb-2 text-2xl font-bold'>{project.title}</h3>
                        <p className='mb-6'>{project.description}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='mb-6'
                      >
                        <h4 className='mb-2 text-sm font-medium'>主要功能</h4>
                        <ul className='space-y-2 pl-0'>
                          {project.features.map((feature, i) => (
                            <motion.li
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className='flex items-center gap-2'
                            >
                              <FaChevronRight className='h-4 w-4 text-primary' />
                              <span className='text-sm'>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='mb-6 flex flex-wrap gap-2'
                      >
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant='outline' className='border-gray-300 text-xs'>
                            {tech}
                          </Badge>
                        ))}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='flex gap-4'
                      >
                        {project.demo && (
                          <Button
                            size='sm'
                            variant='outline'
                            className='cursor-pointer'
                            onClick={() => window.open(project.demo, '_blank')}
                          >
                            <FiExternalLink className='mr-2 h-4 w-4' />
                            查看演示
                          </Button>
                        )}
                        {project.github && (
                          <Button
                            size='sm'
                            variant='outline'
                            className='cursor-pointer'
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            <FaGithub className='mr-2 h-4 w-4' />
                            源代码
                          </Button>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
