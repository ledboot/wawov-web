---
id: github-action
title: Bye Travis , Hello Github Action
date: 2019-10-10
tags: [Github]
---

最近折腾了一下Github的Action，发现还挺好用的。那就折腾到底吧，把Travis的构建Blog的CI迁移到Github的Action。毕竟有时间打开Travis还挺慢的。

先理一下整体流程
1. npm install
2. hexo g
3. 进入public目录push到对应的仓库

<!-- more -->

创建一个Action，默认的会在当前仓库下`.github/workflows`目录下创建一个xxx.yml文件。这个Workflow的语法主干有几个元素`name`、`on`、`env`、`jobs`

```
/**
workflows的名字
*/
name: 

/** 
如何触发当前workflow,多个触发条件可以使用数组的方式，例如：
on: [push,pull_request]
*/
on: 

/**
环境变量，以key-valued方式
*/
env:

/**
一个workflow由一个或者多个job组成，job默认都是并行运行的，如果有job之间的依赖可以使用jobs.<job_id>.needs关键字。
每一个job可以必须使用关键字jobs.<job_id>.runs-on制定运行环境。可用的环境目前有：
ubuntu-latest, ubuntu-18.04, or ubuntu-16.04
windows-latest, windows-2019, or windows-2016
macOS-latest or macOS-10.14
*/
jobs
```

按照之前整理的流程可以写出一个workflows:

```
name: DeployBlog

on:
  push:
    branches: 
     - master
    paths: 
      - '!.github/**'

env:
  GH_REF: github.com/ledboot/ledboot.github.io.git
  GitHub_Token: ${{ secrets.token }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master

    - name: npm install & hexo g
      run: |
        npm install
        ./node_modules/.bin/hexo g
    
    - name: publish
      run: |
        if [ -d 'public' ];then
          cd ./public
          git init
          git config user.name "xxx"
          git config user.email "xxx@gmail.com"
          git add .
          git commit -m "Update docs"
          git push --force --quiet "https://${GitHub_Token}@${GH_REF}" master:master
        fi
```


这里添加了一些细节处理：
- 在`on`中指定触发的分支，并且忽略`.github`目录，因为我编辑workflow文件，提交的时候，并不想触发构建。
- 添加`secrets`，可以在Setting Tab页中添加，引用方式\{`${{secrets.xxxx}}`\}
