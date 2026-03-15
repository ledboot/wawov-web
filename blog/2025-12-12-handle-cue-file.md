---
id: handle-cue-file
title: 如何处理音乐CUE文件
date: 2025-12-12
tags: [NAS, CUE文件]
---

最近在倒腾新买的nas，在音乐刮削用到这个开源项目[music-tag-web](https://github.com/xhongc/music-tag-web),但是下载好的音乐文件就是无法进行音轨拆分。

<!--more-->

无论是把项目删除、数据清除，反复重新安装[music-tag-web](https://github.com/xhongc/music-tag-web)都还是会保这样的错误。

![music-tag-web](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202512121507382.png)

扒拉扒拉源码也没有找到对应的地方，估计v1的版本也没有继续开源了。这下只能自己手动进行音轨拆分了。

这里需要用到几个工具：
- shntool
- ffmpeg
- iconv

mac上安装这几个工具，可以使用brew
```bash
brew install shntool ffmpeg libiconv
```

## ffmpeg

如果音频是ape格式的，需要使用ffmpeg进行转换

```bash
ffmpeg -i CDImage.ape CDImage.wav
```

## shntool
根据cue文件切分音轨的工具

```bash
shntool split -t %t -f CDImage.cue -o wav CDImage.wav -d .
```

`-t` 参数表示分割出来的文件采用什么文件名，`%t` 表示用歌曲名字命名；`-f` 表示输入的 cue 文件；`-o` 指定输出格式；`-d` 参数为输出目录，此例用点表示当前目录。


## iconv
编码转换工具
大部分CUE文件都是在windows系统下生成的，所以需要将cue文件的编码转换为utf-8。

```bash
iconv -f gbk -t utf8 CDImage.cue > CDImage-1.cue
```

**ok，let' t fire～**

![result](https://cdn.wawov.com/gh/ledboot/blog-asset/img/2024/202512121519190.png)
