---
id: '0x04-automated-testing-practice'
title: '0x04：自动化测试实践'
sidebar_position: 4
hide_title: true
keywords: ['foundry', 'solidity', '自动化测试', 'fuzz', 'invariant', 'fork test']
description: '从单元测试到主网分叉测试，构建 Solidity 项目的自动化测试体系。'
---

## 1. 为什么测试是合约开发的主线任务

智能合约一旦上线就很难回滚，测试不是“收尾动作”，而是开发主流程。建议把测试分成四层：

| 层级 | 目标 | Foundry 工具 |
| --- | --- | --- |
| 单元测试（Unit） | 验证单个函数逻辑 | `forge test --match-test` |
| 模糊测试（Fuzz） | 验证输入边界和随机输入安全性 | `forge test`（自动 fuzz） |
| 不变量测试（Invariant） | 验证系统始终满足关键性质 | `forge test --match-contract` |
| 分叉测试（Fork） | 在真实链状态下验证集成行为 | `anvil --fork-url` / `vm.createSelectFork` |

---

## 2. 单元测试与 Fuzz 测试示例

先写一个最小金库合约：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

error ZeroAmount();
error InsufficientBalance(uint256 requested, uint256 available);

contract Vault {
    mapping(address => uint256) public balanceOf;

    function deposit() external payable {
        if (msg.value == 0) revert ZeroAmount();
        balanceOf[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        uint256 bal = balanceOf[msg.sender];
        if (amount > bal) revert InsufficientBalance(amount, bal);

        balanceOf[msg.sender] = bal - amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "ETH_TRANSFER_FAILED");
    }
}
```

对应测试：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {Vault} from "../src/Vault.sol";

contract VaultTest is Test {
    Vault internal vault;
    address internal alice = makeAddr("alice");

    function setUp() public {
        vault = new Vault();
        vm.deal(alice, 100 ether);
    }

    function test_DepositSuccess() public {
        vm.prank(alice);
        vault.deposit{value: 1 ether}();
        assertEq(vault.balanceOf(alice), 1 ether);
    }

    function testFuzz_DepositWithdraw(uint96 amount) public {
        vm.assume(amount > 0);
        vm.assume(amount < 100 ether);

        vm.startPrank(alice);
        vault.deposit{value: amount}();
        vault.withdraw(amount);
        vm.stopPrank();

        assertEq(vault.balanceOf(alice), 0);
    }
}
```

运行：

```bash
forge test -vvvv
```

---

## 3. Invariant 测试：验证系统不变量

不变量示例：`合约 ETH 余额 >= 所有用户余额之和`。

```solidity
function invariant_BalanceNeverNegative() public {
    assertGe(address(vault).balance, 0);
}
```

实际项目中常见不变量：

- `totalSupply == 全部账户余额之和`
- 抵押率永远高于清算线
- 任何情况下都不能铸造负债资产

---

## 4. 主网分叉测试（Fork Test）

这是连接“本地代码”和“真实 DeFi 生态”的关键。

### 4.1 启动分叉节点

```bash
anvil --fork-url $BASE_MAINNET_RPC_URL
```

### 4.2 在测试里选择分叉

```solidity
uint256 forkId = vm.createSelectFork(vm.envString("BASE_MAINNET_RPC_URL"));
assertGt(forkId, 0);
```

你可以在 fork 环境里直接与真实协议交互，例如：

- 调用真实 ERC20
- 调用 Uniswap 路由
- 验证授权、滑点、回调逻辑

---

## 5. 与最新 Solidity 版本对齐

截至 2026-03，建议：

- 在 CI 固定编译器版本，例如 `0.8.34`
- 不要在生产流水线里使用“漂移版本”

`foundry.toml` 建议：

```toml
[profile.default]
solc_version = "0.8.34"
evm_version = "prague"
optimizer = true
optimizer_runs = 200
```

:::warning 版本注意

Solidity 官方在 **2026-02-18** 发布了 `0.8.34`，修复了 `0.8.28 ~ 0.8.33` 在 `--via-ir` 下清理 transient/persistent storage 的高危 bug。若你项目使用 `--via-ir` 且涉及 `delete` transient 变量，请尽快升级。

:::

---

## 6. CI 最小模板

```bash
forge fmt --check
forge build
forge test -vvv
forge test --gas-report
```

如果有 fork 测试，再加：

```bash
forge test --match-path test/fork/*.t.sol -vvv
```

---

## 7. 实战建议

- 每个业务模块至少包含：`成功路径 + 失败路径 + 边界条件`
- 对关键资产路径必须写 invariant
- 与外部协议交互必须写 fork 测试
- 版本升级后，先跑 gas 快照再对比行为回归

## 8. 参考链接

- Solidity Releases: https://soliditylang.org/blog/category/releases/
- Solidity v0.8.34: https://soliditylang.org/blog/2026/02/18/solidity-0.8.34-release-announcement/
