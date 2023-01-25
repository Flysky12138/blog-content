---
title: JavaScript Array
abbrlink: 99e02e0f
date: 2021-08-26 16:00:05
updated: 2022-08-29 19:41:15
description: JS 的数组方法总结
cover: https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/887765a3394b24f7b65a7c7e61091c1a.webp
---

## TIPS

1. 数组的原型方法大部分都适用于类数组对象上

2. 指定开始与结束的值，取值范围为 `[start,end)` 。并且几乎都可取负值，表示倒数第几项（`arr.length + start`）

3. 遍历方法回调函数的最后两位参数几乎都是 `index` `array`

## 转字符串

| 方法   | 语法                    | 说明                                                                          |
| ------ | ----------------------- | ----------------------------------------------------------------------------- |
| `join` | `arr.join([separator])` | 将一个数组（或一个类数组对象）的所有元素以分隔符（默认为`,`）连接成一个字符串 |

## 增删

| 方法      | 语法                                                        | 说明                                                                                                                        |
| --------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `push`    | `arr.push(element1, ..., elementN)`                         | 将一个或多个元素添加到数组的末尾，并返回该数组的新长度                                                                      |
| `pop`     | `arr.pop()`                                                 | 从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度                                                            |
| `unshift` | `arr.unshift(element1, ..., elementN)`                      | 将一个或多个元素添加到数组的开头，并返回该数组的新长度                                                                      |
| `shift`   | `arr.shift()`                                               | 从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度                                                              |
| `splice`  | `arr.splice(start[, deleteCount[, item1[, item2[, ...]]]])` | 通过删除或替换现有元素或者原地添加新的元素来修改数组，并返回由被删除的元素组成的一个数组（类似`slice`）。此方法会改变原数组 |

> **params:** `start` 从该索引开始。为负值时表示从倒数第几个开始

## 排序

| 方法      | 语法                          | 说明                                                     |
| --------- | ----------------------------- | -------------------------------------------------------- |
| `reverse` | `arr.reverse()`               | 将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组 |
| `sort`    | `arr.sort([compareFunction])` | 对数组的元素进行排序，并返回该数组。该方法会改变原数组   |

```javascript
arr.sort(() => 0.5 - Math.random()) // 随机排序
```

## 查找

| 方法          | 语法                                          | 说明                                                                                |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| `indexOf`     | `arr.indexOf(searchElement[, fromIndex])`     | 返回指定元素在数组中的第一个的索引，如果不存在则返回 `-1`                           |
| `lastIndexOf` | `arr.lastIndexOf(searchElement[, fromIndex])` | 返回指定元素在数组中的最后一个的索引，如果不存在则返回   `-1`。从数组的后面向前查找 |
| `find`        | `arr.find(callback[, thisArg])`               | 返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`                  |
| `findIndex`   | `arr.findIndex(callback[, thisArg])`          | 返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 `-1`       |
| `includes`    | `arr.includes(valueToFind[, fromIndex])`      | 用来判断一个数组是否包含一个指定的值。它返回一个布尔值                              |

> **params:** `fromIndex` 从该索引开始。为负值时表示从倒数第几个开始

## 其他

| 方法         | 语法                                                                 | 说明                                                                                                                                       |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `concat`     | `arr.concat(value1[, value2[, ...[, valueN]]])`                      | 用于合并两个或多个数组（参数可为数组或值）。此方法不会更改现有数组，而是返回一个新数组                                                     |
| `slice`      | `arr.slice([begin[, end]])`                                          | 返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的浅拷贝（包括 `begin`，不包括`end`）。原始数组不会被改变              |
| `entries`    | `arr.entries()`                                                      | 返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对                                                                        |
| `keys`       | `arr.keys()`                                                         | 返回一个包含数组中每个索引键的 Array Iterator 对象                                                                                         |
| `values`     | `arr.values()`                                                       | 返回一个包含数组中每个索引值的 Array Iterator 对象                                                                                         |
| `fill`       | `arr.fill(value[, start[, end]])`                                    | 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引                                                                 |
| `flat`       | `arr.flat([depth])`                                                  | 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回                                                 |
| `flatMap`    | `arr.flatMap(callback(currentValue [, index [, array]])[, thisArg])` | 映射函数映射每个元素，然后将结果压缩成一个新数组。它与   `Array.map().flat()`  几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些 |
| `Array.from` | `Array.from(arrayLike[, mapFn[, thisArg]])`                          | 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例                                                                                   |
| `Array.of`   | `Array.of(element0[, element1[, ...[, elementN]]])`                  | 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型                                                                             |

> **params:** `begin` `end` 从该索引开始/结束。为负值时表示从倒数第几个开始/结束

```javascript
//将一个类数组对象/集合转换成一个新数组
Array.prototype.slice.call(arguments)
ES6 => [...arguments]

//生成连续重复项为0,1,2,3,4长度为100的数组
Array.from(Array(100).keys(), v => v % 5)
//Array.from与展开运算符(...)的最大区别就是Array.from有mapFn回函数
```

## 遍历

| 方法          | 语法                                                                                     | 说明                                                                           |
| ------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `every`       | `arr.every(callback(element[, index[, array]])[, thisArg])`                              | 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值       |
| `some`        | `arr.some(callback(element[, index[, array]])[, thisArg])`                               | 测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回一个布尔值        |
| `forEach`     | `arr.forEach(callback(currentValue [, index [, array]])[, thisArg])`                     | 对数组的每个元素执行一次给定的函数                                             |
| `map`         | `arr.map(callback(currentValue [, index [, array]])[, thisArg])`                         | 创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值         |
| `reduce`      | `arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`      | 对数组中的每个元素执行一个由您提供的函数（从左到右），将其结果汇总为单个返回值 |
| `reduceRight` | `arr.reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])` | 对数组中的每个元素执行一个由您提供的函数（从右到左），将其结果汇总为单个返回值 |
| `filter`      | `arr.filter(callback(element[, index[, array]])[, thisArg])`                             | 创建一个新数组，其包含通过所提供函数实现的测试的所有元素                       |

> **params:** `initialValue` 作为第一次调用 `callback` 函数时的第一个参数 `accumulator` 的值。如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 `reduce` 将报错。
