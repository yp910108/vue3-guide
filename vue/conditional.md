# 条件渲染

## `v-if`

v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

::: code-group

```vue [选项式]
<template>
  <h1 v-if="awesome">Vue is awesome!</h1>
</template>

<script>
export default {
  data() {
    return {
      awesome: true
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <h1 v-if="awesome">Vue is awesome!</h1>
</template>

<script setup>
import { ref } from 'vue'

const awesome = ref(true)
</script>
```

:::

## `v-else`

你也可以使用 `v-else` 为 `v-if` 添加一个“else 区块”。

::: code-group

```vue [选项式]
<template>
  <button @click="awesome = !awesome">Toggle</button>

  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>

<script>
export default {
  data() {
    return {
      awesome: true
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <button @click="awesome = !awesome">Toggle</button>

  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>

<script setup>
import { ref } from 'vue'

const awesome = ref(true)
</script>
```

:::

<div class="demo">
  <button @click="awesome = !awesome">Toggle</button>

  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</div>

<script setup>
import { ref } from 'vue'

const awesome = ref(true)
</script>

一个 `v-else` 元素必须跟在一个 `v-if` 或者 `v-else-if` 元素后面，否则它将不会被识别。

## `v-else-if`

顾名思义，v-else-if 提供的是相应于 v-if 的“else if 区块”。它可以连续多次重复使用：

::: code-group

```vue [选项式]
<template>
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else-if="type === 'C'">C</div>
  <div v-else>Not A/B/C</div>
</template>

<script>
export default {
  data() {
    return {
      type: 'B'
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else-if="type === 'C'">C</div>
  <div v-else>Not A/B/C</div>
</template>

<script setup>
import { ref } from 'vue'

const type = ref('B')
</script>
```

:::

和 v-else 类似，一个使用 v-else-if 的元素必须紧跟在一个 v-if 或一个 v-else-if 元素后面。

## `<template>` 上的 `v-if`

因为 `v-if` 是一个指令，他必须依附于某个元素。但如果我们想要切换不止一个元素呢？在这种情况下我们可以在一个 `<template>` 元素上使用 `v-if`，这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 `<template>` 元素。

::: code-group

```vue [选项式]
<template>
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
</template>

<script>
export default {
  data() {
    return {
      ok: true
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
</template>

<script setup>
import { ref } from 'vue'

const ok = ref(true)
</script>
```

:::

`v-else` 和 `v-else-if` 也可以在 `<template>` 上使用。

## `v-show`

另一个可以用来按条件显示一个元素的指令是 v-show。其用法基本一样：

::: code-group

```vue [选项式]
<template>
  <h1 v-show="ok">Hello!</h1>
</template>

<script>
export default {
  data() {
    return {
      ok: true
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <h1 v-show="ok">Hello!</h1>
</template>

<script setup>
import { ref } from 'vue'

const ok = ref(true)
</script>
```

:::

不同之处在于 `v-show` 会在 DOM 渲染中保留该元素；`v-show` 仅切换了该元素上名为 `display` 的 CSS 属性。

`v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用。

## `v-if` vs. `v-show`

`v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

`v-if` 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

相比之下，`v-show` 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS `display` 属性会被切换。

总的来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 `v-show` 较好；如果在运行时绑定条件很少改变，则 `v-if` 会更合适。
