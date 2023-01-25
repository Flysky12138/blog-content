---
title: TypeScript
abbrlink: d044eab7
date: 2022-08-10 20:51:59
updated: 2022-08-18 22:27:08
description: TypeScript 简略教程
cover: https://cdn.flysky.xyz/cdn.jsdelivr.net/gh/Flysky12138/warehouse/PicW/blog/a72d389933e5c97bccf00d9daa94db60.webp
---

<Alert>TypeScript 是 JavaScript 的超集，因此 JS 语法是合法的 TS 语法。然而，TypeScript 是一个类型超集，这意味着它添加了关于如何使用不同类型的值的规则。</Alert>

## 类型

共有 7 种基本类型：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`。

```ts
const oneHundred: bigint = BigInt(90) + 10n
```

其他 TypeScript 加入的类型：`any`、`unknown`、`never`、`void`、`object / {}`

- `any`：表示任意类型。当您不指定类型，并且 TypeScript 无法从上下文中推断出它时，编译器通常会默认为 `any`。在大多数情况下不用手动去声明类型 TypeScript 会尽可能地尝试自动推断代码中的类型。
- `unknown`：表示任意类型。顶层类型，只能赋值给 `unknown` 与 `any` 类型。`unknown` 类型要安全得多，因为它迫使我们执行额外的类型检查（[断言](#断言) 或类型收缩）来对变量执行操作。
- `never`：表示永远不会返回任何值。底层类型，只能赋值给 `never` 类型。一个从来不会有返回值的函数（如：函数内含有 `while(true) {}`）；一个总是会抛出错误的函数（如：`function foo() { throw new Error('Not Implemented') }`）。
- `void`：表示不会返回任何值（如：没有 `return` 的“正常”函数。）

## 函数

声明函数时，可以在每个参数后面加上类型注解，声明函数接受哪些类型的参数。

```ts
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!')
}
```

声明函数返回值的类型。

```ts
function getFavoriteNumber(): number {
  return 73
}
```

定义有一个函数类型。

```ts
type fn = (x: number, y: number) => number
const sum: fn = (x, y) => x + y
```

[查看更多关于函数的介绍](https://www.typescriptlang.org/docs/handbook/2/functions.html)

## 对象类型

除了基本类型，您遇到的最常见的类型是对象类型。要定义对象类型，我们只需列出其属性及其类型，或使用 [类型别名](#类型别名) 与 [接口](#接口)。

```ts
function printSum(pt: { x: number; y: number }) {
  console.log(pt.x + pt.y)
}
printSum({ x: 3, y: 7 })
```

### 可选属性

在属性名称后添加一个 `?` 可以指定对象的属性是可选的（函数可以指定末尾的 n 个参数可选）。

```ts
function printName(obj: { first: string; last?: string }, age?: number) {
  // ...
}
printName({ first: 'Bob' })
printName({ first: 'Alice', last: 'Alisson' })
```

### 只读属性

使用 `readonly` 修饰符并不一定意味着一个值是完全不可变的 —— 或者换句话说，属性本身不能被重写，引用类型的属性其内部属性的值可更改。

```ts
function printName(obj: { readonly first: string }) {
  obj.first = 'Alice' // Error
}
printName({ first: 'Bob' })
```

## 数组

`Type[]` 类型实际上只是泛型 `Array<Type>` 的简写。

```ts
const array1: number[] = [0, 1, 2]
const array2: Array<number> = [0, 1, 2]
```

### 只读数组

`readonly Type[]` 类型实际上只是泛型 `ReadonlyArray<Type>` 的简写。

```ts
const array1: readonly number[] = [0, 1, 2]
const array2: ReadonlyArray<number> = [0, 1, 2]
```

## 元组

元组类型是另一种数组类型，它确切地知道数组包含多少个元素，以及数组在特定位置包含哪些类型。

```ts
type StringNumberPair = [string, number]
```

元组可以通过写 `?` 来具有可选属性。可选的元组元素只能出现在末尾，并且也会影响 `length`。

```ts
function setCoordinate(coord: [number, number, number?]) {
  const [x, y, z] = coord // const z: number | undefined
  console.log(coord.length) // (property) length: 2 | 3
}
```

元组也可以有剩余元素，它们必须是数组/元组类型。

```ts
type StringNumberBooleans = [string, number, ...boolean[]]
type StringBooleansNumber = [string, ...boolean[], number]
type BooleansStringNumber = [...boolean[], string, number]
```

### 只读元组

```ts
function doSomething(pair: readonly [string, number]) {
  pair[0] = 'hello!' // Cannot assign to '0' because it is a read-only property.
}
```

[查看更多关于对象的介绍](https://www.typescriptlang.org/docs/handbook/2/objects.html)

## 联合类型

联合类型是由两种或多种其他类型通过 `|` 组成的类型，表示可能是这些类型中的任何一种的值。

```ts
function printId(id: number | string) {
  console.log('Your ID is: ' + id)
}
printId(101)
printId('202')
printId(true) // 类型“boolean”的参数不能赋给类型“string | number”的参数。
```

TypeScript 只有在对联合体的每个成员都有效的情况下才允许操作。解决方案是用代码缩小联合，就像在没有类型注释的 JavaScript 中一样。当 TypeScript 可以根据代码的结构为某个值推断出更具体的类型时，就会发生缩小。

## 交叉类型

交叉类型是将多个类型通过 `&` 合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```ts
function person(info: { name: string } & { age: number }) {
  // ...
}
person({ name: 'Bob', age: 18 })
```

## 断言

### 类型断言

有时你会得到 TypeScript 无法知道的值类型的信息。

例如，如果您正在使用 `document.getElementById`，TypeScript 只知道这将返回 `HTMLElement` 类型，但您可能知道您的页面给定 ID 的标签将始终是 `HTMLCanvasElement` 类型。

- 在这种情况下，您可以使用 `as` 来指定更具体的类型：

  ```ts
  const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement
  ```

- 您还可以使用 `<T>` 语法（除非代码在.tsx 文件中），它是等效的：

  ```ts
  const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas')
  ```

有时，规则可能过于保守，并且不允许可能有效的更复杂的强制转换。如果发生这种情况，您可以使用两个断言，首先是 `any` 或 `unknown`，然后是所需的类型：

```ts
const a = expr as any as T
```

### 非空断言运算符

TypeScript 还具有一种特殊的语法，用于在不进行任何显式检查的情况下从类型中删除 `null` 和 `undefined`。在任何表达式之后写 `!`。

```ts
function liveDangerously(x?: number | null) {
  console.log(x!.toFixed())
}
```

## 文字类型

变量只能有一个值并没有多大用处！但是通过将文字组合成联合，你可以表达一个更有用的概念 —— 例如，只接受一组已知值的函数：

```ts
function printText(s: string, alignment: 'left' | 'right' | 'center') {
  // ...
}
printText('Hello, world', 'left')
printText("G'day, mate", 'top') // Argument of type '"top"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

