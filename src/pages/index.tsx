import Layout from "@theme/Layout"
import HomepageHeader from "@site/src/components/HomepageHeader"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description="Personal portfolio and blog of a software developer">
      <main>
        <HomepageHeader />
      </main>
    </Layout>
  )
}