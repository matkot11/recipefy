import axios, { type AxiosInstance } from 'axios'

import { useAuthStore } from '@/store/authStore'

export const apiClient = (): AxiosInstance => {
  const { csrfToken } = useAuthStore()

  return axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    withCredentials: true,
  })
}
