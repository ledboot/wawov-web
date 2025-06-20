---
id: '0x03-write-and-compile-contracts'
title: '0x03：编写与编译合约'
sidebar_position: 3
hide_title: true
keywords: ['solidity', 'solidity教程', 'foundry', '智能合约开发', '区块链开发', '区块链']
description: '本文介绍了如何使用 Foundry 编写和编译智能合约。'
---

## 1. 智能合约编写规范

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ERC20Token {
    // 状态变量声明区
    mapping(address => uint256) private _balances;

    // 事件声明
    event Transfer(address indexed from, address indexed to, uint256 value);

    // 构造函数
    constructor(uint256 initialSupply) {
        _balances[msg.sender] = initialSupply;
    }

    // 公开函数
    function transfer(address recipient, uint256 amount) public {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
    }
}
```

核心规范​​:

- 文件命名采用大驼峰式（如ERC20Token.sol），与主合约名称严格一致
- 每个文件仅包含1个主合约，接口需添加I前缀（如IERC20.sol）
- 按逻辑划分代码块：许可证声明 → 版本声明 → 导入语句 → 状态变量 → 事件 → 构造函数 → 函数

更多的规范可以参考：

https://learnblockchain.cn/docs/solidity/style-guide.html#

## 2. 编译合约

```bash
forge build
```