```ts
function compare(a: string, b: string): -1 | 0 | 1 {
  return a == b ? 0 : a > b ? 1 : -1
}
```

```ts
interface Options {
  width: number
}
function configure(x: Options | 'auto') {
  // ...
}
configure({ width: 100 })
configure('auto')
configure('automatic') // Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

### 字面推理

```ts
const req = { url: 'https://example.com', method: 'GET' }
handleRequest(req.url, req.method) // Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

在上面的例子 `req.method` 中被推断为是 `string` ，不是 `"GET"`。有两种方法可以解决这个问题。

- 您可以通过在任一位置添加类型断言来更改推理：

  ```ts
  // Change 1:
  const req = { url: 'https://example.com', method: 'GET' as 'GET' }
  // Change 2
  handleRequest(req.url, req.method as 'GET')
  ```

- 您可以使用 `as const` 将整个对象转换为文字类型：

  ```ts
  const req = { url: 'https://example.com', method: 'GET' } as const
  handleRequest(req.url, req.method)
  ```

## 模板文字类型

[模板文字类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) 建立在字符串文字类型之上，并且能够通过联合扩展成许多字符串。

## 类型别名

我们一直通过直接在类型注释中编写对象类型和联合类型来使用它们。这很方便，但通常希望多次使用同一个类型并用一个名称引用它。

