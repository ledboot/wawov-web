---
id: '0x02-storage-and-computation-optimization'
title: '0x02：存储与计算优化实战'
sidebar_position: 2
hide_title: true
keywords: ['solidity', 'slot packing', 'calldata', 'custom error', 'unchecked']
description: '从存储布局、参数传递、错误处理到循环写法，系统优化 Solidity 运行成本。'
---

## 1. 高频优化点清单

- `storage` 读写次数最小化
- 参数优先 `calldata`
- 错误优先 `custom error`
- 循环缓存 `length`
- 在可证明安全时使用 `unchecked`
- 变量打包减少 slot 数量

---

## 2. 示例：优化前后对比

### 优化前

```solidity
function sum(uint256[] memory arr) external pure returns (uint256 s) {
    for (uint256 i = 0; i < arr.length; i++) {
        s += arr[i];
    }
}
```

### 优化后

```solidity
error EmptyArray();

function sum(uint256[] calldata arr) external pure returns (uint256 s) {
    uint256 len = arr.length;
    if (len == 0) revert EmptyArray();

    for (uint256 i; i < len; ) {
        s += arr[i];
        unchecked {
            ++i;
        }
    }
}
```

改进点：

- `memory -> calldata`，减少拷贝
- `require("...") -> custom error`，降低字节码/运行成本
- 缓存 `len`，减少重复读取

---

## 3. 存储打包示例

```solidity
// 更优打包（同 slot）
uint128 public amount;
uint64 public lastUpdated;
uint64 public flags;

// 单独占 slot
uint256 public total;
```

建议把高频字段集中布局，同时保持语义清晰。

---

## 4. 优化边界

以下情况不要强行优化：

- 导致代码可读性显著下降
- 破坏可升级存储布局
- 引入隐含安全风险（比如错误的 `unchecked`）

可维护性 > 过度微优化。
