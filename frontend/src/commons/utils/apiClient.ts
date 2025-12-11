import axios, { type AxiosInstance } from 'axios'

import { useAuthStore } from '@/auth/store'

export const apiClient = (): AxiosInstance => {
  const { csrfToken } = useAuthStore()

  return axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    withCredentials: true,
  })
}
