import '@/styling/base.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import { useAuthStore } from '@/auth/store'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
await authStore.setCsrfToken()
authStore.getUser()

app.mount('#app')
