// 原始 =》 响应
const toProxy = new WeakMap()
// 响应 =》 原始
const toRaw = new WeakMap()
const effectStack = [] // 存储 effect 的地方
const targetMap = new WeakMap() // {target: Map{ key: Set[] }}

// 收集依赖
function track(target, key) {
    // 最新的 effect
    const effect = effectStack[effectStack.length - 1]
    if (effect) {
        let depMap = targetMap.get(target)
        if (depMap === undefined) {
            depMap = new Map()
            targetMap.set(target, depMap)
        }
        let dep = depMap.get(key)
        if (dep === undefined) {
            dep = new Set()
            depMap.set(key, dep)
        }

        // 双向存储，优化的
        if (!dep.has(effect)) {
            dep.add(effect)
            effect.deps.push(dep)
        }
    }
}

// 触发更新
// 寻找依赖 effect
function trigger(target, key, info) {
    const depMap = targetMap.get(target)
    if(!depMap) {
        // 没有依赖
        return
    }

    const effects = new Set()
    const computedRunners = new Set()

    if(key) {
        const deps = depMap.get(key)

        deps.forEach(effect => {
            if(effect.computed) {
                computedRunners.add(effect)
            }else {
                effects.add(effect)
            }
        })        
    }

    effects.forEach(effect => effect())
    computedRunners.forEach(computed => computed())
}

// 代替生命周期
function effect(fn, options = {}) {
    let e = createReactiveEffect(fn, options)

    if(!options.lazy) {
        e()
    }

    return e
}
function createReactiveEffect(fn, options = {}) {
    let effect = function (...args) {
        return run(effect, fn, args)
    }
    effect.deps = []
    effect.computed = options.computed
    effect.lazy = options.lazy
    return effect
}
function run(effect, fn, args) {
    if (effectStack.indexOf(effect) === -1) {
        try {
            effectStack.push(effect)
            return fn(...args)
        } finally {
            effectStack.pop()
        }
    }
}

function computed(fn) {
    const runner = effect(fn, { computed: true, lazy: true })
    return {
        effect: runner,
        get value() {
            return runner()
        }
    }
}

// 响应式代理
const baseHandler = {
    get(target, key) {
        // 收集依赖
        // 收集依赖的目的是，set 的时候有地方可以修改
        const res = Reflect.get(target, key)
        track(target, key)     
        return typeof res === 'object' ? reactive(res) : res
    },
    set(target, key, value) {
        // 触发依赖
        const res = Reflect.set(target, key, value)
        const info = { oldValue: target[key], newValue: value }
        // 触发更新
        trigger(target, key, info)
        return res
    },
}

// 响应式
function reactive(target) {
    // 查询缓存
    let observed = toProxy.get(target)
    if (observed) {
        return observed
    }
    if (toRaw.get(target)) {
        return target
    }

    observed = new Proxy(target, baseHandler)

    // 设置缓存
    toProxy.set(target, observed)
    toRaw.set(observed, target)
    return observed
}
