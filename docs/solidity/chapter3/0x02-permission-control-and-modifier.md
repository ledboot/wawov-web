---
id: '0x02-permission-control-and-modifier'
title: '0x02：权限控制与修饰器'
sidebar_position: 2
hide_title: true
keywords: ['solidity', '权限控制', 'modifier', 'access control', 'OpenZeppelin']
description: '掌握 Solidity 权限设计与修饰器模式，避免越权调用和关键资产误操作。'
---

## 1. 权限控制为什么是核心问题

绝大多数链上事故，不是“数学错了”，而是“权限错了”。

常见错误：

- 管理员权限过大且无延迟
- 热钱包直接持有升级权限
- 关键函数漏了权限修饰器
- 角色模型和业务边界不匹配

---

## 2. 常见权限模型

| 方案 | 适合场景 | 风险点 |
| --- | --- | --- |
| `Ownable` / `Ownable2Step` | 小型项目、单管理员 | 权限过于集中 |
| `AccessControl` | 中大型协议、按职责分权 | 角色配置复杂 |
| `AccessManager`（OZ 5.x） | 多合约统一权限治理 | 初期配置成本高 |

实践建议：

- 原型阶段可用 `Ownable2Step`
- 上线前迁移到角色模型（`AccessControl` / `AccessManager`）
- 生产环境的高权限地址应是多签或治理合约，而不是个人 EOA

---

## 3. 修饰器（modifier）设计原则

modifier 用来做横切校验（权限、参数、状态），不要堆业务逻辑。

建议：

- 一个 modifier 只做一类校验
- 复杂条件优先使用 `custom error`
- 多个 modifier 的顺序保持稳定（先权限，再状态，再输入）

---

## 4. 实战示例：分角色资金执行器

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

error TargetNotWhitelisted(address target);

contract TreasuryExecutor is AccessControl, Pausable {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    mapping(address => bool) public whitelist;

    constructor(address admin, address operator) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, operator);
        _grantRole(PAUSER_ROLE, admin);
    }

    modifier onlyWhitelisted(address target) {
        if (!whitelist[target]) revert TargetNotWhitelisted(target);
        _;
    }

    function setWhitelist(address target, bool allowed) external onlyRole(DEFAULT_ADMIN_ROLE) {
        whitelist[target] = allowed;
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function execute(
        address target,
        uint256 value,
        bytes calldata data
    )
        external
        onlyRole(OPERATOR_ROLE)
        whenNotPaused
        onlyWhitelisted(target)
        returns (bytes memory result)
    {
        (bool ok, bytes memory ret) = target.call{value: value}(data);
        require(ok, "EXECUTE_FAILED");
        return ret;
    }

    receive() external payable {}
}
```

这个模式把权限拆成了三层：

- `DEFAULT_ADMIN_ROLE`：配置角色和白名单
- `OPERATOR_ROLE`：执行受控调用
- `PAUSER_ROLE`：紧急暂停

---

## 5. 结合最新账户抽象实践

在 2026 年的 DApp 体验里，很多用户来自智能账户（ERC-4337）或 EOA 委托代码路径（EIP-7702）。

因此权限设计要避免两类误区：

- 只按 `tx.origin` 做判断（不安全且兼容性差）
- 把“签名者”和“执行者”身份混为一谈

建议：

- 永远基于 `msg.sender` 与显式签名数据验证
- 需要离线授权时用 EIP-712 typed data
- 明确 nonce 与 replay protection

---

## 6. 权限审计检查单

- 所有关键函数都有限制路径（`onlyRole` / modifier）
- `grantRole/revokeRole` 是否只开放给治理主体
- 暂停开关是否覆盖资产关键路径
- 升级权限是否在多签/Timelock 下
- 是否存在“初始化后忘记移交权限”的问题

权限问题通常不是代码不会写，而是权限边界没有被建模清楚。

## 7. 参考链接

- ERC-4337: https://eips.ethereum.org/EIPS/eip-4337
- EIP-7702: https://eips.ethereum.org/EIPS/eip-7702