```ts
type Point = {
  x: number
  y: number
}
function printSum(pt: Point) {
  console.log(pt.x + pt.y)
}
printSum({ x: 100, y: 100 })
```

您实际上可以使用类型别名来为任何类型命名，而不仅仅是对象类型。例如，类型别名可以命名联合类型：

```ts
type ID = number | string
```

## 接口

接口声明是命名对象类型的另一种方式。

```ts
interface Point {
  x: number
  y: number
}
function printSum(pt: Point) {
  console.log(pt.x + pt.y)
}
printSum({ x: 100, y: 100 })
```

## 类型别名与接口的区别

类型别名和接口非常相似，在很多情况下您可以在它们之间自由选择。几乎所有的 `interface` 特性都可以在 `type` 中使用，主要区别在于类型别名不能添加新属性，而接口总是可扩展的。

如果我们是定义一个 **object**，那么最好是使用 `interface` 去做类型声明，什么时候用 `type` 呢，当定义 **函数、元组、联合类型** 的时候：

```ts
type Sum = (x: number, y: number) => number
```

### 扩展

- 通过 `extends` 运算符继承接口。

  ```ts
  interface Animal {
    name: string
  }
  interface Bear extends Animal {
    honey: boolean
  }
  ```

- 通过 `&` 运算符定义交叉类型。

  ```ts
  interface Fly {
    canfly: boolean
  }
  type Animal = {
    name: string
  }
  type Bear = Fly &
    Animal & {
      honey: boolean
    }
  ```

### 更新

- 向现有接口添加新字段。

  ```ts
  interface Window {
    title: string
  }
  interface Window {
    ts: TypeScriptAPI
  }
  ```

- 类型创建后无法更改。

  ```ts
  type Window = {
    title: string
  }
  type Window = {
    ts: TypeScriptAPI
  }
  // Error: Duplicate identifier 'Window'.
  ```

## 枚举

