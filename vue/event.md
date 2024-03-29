<script setup>
import MethodHandlers from './event-demos/MethodHandlers.vue'
import InlineHandlers from './event-demos/InlineHandlers.vue'
import CallingMethods from './event-demos/CallingMethods.vue'
import AccessingArgument from './event-demos/AccessingArgument.vue'
</script>

# 事件处理

## 监听事件

我们可以使用 `v-on` 指令 (简写为 `@`) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：`v-on:click="handler"` 或 `@click="handler"`。

事件处理器 (handler) 的值可以是：

1. **内联事件处理器**：事件被触发时执行的内联 JavaScript 语句 (与 `onclick` 类似)。

2. **方法事件处理器**：一个指向组件上定义的方法的属性名或是路径。

## 内联事件处理器

内联事件处理器通常用于简单场景，例如：

::: code-group

```vue [选项式]
<template>
  <button @click="count++">Add 1</button>
  <p>Count is: {{ count }}</p>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <button @click="count++">Add 1</button>
  <p>Count is: {{ count }}</p>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

:::

<inline-handlers />

## 方法事件处理器

随着事件处理器的逻辑变得愈发复杂，内联代码方式变得不够灵活。因此 `v-on` 也可以接受一个方法名或对某个方法的调用。

举例来说：

::: code-group

```vue [选项式]
<template>
  <button @click="greet">Greet</button>
</template>

<script>
export default {
  methods: {
    greet(event) {
      alert(`Hello ${name.value}!`)
      // `event` 是 DOM 原生事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <button @click="greet">Greet</button>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('Vue.js')

const greet = (event) => {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}
</script>
```

:::

<method-handlers />

方法事件处理器会自动接收原生 DOM 事件并触发执行。在上面的例子中，我们能够通过被触发事件的 `event.target.tagName` 访问到该 DOM 元素。

## 在内联处理器中调用方法

除了直接绑定方法名，还可以在内联事件处理器中调用方法。这允许我们向方法传入自定义参数以代替原生事件：

::: code-group

```vue [选项式]
<template>
  <button @click="say('hello')">Say hello</button>
  <button @click="say('bye')">Say bye</button>
</template>

<script>
export default {
  methods: {
    say(message) {
      alert(message)
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <button @click="say('hello')">Say hello</button>
  <button @click="say('bye')">Say bye</button>
</template>

<script setup>
const say = (message) => {
  alert(message)
}
</script>
```

:::

<CallingMethods />

## 在内联事件处理器中访问事件参数

有时我们需要在内联事件处理器中访问原生 DOM 事件。可以向该处理器方法传入一个特殊的 `$event` 变量，或者使用内联箭头函数：

::: code-group

<!-- prettier-ignore -->
```vue [选项式]
<template>
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>

  <!-- 使用内联箭头函数 -->
  <button @click="(event) => warn('Form cannot be submitted yet.', event)">
    Submit
  </button>
</template>

<script>
export default {
  methods: {
    warn(message, event) {
      // 这里可以访问原生事件
      if (event) {
        event.preventDefault()
      }
      alert(message)
    }
  }
}
</script>
```

<!-- prettier-ignore -->
```vue [组合式]
<template>
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>

  <!-- 使用内联箭头函数 -->
  <button @click="(event) => warn('Form cannot be submitted yet.', event)">
    Submit
  </button>
</template>

<script setup>
const warn = (message, event) => {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
</script>
```

:::

<AccessingArgument />
