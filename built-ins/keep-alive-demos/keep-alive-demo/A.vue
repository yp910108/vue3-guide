<template>
  count: {{ count }}
  <button style="margin-left: 10px" @click="count++">+</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
