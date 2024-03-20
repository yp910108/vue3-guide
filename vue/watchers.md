# 侦听器

## 基本示例

计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

```vue-html
<input v-model="text" placeholder="Please input" />
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      text: ''
    }
  },
  watch: {
    text(newText) {
      console.log(newText)
    }
  }
}
```

```js [组合式]
import { ref, watch } from 'vue'

const text = ref('')

watch(text, (newText) => {
  console.log(newText)
})
```

:::

### 嵌套属性 <Badge type="tip" text="选项式" />

`watch` 选项也支持把键设置成用 `.` 分隔的路径：

```vue
<template>
  <input v-model="form.text" placeholder="Please input" />
</template>

<script>
export default {
  data() {
    return {
      form: {
        text: ''
      }
    }
  },
  watch: {
    'form.text'(newText) {
      console.log(newText)
    }
  }
}
</script>
```

### 侦听数据源类型 <Badge type="tip" text="组合式" />

`watch` 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：

```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

注意，你不能直接侦听响应式对象的属性值，例如:

```js
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
```

这里需要用一个返回该属性的 getter 函数：

```js
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

## 深层侦听器

**选项式 API** `watch` 默认是浅层的：被侦听的属性，仅在被赋新值时，才会触发回调函数——而嵌套属性的变化不会触发。如果想侦听所有嵌套的变更，你需要深层侦听器：

```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // 注意：在嵌套的变更中，
        // 只要没有替换对象本身，
        // 那么这里的 `newValue` 和 `oldValue` 相同
      },
      deep: true
    }
  }
}
```

直接给**组合式 API** `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器，但是当侦听一个返回响应式对象的 getter 函数时，只有在返回不同的对象时，才会触发回调，可以给显式地加上 `deep` 选项，强制转成深层侦听器：

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```

::: warning 谨慎使用
深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
:::

## 即时回调的侦听器

`watch` 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。

我们可以通过传入 `immediate: true` 选项来强制侦听器的回调立即执行：

```vue-html
<input v-model="text" placeholder="Please input" />
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      text: 'initial text'
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(newText) {
        console.log(newText)
      }
    }
  }
}
```

```js [组合式]
import { ref, watch } from 'vue'

const text = ref('initial text')

watch(
  text,
  (newText) => {
    console.log(newText)
  },
  { immediate: true }
)
```

:::

## 一次性侦听器

每当被侦听源发生变化时，侦听器的回调就会执行。如果希望回调只在源变化时触发一次，请使用 `once: true` 选项。

::: code-group

```js [选项式]
export default {
  watch: {
    source: {
      handler(newValue, oldValue) {
        // 当 `source` 变化时，仅触发一次
      },
      once: true
    }
  }
}
```

```js [组合式]
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```

:::

## watchEffect() <Badge type="tip" text="组合式" />

侦听器的回调使用与源完全相同的响应式状态是很常见的。例如下面的代码，在每当 `todoId` 的引用发生变化时使用侦听器来加载一个远程资源：

```js
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

特别是注意侦听器是如何两次使用 `todoId` 的，一次是作为源，另一次是在回调中。

我们可以用 `watchEffect` 来简化上面的代码。`watchEffect()` 允许我们自动跟踪回调的响应式依赖。上面的侦听器可以重写为：

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

这个例子中，回调会立即执行，不需要指定 `immediate: true`。在执行期间，它会自动追踪 `todoId.value` 作为依赖（和计算属性类似）。每当 `todoId.value` 变化时，回调会再次执行。有了 `watchEffect()`，我们不再需要明确传递 `todoId` 作为源值。
