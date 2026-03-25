---
id: '0x01-variable-and-storage'
title: '0x01：状态变量与存储机制'
sidebar_position: 1
hide_title: true
keywords: ['solidity', 'storage', 'memory', 'calldata', 'transient storage', 'slot']
description: '深入理解 Solidity 状态变量、存储槽布局与存储位置，是写出高性能且可升级合约的基础。'
---

## 1. 为什么要关心存储布局

在 Solidity 里，`Storage` 不是抽象概念，而是直接映射到 EVM 存储槽（slot）。

- 存储写入最贵
- 存储布局决定升级兼容性
- 变量声明顺序会影响 gas

---

## 2. Storage 槽位打包规则

Solidity 会把小类型尝试打包进同一个 `slot`（32 字节）。

```solidity
contract Packed {
    uint128 public a; // slot 0, 高/低位之一
    uint64 public b;  // slot 0
    uint64 public c;  // slot 0

    uint256 public d; // slot 1
}
```

如果顺序写得不好，会浪费 slot，导致写入和读取成本变高。

优化建议：

- 小类型连续声明
- 访问频繁的变量尽量集中
- 避免无意义的 `bool` + `uint256` 交错

---

## 3. 四种常见数据位置

| 位置 | 生命周期 | 可修改 | 典型场景 |
| --- | --- | --- | --- |
| `storage` | 永久（链上） | 可 | 状态变量、持久化数据 |
| `memory` | 当前调用期间 | 可 | 函数内部临时变量 |
| `calldata` | 当前外部调用期间 | 不可 | `external` 函数参数 |
| transient（EIP-1153） | 当前交易期间 | 可 | 交易级临时状态（如锁） |

---

## 4. Mapping / 动态数组的存储地址

### 4.1 mapping

`mapping(K => V) m` 若主槽位是 `p`，则 `m[k]` 的位置是：

```text
keccak256(abi.encode(k, p))
```

### 4.2 动态数组

数组长度在 `p`，元素起始位置在：

```text
keccak256(p)
```

理解这个规则能帮你：

- 调试底层存储
- 做代理升级安全检查
- 理解审计报告里的 slot 冲突问题

---

## 5. transient storage（EIP-1153）

`TLOAD/TSTORE` 提供“交易级临时存储”，常用于低成本锁。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TransientLock {
    bytes32 private constant LOCK_SLOT = keccak256("lock.slot");

    modifier nonReentrantTx() {
        assembly {
            if tload(LOCK_SLOT) { revert(0, 0) }
            tstore(LOCK_SLOT, 1)
        }
        _;
        assembly {
            tstore(LOCK_SLOT, 0)
        }
    }
}
```

:::tip 适用场景

- 交易内重入锁
- 同交易多步骤结算的中间状态
- callback 协议的轻量状态同步

:::

---

## 6. 升级合约的存储规则

如果使用 Proxy（UUPS/Transparent），必须遵守：

- 只能在末尾追加新状态变量
- 不要修改已有变量类型
- 不要调整已有变量顺序
- 为未来预留 `__gap`（如使用 OZ upgradeable）

这是避免“升级后读错数据”的核心规则。

---

## 7. 版本注意（Solidity 0.8.34）

截至 2026-03：

- 推荐固定编译器到 `0.8.34`
- `0.8.28 ~ 0.8.33` 在 `--via-ir` 且涉及 transient/persistent 清理时存在官方已披露的高危问题

如果你在项目中使用 `--via-ir` 和 `delete`，请优先升级并补回归测试。
