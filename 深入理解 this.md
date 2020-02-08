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


### 箭头函数绑定