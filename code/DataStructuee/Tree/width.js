const { BinaryTree } = require('./Tree')
const { Queue } = require('../Queue/Queue')

// A(B, F)
// const tree = new BinaryTree('A(B(C,D(E,),F(G,I)))')
const tree = new BinaryTree('A(B(C,D(E,)),F(G,I))')

console.log(getWidth(tree.getRoot(), 5))
// 获取对应层级节点个数
function getWidth(node, n) {
    if(!node) return 0

    const queue = new Queue()
    queue.enqueue(node)
    queue.enqueue(0)

    let width = 1
    let level = 0

    while(!queue.isEmpty()) {
        const delItem = queue.dequeue()        
        if(delItem === 0) {            
            level += 1
            if(level === n) {
                return width
            }
            width = queue.size()
                        
            if(queue.isEmpty()) {
                break
            }else {
                queue.enqueue(0)
            }

            continue
        }

        if(delItem.left) {
            queue.enqueue(delItem.left)
        }
        if(delItem.right) {
            queue.enqueue(delItem.right)
        }
    }

    return 0
}