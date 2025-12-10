import '@/styling/base.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import { useAuthStore } from '@/store/authStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
await authStore.setCsrfToken()
authStore.getUser()

app.mount('#app')
