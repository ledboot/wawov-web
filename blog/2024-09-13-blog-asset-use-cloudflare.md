---
id: blog-asset-use-cloudflare
title: 使用Cloudflare CDN加速博客资源
date: 2024-09-13
tags: [Cloudflare, CDN]
---

Cloudflare是一个广泛使用的CDN服务，它不仅可以加速博客资源，还能提供额外的安全保护。本文将介绍如何使用Cloudflare CDN加速你的博客及其好处。

<!--more-->

## 什么是CDN？
内容分发网络（CDN）是一组分布在多个地理位置的服务器，通过将内容缓存到离用户更近的位置，来提高网站的加载速度。CDN通过减少用户与服务器之间的距离，确保用户能够快速加载网页和资源。

## 为什么使用Cloudflare CDN？

- 全球覆盖：Cloudflare在多个国家和地区拥有数据中心，能够为全球用户提供快速的访问速度。
- 安全性：Cloudflare提供防火墙、DDoS防护和SSL加密等安全功能，保护你的博客免受网络攻击。
- 易于使用：Cloudflare的设置过程简单明了，即使是初学者也能轻松上手。
- 免费计划：Cloudflare提供免费的基础服务，非常适合个人博客和小型网站。

对于白嫖党来说，Cloudflare的免费计划，足够可以满足大部分出场景需求。

## 配置CDN设置
- 首先设置一个cdn域名，比如我这里设置一个`cdn.wawov.com`，CNAME到`cdn.jsdelivr.net`。
   这里有小明就会问，这域名在国内不是访问不了吗？先别急，后面会解决。

![CDN设置](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202409161508989.png)

## 重定向规则
- 接下来我们去配置一下重定向规则，点击`规则` -> `重定向规则` -> `创建规则`

![重定向规则](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202409161510350.png)

这里需要简单配置两个规则就可以解决国内访问不了的问题。
- `(http.host eq "cdn.wawov.com" and ip.geoip.country ne "CN")`
- `(http.host eq "cdn.wawov.com" and ip.geoip.country eq "CN")`


第一个规则，当访问的ip不是中国大陆的时候，重定向到`https://cdn.jsdelivr.net`

第二个规则，当访问的ip是中国大陆的时候，重定向到`https://cdn.jsdmirror.com`

具体配置可以参考下图：

![cdn_cn](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202409170856859.png)

![cdn_abord](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202409170858236.png)


## 验证配置

通过代理访问具体资源，验证是否生效。

![无代理访问](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202409171113832.png)

![代理访问](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202409171023687.png)

可以看到在Cloudflare设置的规则转发已经生效。

## 总结
通过使用Cloudflare CDN，与规则设置，这样就可以在博客使用一个统一的域名进行定义资源。希望本文对你有所帮助，让你能够更好地利用Cloudflare CDN加速你的博客。
