import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue3-guide/',
  title: 'Vue3 基础入门',
  description: 'vue3 guide',
  themeConfig: {
    sidebar: [
      {
        text: '入门准备',
        items: [
          { text: '开发环境', link: '/prepare/env' },
          { text: '常用开发文档', link: '/prepare/official-doc' }
        ]
      },
      {
        text: 'Vue3 基础',
        items: [
          { text: '项目创建', link: '/vue/create-project' },
          { text: 'API 风格', link: '/vue/api-styles' },
          { text: '模板语法', link: '/vue/template-syntax' },
          { text: '响应式基础', link: '/vue/reactivity' },
          { text: '计算属性', link: '/vue/computed' },
          { text: '条件渲染', link: '/vue/conditional' },
          { text: '列表渲染', link: '/vue/list' },
          { text: '事件处理', link: '/vue/event' },
          { text: '表单输入绑定', link: '/vue/forms' },
          { text: '侦听器', link: '/vue/watchers' }
        ]
      }
    ],
    outline: {
      label: '页面导航'
    }
  }
})
