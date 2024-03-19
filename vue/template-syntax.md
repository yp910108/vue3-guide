# 模板语法

## 文本插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

```vue-html
<span>Message: {{ msg }}</span>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      msg: 'this is msg.'
    }
  }
}
```

```js [组合式]
const msg = 'this is msg.'
```

:::

## 原始 HTML

双大括号会将数据解释为纯文本，而不是 HTML。若想插入 HTML，你需要使用 `v-html` 指令：

```vue-html
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      rawHtml: '<span style="color: red">This should be red.</span>'
    }
  }
}
```

```js [组合式]
const rawHtml = '<span style="color: red">This should be red.</span>'
```

:::

<div class="demo">
  <p>Using text interpolation: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</div>

<script setup>
import { ref } from 'vue'

const rawHtml = '<span style="color: red">This should be red.</span>'
</script>

## Attribute 绑定

想要绑定一个 attribute，应该使用 `v-bind` 指令：

```vue-html
<div v-bind:id="dynamicId"></div>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      dynamicId: 'wrapper'
    }
  }
}
```

```js [组合式]
const dynamicId = 'wrapper'
```

:::

### 简写

因为 v-bind 非常常用，Vue 提供了特定的简写语法：

```vue-html
<div :id="dynamicId"></div>
```

### 动态绑定多个值

通过不带参数的 v-bind，你可以将对象绑定到单个元素上：

```vue-html
<div v-bind="objectOfAttrs"></div>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      objectOfAttrs: {
        id: 'container',
        class: 'wrapper'
      }
    }
  }
}
```

```js [组合式]
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

:::

## 使用 JavaScript 表达式

至此，我们仅在模板中绑定了一些简单的属性名。但是 Vue 实际上在所有的数据绑定中都支持完整的 JavaScript 表达式：

```vue-html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

### 仅支持表达式

每个绑定仅支持**单一表达式**，也就是一段能够被求值的 JavaScript 代码。一个简单的判断方法是是否可以合法地写在 `return` 后面。

因此，下面的例子都是**无效**的：

```vue-html
<!-- 这是一个语句，而非表达式 -->
{{ var a = 1 }}

<!-- 条件控制也不支持，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

### 调用函数

可以在绑定的表达式中使用一个组件暴露的方法：

```vue-html
<div :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</div>
```

## Class 与 Style 绑定

Vue 专门为 `class` 和 `style` 的 `v-bind` 用法提供了特殊的功能增强。除了字符串外，表达式的值也可以是对象或数组。

### 绑定 HTML class

我们可以给 `:class` (`v-bind:class` 的缩写) 传递一个对象来动态切换 class：

```vue-html
<div :class="{ active: isActive }"></div>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      isActive: true
    }
  }
}
```

```js [组合式]
const isActive = true
```

:::

我们也可以给 `:class` 绑定一个数组来渲染多个 CSS class：

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      activeClass: 'active',
      errorClass: 'text-danger'
    }
  }
}
```

```js [组合式]
const activeClass = 'active'

const errorClass = 'text-danger'
```

:::

在有多个依赖条件的 class 时也可以在数组中嵌套对象：

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      isActive: true,
      errorClass: 'text-danger'
    }
  }
}
```

```js [组合式]
const isActive = true

const errorClass = 'text-danger'
```

:::

### 绑定内联样式

`:style` 支持绑定 JavaScript 对象值，对应的是 [HTML 元素的 style 属性](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)，支持 camelCase 和 kebab-cased 两种形式的 CSS 属性 key：

```vue-html
<div :style="{ fontSize, 'background-color': backgroundColor }"></div>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      fontSize: '30px',
      backgroundColor: 'red'
    }
  }
}
```

```js [组合式]
const fontSize = '30px'

const backgroundColor = 'red'
```

:::

我们还可以给 :style 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：

```vue-html
<div :style="[fontStyle, { color: activeColor }]"></div>
```

::: code-group

```js [选项式]
export default {
  data() {
    return {
      fontStyle: 'font-size: 50px',
      activeColor: 'red'
    }
  }
}
```

```js [组合式]
const fontStyle = 'font-size: 50px'

const activeColor = 'red'
```

:::
