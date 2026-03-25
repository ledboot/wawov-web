---
id: '0x01-multi-chain-deployment-strategy'
title: '0x01：多链部署策略'
sidebar_position: 1
hide_title: true
keywords: ['solidity', '多链部署', 'foundry', 'create2', '运维']
description: '建立 Solidity 项目的多链部署策略，包括配置管理、确定性地址与上线运维流程。'
---

## 1. 多链部署不是“换 RPC”

同一份合约在不同链部署，差异不只在 `rpc-url`：

- gas 计价和出块节奏不同
- 原生代币和系统合约不同
- 基础设施（预言机、桥、DEX）地址不同

所以多链部署要有一套“配置驱动”的工程体系。

---

## 2. 建议的链配置矩阵

建议维护一份链配置表（JSON/YAML/TOML）：

- `chainId`
- `rpcUrl`
- `explorerApiKey`
- 关键依赖地址（USDC、预言机、路由）
- 发布开关（是否允许广播）

这份配置应纳入版本管理，并走代码评审流程。

---

## 3. 用 CREATE2 做确定性部署

确定性地址适合多链对齐和前端集成。

```solidity
bytes32 salt = keccak256(abi.encode("wawov-token", "v1", block.chainid));
WawovToken token = new WawovToken{salt: salt}(admin, initialSupply);
```

注意：

- 不同链上 `chainid` 不同，地址仍会不同
- 构造参数和 bytecode 变化也会改变地址

---

## 4. Foundry 脚本化多链发布

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {WawovToken} from "../src/WawovToken.sol";

contract DeployMultiChain is Script {
    function run() external returns (WawovToken token) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address admin = vm.addr(pk);

        vm.startBroadcast(pk);
        token = new WawovToken(admin, 1_000_000 ether);
        vm.stopBroadcast();
    }
}
```

部署时按链执行：

```bash
forge script script/DeployMultiChain.s.sol:DeployMultiChain --rpc-url $ETH_RPC_URL --broadcast
forge script script/DeployMultiChain.s.sol:DeployMultiChain --rpc-url $BASE_RPC_URL --broadcast
forge script script/DeployMultiChain.s.sol:DeployMultiChain --rpc-url $ARB_RPC_URL --broadcast
```

---

## 5. 地址注册与可追溯性

每次部署后记录：

- 合约地址
- 部署交易哈希
- 编译器版本（如 0.8.34）
- Git commit hash
- 验证链接

建议自动写入 `deployments/<chainId>.json`，并在 CI 校验完整性。

---

## 6. 结合最新项目经验

以 Uniswap v4 为例，官方部署文档明确提示：不要假设 `v4-core/periphery/router` 在不同链地址一致。这个原则适用于所有跨链集成项目。

多链集成最常见错误就是“复制主网地址到其他链”。

---

## 7. 发布与回滚策略

- 先测试网，再主网灰度
- 主网先限额启用，再全量开放
- 准备紧急暂停与路由切换开关
- 每次发布后跑冒烟交易和监控告警

多链运维的重点不是“发出去”，而是“可观测、可回滚、可追责”。

## 8. 参考链接

- Uniswap v4 Deployments: https://docs.uniswap.org/contracts/v4/deployments
- Solidity Releases: https://soliditylang.org/blog/category/releases/
