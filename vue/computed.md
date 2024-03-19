# 计算属性

## 基础示例

使用计算属性来描述依赖响应式状态的复杂逻辑：
::: code-group

```js [选项式]
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
```

```js [组合式]
import { ref, computed } from 'vue'

const firstName = ref('John')

const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
```

:::

## 可写计算属性

计算属性默认是只读的。当尝试修改一个计算属性时，你收到一个运行时警告。只在某些特殊场景中可能才需要用到“可写”的属性，可以通过同时提供 getter 和 setter 来创建：

```vue-html
{{ fullName }}
<button @click="handleClick">click</button>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      get() {
        return `${this.firstName} ${this.lastName}`
      },
      set(newVal) {
        ;[this.firstName, this.lastName] = newVal.split(' ')
      }
    }
  },
  methods: {
    handleClick() {
      this.fullName = 'Zhang San'
    }
  }
}
```

```js [组合式]
import { ref, computed } from 'vue'

const firstName = ref('John')

const lastName = ref('Doe')

const fullName = computed({
  get: () => {
    return `${firstName.value} ${lastName.value}`
  },
  set: (newVal) => {
    ;[firstName.value, lastName.value] = newVal.split(' ')
  }
})

const handleClick = () => {
  fullName.value = 'Zhang San'
}
```

:::

<div class="demo">
  {{ fullName }}
  <button @click="handleClick">click</button>
</div>

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')

const lastName = ref('Doe')

const fullName = computed({
  get: () => {
    return `${firstName.value} ${lastName.value}`
  },
  set: (newVal) => {
    ;[firstName.value, lastName.value] = newVal.split(' ')
  }
})

const handleClick = () => {
  fullName.value = 'Zhang San'
}
</script>
