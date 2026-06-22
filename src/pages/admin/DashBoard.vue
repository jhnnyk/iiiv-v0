<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlockbuster } from '@/stores/blockbuster'
import { useAuthStore } from '@/stores/auth'
import { IconEdit, IconTrash } from '@tabler/icons-vue'

const router = useRouter()
const blockbuster = useBlockbuster()
const authStore = useAuthStore()

onMounted(() => blockbuster.fetchVideos())

async function handleDelete(id) {
  if (confirm('Delete this video?')) await blockbuster.deleteVideo(id)
}

const formatDate = (timestamp) => {
  if (!timestamp) return '... loading ...'

  const date = timestamp.toDate()

  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return `${dateStr} ${timeStr.toLowerCase().replace(' ', '')}`
}
</script>

<template>
  <h1>Dashboard</h1>
  <button v-if="authStore.isLoggedIn" @click="router.push('/video/create')">New video</button>

  <p v-if="blockbuster.loading">.... loading ....</p>
  <p v-else-if="!blockbuster.videos.length">No posts yet.</p>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Updated</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="video in blockbuster.videos" :key="video.id">
          <td>{{ video.title }}</td>
          <td>
            <!-- <span :class="['badge', video.status]">{{ video.status }}</span> -->
            <span class="badge published">published</span>
          </td>
          <td>{{ formatDate(video.updatedAt) }}</td>
          <td class="actions">
            <IconEdit @click="router.push(`/video/${video.id}/edit`)" />
            <IconTrash @click="handleDelete(video.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: #1c1c1c;
}

thead tr {
  background: #161616;
}

th {
  padding: 10px 14px;
  font-size: 13px;
  color: #9ca3af;
  font-weight: 400;
  text-align: left;
}

tbody tr {
  background: #1c1c1c;
}

tbody tr:nth-child(even) {
  background: #232323;
}

tbody tr:hover {
  background: #2a2a2a;
}

td {
  padding: 10px 14px;
  color: #e5e7eb;
  border-top: 1px solid #2a2a2a;
  text-align: left;
}

td.actions {
  text-align: right;
}

.muted {
  color: #9ca3af;
}

.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
}

.badge.published {
  background: #14321f;
  color: #4ade80;
}

.badge.draft {
  background: #3a2a0e;
  color: #fbbf24;
}

.actions .tabler-icon {
  cursor: pointer;
  color: #9ca3af;
  padding-left: 10px;
}

.actions .tabler-icon:hover {
  color: #e5e7eb;
}
</style>
