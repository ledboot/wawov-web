import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import styles from './trust.module.css'

export default function PrivacyPage() {
  return (
    <Layout title='隐私政策' description='wawov 的隐私政策、Cookie 使用与第三方服务说明。'>
      <Head>
        <link rel='canonical' href='https://wawov.com/privacy' />
      </Head>
      <main className={`${styles.page} ${styles.legalPage}`}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>PRIVACY / 隐私政策</p>
            <h1>透明说明本站如何处理数据</h1>
          </div>
          <p className={styles.summary}>生效日期：2026 年 7 月 19 日</p>
        </header>

        <div className={styles.legalLayout}>
          <aside aria-label='本页目录'>
            <a href='#scope'>适用范围</a>
            <a href='#collection'>收集的信息</a>
            <a href='#services'>第三方服务</a>
            <a href='#advertising'>广告与 Cookie</a>
            <a href='#choices'>你的选择</a>
            <a href='#contact'>联系我们</a>
          </aside>

          <article>
            <section id='scope'>
              <h2>1. 适用范围</h2>
              <p>
                本政策适用于 wawov.com（以下简称“本站”）。本站主要提供技术教程、工程实践记录和独立开发复盘，不要求用户注册账户，也不会主动要求你提交身份证件、支付信息等敏感个人信息。
              </p>
            </section>

            <section id='collection'>
              <h2>2. 可能收集的信息</h2>
              <p>
                当你访问本站时，托管、分析或安全服务可能处理浏览器类型、设备信息、访问时间、来源页面、访问页面、IP 地址及大致地区等技术信息。这些信息用于保障站点运行、了解内容使用情况和改进阅读体验。
              </p>
              <p>本站不会出售你的个人信息。</p>
            </section>

            <section id='services'>
              <h2>3. 使用的第三方服务</h2>
              <ul>
                <li><strong>Google Tag Manager：</strong>用于管理站点统计与相关标签。</li>
                <li><strong>Algolia：</strong>用于提供站内搜索，搜索请求可能由 Algolia 处理。</li>
                <li><strong>网站托管与 CDN：</strong>用于交付页面、保障可用性和防范滥用。</li>
              </ul>
              <p>这些服务会依照各自的隐私政策处理数据，其处理范围可能随本站功能调整而变化。</p>
            </section>

            <section id='advertising'>
              <h2>4. Google 广告与 Cookie</h2>
              <p>
                当本站启用 Google AdSense 等广告服务时，包括 Google 在内的第三方供应商可能使用 Cookie，根据用户此前访问本站或其他网站的情况投放广告。Google 使用广告 Cookie，使其及其合作伙伴能够根据用户访问本站和互联网上其他网站的情况展示广告。
              </p>
              <p>
                你可以访问 <a href='https://adssettings.google.com/' target='_blank' rel='noopener noreferrer'>Google 广告设置</a>管理个性化广告，也可以通过 <a href='https://www.aboutads.info/choices/' target='_blank' rel='noopener noreferrer'>AboutAds</a> 了解并选择退出部分第三方供应商的个性化广告 Cookie。
              </p>
            </section>

            <section id='choices'>
              <h2>5. 你的选择</h2>
              <p>
                你可以在浏览器中限制或删除 Cookie、启用防跟踪功能，或使用广告平台提供的退出机制。限制 Cookie 可能影响搜索、偏好设置或其他功能的正常使用。
              </p>
            </section>

            <section id='retention'>
              <h2>6. 数据保存与安全</h2>
              <p>
                本站仅在实现上述目的或满足法律要求所需的期限内保留相关信息，并采取合理措施降低未经授权访问、泄露或滥用的风险。互联网传输无法保证绝对安全，因此请勿通过公开渠道发送敏感信息。
              </p>
            </section>

            <section id='changes'>
              <h2>7. 政策更新</h2>
              <p>当本站使用的服务或相关要求发生变化时，本政策可能更新。最新版本会发布在本页面，并标明生效日期。</p>
            </section>

            <section id='contact'>
              <h2>8. 联系我们</h2>
              <p>如果你对本政策有疑问，请通过<Link to='/contact'>联系与反馈页面</Link>提供的渠道联系。</p>
            </section>
          </article>
        </div>
      </main>
    </Layout>
  )
}
