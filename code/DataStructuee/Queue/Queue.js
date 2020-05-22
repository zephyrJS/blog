class Queue {
    constructor() {
        this.queue = []
    }

    enqueue(el) {
        this.push(el)
    }

    dequeue() {
        return this.shift()
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

    isEmpyt() {
        return this.queue.length === 0
    }

    clear() {
        this.queue = []
    }
}