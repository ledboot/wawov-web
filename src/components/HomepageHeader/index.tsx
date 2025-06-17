import Link from '@docusaurus/Link'
import { Monitor, Smartphone, Server, Bitcoin, Workflow } from 'lucide-react'

export default function HomepageHeader() {
  return (
    <header className='min-h-screen w-full text-white'>
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 items-center gap-8 lg:grid-cols-2'>
          {/* Left Column - Text Content */}
          <div className='space-y-6'>
            <div>
              <h1 className='mb-2 text-4xl font-bold md:text-5xl'>
                Hello<span className='text-[#ff6b53]'>.</span>
              </h1>
              <h2 className='mb-2 text-2xl font-light md:text-3xl'>I'm Gwynn</h2>
              <h3 className='mb-6 text-3xl font-bold md:text-4xl'>Software Developer</h3>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className='relative flex justify-center'>
            <div className='relative z-10'>
              <img
                src='/img/docusaurus-social-card.jpg'
                alt='Gwynn - Software Developer'
                className='h-auto max-w-full rounded-full'
              />
            </div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='h-[300px] w-[300px] rounded-full border-8 border-[#ff6b53] opacity-70 md:h-[400px] md:w-[400px]'></div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Skills */}
          <div className='pt-12'>
            <div className='flex flex-wrap gap-6 text-gray-400'>
              <div className='text-center'>
                <span>Golang</span>
              </div>
              <div className='text-center'>
                <span>Solidity</span>
              </div>
              <div className='text-center'>
                <span>Kubernetes</span>
              </div>
              <div className='text-center'>
                <span>Docker</span>
              </div>
              <div className='text-center'>
                <span>Mysql</span>
              </div>
              <div className='text-center'>
                <span>Redis</span>
              </div>
              <div className='text-center'>
                <span>Git</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className='mt-24 grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Services */}
          <div>
            <div className='flex h-24 items-center'>
              <div className='h-16 w-1 bg-[#ff6b53]'></div>
              <div className='ml-5 flex items-center justify-center gap-4'>
                <Monitor className='inline-block h-10 w-10 text-[#ff6b53]' />
                <h3 className='mb-0 inline-block text-xl font-bold leading-6'>
                  Backend Development
                </h3>
              </div>
            </div>

            <div className='flex h-24 items-center'>
              <div className='h-16 w-1 bg-[#ff6b53]'></div>
              <div className='ml-5 flex items-center justify-center gap-4'>
                <Bitcoin className='inline-block h-10 w-10 text-[#ff6b53]' />
                <h3 className='mb-0 inline-block text-xl font-bold leading-6'>
                  Blockchain Development
                </h3>
              </div>
            </div>

            <div className='flex h-24 items-center'>
              <div className='h-16 w-1 bg-[#ff6b53]'></div>
              <div className='ml-5 flex items-center justify-center gap-4'>
                <Server className='inline-block h-10 w-10 text-[#ff6b53]' />
                <h3 className='mb-0 inline-block text-xl font-bold leading-6'>DevOps</h3>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div>
            <h2 className='mb-6 text-3xl font-bold md:text-4xl'>About me</h2>
            <p className='mb-8 text-gray-300'>
              I'm a software developer with a passion for building scalable and efficient systems.
              I'm also a blockchain developer with a passion for building decentralized
              applications.
            </p>

            <div className='grid grid-cols-3 gap-4'>
              <div>
                <h3 className='flex items-center text-3xl font-bold'>
                  10 <span className='ml-1 text-[#ff6b53]'>+</span>
                </h3>
                <p className='text-sm text-gray-400'>Completed Projects</p>
              </div>
              <div>
                <h3 className='flex items-center text-3xl font-bold'>
                  95 <span className='ml-1 text-[#ff6b53]'>%</span>
                </h3>
                <p className='text-sm text-gray-400'>Client satisfaction</p>
              </div>
              <div>
                <h3 className='flex items-center text-3xl font-bold'>
                  10 <span className='ml-1 text-[#ff6b53]'>+</span>
                </h3>
                <p className='text-sm text-gray-400'>Years of experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
