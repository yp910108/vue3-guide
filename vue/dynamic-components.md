<script setup>
  import TabsDemo from './dynamic-components-demos/tabs-demo/index.vue'
</script>

# 动态组件

有些场景会需要在两个组件间来回切换，比如 Tab 界面：

::: details 点击查看示例代码 <Badge type="tip" text="选项式" />

::: code-group

```vue [App.vue]
<template>
  <button v-for="tab in tabs" :key="tab" @click="currentTab = tab">
    {{ tab }}
  </button>
  <component :is="currentTab" />
</template>

<script>
import Home from './components/Home.vue'
import Posts from './components/Posts.vue'
import Archive from './components/Archive.vue'

export default {
  components: {
    Home,
    Posts,
    Archive
  },
  data() {
    return {
      currentTab: 'Home',
      tabs: ['Home', 'Posts', 'Archive']
    }
  }
}
</script>
```

```vue [Home.vue]
<template>
  <div class="tab">Home component</div>
</template>
```

```vue [Posts.vue]
<template>
  <div class="tab">Posts component</div>
</template>
```

```vue [Archive.vue]
<template>
  <div class="tab">Archive component</div>
</template>
```

:::

::: details 点击查看示例代码 <Badge type="tip" text="组合式" />

::: code-group

```vue [App.vue]
<template>
  <button v-for="(_, tab) in tabs" :key="tab" @click="currentTab = tab">
    {{ tab }}
  </button>
  <component :is="tabs[currentTab]" />
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import Posts from './Posts.vue'
import Archive from './Archive.vue'

const currentTab = ref('Home')

const tabs = {
  Home,
  Posts,
  Archive
}
</script>
```

```vue [Home.vue]
<template>
  <div class="tab">Home component</div>
</template>
```

```vue [Posts.vue]
<template>
  <div class="tab">Posts component</div>
</template>
```

```vue [Archive.vue]
<template>
  <div class="tab">Archive component</div>
</template>
```

:::

<TabsDemo />

在上面的例子中，被传给 `:is` 的值可以是以下几种：

- 被注册的组件名
- 导入的组件对象

你也可以使用 `is` attribute 来创建一般的 HTML 元素。

当使用 `<component :is="...">` 来在多个组件间作切换时，被切换掉的组件会被卸载。
