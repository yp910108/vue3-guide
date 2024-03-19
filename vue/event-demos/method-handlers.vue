<template>
  <div class="demo">
    <button @click="greet">Greet</button>
  </div>
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
