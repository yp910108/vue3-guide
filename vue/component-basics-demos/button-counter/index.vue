<template>
  <div class="demo">
    <h1 style="margin-bottom: 5px">Here is a child component!</h1>
    <ButtonCounter />
    <ButtonCounter />
    <ButtonCounter />
  </div>
</template>

<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>
