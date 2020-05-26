class Queue {
    constructor() {
        this.queue = []
    }

    enqueue(el) {
        this.queue.push(el)
    }

    dequeue() {
        return this.queue.shift()
    }

    head() {
        return this.queue[0]
    }

    tail() {
        return this.queue[this.size() - 1]
    }

    size() {
        return this.queue.length
    }

    isEmpty() {
        return this.queue.length === 0
    }

    clear() {
        this.queue = []
    }
}

module.exports = {
    Queue
}