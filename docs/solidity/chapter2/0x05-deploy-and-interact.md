---
id: '0x05-deploy-and-interact'
title: '0x05：部署与交互'
sidebar_position: 5
hide_title: true
keywords: ['foundry', 'solidity', '部署', 'cast', 'forge script', '合约验证']
description: '使用 Foundry 在多链环境部署合约，并通过 cast 完成链上交互。'
---

## 1. 部署前准备

建议把环境变量分层管理：

```bash
# .env
PRIVATE_KEY=0x...
ETH_RPC_URL=https://...
BASE_RPC_URL=https://...
ARB_RPC_URL=https://...
ETHERSCAN_API_KEY=...
BASESCAN_API_KEY=...
```

加载：

```bash
source .env
```

---

## 2. 编写可复用部署脚本

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {WawovToken} from "../src/WawovToken.sol";

contract DeployToken is Script {
    function run() external returns (WawovToken token) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address admin = vm.addr(pk);

        vm.startBroadcast(pk);
        token = new WawovToken(admin, 1_000_000 ether);
        vm.stopBroadcast();
    }
}
```

执行部署：

```bash
forge script script/DeployToken.s.sol:DeployToken \
  --rpc-url $BASE_RPC_URL \
  --broadcast
```

---

## 3. 自动验证合约源码

部署后建议立刻验证：

```bash
forge verify-contract \
  <DEPLOYED_ADDRESS> \
  src/WawovToken.sol:WawovToken \
  --chain-id 8453 \
  --etherscan-api-key $BASESCAN_API_KEY
```

---

## 4. 用 cast 做链上交互

### 4.1 读操作（免费）

```bash
cast call <TOKEN_ADDRESS> "name()(string)" --rpc-url $BASE_RPC_URL
cast call <TOKEN_ADDRESS> "totalSupply()(uint256)" --rpc-url $BASE_RPC_URL
```

### 4.2 写操作（需要签名）

```bash
cast send <TOKEN_ADDRESS> \
  "transfer(address,uint256)(bool)" \
  <TO_ADDRESS> 1000000000000000000 \
  --private-key $PRIVATE_KEY \
  --rpc-url $BASE_RPC_URL
```

---

## 5. 多链部署策略（实战版）

建议维护一个地址注册表（JSON/YAML），记录每条链的：

- 合约地址
- 编译版本
- 部署交易哈希
- Git commit
- 验证链接

注意：不要假设跨链地址相同。比如 Uniswap v4 官方文档明确提示，不同链部署地址映射不同，集成前必须逐链确认。

---

## 6. 发布前检查清单

- 目标链 `chainId` 与脚本配置一致
- 合约构造参数与环境一致
- 部署后立即做 `read + write` 冒烟测试
- 完成浏览器源码验证
- 记录版本信息并打 tag
- 关键权限交接到多签/治理合约

---

## 7. 常见问题

### Q1: 为什么本地通过，链上失败？

常见原因：

- RPC 链与预期链不一致
- gas 估算不足
- 构造参数和脚本读到的环境变量不一致
- 访问控制未正确配置（例如 `msg.sender` 不是 admin）

### Q2: 如何做灰度发布？

建议顺序：

1. 测试网部署
2. 小额主网部署
3. 监控稳定后再全面迁移
