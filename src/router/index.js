import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import AddVideo from '@/pages/admin/AddVideo.vue'
import DashBoard from '@/pages/admin/DashBoard.vue'

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
    },
    {
      path: '/video/create',
      name: 'add video',
      component: AddVideo,
    },
  ],
})

export default router
