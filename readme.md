# opssh



## 客户端

```bash
# 开发
npm run tauri dev

# 打包
npm run tauri build

# 打包调试 任一，TODO 组合有点问题。
npm run tauri build -- --debug
npm run build:debug
cargo tauri build --debug
```

## 服务端

```bash

```

## VSCODE

调试开发配置

按官方配置做修改后可以打开前端调试，但是会提示功能不全，应该是示例没有配置全。
会同时打开 1 个 前端 vue ，1 个 llvm-db 调试器，1个命令窗。（所以关闭的时候也是没有全关闭的，前端服务器会残留）
