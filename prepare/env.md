# 开发环境

## Nodejs

首先确保本地已经安装 [node](https://nodejs.org/en)，并且 node 版本是 v18.0 或更高。

::: tip 提示
如果有多个 nodejs 版本，可以使用 [nvm](https://github.com/nvm-sh/nvm)/[nvm-windows](https://github.com/coreybutler/nvm-windows) 来管理。
:::

```sh
# 查看 node 版本
$ node -v

# 查看 npm 版本
$ npm -v
```

## 依赖管理

Node 安装完成后会自带 [npm](https://www.npmjs.com/) 依赖管理工具，但更推荐使用 [pnpm](https://pnpm.io/) 来管理依赖：

```sh
$ npm install -g pnpm

$ pnpm -v
```

## IDE 及其配置

推荐使用 [Visual Studio Code](https://code.visualstudio.com/) (VSCode) 作为前端开发工具。

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 是 Vue3 官方扩展，提供了 Vue 文件的语法高亮、TypeScript 支持以及其他特性。

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 可以帮助我们发现并修复代码中出现的问题。

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 是一个代码格式化工具，可以在代码保存时自动格式化代码。
