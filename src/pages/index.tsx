import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  FileText,
  FlaskConical,
  GitBranch,
  Layers3,
  ShieldCheck,
  TerminalSquare
} from 'lucide-react'
import styles from './index.module.css'

const learningPath = [
  {
    index: '01',
    title: '建立 Solidity 基础',
    description: '从类型、函数与控制流开始，理解合约执行的基本模型。',
    href: '/solidity/chapter1/',
    icon: Code2
  },
  {
    index: '02',
    title: '用 Foundry 驱动开发',
    description: '搭建工具链，把编译、测试、部署与交互串成完整工作流。',
    href: '/solidity/chapter2/',
    icon: TerminalSquare
  },
  {
    index: '03',
    title: '进入真实合约工程',
    description: '通过 ERC20、NFT 与 AMM 实战理解协议设计取舍。',
    href: '/solidity/chapter5/',
    icon: Layers3
  },
  {
    index: '04',
    title: '建立安全上线防线',
    description: '复现攻击、执行审计，并用 Runbook 管理生产发布。',
    href: '/solidity/chapter8/',
    icon: ShieldCheck
  }
]

const featured = [
  {
    eyebrow: '安全实战',
    title: '攻击复现与防御：用测试证明修复有效',
    description: '把重入、预言机操纵、回调注入等典型攻击放进 Foundry 测试，以可重复的失败和通过结果验证防线。',
    href: '/solidity/chapter8/0x01-attack-reproduction-and-defense',
    icon: FlaskConical
  },
  {
    eyebrow: '工程方法',
    title: '智能合约审计工作流与检查清单',
    description: '从范围确认、自动化扫描到人工验证和修复回归，把审计从一次检查变成持续流程。',
    href: '/solidity/chapter8/0x02-audit-workflow-and-checklist',
    icon: CheckCircle2
  },
  {
    eyebrow: '独立开发',
    title: '半年 Side Project：把产品真正带到海外',
    description: '记录一个人从想法、产品、支付到基础设施的完整实践，以及上线后仍要持续回答的问题。',
    href: '/blog/side-project-going-global',
    icon: GitBranch
  }
]

const recentNotes = [
  {
    date: '2026.07',
    title: '用半年时间，断断续续做了一个出海 Side Project',
    href: '/blog/side-project-going-global',
    category: '产品复盘'
  },
  {
    date: '2025.12',
    title: '如何处理音乐 CUE 文件',
    href: '/blog/2025/12/12/handle-cue-file',
    category: '问题解决'
  },
  {
    date: '2025.03',
    title: 'Loki：从采集到查询的轻量日志方案',
    href: '/blog/2025/03/17/grafana-loki',
    category: '基础设施'
  },
  {
    date: '2025.03',
    title: '理解 HD Wallet：BIP32、BIP39 与 BIP44',
    href: '/blog/2025/03/10/understanding-hd-wallets',
    category: 'Web3'
  }
]

