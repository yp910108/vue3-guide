<template>
  <div class="demo">
    <label>
      <input v-model="active" type="radio" value="A" />
      A
    </label>
    <label>
      <input v-model="active" type="radio" value="B" />
      B
    </label>
    <p>Current component: {{ active }}</p>
    <KeepAlive>
      <CompA v-if="active === 'A'" />
      <CompB v-else />
    </KeepAlive>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CompA from './A.vue'
import CompB from './B.vue'

const active = ref('A')
</script>
