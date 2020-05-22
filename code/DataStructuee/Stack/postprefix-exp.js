const {Stack} = require('./Stack')

function postPrefixExp(input) {
    const priority_map = {
        '+': 1,
        '-': 1,
        '*': 1,
        '/': 1,
    }
    const stack = new Stack()
    const post_prefix = []

    for(let c of input) {
        if(!isNaN(c)) {
            post_prefix.push(c)
        }else if(c === '(') {
            stack.push(c)
        }else if(c === ')') {
            while(stack.top() !== '(') {
                post_prefix.push(stack.pop())
            }
            // 弹出左括号
            stack.pop()
        }else {
            while(
                !stack.isEmpty() 
                && ['+', '-', '*', '/'].includes(c) 
                && priority_map[stack.top()] >= priority_map[c]
            ) {
                post_prefix.push(stack.pop())
            }
            stack.push(c)
        }
    }

    while(!stack.isEmpty()) {
        post_prefix.push(stack.pop())
    }

    console.log(post_prefix)
    return post_prefix
}

postPrefixExp(['12', '+', '3'])

// 4 * (1 + 4) 
postPrefixExp(['4', '*', '(', '1', '+', '4', ')'])