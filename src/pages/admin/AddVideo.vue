<script setup>
import { useRouter } from 'vue-router'
import { useBlockbuster } from '@/stores/blockbuster'
import VideoForm from '@/components/VideoForm.vue'

const router = useRouter()
const blockbuster = useBlockbuster()

async function handleSubmit(formData) {
  await blockbuster.createVideo(formData)
  if (!blockbuster.error) router.push('/dashboard')
}
</script>

<template>
  <div class="form-wrapper">
    <VideoForm :loading="blockbuster.loading" @submit="handleSubmit" />
    <p v-if="blockbuster.error">{{ blockbuster.error }}</p>
  </div>
</template>
