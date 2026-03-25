---
id: '0x02-error-handling-and-gas-optimization'
title: '0x02：错误处理与Gas优化'
sidebar_position: 2
hide_title: true
keywords: ['solidity', '错误处理', 'gas 优化', 'custom error', 'via-ir']
description: '学习 Solidity 的错误处理策略与 Gas 优化方法，构建可读、可测、可扩展的高性能合约。'
---

## 1. 错误处理方式对比

| 方式 | 特点 | 建议用途 |
| --- | --- | --- |
| `require(cond, "msg")` | 简单直观 | 输入校验、快速开发 |
| `revert CustomError(...)` | 更省 gas、语义明确 | 生产环境主路径 |
| `assert(cond)` | 表示不该发生的内部错误 | 不变量、关键内部断言 |

生产项目推荐：

- 对用户输入和业务约束优先使用 `custom error`
- 错误参数带上关键上下文（如请求值、可用值）

---

## 2. 示例：自定义错误 + 低成本循环

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

error ZeroAmount();
error SlippageTooHigh(uint256 minOut, uint256 amountOut);

contract QuoteEngine {
    uint256 public constant FEE_BASE = 1000;
    uint256 public constant FEE_FACTOR = 997;

    function quote(
        uint256 reserveIn,
        uint256 reserveOut,
        uint256 amountIn,
        uint256 minOut
    ) public pure returns (uint256 amountOut) {
        if (amountIn == 0) revert ZeroAmount();

        uint256 amountInWithFee = amountIn * FEE_FACTOR;
        amountOut = (reserveOut * amountInWithFee) / (reserveIn * FEE_BASE + amountInWithFee);

        if (amountOut < minOut) revert SlippageTooHigh(minOut, amountOut);
    }

    function batchQuote(
        uint256[] calldata inputs,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 totalOut) {
        uint256 len = inputs.length;

        for (uint256 i; i < len; ) {
            totalOut += quote(reserveIn, reserveOut, inputs[i], 0);
            unchecked {
                ++i;
            }
        }
    }
}
```

---

## 3. 高频 Gas 优化手段

- 参数优先用 `calldata`（避免 memory 拷贝）
- 状态变量打包（减少 slot 写入）
- 固定参数使用 `constant` / `immutable`
- 循环里缓存 `length`
- 仅在可证明安全时使用 `unchecked`
- 减少不必要的事件字段与存储写入

---

## 4. 用 Foundry 做量化优化

```bash
forge test --gas-report
forge snapshot
```

建议把 gas 快照纳入 CI，避免后续改动造成隐性退化。

---

## 5. 版本与编译配置建议（2026）

- 固定使用 `solc 0.8.34`
- `0.8.30` 起默认 EVM 目标从 Cancun 切换到 Prague
- 若启用 `--via-ir`，务必关注版本安全公告

`foundry.toml` 示例：

```toml
[profile.default]
solc_version = "0.8.34"
optimizer = true
optimizer_runs = 200
evm_version = "prague"
```

---

## 6. 优化的边界

Gas 优化必须服从可读性与安全性：

- 不要为省几十 gas 牺牲审计可读性
- 不要在未证明安全时使用激进内联汇编
- 性能改动必须配套回归测试与基准对比

正确顺序：先正确，再安全，最后快。
