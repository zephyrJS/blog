### 什么是模块化
模块化就是封装细节，提供使用接口。好的模块，是彼此独立，即使被删除或替换，也不会损害系统的正常使用。
使用模块化有这样几个好处：
**可维护性**：一个设计良好的模块，是高内聚，低耦合的，每次功能的修改，我们只需要关注该模块，而不需要去关注其他不相关的模块是如何实现的；
**命名空间**：由于模块化，所以变量不会暴露在全局，就不会造成全局变量污染；
**重用代码**：如果没有模块话，在新项目中要用到旧的项目的某些功能，只能通过复制粘贴的方式来实现。但使用模块话则能实现代码的共享重用；

### 如何实现模块化
在 JavaScript 早期，我们使用命名空间的方式来实现模块化。
```js
const module = {
    foo: function() {},
    bar: function() {}
}
module.foo()
```

虽然这种方式能够减少全局变量的数量，但 module 本质还是个对象，使用者依然能够修改其内部属性和方法。由此，就衍生除了匿名闭包（IIFE） 的方式来实现模块化。
```js
var module = (function() {
    var _private = 'private'
    function foo() {
        console.log(_private)
    }
    return {
        foo: foo
    }
})()
```

更进一步，我们还可以引入依赖，把全局变量注入到匿名闭包中
```js
var module = (function($) {
    var _$body = $('body')
    function foo() {
        console.log(_$body)
    }

    return {
        foo: foo
    }
})(JQuery)
```

### CommonJS



### AMD 和 CMD
### UMD
### ES Modulev