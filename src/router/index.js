import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AddVideo from '@/pages/admin/AddVideo.vue'
import DashBoard from '@/pages/admin/DashBoard.vue'
import { watch } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      meta: { requiresAuth: true },
    },
    {
      path: '/video/create',
      name: 'add video',
      component: AddVideo,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // wait for Firebase to resolve auth state on first load
  if (authStore.loading) {
    await new Promise((resolve) => {
      const unwatch = watch(
        () => authStore.loading,
        (loading) => {
          if (!loading) {
            unwatch()
            resolve()
          }
        },
      )
    })
  }

  const isLoggedIn = authStore.isLoggedIn

  if (to.path === '/login' && isLoggedIn) return '/dashboard'
  if (to.meta.requiresAuth && !isLoggedIn) return '/login'
})

export default router
