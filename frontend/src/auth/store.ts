import { useStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { authService } from '@/auth/service'
import type { LoginData, RegisterData, User } from '@/auth/typings'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const csrfToken = computed(() => useCookies(['locale']).get('csrftoken'))

  const { getCsrfToken, login, register, logout } = authService()

  const setCsrfToken = async () => {
    try {
      await getCsrfToken()
    } catch (error) {
      console.error('Failed to set CSRF token', error)
      throw error
    }
  }

  const getUser = () => {
    const state = useStorage('user', null, localStorage)
    if (state.value) {
      user.value = JSON.parse(state.value)
      return
    }

    user.value = null
  }

  const setUser = (userData: User | null) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
      user.value = userData
      return
    }

    localStorage.removeItem('user')
    user.value = null
  }

  const handleRegister = async ({
    username,
    email,
    password,
    password_confirmation,
  }: RegisterData) => {
    try {
      await register(email, username, password, password_confirmation)
    } catch (error) {
      console.error('Failed to register', error)
      throw error
    }
  }

  const handleLogin = async ({ email, password }: LoginData) => {
    try {
      const response = await login(email, password)
      setUser(response.data.user)
    } catch (error) {
      console.error('Failed to login', error)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
    } catch (error) {
      console.error('Failed to logout', error)
      throw error
    }
  }
  return {
    user,
    csrfToken,
    setCsrfToken,
    getUser,
    setUser,
    handleRegister,
    handleLogin,
    handleLogout,
  }
})
