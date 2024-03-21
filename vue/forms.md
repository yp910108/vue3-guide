<script setup>
import { ref } from 'vue'

const text = ref('')

const message = ref('')

const multilineMessage = ref('')

const checked = ref(false)

const checkedNames = ref([])

const picked = ref('One')

const selected = ref('')

const multipleSelected = ref([])
</script>

# 表单输入绑定

在前端处理表单时，我们常常需要将表单输入框的内容同步给 JavaScript 中相应的变量。手动连接值绑定和更改事件监听器可能会很麻烦：

::: code-group

```vue [选项式]
<template>
  <p>Text is: {{ text }}</p>
  <input
    :value="text"
    placeholder="edit me"
    @input="(event) => (text = event.target.value)"
  />
</template>

<script setup>
export default {
  data() {
    return {
      text: ''
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <p>Text is: {{ text }}</p>
  <input
    :value="text"
    placeholder="edit me"
    @input="(event) => (text = event.target.value)"
  />
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
```

:::

<div class="demo">
  <p>Text is: {{ text }}</p>
  <input :value="text" placeholder="edit me" @input="(event) => (text = event.target.value)" />
</div>

`v-model` 指令帮我们简化了这一步骤：

::: code-group

```vue [选项式]
<template>
  <p>Text is: {{ text }}</p>
  <input v-model="text" placeholder="edit me" />
</template>

<script setup>
export default {
  data() {
    return {
      text: ''
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <p>Text is: {{ text }}</p>
  <input v-model="text" placeholder="edit me" />
</template>

<script setup>
import { ref } from 'vue'

const text = ref('')
</script>
```

:::

<div class="demo">
  <p>Text is: {{ text }}</p>
  <input v-model="text" placeholder="edit me" />
</div>

另外，`v-model` 还可以用于各种不同类型的输入，`<textarea>`、`<select>` 元素。它会根据所使用的元素自动使用对应的 DOM 属性和事件组合：

- 文本类型的 `<input>` 和 `<textarea>` 元素会绑定 `value` property 并侦听 `input` 事件；
- `<input type="checkbox">` 和 `<input type="radio">` 会绑定 `checked` property 并侦听 `change` 事件；
- `<select>` 会绑定 `value` property 并侦听 `change` 事件。

## 文本

::: code-group

```vue [选项式]
<template>
  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
</template>

<script setup>
export default {
  data() {
    return {
      message: ''
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
</script>
```

:::

<div class="demo">
  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
</div>

## 多行文本

::: code-group

```vue [选项式]
<template>
  <span>Multiline message is:</span>
  <p style="white-space: pre-line;">{{ message }}</p>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
</template>

<script setup>
export default {
  data() {
    return {
      message: ''
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <span>Multiline message is:</span>
  <p style="white-space: pre-line;">{{ message }}</p>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
</script>
```

:::

<div class="demo">
  <span>Multiline message is:</span>
  <p style="white-space: pre-line;">{{ message }}</p>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
</div>

## 复选框

单一的复选框，绑定布尔类型值：

::: code-group

```vue [选项式]
<template>
  <input v-model="checked" type="checkbox" />
  <label for="checkbox">{{ checked }}</label>
</template>

<script setup>
export default {
  data() {
    return {
      checked: false
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <input v-model="checked" type="checkbox" />
  <label for="checkbox">{{ checked }}</label>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

:::

<div class="demo">
  <input v-model="checked" type="checkbox" />
  <label for="checkbox">{{ checked }}</label>
</div>

我们也可以将多个复选框绑定到同一个数组或[集合](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)的值：

::: code-group

```vue [选项式]
<template>
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
</template>

<script setup>
export default {
  data() {
    return {
      checkedNames: []
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
</template>

<script setup>
import { ref } from 'vue'

const checkedNames = ref([])
</script>
```

:::

在这个例子中，`checkedNames` 数组将始终包含所有当前被选中的框的值。

<div class="demo">
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
</div>

## 单选按钮

::: code-group

```vue [选项式]
<template>
  <div>Picked: {{ picked }}</div>

  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</template>

<script setup>
export default {
  data() {
    return {
      picked: ''
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <div>Picked: {{ picked }}</div>

  <input v-model="picked" id="one" type="radio" value="One" />
  <label for="one">One</label>

  <input v-model="picked" id="two" type="radio" value="Two" />
  <label for="two">Two</label>
</template>

<script setup>
import { ref } from 'vue'

const picked = ref('One')
</script>
```

:::

<div class="demo">
  <div>Picked: {{ picked }}</div>

  <input v-model="picked" id="one" type="radio" value="One" />
  <label for="one">One</label>

  <input v-model="picked" id="two" type="radio" value="Two" />
  <label for="two">Two</label>
</div>

## 选择器

单个选择器的示例如下：

::: code-group

```vue [选项式]
<template>
  <div>Selected: {{ selected }}</div>

  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>

<script setup>
export default {
  data() {
    return {
      selected: ''
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <div>Selected: {{ selected }}</div>

  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
</script>
```

:::

<div class="demo">
  <div>Selected: {{ selected }}</div>

  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>

多选 (值绑定到一个数组)：

::: code-group

```vue [选项式]
<template>
  <div>Selected: {{ selected }}</div>

  <select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>

<script setup>
export default {
  data() {
    return {
      selected: []
    }
  }
}
</script>
```

```vue [组合式]
<template>
  <div>Selected: {{ selected }}</div>

  <select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref([])
</script>
```

:::

<div class="demo">
  <div>Selected: {{ multipleSelected }}</div>

  <select v-model="multipleSelected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>
