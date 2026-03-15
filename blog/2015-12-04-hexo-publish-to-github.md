---
id: hexo-publish-to-github
title: hexo部署到github
date: 2015-12-04
tags: [Hexo, Github]
---

##### 环境配置
-  Git [下载地址](http://git-scm.com/download/)
- nodejs [下载地址](https://nodejs.org/en/download/)


[github](https://github.com)帐号是必须的不废话了，关于生成可以通过[这篇博客](./2015-12-04-ssh-key-generate.md)了解

##### 安装Hexo

命令行输入
```
npm install hexo -g
```
选择一个文件夹安装hexo
```
hexo init <folder>
cd <folder>
npm install
```
<!--more-->

##### 启动Hexo

```
hexo server
```
默认启动地址http://localhost:4000/

##### 关联github
在github上创建一个新的Repository，仓库名字必须为**your_user_name.github.io**
编辑器打开_config.yml文件，在文件最下面
```
deploy:
    type:
```
修改为：

```
deploy:
  type: git
  repo: 仓库的ssh
  branch: master
```
***ps:注意了，在_config.yml文件里的每个冒号(:)后面输入时，必须加个空格，这是我遇到的坑。***

##### 部署

```
hexo clean

hexo generate

hexo deploy
```
如果看到类是这样的信息说明已经成功部署到github了
```
Branch master set up to track remote branch master from git@github.com:ledboot/l
edboot.github.io.git.
To git@github.com:ledboot/ledboot.github.io.git
 + f88ff14...922b63d master -> master (forced update)
INFO  Deploy done: git
```
现在你就可以输入http://username.github.io
