this 的绑定主要有 5种：默认绑定、隐式绑定、显示绑定、new 绑定和箭头函数绑定

### 默认绑定
独立调用，在无法应用其他绑定规则时使用， this 指向 window。但这严格模式下无法绑定到 window，this 指向 undefined。但需要注意的是，在严格模式下调用函数则不影响默认绑定。

```js
function bar() {
    console.log(this) // 默认指向 window
}

function foo() {
    'use strict'
    console.log(this) // this 指向 undefined
    bar() // 严格模式下调用还是指向 window
}

bar() // window
foo() // undefined

```

### 隐式绑定
当函数引用有上下文对象时，隐式绑定规则会把函数的 this 绑定到这个上下文对象上。
```js
function bar() {
    console.log(this.a)
}

const obj = {
    a: 1,
    bar: bar
}

obj.bar() // 1
```

被隐式绑定的函数在特定场景下会丢失绑定对象，函数的 this 会指向 window 或 undefined。
```js
let a = 'global'

const obj = {
    a: 'obj',
    bar() {
        console.log(this.a)
    }
}

let bar = obj.bar

bar() // 'global'
```

### 显示绑定
通过 call、apply 或 bind 将指定对象绑定到 this，因为直接指定了 this 的绑定对象，所以称之为显示绑定。通过显示绑定，我们可以解决隐式绑定丢失的问题。
```js
let a = 'global'
const obj = {
    a: 'obj',
    bar() {
        console.log(this.a)
    }
}
let bar = obj.bar.bind(obj)
bar() // obj
```

JS 的一些内置函数的参数也提供一个看选参数，来实现显示绑定的功能。如果数组的原型方法 map、filter、forEach 等。
```js
function foo(num){
    console.log(num, this.a)
}

const obj = {
    a: 'obj'
}

[1,2,3].forEach(foo, obj) // 1 obj 2 obj 3 obj
```

### new 绑定
在 JavaScript 中，构造函数本质就是个普通函数，但通过 new 关键字可以调用构造函数创建新的对象。而此时函数的内部的 this 就指向这个新创建的对象，这就是通过 new 来绑定 this。
```js
function Foo(str) {
    console.log(this.str)
}
obj = new Foo('hello world')
console.log(obj.str) // hello world
```

new 的实现流程：
```js
function _new(Con) {
    // 获取参数
    const args = Array.prototype.slice.call(arguments, 1)
    // 创建中间对象，其原型指向 Con 的 prototype
    const obj = Object.create(Con.prototype)
    // 调用构造函数
    const res = Con.call(obj, args)
    // 如果构造函数调用返回结果为 object 就返回 res，否则返回中间对象 obj
    return res instanceof Object ? res : obj
}
```

### 箭头函数绑定
通常 this 的指向我们可以笼统概括为谁调用该函数，则 this 指向该对象。但箭头函数不同，它更像是函数内部的一个普通变量，主要通过作用域（词法作用域）来查找。
其特点可以概括为：
1. 箭头函数的 this 和函数所在作用域的 this 一致
2. apply、call 和 bind 没法直接修改箭头函数的 this
   