export default function Home() {
  return (
    <Layout
      title='区块链与独立开发实战'
      description='Gwynn 的工程手记：系统学习 Solidity、智能合约安全、后端基础设施与独立产品开发。'
    >
      <Head>
        <meta property='og:type' content='website' />
        <meta property='og:title' content='wawov｜区块链与独立开发实战' />
        <meta
          property='og:description'
          content='用可运行的代码、真实问题与完整复盘，记录 Solidity、基础设施和独立开发实践。'
        />
        <link rel='canonical' href='https://wawov.com/' />
      </Head>

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby='home-title'>
          <div className={styles.heroGrid} aria-hidden='true' />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>
                <span>FIELD NOTES</span>
                面向构建者的工程手记
              </p>
              <h1 id='home-title'>
                把复杂系统，
                <span>拆成可以验证的实践。</span>
              </h1>
              <p className={styles.lede}>
                我是 Gwynn，一名独立开发者。这里不收集泛泛的技术摘要，只记录亲手构建、测试和上线过程中真正解决过的问题。
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.primaryAction} to='/solidity/'>
                  开始学习 Solidity
                  <ArrowRight aria-hidden='true' size={18} />
                </Link>
                <Link className={styles.textAction} to='/blog/'>
                  阅读工程手记
                </Link>
              </div>
            </div>

            <aside className={styles.heroManifesto} aria-label='内容原则'>
              <p className={styles.manifestoNumber}>ISSUE 01 / 2026</p>
              <div className={styles.manifestoRule} />
              <blockquote>“代码可以运行，只是起点；结论能够复现，才值得写下来。”</blockquote>
              <dl>
                <div>
                  <dt>主题</dt>
                  <dd>Solidity · 后端 · 独立开发</dd>
                </div>
                <div>
                  <dt>写法</dt>
                  <dd>问题 · 证据 · 取舍 · 结果</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className={styles.pathSection} aria-labelledby='path-title'>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionIndex}>01 / 学习路径</p>
              <h2 id='path-title'>从第一份合约，到安全上线</h2>
            </div>
            <p>一条按工程能力组织的 Solidity 路线，而不是互不相干的知识点清单。</p>
          </div>

          <div className={styles.pathGrid}>
            {learningPath.map((item) => {
              const Icon = item.icon
              return (
                <Link className={styles.pathCard} to={item.href} key={item.index}>
                  <span className={styles.pathIndex}>{item.index}</span>
                  <Icon aria-hidden='true' size={25} strokeWidth={1.7} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className={styles.cardLink}>
                    进入章节 <ArrowRight aria-hidden='true' size={16} />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className={styles.featuredSection} aria-labelledby='featured-title'>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionIndex}>02 / 精选内容</p>
              <h2 id='featured-title'>从真实问题开始</h2>
            </div>
            <p>每篇内容都尽量给出环境、代码、判断依据和下一步，而不止是答案。</p>
          </div>

          <div className={styles.featuredGrid}>
            {featured.map((item, index) => {
              const Icon = item.icon
              return (
                <article className={styles.featuredCard} key={item.title}>
                  <div className={styles.featuredMeta}>
                    <span>0{index + 1}</span>
                    <Icon aria-hidden='true' size={22} strokeWidth={1.7} />
                  </div>
                  <p className={styles.eyebrow}>{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link to={item.href}>
                    阅读全文 <ArrowRight aria-hidden='true' size={16} />
                  </Link>
                </article>
              )
            })}
          </div>
        </section>

        <section className={styles.notesSection} aria-labelledby='notes-title'>
          <div className={styles.notesIntro}>
            <p className={styles.sectionIndex}>03 / 最近更新</p>
            <h2 id='notes-title'>持续记录，持续修正</h2>
            <p>除了系统教程，这里也保留排查记录、工具实践与独立产品复盘。</p>
            <Link to='/blog/'>
              查看全部文章 <ArrowRight aria-hidden='true' size={16} />
            </Link>
          </div>
          <div className={styles.noteList}>
            {recentNotes.map((note) => (
              <Link className={styles.noteRow} to={note.href} key={note.title}>
                <time>{note.date}</time>
                <span className={styles.noteCategory}>{note.category}</span>
                <strong>{note.title}</strong>
                <ArrowRight aria-hidden='true' size={18} />
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.methodSection} aria-labelledby='method-title'>
          <div className={styles.methodMark} aria-hidden='true'>
            <BookOpen size={34} strokeWidth={1.5} />
          </div>
          <div>
            <p className={styles.sectionIndex}>编辑原则</p>
            <h2 id='method-title'>可信内容，不靠口号证明</h2>
          </div>
          <ul>
            <li>优先写亲自使用和验证过的方案</li>
            <li>明确环境、版本、限制与失败路径</li>
            <li>引用原始资料，区分事实与个人判断</li>
            <li>发现错误时更新正文并保留上下文</li>
          </ul>
          <Link to='/about'>
            了解作者与本站 <FileText aria-hidden='true' size={17} />
          </Link>
        </section>
      </main>
    </Layout>
  )
}
