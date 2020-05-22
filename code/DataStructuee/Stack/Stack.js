class Stack {
    constructor() {
        this.stack = []
    }

    push(el) {
        this.stack.push(el)
    }
    pop() {
        return this.stack.pop()
    }
    top() {
        return this.stack[this.size() - 1]
    }
    size() {
        return this.stack.length
    }
    isEmpty() {
        return this.stack.length === 0
    }
    clear() {
        this.stack = []
    }
}

module.exports = {
    Stack
}