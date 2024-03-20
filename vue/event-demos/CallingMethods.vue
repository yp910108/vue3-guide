<template>
  <div class="demo">
    <button @click="say('hello')">Say hello</button>
    <button @click="say('bye')">Say bye</button>
  </div>
</template>

<script setup>
const say = (message) => {
  alert(message)
}
</script>
