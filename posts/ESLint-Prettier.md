---
title: ESLint + Prettier
abbrlink: 33fa9d21
date: 2022-08-02 00:00:31
updated: 2022-10-03 21:12:14
description: 规范代码格式
cover: https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/57b8d8eacc5a294da2c333d1f29e9279.webp
---

## [ESLint](https://cn.eslint.org/docs/user-guide/getting-started)

> ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。

### 安装

`yarn add eslint -D`

### 初始化

`npx eslint --init`

根据提示选择适合的项进行初始化。最终会在根目录下生成文件 `.eslintrc`，内容大致如下：

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:vue/essential"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["vue"],
  "rules": {
    "vue/multi-word-component-names": "off",
    "vue/valid-v-slot": "off"
  },
  "globals": {
    "workbox": "readonly"
  }
}
```

### 添加 `lint` 命令

在 `package.json` 文件中的 `script` 中添加

```json
{
  "scripts": {
    "lint": "eslint --fix"
  }
}
```

### 运行

`yarn lint`

如果写一行代码就要执行一遍 `lint` 命令，这效率就太低了。所以我们可以配合 vscode 的 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 插件，并在设置文件中添加以下内容，实现每次保存代码时，自动执行 `lint` 命令来尽可能修复代码的错误。

```json
"editor.codeActionsOnSave": {
  "source.fixAll": false,
  "source.fixAll.eslint": true,
}
```

### ESLint 配置

#### rules

<Alert>启用的规则及其各自的错误级别。对于每个规则名称键，将对应的值设置为：</Alert>

| 键 | 说明 |
| - | - |
| `"off"` or `0` | 关闭规则 |
| `"warn"` or `1` | 将规则视为一个警告 |
| `"error"` or `2` | 将规则视为一个错误 |

#### globals

<Alert>脚本在执行期间访问的额外的全局变量。对于每个全局变量键，将对应的值设置为：</Alert>

| 键 | 说明 |
| - | - |
| `"writable"` | 允许重写变量 |
| `"readonly"` | 不允许重写变量 |

#### env

<Alert>一个环境定义了一组预定义的全局变量。可用的环境包括：</Alert>

| 键 | 说明 |
| - | - |
| `browser` | 浏览器环境中的全局变量。|
| `node` | Node.js 全局变量和 Node.js 作用域。|
| `commonjs` | CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。|
| `shared-node-browser` | Node.js 和 Browser 通用全局变量。|
| `es6` | 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 `ecmaVersion` 解析器选项为 6）。|
| `worker` | Web Workers 全局变量。|
| `amd` | 将 `require()` 和 `define()` 定义为像 amd 一样的全局变量。|
| `mocha` | 添加所有的 Mocha 测试全局变量。|
| `jasmine` | 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。|
| `jest` | Jest 全局变量。|
| `phantomjs` | PhantomJS 全局变量。|
| `protractor` | Protractor 全局变量。|
| `qunit` | QUnit 全局变量。|
| `jquery` | jQuery 全局变量。|
| `prototypejs` | Prototype.js 全局变量。|
| `shelljs` | ShellJS 全局变量。|
| `meteor` | Meteor 全局变量。|
| `mongo` | MongoDB 全局变量。|
| `applescript` | AppleScript 全局变量。|
| `nashorn` | Java 8 Nashorn 全局变量。|
| `serviceworker` | Service Worker 全局变量。|
| `atomtest` | Atom 测试全局变量。|
| `embertest` | Ember 测试全局变量。|
| `webextensions` | WebExtensions 全局变量。|
| `greasemonkey` | GreaseMonkey 全局变量。|

## [Prettier](https://prettier.io/docs/en/install.html)

> Prettier 是代码格式化工具

### 安装

`yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`

`eslint-config-prettier`：关闭所有不必要或可能与 `Prettier` 冲突的 `ESLint` 规则

`eslint-plugin-prettier`：将 `Prettier` 作为 `ESLint` 规则运行

还需要修改 `.eslintrc` 文件（一定添加在数组最后）

```json
{
  "extends": [ ... , "plugin:prettier/recommended" ],
}
```

### 初始化

创建文件 `.prettierrc`，并填入以下内容

```json
{
  "printWidth": 160,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid",
  "trailingComma": "none",
  "endOfLine": "crlf"
}
```

### 添加 `format` 命令

<Alert>可选，但不建议。<code>ESLint</code> 执行会自动格式化</Alert>

在 `package.json` 中的 `script` 中添加（自行修改匹配的文件）

```json
{
  "scripts": {
    "format": "prettier --write ./**/*.{ts,tsx,scss,md,json}"
  }
}
```

### 运行

`yarn format`

配合 vscode 的 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 插件，并在设置文件中添加以下内容，实现每次保存代码时，自动格式化代码。

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## [lint-staged](https://github.com/okonet/lint-staged)

> 对 git 暂存的文件运行 linter，不要让 💩 溜进你的代码库！

### 安装

`yarn add lint-staged -D`

### 添加 `lint-staged` 命令

在 `package.json` 中添加

```json
"lint-staged": {
  "*.{ts,tsx}": [
    "prettier --write",
    "eslint --fix"
  ],
  "*.{md,css,scss,json}": "prettier --write"
}
```

默认情况下，`lint-staged` 将同时运行配置的任务，所以注意匹配文件重叠问题。[参考](https://github.com/okonet/lint-staged#task-concurrency)

### 运行

`npx lint-staged`

## [husky](https://github.com/typicode/husky)

> `husky` 是一个用来管理 `git hook` 的工具，`git hook` 即在我们使用 `git` 提交代码的过程中会触发的钩子

### 安装

`yarn add husky -D`

### 初始化

`npx husky install`

将在根目录生成文件 `.husky`

### 添加 `prepare` 命令

`npm pkg set scripts.prepare="husky install"`

这条命令是让以后别人 `git clone` 代码后，运行 `yarn` 安装依赖之后自动运行这条命令，从而自动初始化 `husky`。且这条代码是固定的，所以直接用命令向 `package.json` 添加内容吧

### 添加 `hooks`

`npx husky add .husky/pre-commit "npx lint-staged"`

此时 `.husky` 文件夹会新增一个名为 `pre-commit` 的 `shell` 脚本

<Alert>以上实现在运行 `git commit` 时，在之前运行命令 `npx lint-staged`。运行出错会中断 `git commit` 的执行</Alert>

## [commitizen](https://github.com/commitizen/cz-cli)

> 是一个统一 git commit message 格式的工具

### 安装

`yarn add commitizen @commitlint/cli @commitlint/config-conventional cz-git -D`

### 初始化

- [commitlint](https://github.com/conventional-changelog/commitlint)

  <Alert>适配器（检测 commit 格式）</Alert>

  添加 `husky` 钩子（不主动使用该适配器，而是在 `commit-msg` 触发时执行对 `commit` 消息的验证）

  `npx husky add .husky/commit-msg  "npx --no -- commitlint --edit ${1}"`
  
- [cz-git](https://github.com/Zhengqbbb/cz-git)

  <Alert>适配器（快速填写标准 commit 格式）</Alert>

  修改 `package.json` 添加 `commitizen` 指定使用的适配器
  
  ```json
  {
    "scripts": {
      "cz": "cz"
    },
    "config": {
      "commitizen": {
        "path": "node_modules/cz-git"
      }
    }
  }
  ```

### 自定义配置

`cz-git` 与 `commitlint` 进行联动给予校验信息，所以可以编写于 `commitlint` 配置文件 `.commitlintrc.js` 之中（`cz-git` 暂时不支持 `.commitlintrc.ts`）

```js
/* eslint-env node */
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      { value: 'docs', name: 'docs:     文档更新 | Documentation only changes' },
      { value: 'style', name: 'style:    代码格式 | Changes that do not affect the meaning of the code' },
      { value: 'refactor', name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature' },
      { value: 'perf', name: 'perf:     性能提升 | A code change that improves performance' },
      { value: 'test', name: 'test:     测试相关 | Adding missing tests or correcting existing tests' },
      { value: 'build', name: 'build:    构建相关 | Changes that affect the build system or external dependencies' },
      { value: 'ci', name: 'ci:       持续集成 | Changes to our CI configuration files and scripts' },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit' },
      { value: 'chore', name: 'chore:    其他修改 | Other changes that do not modify src or test files' }
    ],
    useEmoji: false,
    emojiAlign: 'center',
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: '以上都不是？我要自定义',
    emptyScopesAlias: '跳过',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' }
    ],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: '跳过',
    customIssuePrefixsAlias: '自定义前缀',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
```

### 运行

`git add .` 后使用 `yarn cz`，建议在 `markdown` 里添加

```markdown
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
```
