const {Queue} = require('./Queue')

function del_ring(arr) {
    const queue = new Queue()

    for(let item of arr) {
        queue.enqueue(item)
    }

    let index = 0
    while(queue.size() !== 1) {

    }
}