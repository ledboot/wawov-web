---
id: '0x02-nft-contract'
title: '0x02：NFT 合约'
sidebar_position: 2
hide_title: true
keywords: ['solidity', 'nft', 'erc721', 'royalty', 'OpenZeppelin']
description: '实现一个带版税与角色权限的 NFT 合约，并了解 NFT 在 2026 年的实用化方向。'
---

## 1. 2026 年 NFT 合约的常见需求

除了基本铸造，实际项目通常还需要：

- 角色化铸造权限（运营、活动方）
- 版税标准（EIP-2981）
- 可配置元数据 Base URI
- 与会员、票务、身份系统结合

---

## 2. 合约实现（ERC721 + Royalty）

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Royalty} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract WawovMembershipNFT is ERC721, ERC721Royalty, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint256 public nextTokenId = 1;
    string private baseTokenURI;

    constructor(
        address admin,
        string memory baseURI,
        address royaltyReceiver,
        uint96 royaltyFeeNumerator
    ) ERC721("Wawov Membership", "WAWM") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);

        baseTokenURI = baseURI;
        _setDefaultRoyalty(royaltyReceiver, royaltyFeeNumerator);
    }

    function mint(address to) external onlyRole(MINTER_ROLE) returns (uint256 tokenId) {
        tokenId = nextTokenId++;
        _safeMint(to, tokenId);
    }

    function setBaseURI(string calldata newBaseURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        baseTokenURI = newBaseURI;
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Royalty, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
```

---

## 3. 关键测试清单

- 非 `MINTER_ROLE` 铸造应失败
- 铸造后 `ownerOf(tokenId)` 正确
- `royaltyInfo(tokenId, salePrice)` 返回正确比例
- `setBaseURI` 只能管理员调用

---

## 4. 进阶方向

你可以在本合约上继续扩展：

- 白名单签名铸造（EIP-712）
- 批量铸造（活动场景）
- Soulbound 模式（禁止转移）
- 与账户抽象钱包绑定（ERC-4337）

---

## 5. 项目实践建议

NFT 在 2026 年更偏“功能资产”而非纯图片资产，常见场景：

- 会员凭证
- 活动门票
- 链上信誉与身份
- 游戏资产与赛季通行证

因此合约设计要优先考虑权限、可升级策略与数据兼容性，而不是只关注铸造流程。
