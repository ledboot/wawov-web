import { motion } from 'motion/react'

export default function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className='mb-16 text-center'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='mb-4 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl'
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mx-auto mb-8 h-1 bg-gradient-to-r from-primary to-blue-600'
      />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='mx-auto max-w-2xl text-lg'
      >
        {subtitle}
      </motion.p>
    </div>
  )
}
