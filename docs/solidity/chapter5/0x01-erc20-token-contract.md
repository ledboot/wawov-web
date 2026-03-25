---
id: '0x01-erc20-token-contract'
title: '0x01：ERC20代币合约'
sidebar_position: 1
hide_title: true
keywords: ['solidity', 'erc20', 'permit', 'OpenZeppelin', '代币合约']
description: '实现一个现代化 ERC20 合约，包含角色权限、暂停和 EIP-2612 Permit 能力。'
---

## 1. 目标：写一个“生产可用”ERC20

2026 年的 ERC20 合约通常不再只是 `mint + transfer`，而是至少包含：

- 角色化权限（谁能铸造、谁能暂停）
- `permit`（EIP-2612，无 gas 授权）
- 紧急暂停能力
- 明确的管理员交接流程

---

## 2. 合约实现（OpenZeppelin 5.x）

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract WawovToken is ERC20, ERC20Permit, ERC20Pausable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    constructor(address admin, uint256 initialSupply)
        ERC20("Wawov Token", "WAW")
        ERC20Permit("Wawov Token")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);

        _mint(admin, initialSupply);
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }
}
```

---

## 3. 关键测试用例

至少覆盖以下测试：

- 普通转账成功
- 非 `MINTER_ROLE` 调用 `mint` 失败
- `pause` 后转账失败，`unpause` 后恢复
- `permit` 签名授权成功与过期失败

建议命名规范：

- `test_Mint_RevertWhen_NoRole`
- `test_Pause_BlocksTransfer`
- `test_Permit_SetsAllowance`

---

## 4. 部署与交互示例

```bash
forge script script/DeployToken.s.sol:DeployToken --rpc-url $BASE_RPC_URL --broadcast

cast call <TOKEN_ADDR> "totalSupply()(uint256)" --rpc-url $BASE_RPC_URL
cast send <TOKEN_ADDR> "transfer(address,uint256)(bool)" <TO> 1000000000000000000 \
  --private-key $PRIVATE_KEY --rpc-url $BASE_RPC_URL
```

---

## 5. 与最新项目实践对齐

当前主流协议中的可流通代币，常见增强项包括：

- `permit`（减少一次授权交易，提升 UX）
- 治理投票扩展（`ERC20Votes`）
- 跨链接口（桥接或 OFT 模式）

你可以把本章合约作为基础版本，再逐步升级为治理代币或跨链资产。

---

## 6. 上线前检查单

- 权限是否已移交多签/治理
- 初始供应量与分配规则是否可追溯
- 暂停权限是否可控且可恢复
- 是否完成浏览器源码验证
- 是否有黑名单/冻结等合规需求（若有需单独设计）
