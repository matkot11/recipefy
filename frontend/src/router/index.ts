import { createRouter, createWebHistory } from 'vue-router'

import { PATHS } from '@/router/paths'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: PATHS.main,
      component: () => import('@/views/MainView.vue'),
    },
    {
      path: PATHS.register,
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: PATHS.login,
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

export default router
