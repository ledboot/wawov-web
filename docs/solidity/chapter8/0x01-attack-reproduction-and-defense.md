---
id: '0x01-attack-reproduction-and-defense'
title: '0x01：攻击复现与防御实战'
sidebar_position: 1
hide_title: true
keywords: ['solidity', '安全实战', '重入', '签名重放', '预言机操纵']
description: '用 Foundry 复现典型攻击路径，再给出可验证的防御实现。'
---

## 1. 学习方式：先复现，再防御

建议每个安全主题都按三步走：

1. 写漏洞版合约
2. 写攻击脚本/测试复现
3. 写修复版并断言攻击失败

这样你学到的是“可验证能力”，不是概念背诵。

---

## 2. 必做的 5 类攻击实验

- 重入攻击（提现函数）
- 签名重放（缺 nonce 或域分离）
- 授权滥用（无限授权与目标地址污染）
- 预言机操纵（瞬时价格）
- 回调链路攻击（hook/callback）

---

## 3. 防御模板

- 重入：CEI + `nonReentrant`
- 签名：EIP-712 + nonce + deadline
- 权限：`AccessControl` + 多签治理
- 价格：TWAP / 多源 oracle
- 回调：白名单 + 限流 + 状态锁

---

## 4. 与 2026 生态对齐

在账户抽象和可插拔协议流行后，新增关注点：

- ERC-4337 账户路径下的签名和 nonce 语义
- EIP-7702 场景下执行身份与签名身份分离
- Uniswap v4 hooks 的外部调用顺序与权限边界

---

## 5. 参考链接

- ERC-4337: https://eips.ethereum.org/EIPS/eip-4337
- EIP-7702: https://eips.ethereum.org/EIPS/eip-7702
- Uniswap v4 Concepts: https://docs.uniswap.org/contracts/v4/concepts/hooks

## 6. 配套实验代码

本教程配套了一个可直接运行的 Foundry 攻击实验工程：

- `examples/solidity-attack-lab`

运行方式：

```bash
cd examples/solidity-attack-lab
forge test -vvv
```

按类别运行：

```bash
forge test --match-path test/Reentrancy.t.sol -vvv
forge test --match-path test/Replay.t.sol -vvv
forge test --match-path test/Approval.t.sol -vvv
forge test --match-path test/Oracle.t.sol -vvv
forge test --match-path test/Callback.t.sol -vvv
```
