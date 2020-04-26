## setup
作为所有 componsition api 的入口函数，在 beforeCreate hook 之前调用。

template 模式下，返回的属性不需要 unwrap
```js
<template>
  <div>{{ count }}</div>
</template>

<script>
  import { ref} from 'vue'

  export default {
    setup() {
      const count = ref(0)

      // expose to template
      return {
        count,  // 直接返回 count， 不需要手动写出 count.value
      }
    }
  }
</script>
```

在 function/JSX 下需要手动返回
```js
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const object = reactive({ foo: 'bar' })

    return () => h('div', [count.value, object.foo])
  }
}
```

参数列表为： props，context
- 在使用 props 是，不能解构，不然 props 会失去响应式能力
- context 相当于 vue2.x 时期的 this，它可以进行解构


## Reactivity Api

### reactive
将 object 转换成响应式对象，类似于 2.x 的 Vue.observable

### ref
- 将普通 JavaScript 类型转换成 ref 对象, 如果传进来的是 object 类型，则会调用 reactive 来转换
- 在 template 中访问，无需加上 .value, 模板编译会自动 unwrap
- 作为 reactive object 的属性事，访问/修改该属性，会自动地 unwrap
- 在数组、原生的集合中则不会自动 unwrap，需要通过 .value 来访问

### computed
- 传入 getter 函数，将 getter 的返回值转换为 reactive 对象返回
- 传入 { getter, setter }, 返回对应的 reactive 对象

### readonly
- 传入 plain/reactive/ref object, 返回只读的 reactive 对象

### watchEffect
