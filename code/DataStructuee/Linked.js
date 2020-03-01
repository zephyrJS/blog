const assert = require('assert')

class Node {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class Linked {
    constructor() {
        this.dummyHead = new Node(null, null) // 虚拟头结点
        this.size = 0
    }

    getSize() {
        return this.size
    }

    isEmpty() {
        return this.size === 0
    }    

    insertNode(index, value) {
        if (index < 0 || index > this.size) {
            throw new Error('Index 越界')
        }

        let prev = this.dummyHead
        for (let i = 0; i < index; i++) {
            prev = prev.next
        }
        prev.next = new Node(value, prev.next)
        this.size++
    }

    addFirst(value) {
        this.insertNode(0, value)
    }

    addLast(value) {
        this.insertNode(this.size, value)
    }
}

const linked = new Linked()
assert.strictEqual(linked.getSize(), 0)
assert.strictEqual(linked.isEmpty(), true)

linked.addFirst(1)
assert.strictEqual(linked.dummyHead.next.value, 1)
assert.strictEqual(linked.getSize(), 1)

linked.addFirst(3)
linked.insertNode(1, 2)
assert.strictEqual(linked.dummyHead.next.next.value, 2)
assert.strictEqual(linked.getSize(), 3)

linked.addLast(0)
assert.strictEqual(linked.dummyHead.next.next.next.next.value, 0)
assert.strictEqual(linked.getSize(), 4)

console.log('All assertions passed')
