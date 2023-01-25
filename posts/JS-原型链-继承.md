---
title: JS 原型链 & 继承
abbrlink: cb7cb82b
date: 2022-08-29 19:31:31
updated: 2022-09-01 13:42:25
description: 对 JS 原型链以及继承的个人理解
cover: https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/2b1f95f048ba7f322c3308e7c3835a8b.webp
---

JavaScript 为了实现继承，使用了如下两个属性：

- `prototype`: 原型对象。只有函数才有这个属性，需被实例继承的属性和方法都定义在 `prototype` 对象上。原型对象上有一个指回构造函数自身的指针 `constructor`。
- `__proto__`: 每个对象都有这个私有属性（函数也是对象），其中 {% label 实例对象 blue %} 的 `__proto__` 属性指向它的构造函数的原型对象（有些对象不是通过构造函数 `new` 出来的，比如通过 `Object.create()` 和 `extends` 创建的对象）。`__proto__` 是非标准属性，可以使用 `Object.getPrototypeOf()` 获取对象的原型。

## 原型链

> 通过 `__proto__` 将实例对象与他的原型对象串联起来，形成的一条链。

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

`new Array()` -- `__proto__` --> `Array.prototype` -- `__proto__` --> `Object.prototype` -- `__proto__` --> `null`

这也是为什么判断变量类型用 `Object.prototype.toString.call()` 更准确，因为在原型链下层继承过程中 `toString` 被重写了。

![原型链](https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/d5dfc137cc7d085b467f7fd64c15ff90.webp)

结论：先有 `Object.prototype`（原型链顶端），`Function.prototype` 继承 `Object.prototype` 而产生，最后，`Function` 和 `Object` 和其它构造函数继承 `Function.prototype` 而产生。

## `new` 操作符的实现

`Object.create`: 以一个对象为原型创建一个新对象。

```js
function New(fn, ...args) {
  // 1.创建一个空对象，并将该对象的 __proto__ 指向构造函数的 prototype
  const obj = Object.create(fn.prototype)
  // 2.将构造函数中的 this 指向 obj 后，执行构造函数，获取返回值
  const res = fn.apply(obj, args)
  // 3.判断返回值类型
  return res instanceof Object ? res : obj
}
```

## 寄生组合式继承

这是最成熟的方法，也是现在库实现的方法。

1. 属性继承：在子类中执行父类构造函数。
2. 原型继承：将父类的原型赋值给子类（需注意子类原型上 `constructor` 的指向）。

```js
function inheritPrototype(subType, superType) {
  // 创建对象，创建父类原型的一个副本
  const prototype = Object.create(superType.prototype)
  // 增强对象，弥补因重写原型而失去默认的 constructor 属性
  prototype.constructor = subType
  // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype = prototype
}

// 父类初始化实例属性和原型属性
function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

// 将父类原型赋值给子类
inheritPrototype(SubType, SuperType)

// 新增子类原型属性
SubType.prototype.sayAge = function () {
  console.log(this.age)
}

var instance1 = new SubType('xyc', 23)
var instance2 = new SubType('lxy', 23)

instance1.colors.push('2') // ["red", "blue", "green", "2"]
instance1.colors.push('3') // ["red", "blue", "green", "3"]
```

## ES6 类 extends 继承

核心代码如下，其实现和上述的寄生组合式继承方式一样。

```js
function _inherits(subType, superType) {
  subType.prototype = Object.create(superType && superType.prototype, {
    constructor: {
      value: subType,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })

  if (superType) {
    Object.setPrototypeOf ? Object.setPrototypeOf(subType, superType) : (subType.__proto__ = superType)
  }
}
```
