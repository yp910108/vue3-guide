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
