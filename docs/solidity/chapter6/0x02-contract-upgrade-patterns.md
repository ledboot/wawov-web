---
id: '0x02-contract-upgrade-patterns'
title: '0x02：合约升级模式'
sidebar_position: 2
hide_title: true
keywords: ['solidity', '升级', 'proxy', 'uups', 'transparent']
description: '掌握 Solidity 常见升级模式（Transparent/UUPS/Beacon）及生产级升级流程。'
---

## 1. 什么时候该升级

升级不是默认选项。先判断：

- 业务是否真的需要持续迭代
- 是否能接受更复杂的安全面
- 团队是否有完善治理和审计流程

如果协议追求极简与不可变，可优先选择不可升级架构。

---

## 2. 三种主流升级模式

| 模式 | 特点 | 适用场景 |
| --- | --- | --- |
| Transparent Proxy | 管理逻辑清晰，生态成熟 | 通用项目、后台运维较多 |
| UUPS | 升级逻辑在实现合约，gas 更优 | 新项目默认优先考虑 |
| Beacon | 一次升级影响多实例 | 工厂批量部署场景 |

---

## 3. UUPS 示例（推荐）

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract VaultV1 is Initializable, UUPSUpgradeable, AccessControlUpgradeable {
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public totalDeposits;
    uint256[49] private __gap;

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(UPGRADER_ROLE, admin);
    }

    function deposit(uint256 amount) external {
        totalDeposits += amount;
    }

    function _authorizeUpgrade(address)
        internal
        override
        onlyRole(UPGRADER_ROLE)
    {}
}
```

V2 追加变量时应只在末尾新增：

```solidity
contract VaultV2 is VaultV1 {
    uint256 public feeBps;

    function initializeV2(uint256 feeBps_) external reinitializer(2) {
        feeBps = feeBps_;
    }
}
```

---

## 4. 存储布局铁律

升级合约最容易踩坑的是存储冲突。必须遵守：

- 只追加，不重排
- 不修改已存在变量类型
- 不删除旧变量
- 每次升级前做 storage layout diff

---

## 5. 升级治理建议

生产环境建议：

- 升级权限在多签 + Timelock
- 升级提案公开审阅
- 升级脚本走测试网演练
- 升级后立即执行冒烟测试

---

## 6. 与 Foundry 流水线结合

建议将以下步骤固定为发布流程：

```bash
forge build
forge test -vvv
forge script script/Upgrade.s.sol:Upgrade --rpc-url $RPC_URL --broadcast
```

再配合 OpenZeppelin Upgrades 工具做实现合约校验与升级安全检查。

---

## 7. 升级模式选择建议

- 团队刚起步：Transparent 更直观
- 新项目追求长期效率：UUPS 通常更合适
- 同模板多实例：Beacon 更省运维成本

升级能力本身就是一把高权限“手术刀”，流程必须比代码更严格。
