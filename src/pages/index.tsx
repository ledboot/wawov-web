import Layout from '@theme/Layout'
import HeroInfo from '../components/HeroInfo'
import HeroSkills from '../components/HeroSkills'
import HeroProject from '../components/HeroProject'
export default function Home() {
  return (
    <Layout>
      <main className='relative min-h-screen bg-gradient-to-br from-background via-background to-muted/20'>
        <HeroInfo />
        <HeroSkills />
        <HeroProject />
      </main>
    </Layout>
  )
}
