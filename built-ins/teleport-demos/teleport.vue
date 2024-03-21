<template>
  <div class="demo">
    <button @click="open = true">Open Modal</button>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom: 20px">Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 20%;
  margin-left: -150px;
  width: 300px;
  padding: 30px;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>
