<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const email = ref('')
const password = ref('')

async function handleLogin() {
  console.log(email.value, password.value)

  try {
    await auth.login(email.value, password.value)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <p>
      <label for="email">Email: </label>
      <input v-model="email" type="text" name="email" id="email" />
    </p>
    <p>
      <label for="password">Password: </label>
      <input v-model="password" type="password" name="password" id="password" />
    </p>
    <p>
      <button type="submit">Login</button>
    </p>
  </form>
</template>
