---
title: Scoop
abbrlink: 61e990a2
date: 2022-09-23 14:08:19
updated: 2022-11-11 16:17:12
description: Windows 包管理工具
---

Scoop 的设计与实现理念：

- 分离用户数据：默认将程序的 **用户数据** 存储到 `persist` 目录中，这样当用户日后升级该程序后，之前的用户配置依然可用。（但是对于部分程序支持的不是很完善）
- `shim` 软链接：自动在 Scoop 应用安装路径下的 `shims` 文件夹下为新安装的程序添加对应的 `.exe` 文件，而 `shims` 文件夹提前就已被添加到 `PATH` 环境变量中，所以程序一旦安装就可以直接在命令行中运行。
- 对于 GUI 程序，Scoop 还会自动为其在开始菜单中添加快捷方式，路径：`%appdata%\Microsoft\Windows\Start Menu\Programs\Scoop Apps`

> 对于配置文件目录 `persist`，可以使用 `git` 进行备份。其中软件的配置有云保存的可以用 `.gitignore` 排除，比如 `discord`、`vscode`

Scoop 的安装：

```powershell
set-executionpolicy remotesigned -scope currentuser

# 改变默认安装路径
$env:SCOOP='D:\Scoop'
[environment]::setEnvironmentVariable('SCOOP', $env:SCOOP, 'User')

# 安装
iwr -useb get.scoop.sh | iex
```

<Alert>初次安装之后我们可以通过运行 `scoop checkup` 来检测当前潜在问题，然后根据提示进行修正。</Alert>
<Alert color="danger">重装系统后，若 scoop 安装目录还存在。可通过 `Everything` 查找 `.reg` 注册表双击运行添加大部分软件的注册表。之后卸载开发环境（`node`, `git`），再重新安装。其他软件不需要管，以后更新会自动添加到菜单列表。</Alert>

<Divider>wiki end</Divider>

## 安装卸载

<Alert>不推荐使用 `scoop search <string>` 查找软件，建议在这个网站上进行查找 [Scoop-Apps](https://scoop.sh/#/apps?s=0&d=1&o=true)。</Alert>

```bash
# 安装软件
scoop install <app>

# 安装特定版本的软件；语法 AppName@[version]，示例
scoop install git@2.23.0.windows.1

# 卸载软件 
scoop uninstall <app>
```

必装C++软件运行库：`scoop install vcredist`

## 更新

```bash
# 检查哪些软件有更新
scoop status

# 更新 Scoop 自身
scoop update

# 更新某些软件
scoop update <appName1> <appName2>

# 更新所有软件
scoop update *

# 禁止某软件更新
scoop hold <app>
# 允许某软件更新
scoop unhold <app>
```

## 清除缓存与旧版本

```bash
# 查看所有已下载的缓存信息
scoop cache show

# 清除指定软件的下载缓存
scoop cache rm <app>

# 清除所有缓存
scoop cache rm *

# 删除某软件的旧版本
scoop cleanup <app>
```

## 版本切换

```bash
scoop reset [app]@[version]

# 切换到指定版本
scoop reset idea-ultimate-eap@201.6668.13
# 切换到最新版本
scoop reset idea-ultimate-eap
```

## 其它命令

```bash
# 显示某个软件的信息
scoop info <app>

# 列出已安装的软件
scoop list  
```
