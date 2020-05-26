const {BitMap} = require('./BitMap')

// 两个集合取交集 [1,4,6,8,9,10,15] [6,14,9,2,0,7]
const arr1 = [1,4,6,8,9,10,15]
const arr2 = [6,14,9,2,0,7,4]

function getInsection(arr1, arr2) {
    const bitMap  = new BitMap(4)
    const insectionArr = []

    for(let i of arr1) {
        bitMap.add(i)
    }

    for(let i of arr2) {
        if(bitMap.isExist(i)) {
            insectionArr.push(i)
        }
    }

    return insectionArr
}

console.log(getInsection(arr1, arr2))