import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import { ArrowUpRight, CheckCircle2, Github, MessageCircle, PencilLine } from 'lucide-react'
import styles from './trust.module.css'

const principles = [
  '优先记录亲自构建、部署或排查过的问题',
  '给出版本、环境和限制，避免把局部经验写成普遍结论',
  '引用原始文档，并清楚区分事实、推断和个人选择',
  '发现错误后修订内容，让文章持续对读者负责'
]

export default function AboutPage() {
  return (
    <Layout title='关于作者' description='了解 wawov 的作者、内容方向与编辑原则。'>
      <Head>
        <link rel='canonical' href='https://wawov.com/about' />
      </Head>
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>ABOUT / 关于本站</p>
            <h1>写给同样在构建真实产品的人</h1>
          </div>
          <p className={styles.summary}>
            wawov 是 Gwynn 的个人工程手记，聚焦 Solidity、智能合约安全、后端基础设施与独立产品开发。
          </p>
        </header>

        <section className={styles.profile} aria-labelledby='author-title'>
          <img
            src='/img/avatar.png'
            alt='Gwynn 的头像'
            width='320'
            height='320'
            loading='eager'
          />
          <div>
            <p className={styles.sectionLabel}>作者</p>
            <h2 id='author-title'>你好，我是 Gwynn</h2>
            <p>
              我是一名独立开发者，有超过 10 年的软件开发经验。长期关注后端系统、区块链基础设施与产品工程，也在持续完成从想法、开发、部署到商业化的独立产品实践。
            </p>
            <p>
              写作对我来说不是整理百科，而是复盘工程判断：问题为什么发生、试过哪些方案、依据是什么，以及最终结果能否被别人复现。
            </p>
            <div className={styles.profileLinks}>
              <a href='https://github.com/ledboot' target='_blank' rel='noopener noreferrer'>
                <Github aria-hidden='true' size={18} /> GitHub
                <ArrowUpRight aria-hidden='true' size={15} />
              </a>
              <a href='https://x.com/ledboot_' target='_blank' rel='noopener noreferrer'>
                <MessageCircle aria-hidden='true' size={18} /> X
                <ArrowUpRight aria-hidden='true' size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className={styles.twoColumn}>
          <div>
            <p className={styles.sectionLabel}>内容范围</p>
            <h2>这里主要写什么</h2>
          </div>
          <div className={styles.topicList}>
            <article>
              <span>01</span>
              <h3>Solidity 与合约安全</h3>
              <p>从语言基础、Foundry 工具链到攻击复现、审计和生产发布。</p>
            </article>
            <article>
              <span>02</span>
              <h3>后端与基础设施</h3>
              <p>围绕日志、容器、云服务和可维护系统的真实配置与排查记录。</p>
            </article>
            <article>
              <span>03</span>
              <h3>独立开发实践</h3>
              <p>一个人完成产品、支付、部署和持续迭代时做出的选择与复盘。</p>
            </article>
          </div>
        </section>

        <section className={styles.policy} aria-labelledby='policy-title'>
          <div>
            <PencilLine aria-hidden='true' size={28} />
            <p className={styles.sectionLabel}>编辑原则</p>
            <h2 id='policy-title'>内容如何被写出来</h2>
          </div>
          <ul>
            {principles.map((principle) => (
              <li key={principle}>
                <CheckCircle2 aria-hidden='true' size={19} />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.cta}>
          <div>
            <p className={styles.sectionLabel}>从这里开始</p>
            <h2>选择一条你正在走的路</h2>
          </div>
          <div>
            <Link to='/solidity/'>学习 Solidity</Link>
            <Link to='/blog/'>阅读工程手记</Link>
            <Link to='/contact'>反馈问题</Link>
          </div>
        </section>
      </main>
    </Layout>
  )
}
