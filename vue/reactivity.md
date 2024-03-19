# 响应式基础

## 声明响应式状态

::: code-group

<!-- prettier-ignore -->
```js [选项式]
export default {
  data() {
    return {
      count: 1
    }
  },
  // data 的值应为返回一个对象的函数
  data: { // [!code error]
    count: 1 // [!code error]
  }, // [!code error]
  mounted() {
    // 用 this 进行访问
    console.log(this.count)
  }
}
```

```js [组合式]
import { ref, onMounted } from 'vue'

const count = ref(1)

onMounted(() => {
  // 在 JavaScript 中访问需要使用 .value
  console.log(count.value)
})
```

:::

## 声明方法

::: code-group

<!-- prettier-ignore -->
```js [选项式]
export default {
  methods: {
    increment() {
      // ...
    },
    // 定义方法不能使用箭头函数，因为箭头函数没有自己的 this 上下文
    increment: () => { // [!code error]
      // ... // [!code error]
    } // [!code error]
  }
}
```

```js [组合式]
const increment = () => {
  // ...
}
```

:::

## DOM 更新时机

当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，DOM 更新不是同步的。Vue 会在“next tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。

要等待 DOM 更新完成后再执行额外的代码，可以使用 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 全局 API：

```vue-html
<button ref="button" @click="increment">{{ count }}</button>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      count: 1
    }
  },
  methods: {
    increment() {
      this.count++
      // DOM 还没更新，打印的是旧值
      console.log(this.$refs.button.innerText)
      this.$nextTick(() => {
        // 现在 DOM 已经更新了，打印的是新值
        console.log(this.$refs.button.innerText)
      })
    }
  }
}
```

```js [组合式]
import { ref, nextTick } from 'vue'

const button = ref()

const count = ref(1)

const increment = () => {
  count.value++
  // DOM 还没更新，打印的是旧值
  console.log(button.value.innerText)
  nextTick(() => {
    // 现在 DOM 已经更新了，打印的是新值
    console.log(button.value.innerText)
  })
}
```

:::

<div class="demo">
  <button ref="button" @click="increment">{{ count }}</button>
</div>

<script setup>
import { ref, nextTick } from 'vue'

const button = ref()

const count = ref(1)

const increment = () => {
  count.value++
  // DOM 还没更新，打印的是旧值
  console.log(button.value.innerText)
  nextTick(() => {
    // 现在 DOM 已经更新了，打印的是新值
    console.log(button.value.innerText)
  })
}
</script>
