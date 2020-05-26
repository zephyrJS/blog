const {BitMap} = require('./BitMap')

const bitMap  = new BitMap(4)

bitMap.add(10)
console.log(bitMap.isExist(10))