import { createRouter, createWebHistory } from 'vue-router'

import { PATHS } from '@/router/paths'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: PATHS.main,
      component: () => import('@/main/components/MainView.vue'),
    },
    {
      path: PATHS.register,
      component: () => import('@/auth/components/RegisterView.vue'),
    },
    {
      path: PATHS.login,
      component: () => import('@/auth/components/LoginView.vue'),
    },
  ],
})

export default router
