import { apiClient } from '@/utils/apiClient'

export const authService = () => {
  const getCsrfToken = async () => await apiClient().get('/auth/csrf-token/')

  const login = async (email: string, password: string) =>
    await apiClient().post('/auth/login/', { email, password })

  const register = async (
    email: string,
    username: string,
    password: string,
    password_confirmation: string,
  ) =>
    await apiClient().post('/auth/register/', { email, username, password, password_confirmation })

  const logout = async () => await apiClient().post('/auth/logout/')

  return {
    getCsrfToken,
    login,
    register,
    logout,
  }
}
