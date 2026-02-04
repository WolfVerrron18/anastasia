import { createRouter, createWebHashHistory } from 'vue-router'
// @ts-ignore
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // @ts-ignore
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

export default router
