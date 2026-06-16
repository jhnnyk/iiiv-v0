<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlockbuster } from '@/stores/blockbuster'

const router = useRouter()
const route = useRoute()
const blockbuster = useBlockbuster()

const title = ref('')
const embedCode = ref('')

onMounted(async () => {
  const video = await blockbuster.fetchVideo(route.params.id)
  if (video) {
    title.value = video.title
    embedCode.value = video.embedCode
  }
})

async function handleSubmit() {
  await blockbuster.updateVideo(route.params.id, title.value, embedCode.value)
  if (!blockbuster.error) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Edit Video</h1>
    <input v-model="title" placeholder="Title" required />
    <textarea v-model="embedCode" placeholder="... embed code ..." />
    <p v-if="blockbuster.error" class="error">{{ blockbuster.error }}</p>
    <button type="submit">Save changes</button>
  </form>
</template>