枚举是 TypeScript 添加到 JavaScript 的一项功能，它允许描述一个值，该值可能是一组可能的命名常量之一。与大多数 TypeScript 功能不同，这不是对 JavaScript 的类型级添加，而是添加到语言和运行时的东西。详细参考 [枚举](https://www.typescriptlang.org/docs/handbook/enums.html)

## 泛型

根据现有类型或值来表达新类型的方法。通过组合各种类型的操作符，我们可以用简洁、可维护的方式表达复杂的操作和值。

### 泛型接口

以下展示如何从函数本身的泛型类型到创建通用泛型接口。

```ts
function identity<T>(arg: T): T {
  return arg
}

// 1.
const myIdentity: <T>(arg: T) => T = identity

// 2.
const myIdentity: { <T>(arg: T): T } = identity

// 3.
interface GenericIdentityFn {
  <T>(arg: T): T
}
const myIdentity: GenericIdentityFn = identity

// 4.
interface GenericIdentityFn<T> {
  (arg: T): T
}
const myIdentity: GenericIdentityFn<number> = identity
```

从中可以注意到它与 [映射类型](#映射类型) 很像，不同点在于它使用的是 `()` 且键名是参数名，而映射类型使用的是 `[]` 且键名任意（只用于占位）。

### 泛型类

泛型类具有与泛型接口相似的形状。

```ts
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = (x, y) => x + y
```

### 约束

使用 `extends` 对传入泛型模板的类型进行约束。

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a')
getProperty(x, 'm') // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

## 运算符

### `keyof`

对对象类型采用运算符 `keyof` 生成其键的字符串或数字文字的联合类型。

```ts
type Point = { x: number; y: number }
type P = keyof Point
// type P = 'x' | 'y'
```

如果该类型具有 `string` 或 `number` 索引签名，keyof 则将返回这些类型。

```ts
type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish
// type A = number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
// type M = string | number
```

### `typeof`

JavaScript 已经有一个 `typeof` 可以在表达式上下文中使用的运算符。TypeScript 添加了一个 `typeof` 运算符，您可以在类型上下文中使用它来引用变量或属性的类型。

```ts
function f() {
  return { x: 10, y: 3 }
}
type P = ReturnType<typeof f>
// type P = {
//   x: number
//   y: number
// }
```

## 索引签名

我们可以使用索引来查找另一种类型的特定属性。

```ts
type Person = { age: number; name: string; alive: boolean }
type Age = Person['age']
// type Age = number
```

索引签名本身就是一种类型，因此我们可以完全使用联合类型、`keyof`、 或其他类型。

```ts
type Person = { age: number; name: string; alive: boolean }
type I1 = Person['age' | 'name']
// type I1 = string | number
type I2 = Person[keyof Person]
// type I2 = string | number | boolean
type AliveOrName = 'alive' | 'name'
type I3 = Person[AliveOrName]
// type I3 = string | boolean
```

使用任意类型进行索引的另一个示例是 `number` 用于获取数组元素的类型。我们可以结合 `typeof` 来方便地捕获数组的元素类型。

```ts
const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 }
]
type Person = typeof MyArray[number]
// type Person = {
//   name: string;
//   age: number;
// }
type Name = Person['name']
// type Name = string
type Age = typeof MyArray[number]['age']
// type Age = number
```

## 条件类型

条件类型的形式 `SomeType extends OtherType ? TrueType : FalseType` 有点像 JavaScript 中的三元运算符

```ts
interface Animal {
  live(): void
}
interface Dog extends Animal {
  woof(): void
}
type Example1 = Dog extends Animal ? number : string
// type Example1 = number
type Example2 = RegExp extends Animal ? number : string
// type Example2 = string
```

条件类型的强大之处在于将它们与泛型一起使用。

```ts
interface IdLabel {
  id: number
}
interface NameLabel {
  name: string
}
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw 'unimplemented'
}
let a = createLabel('typescript')
// let a: NameLabel
let b = createLabel(2.8)
// let b: IdLabel
let c = createLabel(Math.random() ? 'hello' : 42)
// let c: NameLabel | IdLabel
```

### 条件类型约束

```ts
type MessageOf<T> = T extends { message: unknown } ? T['message'] : never
interface Email {
  message: string
}
interface Dog {
  bark(): void
}
type EmailMessageContents = MessageOf<Email>
// type EmailMessageContents = string
type DogMessageContents = MessageOf<Dog>
// type DogMessageContents = never
```

### 在条件类型中推断

条件类型为我们提供了 `infer` 关键字来推断在真实分支中的类型。
在这里，我们使用 `infer` 关键字声明引入了一个新的泛型类型变量 `R`，而不是指定 `T` 如何在真正的分支中检索元素类型。

```ts
type GetReturnType<T> = T extends (...args: never[]) => infer R ? R : never
type Num = GetReturnType<() => number>
// type Num = number
type Str = GetReturnType<(x: string) => string>
// type Str = string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>
// type Bools = boolean[]
```

### 分布式条件类型

当条件类型作用于泛型类型时，它们在给定联合类型时变得可分配。

```ts
type ToArray<T> = T extends any ? T[] : never
type StrArrOrNumArr = ToArray<string | number>
// type StrArrOrNumArr = string[] | number[]
```

## 映射类型

映射类型建立在索引签名的语法之上，用于声明未提前声明的属性类型

```ts
type OnlyBoolsAndHorses = {
}
const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false
}

type OptionsFlags<T> = {
}
type FeatureFlags = {
  darkMode: () => void
  newUserProfile: () => void
}
type FeatureOptions = OptionsFlags<FeatureFlags>
// type FeatureOptions = {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }
```

### 映射修改器

在映射期间可以应用两个额外的修饰符 `readonly` 与 `?`：它们分别影响可变性和可选性。
您可以通过前缀 `-` 或 `+` 来删除或添加这些修饰符。如果您不添加前缀，默认为 `+`。

```ts
type Concrete<T> = {
  -readonly [key in keyof T]-?: T[key]
}
type MaybeUser = {
  readonly id: string
  name?: string
  age?: number
}
type User = Concrete<MaybeUser>
// type User = {
//   id: string
//   name: string
//   age: number
// }
```

### 键值重映射

您可以使用映射类型中的 `as` 子句重新映射映射类型中的键。

```ts
type Getters<T> = {
}
interface Person {
  name: string
  age: number
  location: string
}
type LazyPerson = Getters<Person>
// type LazyPerson = {
//   getName: () => string
//   getAge: () => number
//   getLocation: () => string
// }
```

## 内置泛型方法

TypeScript 提供了几种泛型方法来帮助常见的类型转换。详细参考 [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

| 方法 | 说明 | 原型 |
| -- | -- | -- |
| `Partial<Type>`                       | 将类型的所有属性设置为可选                                                          | `type Partial<T> = { [P in keyof T]?: T[P] \| undefined; }`                                                                               |
| `Required<Type>`                      | 将类型的所有属性设置为必选                                                          | `type Required<T> = { [P in keyof T]-?: T[P]; }`                                                                                          |
| `Readonly<Type>`                      | 将类型的所有属性设置为只读                                                          | `type Readonly<T> = { readonly [P in keyof T]: T[P]; }`                                                                                   |
| `Record<Keys, Type>`                  | 构建一个对象类型，其属性键为 Keys，其属性值为 Type                                  | `type Record<K extends string \| number \| symbol, T> = { [P in K]: T; }`                                                                 |
| `Pick<Type, Keys>`                    | 从 Type 中选取属性集合 Keys（字符串字头或字符串字头的联合）来构造一个类型           | `type Pick<T, K extends keyof T> = { [P in K]: T[P]; }`                                                                                   |
| `Omit<Type, Keys>`                    | 从 Type 中选取所有属性，然后删除 Keys（字符串字面或字符串字面的联合）来构造一个类型 | `type Omit<T, K extends string \| number \| symbol> = { [P in Exclude<keyof T, K>]: T[P]; }`                                              |
| `Exclude<UnionType, ExcludedMembers>` | 从 UnionType 中排除可分配给 ExcludedMembers 的所有 union 成员来构造一个类型         | `type Exclude<T, U> = T extends U ? never : T`                                                                                            |
| `Extract<Type, Union>`                | 从 Type 中提取可分配给 Union 的所有 union 成员来构造一个类型                        | `type Extract<T, U> = T extends U ? T : never`                                                                                            |
| `NonNullable<Type>`                   | 从 Type 中排除 null 和 undefined 来构造一个类型                                     | `type NonNullable<T> = T extends null \| undefined ? never : T`                                                                           |
| `Parameters<Type>`                    | 从函数 Type 使用的参数中构建一个元组类型                                            | `type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never`                                      |
| `ConstructorParameters<Type>`         | 从构造函数 Type 使用的参数中构造一个元组或数组类型                                  | `type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never` |
| `ReturnType<Type>`                    | 构建一个由函数 Type 的返回类型组成的类型                                            | `type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any`                                        |
| `InstanceType<Type>`                  | 构建一个由构造函数 Type 的返回类型组成的类型                                        | `type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any`            |
| `ThisParameterType<Type>`             | 提取一个函数类型的 this 参数的类型                                                  | `type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown`                                              |
| `OmitThisParameter<Type>`             | 移除 Type 的 this 参数                                                              | `type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T`  |
| `Uppercase<StringType>`               | 字符串大写                                                                          |
| `Lowercase<StringType>`               | 字符串小写                                                                          |
| `Capitalize<StringType>`              | 字符串首字母大写                                                                    |
| `Uncapitalize<StringType>`            | 字符串首字母小写                                                                    |
