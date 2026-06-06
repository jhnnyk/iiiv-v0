<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  try {
    await auth.logout()
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <nav class="title-bar">
    <h1>Indie Index</h1>
    <div v-if="auth.user" class="user-info">
      {{ auth.user.email }}
      <button @click="handleLogout">Log Out</button>
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
