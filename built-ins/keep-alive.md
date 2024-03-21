<script setup>
  import NormalDemo  from './keep-alive-demos/normal-demo/index.vue'
  import KeepAliveDemo  from './keep-alive-demos/keep-alive-demo/index.vue'
</script>

# KeepAlive

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。

## 基本使用

默认情况下，一个组件实例在被替换掉后会被销毁。这会导致它丢失其中所有已变化的状态——当这个组件再一次被显示时，会创建一个只带有初始状态的新实例。

在下面的例子中，你会看到两个有状态的组件——A 有一个计数器，而 B 有一个通过 `v-model` 同步 input 框输入内容的文字展示。尝试先更改一下任意一个组件的状态，然后切走，再切回来：

<NormalDemo />

::: details 点击查看示例代码

::: code-group

```vue [App.vue]
<template>
  <label>
    <input v-model="active" type="radio" value="A" />
    A
  </label>
  <label>
    <input v-model="active" type="radio" value="B" />
    B
  </label>
  <p>Current component: {{ active }}</p>
  <CompA v-if="active === 'A'" />
  <CompB v-else />
</template>

<script setup>
import { ref } from 'vue'
import CompA from './A.vue'
import CompB from './B.vue'

const active = ref('A')
</script>
```

```vue [A.vue]
<template>
  count: {{ count }}
  <button @click="count++">+</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

```vue [B.vue]
<template>
  Message is:
  <input v-model="message" placeholder="edit me" />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
</script>
```

:::

你会发现在切回来之后，之前已更改的状态都被重置了。

如果我们想要组件能在被“切走”的时候保留它们的状态。要解决这个问题，我们可以用 `<KeepAlive>` 内置组件将这些组件包装起来：

```vue-html
<!-- 非活跃的组件将会被缓存！ -->
<KeepAlive>
  <CompA v-if="active === 'A'" />
  <CompB v-else />
</KeepAlive>
```

<KeepAliveDemo />

::: details 点击查看示例代码

::: code-group

```vue [App.vue]
<template>
  <label>
    <input v-model="active" type="radio" value="A" />
    A
  </label>
  <label>
    <input v-model="active" type="radio" value="B" />
    B
  </label>
  <p>Current component: {{ active }}</p>
  <KeepAlive>
    <CompA v-if="active === 'A'" />
    <CompB v-else />
  </KeepAlive>
</template>

<script setup>
import { ref } from 'vue'
import CompA from './A.vue'
import CompB from './B.vue'

const active = ref('A')
</script>
```

```vue [A.vue]
<template>
  count: {{ count }}
  <button @click="count++">+</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
```

```vue [B.vue]
<template>
  Message is:
  <input v-model="message" placeholder="edit me" />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
</script>
```

:::

## 包含/排除

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制该行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

```vue-html
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

它会根据组件的 `name` 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。

::: tip 提示
在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。
:::

## 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

一个持续存在的组件可以通过 `activated` 和 `deactivated` 选项来注册相应的两个状态的生命周期钩子：

::: code-group

```js [选项式]
export default {
  activated() {
    // 在首次挂载、
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  }
}
```

```js [组合式]
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
```

:::

请注意：

- `activated` 在组件挂载时也会调用，并且 `deactivated` 在组件卸载时也会调用。

- 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。
