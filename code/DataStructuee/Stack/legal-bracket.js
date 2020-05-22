// 匹配括号
function matchBracket(input) {
    const stack = new Stack()

    for(let i of input) {
        if(i === '(') {
            stack.push()
        }else if(i === ')') {
            if(stack.isEmpty()) {
                console.log('括号不成对')
                return false
            }
            stack.pop()
        }
    }

    return stack.isEmpty()
}