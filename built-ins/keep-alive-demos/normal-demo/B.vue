<template>
  Message is:
  <input v-model="message" placeholder="edit me" style="margin-left: 10px" />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
</script>
