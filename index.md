---
sidebar: false
---

<script setup lang="ts">
  import { useRouter, withBase } from 'vitepress'

  const router = useRouter()

  router.go(withBase('/prepare/env'))
</script>
