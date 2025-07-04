import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'wawov',
  tagline: 'Dinosaurs are cool',
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
    experimental_faster: true,
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
        blog: false,
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
      { name: 'keywords', content: 'wawov,个人网站, golang, blockchain, devops, 知识分享' },
      { name: 'description', content: 'Gwynn的知识库，分享技术，分享生活' },
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
        {
          position: 'left',
          label: '从零开始',
          type: 'dropdown',
          items:[
            {
              type: 'doc',
              docId: 'solidity/solidity-intro',
              label: 'Solidity',
            }
          ]
        },
        { href: 'https://blog.wawov.com', label: '博客', position: 'left' },
        {
          href: 'https://github.com/ledboot',
          label: 'GitHub',
          position: 'right',
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '从零开始学Solidity',
              to: '/solidity'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'X',
              href: 'https://x.com/ledboot_'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ledboot'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} wawov.com | Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      additionalLanguages: ['solidity', 'bash']
    }
  } satisfies Preset.ThemeConfig,

  // Add Tailwind CSS
  plugins: [
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        }
      }
    },
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-N88LK9MV'
      }
    ]
  ]
}

export default config
