---
id: ssh-key-generate
title: ssh key生成
date: 2015-12-04
tags: [ssh]
---

### ssh key生成
key会生成在.ssh文件夹下面
```
ssh-keygen -t rsa  -C "your_email@example.com"
```

### 多个ssh key配置

在C:\Users\Administrator\.ssh目录下，生成多个ssh key，同时，创建一个config文件，配置如下：

```
#github user
Host github.com
HostName github.com
User git
IdentityFile C:\Users\Administrator\.ssh\my

# local user
Host 192.168.0.141
HostName 192.168.0.141
User git
IdentityFile C:\Users\Administrator\.ssh\id_rsa
```
上面的my与id_rsa是对应环境的PRIVATE KEY文件名
