### 单例模式的概念
单例模式的思想就是只创建一个实例并缓存起来，若下次用到则直接返回该实例。常见的有登录模块，router 组件等。
```js
let instance
function Instance() {
    this.foo = 'foo'
}
Instance.prototype.getInstance() {
    if(instance) {
        return instance
    }
    return instance = new Instance()
}
```

### 透明的单例
使用匿名闭包的方式可以封装单例的实现过程
```js
const SingleInstance = (function() {
    let instance = null
    function Instance() {
        if(instance) {
            return instance
        }
        this.foo = 'foo'
        return instance = this
    }

    return Instance
})()

const a = new SingleInstance()
const b = new SingleInstance()
console.log(a === b) // true
```

### 职责单一的单例
上述示例虽然实现了单例模式，但是实例缓存逻辑和构造函数杂糅在一起，不利于扩展和复用，不符合单一职责。所以需要将实例缓存的逻辑抽离出来：
```js
// 抽离缓存逻辑
const getSingle = function(Con) {
    let instance = null
    return function() {        
        if(!instance) {
            instance = new Con()
        }
        return instance
    }
}

function Instance() {
    this.foo = 'foo'
}

function Instance1() {
    this.bar = 'bar'
}

const S1 = getSingle(Instance)
const S2 = getSingle(Instance1)

a = new S1()
b = new S1()
console.log(a === b)

c = new S2()
d = new S2()
console.log(c === d)

```

### JavaScript 单例模式
JavaScript 的全局变量天然就是一个单例，我们可以把只需要创建一次的实例添加到全局变量上。但是这样做的坏处是
- 全局变量
- 减少全局污染
  - 命名空间
  - 私有变量(闭包)
### 惰性单例 - 需要的时候再创建
### 通用惰性单例