class BitMap {
    constructor(size) {
        this.arr = Array.from(new Array(size), () => 0)
    }
    add(member) {
        const arr_index = Math.floor(member / 32)
        const bit_index = member % 32

        this.arr[arr_index] |= 1 << bit_index
    }
    isExist(member) {
        const arr_index = Math.floor(member / 32)
        const bit_index = member % 32
        const value = this.arr[arr_index] & 1 << bit_index

        return value !== 0 ? true : false
    }
}

module.exports = {
    BitMap
}