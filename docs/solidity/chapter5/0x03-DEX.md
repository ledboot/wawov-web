---
id: '0x03-dex'
title: '0x03：Dex'
sidebar_position: 3
hide_title: true
keywords: ['solidity', 'dex', 'amm', 'uniswap v4', 'swap']
description: '从零实现一个最小 AMM 池，并理解 Uniswap v4 的最新架构思路。'
---

## 1. 先理解 DEX 的三代演进

- **v2 风格**：常数乘积池 `x * y = k`
- **v3 风格**：集中流动性，提高资金效率
- **v4 风格**：hooks + singleton + 更强可定制性

本章先手写一个最小可运行 AMM，再对照 Uniswap v4 的现代设计。

---

## 2. 最小常数乘积 AMM（教学版）

:::warning 提示

以下代码用于教学，不可直接用于生产。生产环境请使用经过审计的协议实现。

:::

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

error InvalidTokenIn();
error InsufficientOutput(uint256 minOut, uint256 amountOut);

contract SimpleCPMMPool {
    address public immutable token0;
    address public immutable token1;

    uint256 public reserve0;
    uint256 public reserve1;

    uint256 public totalShares;
    mapping(address => uint256) public shareOf;

    uint256 public constant FEE_NUMERATOR = 997;
    uint256 public constant FEE_DENOMINATOR = 1000;

    constructor(address _token0, address _token1) {
        require(_token0 != _token1, "IDENTICAL_TOKEN");
        token0 = _token0;
        token1 = _token1;
    }

    function addLiquidity(uint256 amount0, uint256 amount1) external returns (uint256 sharesMinted) {
        require(amount0 > 0 && amount1 > 0, "ZERO_AMOUNT");

        _safeTransferFrom(token0, msg.sender, address(this), amount0);
        _safeTransferFrom(token1, msg.sender, address(this), amount1);

        if (totalShares == 0) {
            sharesMinted = _sqrt(amount0 * amount1);
        } else {
            uint256 share0 = (amount0 * totalShares) / reserve0;
            uint256 share1 = (amount1 * totalShares) / reserve1;
            sharesMinted = _min(share0, share1);
        }

        require(sharesMinted > 0, "ZERO_SHARES");

        shareOf[msg.sender] += sharesMinted;
        totalShares += sharesMinted;

        reserve0 += amount0;
        reserve1 += amount1;
    }

    function removeLiquidity(uint256 shares)
        external
        returns (uint256 amount0, uint256 amount1)
    {
        require(shares > 0 && shares <= shareOf[msg.sender], "INVALID_SHARES");

        amount0 = (shares * reserve0) / totalShares;
        amount1 = (shares * reserve1) / totalShares;

        shareOf[msg.sender] -= shares;
        totalShares -= shares;

        reserve0 -= amount0;
        reserve1 -= amount1;

        _safeTransfer(token0, msg.sender, amount0);
        _safeTransfer(token1, msg.sender, amount1);
    }

    function swap(address tokenIn, uint256 amountIn, uint256 minOut)
        external
        returns (uint256 amountOut)
    {
        require(amountIn > 0, "ZERO_INPUT");

        bool isToken0In;
        if (tokenIn == token0) {
            isToken0In = true;
        } else if (tokenIn == token1) {
            isToken0In = false;
        } else {
            revert InvalidTokenIn();
        }

        address tokenOut = isToken0In ? token1 : token0;
        uint256 reserveIn = isToken0In ? reserve0 : reserve1;
        uint256 reserveOut = isToken0In ? reserve1 : reserve0;

        _safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);

        uint256 amountInWithFee = amountIn * FEE_NUMERATOR;
        amountOut = (reserveOut * amountInWithFee) / (reserveIn * FEE_DENOMINATOR + amountInWithFee);

        if (amountOut < minOut) revert InsufficientOutput(minOut, amountOut);

        _safeTransfer(tokenOut, msg.sender, amountOut);

        reserve0 = IERC20(token0).balanceOf(address(this));
        reserve1 = IERC20(token1).balanceOf(address(this));
    }

    function _safeTransfer(address token, address to, uint256 amount) internal {
        bool ok = IERC20(token).transfer(to, amount);
        require(ok, "TRANSFER_FAILED");
    }

    function _safeTransferFrom(address token, address from, address to, uint256 amount) internal {
        bool ok = IERC20(token).transferFrom(from, to, amount);
        require(ok, "TRANSFER_FROM_FAILED");
    }

    function _min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    function _sqrt(uint256 x) internal pure returns (uint256 y) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
```

---

## 3. 需要补齐的生产能力

真实 DEX 还要处理：

- 价格预言机与抗操纵
- 闪电贷/回调安全
- 路由与多跳路径
- 手续费分配与治理参数
- 高并发下的 gas 优化

---

## 4. 对照 Uniswap v4 的新思路

Uniswap v4 核心亮点（官方文档与白皮书）：

- hooks：池子行为可在前后置阶段自定义
- singleton：多个池子共享统一核心合约架构
- 更强的可组合性与集成能力

另外，官方部署文档明确强调：不同链部署地址不一致，集成时必须逐链核对映射，不可硬编码“全链同地址”。

---

## 5. 实战建议

如果你是从零搭 DEX：

1. 先完成教学版池子 + 完整测试
2. 再做 router 与滑点保护
3. 最终接入成熟协议（如 Uniswap 路由）而不是直接自建主网协议

在生产环境里，安全与流动性通常比“自研 AMM 公式”更关键。

## 6. 参考链接

- Uniswap v4 Whitepaper: https://app.uniswap.org/whitepaper-v4.pdf
- Uniswap v4 Deployments: https://docs.uniswap.org/contracts/v4/deployments
