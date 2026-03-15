---
id: manager-your-image-by-github
title: 使用GitHub作为博客的图床
date: 2024-09-13
tags: [GitHub]
draft: true
---

如果你还在为博客的图片存储和管理而烦恼，不妨试试使用GitHub作为博客的图床。本文将详细介绍如何利用GitHub作为博客的图床，实现免费、可靠的图片存储和管理方案。

<!-- more -->


## 为什么使用GitHub作为图床？
第一原则：**免费**，第二原则：**免费**，第三原则：**还是免费**。

之前考虑过使用[Imgur](https://imgur.com/)，[Postimages](https://postimages.org/)，但是后来发现对国内访问并不友好，弄cdn也不太方便，如果是免费的版，可能还会存储丢图片的情况。

最后还是决定使用GitHub作为图床

GitHub仓库存储也是有限制的。具体可以参考这里：

[GitHub 存储限制](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/viewing-your-github-codespaces-usage)

## 结合PicGo使用更加方便

PicGo是一款非常强大的图片上传工具，支持多种图床。你可以方便地将图片上传到GitHub仓库，并获取图片的URL。

自行安装使用:

[PicGo-Core](https://github.com/PicGo/PicGo-Core)

直接可用的GUI:

[PicGo](https://github.com/Molunerfinn/PicGo)


在PicGo中配置Github信息:

![PicGo-Github-Config](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202409131932230.png)
