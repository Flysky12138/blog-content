---
title: Git
abbrlink: 69c3279c
date: 2022-07-02 10:37:36
updated: 2022-11-15 12:21:07
description: 在多人项目中 Git 的使用教程
cover: https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/c6fb40f134425b3a6eca586187897490.webp
---

<Alert>通常情况下，未指定本地分支，默认都是当前分支。</Alert>

## 克隆

在多人开发中，不可能在 `master` 分支上进行开发，而默认拉取的是 `master` 分支，所以使用下面命令拉取指定的一条分支

```bash
git clone -b <remote_branch> <url>
```

## 分支

```bash
# 显示分支（默认只显示本地分支）；当前所在分支前用 * 标记
## -r：查看远程分支，-a：查看所有分支，-vv：查看本地分支与远程分支的追踪关系
git branch [-r] [-a] [-vv]

# 创建本地新分支（Git 会用当前分支的最后提交的快照作为新分支工作目录的内容）
git branch <local_branch>
## or (and switch to new branch)
git checkout -b <local_branch>

# 拉取远程分支到本地并切换
git checkout -t <remote>/<remote_branch>

# 切换分支
git checkout <local_branch>

# 删除本地分支
git branch -<d|D> <local_branch>
# 删除远程分支
git push <remote> :<remote_branch>

# 本地分支与远程分支的追踪关系
## 建立
git branch --set-upstream [local_branch] <remote>/<remote_branch>
## 移除
git branch --unset-upstream
```

## 拉取

```bash
# 拉取远程主机某个分支的更新，再与本地的指定分支合并
## 1、如果省略本地分支名，默认与当前所在的本地分支合并
## 2、如果当前分支与远程分支存在追踪关系时，可以省略远程分支名
git pull [remote] [remote_branch[:local_branch]]
```

`git pull = git fetch + git merge`

## 上传

```bash
# 上传本地分支
## -u：建立追踪关系
## -f：不拉取强制上传
## 1、如果本地分支名与远程分支名一样，可以省略远程分支名
## 2、如果当前分支与远程分支存在追踪关系时，还可以省略本地分支名
git push [-u] [remote] [local_branch[:remote_branch]] [-f]
```

## 撤销

```bash
# 还没有使用 git add 暂存本地修改（无法撤销新增的文件）
git checkout -- <filename> # 放弃指定文件修改
git checkout . # 放弃所有文件的修改

# 已经使用了 git add 暂存本地修改
git reset HEAD <filename> # 撤销指定文件
git reset HEAD . # 放弃所有的暂存

# 已经使用了 git commit 提交到本地仓库
git reset --hard HEAD^ # 回滚到上一个提交的状态
git reset --hard <commit_id> # 回滚到指定的 commit
```

## 其他

```bash
# 显示所有远程仓库
git remote [-v]

# 查看在自上次提交之后是否有对文件进行再次修改
git status -s

# 将该文件添加到暂存区
git add .

# 将暂存区内容添加到本地仓库中
git commit -m <message>

# 列出历史提交记录
git log --oneline

# 更新了 `.gitignore` 文件，清除缓存使更新生效
git rm -r --cached .
```

## 提交规范

<Alert variant="outlined">提交格式为 `<type>[(scope)]: <subject>` 注意冒号 `:` 后有空格。如 **_feat(miniprogram): 增加了小程序模板消息相关功能_** 工具：[点击查看](/post/33fa9d21/#commitizen)</Alert>

- **scope**：表示 `commit` 的作用范围，如数据层、视图层，也可以是目录名称
- **subject**：用于对 `commit` 进行简短的描述
- **type**：表示提交类型，值有以下几种：

|    值    |                    说明                    |
| :------: | :----------------------------------------: |
|   feat   |                   新功能                   |
|   fix    |                  修复 bug                  |
|   docs   |                  文档注释                  |
|  style   |       代码格式(不影响代码运行的变动)       |
| refactor | 重构、优化(既不增加新功能，也不是修复 bug) |
|   perf   |                  性能优化                  |
|   test   |                  增加测试                  |
|  chore   |          构建过程或辅助工具的变动          |
|  revert  |                    回退                    |
|  build   |                    打包                    |
