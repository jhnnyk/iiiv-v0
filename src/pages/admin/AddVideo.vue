<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBlockbuster } from '@/stores/blockbuster'

const router = useRouter()
const blockbuster = useBlockbuster()

const title = ref('')
const embedCode = ref('')

async function handleSubmit() {
  const id = await blockbuster.createVideo(title.value, embedCode.value)
  if (id) router.push('/dashboard')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>New Video</h1>
    <input v-model="title" placeholder="Title" required />
    <textarea v-model="embedCode" placeholder="... embed code ..." />
    <p v-if="blockbuster.error" class="error">{{ blockbuster.error }}</p>
    <button type="submit">Add Video</button>
  </form>
</template>
