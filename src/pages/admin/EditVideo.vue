<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlockbuster } from '@/stores/blockbuster'
import VideoForm from '@/components/VideoForm.vue'

const router = useRouter()
const route = useRoute()
const blockbuster = useBlockbuster()

const video = ref({})

onMounted(async () => {
  video.value = await blockbuster.fetchVideo(route.params.id)
})

async function handleSubmit(formData) {
  await blockbuster.updateVideo(route.params.id, formData)
  if (!blockbuster.error) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="form-wrapper">
    <VideoForm :initial-values="video" :loading="blockbuster.loading" @submit="handleSubmit" />
    <p v-if="blockbuster.error" class="error">{{ blockbuster.error }}</p>
  </div>
</template>
