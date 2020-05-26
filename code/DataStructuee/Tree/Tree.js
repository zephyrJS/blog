const { Stack } = require('../Stack/Stack')
const { Queue } = require('../Queue/Queue')

class TreeNode {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
        this.parent = null
    }
}

class Tag {
    constructor(node) {
        this.node = node
        this.state = 0 // 0 表示未进入右节点，1表示已进入右节点
    }
}

class BinaryTree {
    constructor(string) {
        this.root = null
        this.init(string)
    }

    init(string = '') {
        const stack = new Stack()
        let k = 0 // 判断是右子树，还是左子树
        let new_node = null

        for(let c of string) {
            if(c === '(') {
                k = 1
                stack.push(new_node)
            }else if(c === ',') {
                k = 2
            }else if(c === ')') {
                stack.pop()
            }else {
                new_node = new TreeNode(c)
                if(this.root === null) {
                    this.root = new_node
                }else {
                    if(k === 1) {
                        let parent = stack.top()                        
                        parent.left = new_node
                        // new_node.parent = parent
                    }else if(k === 2) {
                        let parent = stack.top()                        
                        parent.right = new_node
                        // new_node.parent = parent
                    }
                }
            }
        }
    }

    _inOrder(node) {
        if(!node) return null

        this._inOrder(node.left)
        console.log(node.data)
        this._inOrder(node.right)
    }
    recursiveInOrder() {        
        this._inOrder(this.root)
    }

    _preOrder(node) {
        if(!node) return null

        console.log(node.data)
        this._preOrder(node.left)
        this._preOrder(node.right)
    }
    recursivePreOrder() {
        this._preOrder(this.root)
    }

    _postOrder(node) {
        if(!node) return null

        this._postOrder(node.left)
        this._postOrder(node.right)
        console.log(node.data)
    }
    recursivePostOrder() {
        this._postOrder(this.root)
    }

    // 非递归版本
    preOrder() {
        const stack = new Stack()
        let curr = this.root

        while(curr) {
            console.log(curr.data)

            if(curr.right) {
                stack.push(curr.right)
            }

            if(curr.left) {
                curr = curr.left
            }else {
                curr = stack.pop()
            }
        }
    }

    inOrder() {
        const stack = new Stack()
        let curr = this.root

        while(true) {
            // 先遍历左子树，压栈，直到左子树为空
            while(curr) {
                stack.push(curr)
                curr = curr.left
            }

            // 打印当前节点
            let node = stack.pop()
            console.log(node.data)

            // 判断右子树是否为空，不为空赋值给当前节点
            if(node.right) {
                curr = node.right
            }

            // 遍历结束
            if(!node.right && stack.isEmpty()) {
                break
            }
        }
    }

    postOrder() {
        const stack = new Stack()
        let curr = this.root

        while(true) {
            // 遍历左子树，压栈，直到左子树为空
            while(curr) {
                let tag = new Tag(curr, 0)
                stack.push(tag)
                curr = curr.left
            }

            // 栈顶弹出
            let pop_tag = stack.pop()

            // 判断节点是否有右子树，且没被访问过
            if(pop_tag.node.right && pop_tag.state === 0) {
                pop_tag.state = 1
                stack.push(pop_tag)
                curr = pop_tag.node.right
            }else {
                // 右子树已被遍历，打印数据
                console.log(pop_tag.node.data)
            }

            // 遍历结束
            if(!curr && stack.isEmpty()) {
                break
            }
        }
    }

    levelOrder() {
        const queue = new Queue()
        queue.enqueue(this.root)
        queue.enqueue(0)

        let str_link = ''

        while(!queue.isEmpty()) {
            let delNode = queue.dequeue()

            if(delNode === 0) {
                console.log(str_link)
                str_link = ''
                if(queue.isEmpty()) {
                    break
                }else {
                    queue.enqueue(0)
                }
                continue
            }

            str_link += delNode.data + '  '

            if(delNode.left) {
                queue.enqueue(delNode.left)
            }
            if(delNode.right) {
                queue.enqueue(delNode.right)
            }
        }
    }

    getRoot() {
        return this.root
    }
}

module.exports = {
    BinaryTree
}