<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlockbuster } from '@/stores/blockbuster'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const blockbuster = useBlockbuster()
const authStore = useAuthStore()

onMounted(() => blockbuster.fetchVideos())

async function handleDelete(id) {
  if (confirm('Delete this video?')) await blockbuster.deleteVideo(id)
}
</script>

<template>
  <h1>Dashboard</h1>
  <button v-if="authStore.isLoggedIn" @click="router.push('/video/create')">New video</button>

  <p v-if="blockbuster.loading">.... loading ....</p>
  <p v-else-if="!blockbuster.videos.length">No posts yet.</p>

  <ul v-for="video in blockbuster.videos" :key="video.id">
    <li>
      {{ video.title }}
      <small>by {{ video.authorEmail }}</small>
      <button @click="router.push(`/video/${video.id}/edit`)">edit</button>
      <button @click="handleDelete(video.id)">delete</button>
    </li>
  </ul>
</template>
