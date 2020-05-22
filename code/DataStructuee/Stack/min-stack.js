const { Stack } = require('./Stack')

// 实现 min 方法
class MinStack{
    constructor() {
        this.dataStack = new Stack()
        this.minStack = new Stack()
    }

    push(el) {  
        this.dataStack.push(el)

        if(this.minStack.isEmpty() || this.minStack.top() > el) {
            this.minStack.push(el)
        }
    }

    min() {
        return this.minStack.top()
    }
}

const minStack = new MinStack()
minStack.push(1)
minStack.push(2)
minStack.push(3)
console.log(minStack.min())
minStack.push(0)
console.log(minStack.min())
