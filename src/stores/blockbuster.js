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
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchVideo(id) {
    try {
      const snap = await getDoc(doc(db, 'videos', id))
      return snap.exists() ? { id: snap.id, ...snap.data() } : null
    } catch (err) {
      error.value = err.message
    }
  }

  async function createVideo(title, embedCode) {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn) {
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
    } catch (err) {
      error.value = err.message
    }
  }

  async function updateVideo(id, title, embedCode) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      throw new Error('Must be logged in to edit a video')
    }

    try {
      await updateDoc(doc(db, 'videos', id), {
        title,
        embedCode,
        updatedAt: serverTimestamp(),
      })

      await fetchVideos()
    } catch (err) {
      error.value = err.message
    }
  }

  async function deleteVideo(id) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      throw new Error('Must be logged in to delete a video')
    }

    try {
      await deleteDoc(doc(db, 'videos', id))
      videos.value = videos.value.filter((v) => v.id !== id)
    } catch (err) {
      error.value = err.message
    }
  }

  return { videos, loading, error, fetchVideos, fetchVideo, createVideo, updateVideo, deleteVideo }
})
