<script setup>
import { onMounted } from 'vue'
import { useBlockbuster } from '@/stores/blockbuster'

const blockbuster = useBlockbuster()

onMounted(() => blockbuster.fetchVideos())
</script>

<template>
  <p v-if="blockbuster.loading">.... loading ....</p>
  <p v-else-if="!blockbuster.videos.length">No posts yet.</p>

  <article v-for="video in blockbuster.videos" :key="video.id">
    <div v-html="video.embedCode"></div>
    <h2>{{ video.title }}</h2>
  </article>
</template>
