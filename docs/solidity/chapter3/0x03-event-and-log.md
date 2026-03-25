---
id: '0x03-event-and-log'
title: '0x03：事件与日志'
sidebar_position: 3
hide_title: true
keywords: ['solidity', 'event', 'log', 'indexed', '链上数据']
description: '系统掌握 Solidity 事件设计、日志检索与链下索引实践。'
---

## 1. Event 的作用

事件（Event）是合约向链下世界广播状态变化的标准方式。

它不会被合约内部直接读取，但会被：

- 区块浏览器
- 数据索引服务
- 前端订阅器
- 监控告警系统

广泛消费。

---

## 2. 事件结构与 Topic

一个事件由：

- 事件签名（topic0）
- 最多 3 个 `indexed` 参数（topic1~3）
- 非索引数据（data）

组成。

设计原则：

- 高频检索字段放 `indexed`（如用户地址、订单 ID）
- 大字段（数组、长字符串）放 data 区
- 事件名用业务动词过去式（如 `Deposited`、`Borrowed`）

---

## 3. 示例：Vault 事件设计

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract VaultEventDemo {
    mapping(address => uint256) public shares;

    event Deposited(address indexed user, uint256 amount, uint256 mintedShare, uint256 timestamp);
    event Withdrawn(address indexed user, uint256 burnedShare, uint256 amountOut, uint256 timestamp);

    function deposit() external payable {
        require(msg.value > 0, "ZERO_AMOUNT");

        shares[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value, msg.value, block.timestamp);
    }

    function withdraw(uint256 share) external {
        require(share > 0, "ZERO_SHARE");
        require(shares[msg.sender] >= share, "INSUFFICIENT_SHARE");

        shares[msg.sender] -= share;
        (bool ok, ) = msg.sender.call{value: share}("");
        require(ok, "ETH_TRANSFER_FAILED");

        emit Withdrawn(msg.sender, share, share, block.timestamp);
    }
}
```

---

## 4. 用 cast 检索日志

```bash
# 按区块范围抓日志
cast logs --rpc-url $RPC_URL \
  --address <CONTRACT_ADDRESS> \
  --from-block 23000000 \
  --to-block latest
```

如果你知道事件签名，也可以按 topic 过滤，提高检索效率。

---

## 5. 事件版本化策略

合约升级后，事件 schema 可能变化。建议：

- 新字段追加而不是重排
- 大改动使用新事件名（如 `DepositedV2`）
- 保留旧事件一段时间，给索引系统迁移窗口

---

## 6. 与最新项目实践对齐

以 Uniswap v4 生态为例，hook/pool 行为高度可定制，链下系统更依赖事件来做：

- 实时路由
- 费用统计
- 风险告警

因此你的事件设计要优先考虑“可检索性”和“长期兼容性”。

---

## 7. 常见错误

- 关键状态变化没有事件
- `indexed` 用错导致查询成本高
- 把可推导数据重复上链（浪费 gas）
- 升级后事件字段语义改变但未版本化

事件是协议对外的“数据 API”，应当像接口设计一样严谨。
