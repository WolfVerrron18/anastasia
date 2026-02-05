import { createRouter, createWebHashHistory } from 'vue-router'
// @ts-ignore
import StartView from '@/views/StartView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // @ts-ignore
      component: StartView,
    },
    {
      path: '/six-mounts',
      name: 'six-mounts',
      component: () => import('@/components/six/SixMonths.vue'),
    },
    {
      path: '/five-letters-view',
      name: 'five-letters-view',
      // @ts-ignore
      component: () => import('@/views/FiveLettersView.vue'),
    },
    {
      path: '/five-letters',
      name: 'five-letters',
      // @ts-ignore
      component: () => import('@/components/FiveLetters.vue'),
    },
    {
      path: '/end',
      name: 'end',
      // @ts-ignore
      component: () => import('@/views/EndView.vue'),
    },
  ],
})

export default router
