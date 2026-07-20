---
title: '第五章 实战项目开发'
sidebar_position: 6
keywords: ['solidity', '实战项目开发']
description: '通过 ERC20、NFT 与最小 AMM 项目，把 Solidity 知识转化为完整合约设计。'
---

# 第五章 实战项目开发

本章用三个常见协议组件检验前面的语言、权限和测试能力。重点不是复制标准实现，而是理解标准解决了什么问题，以及每个扩展能力会带来怎样的安全和维护成本。

## 实战项目

- **ERC20：** 角色权限、暂停机制与 EIP-2612 Permit
- **NFT：** 铸造权限、元数据、版税与转移边界
- **最小 AMM：** 流动性、定价、滑点和手续费

## 完成标准

每个项目至少应包含正常路径、权限失败、边界输入和关键不变量测试。部署前还应记录管理员、升级能力和紧急暂停等信任假设。

## 本章内容

import DocCardList from '@theme/DocCardList';

<DocCardList />
