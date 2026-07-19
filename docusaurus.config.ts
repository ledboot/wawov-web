import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'wawov',
  tagline: '把复杂系统，拆成可以验证的实践',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://wawov.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wawov', // Usually your GitHub org/user name.
  projectName: 'wawov', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans']
  },
  future: {
    v4: true
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/ledboot/wawov-web/tree/main/'
        },
        blog: {
          routeBasePath: '/blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '全部文章',
          postsPerPage: 8,
          showReadingTime: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: [
            '/search',
            '/blog/archive',
            '/blog/page/**',
            '/blog/tags',
            '/blog/tags/**'
          ]
        },
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],
  markdown: {
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: true
    },
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      { name: 'author', content: 'Gwynn' },
      { name: 'keywords', content: 'Solidity,智能合约安全,Foundry,后端开发,独立开发,wawov' },
      {
        name: 'description',
        content: 'Gwynn 的工程手记：系统学习 Solidity、智能合约安全、后端基础设施与独立产品开发。'
      },
      { name: 'google-adsense-account', content: 'ca-pub-3198470578962995' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' }
    ],
    algolia: {
      appId: '1CCGLI5COR',
      apiKey: 'f47fda380029faa9451ba4dd591207e3',
      indexName: 'wawov',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
      insights: true
    },
    navbar: {
      title: 'wawov',
      logo: {
        alt: 'wawov',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/solidity/', label: 'Solidity 教程', position: 'left' },
        { to: '/blog', label: '博客', position: 'left' },
        { to: '/about', label: '关于', position: 'left' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '从零开始学Solidity',
              to: '/solidity'
            },
            {
              label: '工程手记',
              to: '/blog'
            }
          ]
        },
        {
          title: '关于',
          items: [
            {
              label: '关于作者',
              to: '/about'
            },
            {
              label: '联系与反馈',
              to: '/contact'
            },
            {
              label: '隐私政策',
              to: '/privacy'
            }
          ]
        },
        {
          title: '关注',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ledboot'
            },
            {
              label: 'X / Twitter',
              href: 'https://x.com/ledboot_'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gwynn · wawov.com`
    },
    prism: {
      theme: prismThemes.github,
      additionalLanguages: ['solidity', 'bash']
    }
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-N88LK9MV'
      }
    ]
  ]
}

export default config
