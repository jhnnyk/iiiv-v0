import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/firebase'
import { useAuthStore } from '@/stores/auth'

export const useBlockbuster = defineStore('blockbuster', () => {
  const videos = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchVideos() {
    loading.value = true
    error.value = null

    try {
      const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      videos.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  async function createVideo(title, embedCode) {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn) {
      error.value = 'Must be logged in to add a video'
      throw new Error('Must be logged in to add a video')
    }

    try {
      const docRef = await addDoc(collection(db, 'videos'), {
        title,
        embedCode,
        authorId: authStore.user.uid,
        authorEmail: authStore.user.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      await fetchVideos()
      return docRef.id
    } catch (error) {
      error.value = error.message
    }
  }

  return { videos, loading, error, fetchVideos, createVideo }
})
