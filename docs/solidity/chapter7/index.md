---
title: '第七章 性能优化与工程实践'
sidebar_position: 8
keywords: ['solidity', '性能优化', 'gas']
description: '理解 Gas 成本，建立可度量的优化方法与持续性能回归防线。'
---

# 第七章 性能优化与工程实践

Gas 优化不应依靠零散技巧。本章先建立成本模型和测量基线，再讨论存储布局、参数传递与计算方式，最后把性能阈值接入 CI，防止迭代过程中悄悄退化。

## 学习目标

- 分辨部署成本、冷/热访问与存储写入成本
- 使用 Foundry Gas Report 和 Snapshot 建立基线
- 在不损害可读性和安全性的前提下优化热点路径
- 用 CI 检测合约大小和 Gas 回归

## 优化原则

先测量，再优化；先保证正确与安全，再讨论成本。每次优化都应有前后数据，并通过相同测试证明行为没有变化。

## 本章内容

import DocCardList from '@theme/DocCardList';

<DocCardList />
