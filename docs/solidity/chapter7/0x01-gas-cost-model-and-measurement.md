---
id: '0x01-gas-cost-model-and-measurement'
title: '0x01：Gas 成本模型与度量方法'
sidebar_position: 1
hide_title: true
keywords: ['solidity', 'gas', 'foundry', 'gas-report', 'snapshot']
description: '掌握 EVM Gas 成本模型，并用 Foundry 建立可量化的性能基线。'
---

## 1. 为什么先学成本模型

Gas 优化不是“背技巧”，而是先知道成本主要来自哪里：

- 存储读写（`SLOAD/SSTORE`）
- 外部调用（`CALL`）
- 日志写入（`LOG`）
- 内存扩展与复杂计算

核心结论：**写存储通常比算术更贵**。

---

## 2. 性能度量三件套

### 2.1 Gas 报告

```bash
forge test --gas-report
```

用于查看每个函数的大致 gas 区间。

### 2.2 Snapshot 基线

```bash
forge snapshot
```

把当前性能保存成基线，后续 PR 做差异比较。

### 2.3 版本固定

```toml
[profile.default]
solc_version = "0.8.34"
evm_version = "prague"
optimizer = true
optimizer_runs = 200
```

性能评估一定要固定编译参数，否则数据不可比。

---

## 3. 测量方法论

建议流程：

1. 定义目标函数（如 `swap`/`deposit`）
2. 固定输入规模（小/中/大）
3. 记录基线
4. 优化一项后再次测量
5. 保留回归测试，避免“省 gas 但改坏语义”

---

## 4. 常见误区

- 只看单次测试，不做长期基线
- 优化前后输入条件不一致
- 忽略编译器版本与 EVM 目标差异
- 为省极小 gas 牺牲可读性和审计性

---

## 5. 参考链接

- Solidity Releases: https://soliditylang.org/blog/category/releases/
