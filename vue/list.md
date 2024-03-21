# 列表渲染

## `v-for`

可以使用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令的值需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据的数组，而 `item` 是迭代项的**别名**：

::: tip 提示
为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 `key` attribute。
:::

::: code-group

```vue [选项式]
<template>
  <li v-for="(item, index) in items" :key="index">
    {{ index }} - {{ item.message }}
  </li>
</template>

<script>
export default {
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <li v-for="(item, index) in items" :key="index">
    {{ index }} - {{ item.message }}
  </li>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
</script>
```

:::

<div class="demo">
  <li v-for="(item, index) in items">{{ index }} - {{ item.message }}</li>
</div>

<script setup>
import { ref } from 'vue'

const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
</script>

也可以使用 `of` 作为分隔符来替代 `in`，这更接近 JavaScript 的迭代器语法：

```vue-html
<div v-for="(item, index) of items" :key="index"></div>
```

## `v-for` 与对象

可以使用 `v-for` 来遍历一个对象的所有属性。遍历的顺序会基于对该对象调用 `Object.keys()` 的返回值来决定：

::: code-group

```vue [选项式]
<template>
  <ul>
    <li v-for="(value, key, index) in myObject" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <ul>
    <li v-for="(value, key, index) in myObject" :key="key">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const myObject = ref({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
</script>
```

:::

## 在 `v-for` 里使用范围值

`v-for` 可以直接接受一个整数值。在这种用例中，会将该模板基于 `1...n` 的取值范围重复多次。

```vue-html
<span v-for="n in 10" :key="n">{{ n }}</span>
```

注意此处 `n` 的初值是从 `1` 开始而非 `0`。

## `<template>` 上的 `v-for`

与模板上的 `v-if` 类似，你也可以在 `<template>` 标签上使用 `v-for` 来渲染一个包含多个元素的块。例如：

```vue-html
<ul>
  <template v-for="(item, index) in items" :key="index">
    <li>{{ item.message }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## `v-for` 与 `v-if`

::: warning 注意
同时使用 `v-if` 和 `v-for` 是**不推荐的**，因为这样二者的优先级不明显。请转阅[风格指南](https://cn.vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for)查看更多细节。
:::

当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名：

```vue-html
<!--
 这会抛出一个错误，因为属性 todo 此时没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

在外新包装一层 `<template>` 再在其上使用 `v-for` 可以解决这个问题 (这也更加明显易读)：

```vue-html
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```
