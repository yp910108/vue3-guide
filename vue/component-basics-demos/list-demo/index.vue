<template>
  <div class="demo">
    <CustomList>
      <CustomListItem
        v-for="item of list"
        :key="item.id"
        :item="item"
        @item-click="handleItemClick"
      >
        <template #footer>
          官网：<span style="color: #1677ff">{{ item.href }}</span>
        </template>
      </CustomListItem>
    </CustomList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomList from './CustomList.vue'
import CustomListItem from './CustomListItem.vue'

const list = ref([
  {
    id: 1,
    title: 'Vue',
    content:
      'Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。',
    href: 'https://cn.vuejs.org'
  },
  {
    id: 3,
    title: 'Ant Design of Vue',
    content: '这里是 Ant Design 的 Vue 实现，开发和服务于企业级后台产品。',
    href: 'https://www.antdv.com/docs/vue/introduce-cn'
  },
  {
    id: 2,
    title: 'Vue Router',
    content:
      'Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。',
    href: 'https://router.vuejs.org/zh/'
  },
  {
    id: 2,
    title: 'Vuex',
    content:
      'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式 + 库。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。',
    href: 'https://vuex.vuejs.org/zh/'
  }
])

const handleItemClick = (item) => {
  window.open(item.href)
}
</script>
