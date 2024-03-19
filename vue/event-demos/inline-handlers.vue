<template>
  <div class="demo">
    <button @click="count++">Add 1</button>
    <p>Count is: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
