<template>
  <div class="tabs-demo">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" class="tab" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import Posts from './Posts.vue'
import Archive from './Archive.vue'

const currentTab = ref('Home')

const tabs = {
  Home,
  Posts,
  Archive
}
</script>

<style lang="scss">
.tabs-demo {
  margin-bottom: 1.2em;
  padding: 22px 24px;
  border-radius: 8px;
  box-shadow: var(--vp-shadow-2);
  transition: background-color 0.5s ease;
  .tab-button {
    margin-bottom: -1px;
    margin-right: -1px;
    border: 1px solid #ccc;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 6px 10px;
    background: #f0f0f0;
    cursor: pointer;
    &:hover {
      background: #e0e0e0;
    }
    &.active {
      background: #e0e0e0;
    }
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
}
</style>
