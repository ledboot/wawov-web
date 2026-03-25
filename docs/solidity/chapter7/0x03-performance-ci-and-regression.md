---
id: '0x03-performance-ci-and-regression'
title: '0x03：性能 CI 与回归防线'
sidebar_position: 3
hide_title: true
keywords: ['solidity', 'ci', 'gas regression', 'foundry snapshot']
description: '将性能治理纳入 CI，避免 Solidity 项目在迭代中出现隐性 Gas 退化。'
---

## 1. 为什么要做性能 CI

没有自动化性能门禁，项目迭代后通常会出现“功能没坏，但 Gas 飙升”。

目标：把性能问题前置到 PR 阶段。

---

## 2. 最小 CI 流程

```bash
forge fmt --check
forge build
forge test -vvv
forge snapshot
```

在 CI 中对比基线快照，超阈值则失败。

---

## 3. 阈值策略建议

按函数级别设置阈值：

- 核心路径（swap/deposit/withdraw）：`<= 3%`
- 管理路径（配置类函数）：`<= 10%`

并把阈值写入仓库文档，避免团队口径不一致。

---

## 4. 回归排查顺序

1. 是否改动了存储结构
2. 是否新增了外部调用
3. 是否新增了事件字段
4. 编译器/优化参数是否漂移

---

## 5. 进阶做法

- 为关键函数建立独立 benchmark 测试
- 把 Gas 指标同步到监控面板
- 做版本发布前性能回归审查

性能治理不是一次性动作，而是持续工程纪律。
