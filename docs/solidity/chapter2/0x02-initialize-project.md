---
id: '0x02-install-and-initialize-project'
title: '0x02：安装与初始化项目'
sidebar_position: 2
hide_title: true
keywords:
  ['Foundry', '开发环境配置', '区块链开发', '区块链', '智能合约', 'evm', 'forge', 'anvil', 'cast']
description: 'Foundry 是一个用于开发和部署智能合约的工具链，包括 Forge、Anvil 和 Cast 等工具。本文介绍了 Foundry 的核心工具链，包括 Forge、Anvil 和 Cast 等工具。'
---

## 1. 安装Foundry

### 1.1 跨平台安装步骤

​**​Linux/macOS 用户​**​:

```bash
# 安装 Foundryup 管理工具
curl -L https://foundry.paradigm.xyz | bash

# 安装最新工具链
foundryup
```

### 1.2 验证安装

```bash
# 验证安装
forge --version  # 显示版本号（如 forge 0.5.0）
cast --help      # 查看 Cast 工具命令列表
anvil -v         # 检查 Anvil 版本
```

## 2. 初始化项目

```bash
# 初始化项目
forge init my-project && cd my-project
```

目录功能详解:

- src: 存放主合约文件（示例包含 Counter.sol）
- test: 基于 Solidity 的测试合约（继承 forge-std/Test.sol）
- script: 部署脚本支持多链参数（如 --rpc-url）
- lib: 通过 Git Submodule 管理依赖

## 3. 依赖管理与工程配置

### 3.1 安装依赖

```bash
# 安装 OpenZeppelin库
forge install OpenZeppelin/openzeppelin-contracts --no-commit
```

### 3.2 依赖映射配置

创建 `remappings.txt`文件定义路径别名:

```bash
@openzeppelin/=lib/openzeppelin-contracts-upgradeable/
forge-std/=lib/forge-std/src/
```

### 3.3 编译器参数调优

修改 foundry.toml 配置:

```bash
[profile.default]
solc = "0.8.27"
optimizer = true
optimizer_runs = 100

[profile.test]
sender = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' # 测试账户

[fmt]
single_line_statement_blocks = "single"
multiline_func_header = "attributes_first"
sort_imports = true
contract_new_lines = true
override_spacing = true
line_length = 130
tab_width = 4
quote_style = "double"
number_underscore = "thousands"
```

### 3.4 测试环境配置

```bash
# 启动本地节点
anvil --fork-url $RPC_URL --chain-id 1337
```

## 4. 开发工作流实践

### 4.1 合约编译与构建

```bash
# 编译合约
forge build
```

### 4.2 测试用例编写示例

创建 `test/Counter.t.sol`:

```solidity
// test/Counter.t.sol
import {Test} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }
}
```

运行测试:

```bash
forge test -vvvvv --match-test CounterTest
```

### 4.3 部署与测试

```bash
# 部署合约
forge script script/Counter.sol:CounterScript --rpc-url $RPC_URL --chain-id 1337 --private-key $PRIVATE_KEY --broadcast
```
