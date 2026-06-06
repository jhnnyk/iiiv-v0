<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <nav class="title-bar">
    <h1>Indie Index</h1>
    <div v-if="auth.user" class="user-info">
      {{ auth.user.email }}
    </div>
  </nav>
</template>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
