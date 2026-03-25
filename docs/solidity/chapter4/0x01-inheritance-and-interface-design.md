---
id: '0x01-inheritance-and-interface-design'
title: '0x01：继承与接口设计'
sidebar_position: 1
hide_title: true
keywords: ['solidity', '继承', '接口', 'abstract', 'override']
description: '掌握 Solidity 的继承与接口设计方法，构建可组合、可维护的协议代码。'
---

## 1. 先接口、后实现

成熟协议的常见做法是 **interface-first**：

1. 先定义外部能力边界（接口）
2. 再实现具体逻辑（合约）
3. 最后通过继承复用通用模块

这样做的好处：

- 更容易做 mock 测试
- 更容易替换实现
- 更适合多团队并行开发

---

## 2. Solidity 继承核心规则

- `interface`：只声明函数，不包含状态变量
- `abstract contract`：可以有部分实现
- 多重继承时，冲突函数必须显式 `override`
- 调用父逻辑时使用 `super`

---

## 3. 示例：接口 + 抽象层 + 具体实现

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFeePolicy {
    function getFeeBps(address user, uint256 amount) external view returns (uint24);
}

interface IBeforeSwapHook {
    function beforeSwap(
        address sender,
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external returns (bytes4);
}

abstract contract Operatable {
    error NotOperator();

    address public operator;

    constructor(address operator_) {
        operator = operator_;
    }

    modifier onlyOperator() {
        if (msg.sender != operator) revert NotOperator();
        _;
    }

    function setOperator(address newOperator) external onlyOperator {
        operator = newOperator;
    }
}

contract DynamicFeeHook is Operatable, IFeePolicy, IBeforeSwapHook {
    uint24 public baseFeeBps = 30;
    mapping(address => uint24) public customFeeBps;

    bytes4 private constant BEFORE_SWAP_SELECTOR = IBeforeSwapHook.beforeSwap.selector;

    constructor(address operator_) Operatable(operator_) {}

    function setCustomFee(address user, uint24 feeBps) external onlyOperator {
        require(feeBps <= baseFeeBps, "INVALID_FEE");
        customFeeBps[user] = feeBps;
    }

    function getFeeBps(address user, uint256) external view override returns (uint24) {
        uint24 f = customFeeBps[user];
        return f == 0 ? baseFeeBps : f;
    }

    function beforeSwap(
        address sender,
        address,
        address,
        uint256
    ) external override returns (bytes4) {
        if (customFeeBps[sender] == 0) {
            customFeeBps[sender] = baseFeeBps;
        }
        return BEFORE_SWAP_SELECTOR;
    }
}
```

---

## 4. 与 Uniswap v4 的关系

Uniswap v4 的 hooks 机制本质就是“接口驱动扩展”范式：

- 协议核心保持稳定
- 外部 hook 在特定生命周期插入逻辑
- 新功能通过组合实现，而不是反复 fork 核心 AMM

这也是现代 Solidity 项目常见的架构方向。

---

## 5. 继承设计实践建议

- 把“权限、暂停、参数校验”等通用能力抽成抽象层
- 业务合约只关心业务逻辑，不重复写底层样板
- 避免过深继承链（可读性会显著下降）
- 复杂场景优先组合（composition）而非继承

---

## 6. 常见坑位

- 忘记在多继承函数上写 `override(A, B)`
- 基类构造参数未正确传递
- 误用 `super` 导致执行顺序不符合预期
- 接口改动后实现未同步，前端 ABI 失配

接口是协议的长期契约，继承是内部实现手段，二者边界要清晰。
