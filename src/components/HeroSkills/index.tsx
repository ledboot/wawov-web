import { FaReact, FaNodeJs, FaDocker, FaPython, FaAws } from 'react-icons/fa'
import { FaGolang } from 'react-icons/fa6'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import { SiTypescript, SiMysql, SiPostgresql, SiMongodb, SiSolidity } from 'react-icons/si'
import { GrGraphQl } from 'react-icons/gr'
import { motion } from 'motion/react'
import { Badge } from '../ui/badge'
import AnimatedSection from '../AnimatedSection'
import SectionTitle from '../SectionTitle'
import InfiniteScroll from '../InfiniteScroll'
// 技术栈分为两行
const techStackRow1 = [
  { name: 'React', icon: <FaReact className='size-4' />, category: 'Frontend' },
  { name: 'Next.js', icon: <RiNextjsFill className='size-4' />, category: 'Framework' },
  { name: 'TypeScript', icon: <SiTypescript className='size-4' />, category: 'Language' },
  { name: 'Tailwind CSS', icon: <RiTailwindCssFill className='size-4' />, category: 'Styling' },
  { name: 'Mysql', icon: <SiMysql className='size-4' />, category: 'Animation' },
  { name: 'Node.js', icon: <FaNodeJs className='size-4' />, category: 'Backend' },
  { name: 'PostgreSQL', icon: <SiPostgresql className='size-4' />, category: 'Database' }
]

const techStackRow2 = [
  { name: 'MongoDB', icon: <SiMongodb className='size-4' />, category: 'NoSQL' },
  { name: 'GraphQL', icon: <GrGraphQl className='size-4' />, category: 'API' },
  { name: 'Docker', icon: <FaDocker className='size-4' />, category: 'DevOps' },
  { name: 'Golang', icon: <FaGolang className='size-4' />, category: 'Backend' },
  { name: 'Python', icon: <FaPython className='size-4' />, category: 'Language' },
  { name: 'AWS', icon: <FaAws className='size-4' />, category: 'Cloud' },
  { name: 'Solidity', icon: <SiSolidity className='size-4' />, category: 'Crypto' }
]
export default function HeroSkills() {
  return (
    <section id='skills' className='relative overflow-hidden px-4 py-20'>
      <div className='container relative z-10 mx-auto max-w-6xl'>
        <SectionTitle
          title='技术栈'
          subtitle='专注后端/Crypto核心技术，持续学习和探索新的技术趋势'
        />

        <AnimatedSection>
          <div className='space-y-12'>
            {/* 第一行 - 向左滚动 */}
            <InfiniteScroll technologies={techStackRow1} direction='left' speed={30} />

            {/* 第二行 - 向右滚动 */}
            <InfiniteScroll technologies={techStackRow2} direction='right' speed={35} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
