---
title: forof & forin
abbrlink: 3cbfd268
date: 2022-09-22 22:34:57
updated: 2022-09-22 22:34:57
description: 对这两个遍历的简单说明
---

<Alert>捶死所有说 `forin` 遍历对象，`forof` 遍历数组的。</Alert>

## for in

遍历对象的可枚举属性。

```ts
const num = [1, 2]
Object.defineProperty(Object.getPrototypeOf(num), '2', {
  value: 3,
  enumerable: true,
  writable: true
})
for (const key in num) {
  console.log(num[key])
}

// 1
// 2
// 3
```

## for of

遍历可迭代对象，输出内容与迭代器有关。

```ts
const obj = {
  number: 4,
  // [Symbol.iterator]: function () {
  //   let index = 1
  //   return {
  //     next: () => ({
  //       value: index,
  //       done: index++ == this.number
  //     })
  //   }
  // },
  [Symbol.iterator]: function* () {
    for (let index = 1; index < this.number; index++) {
      yield index
    }
  }
}
for (const iterator of obj) {
  console.log(iterator)
}

// 1
// 2
// 3
```
