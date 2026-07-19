import Head from '@docusaurus/Head'
import Layout from '@theme/Layout'
import { ArrowUpRight, Github, MessageCircle, ShieldCheck } from 'lucide-react'
import styles from './trust.module.css'

export default function ContactPage() {
  return (
    <Layout title='联系与反馈' description='联系 wawov，提交文章勘误、技术问题或合作建议。'>
      <Head>
        <link rel='canonical' href='https://wawov.com/contact' />
      </Head>
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>CONTACT / 联系与反馈</p>
            <h1>让问题带着上下文抵达</h1>
          </div>
          <p className={styles.summary}>
            如果你发现文章错误、示例无法运行，或者想交流工程实践，可以通过下面的公开渠道联系。
          </p>
        </header>

        <section className={styles.contactGrid} aria-label='联系方式'>
          <a href='https://github.com/ledboot' target='_blank' rel='noopener noreferrer'>
            <span className={styles.contactIcon}><Github aria-hidden='true' size={26} /></span>
            <p className={styles.sectionLabel}>代码与勘误</p>
            <h2>GitHub</h2>
            <p>适合提交代码问题、文档勘误，或提供可以复现的技术上下文。</p>
            <strong>访问 GitHub <ArrowUpRight aria-hidden='true' size={17} /></strong>
          </a>
          <a href='https://x.com/ledboot_' target='_blank' rel='noopener noreferrer'>
            <span className={styles.contactIcon}><MessageCircle aria-hidden='true' size={26} /></span>
            <p className={styles.sectionLabel}>交流与动态</p>
            <h2>X / Twitter</h2>
            <p>适合简短交流、内容建议，以及关注新文章和项目进展。</p>
            <strong>前往 X <ArrowUpRight aria-hidden='true' size={17} /></strong>
          </a>
        </section>

        <section className={styles.contactNote}>
          <ShieldCheck aria-hidden='true' size={28} />
          <div>
            <h2>提交技术问题时，建议包含</h2>
            <p>相关页面、运行环境与版本、预期结果、实际结果，以及最小可复现步骤。请不要发送私钥、助记词、访问令牌或其他敏感信息。</p>
          </div>
        </section>
      </main>
    </Layout>
  )
}
