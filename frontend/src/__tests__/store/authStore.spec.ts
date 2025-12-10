import { createPinia, setActivePinia } from 'pinia'

import { useAuthStore } from '@/store/authStore'

const ID = 1
const EMAIL = 'test@test.com'
const USERNAME = 'test'
const PASSWORD = 'password'

const getCsrfTokenMock = vi.fn().mockResolvedValue({ data: { detail: 'CSRF cookie set' } })
const registerMock = vi.fn().mockResolvedValue({ data: { detail: 'User registered successfully' } })
const loginMock = vi
  .fn()
  .mockResolvedValue({ data: { user: { id: ID, email: EMAIL, username: USERNAME } } })
const logoutMock = vi.fn().mockResolvedValue({ data: { detail: 'User logged out successfully' } })
vi.mock('@/service/auth', () => ({
  authService: vi.fn(() => ({
    getCsrfToken: getCsrfTokenMock,
    login: loginMock,
    logout: logoutMock,
    register: registerMock,
  })),
}))

describe('authStore', () => {
  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
  })

  describe('CSRF Token', () => {
    it('should call csrf token', async () => {
      await authStore.setCsrfToken()

      expect(getCsrfTokenMock).toHaveBeenCalled()
    })

    it('should throw an error if the CSRF token is not set', async () => {
      getCsrfTokenMock.mockRejectedValueOnce(new Error('Failed to set CSRF token'))

      await expect(authStore.setCsrfToken()).rejects.toThrow('Failed to set CSRF token')
    })
  })

  describe('User', () => {
    it('should get the user', () => {
      authStore.getUser()

      expect(authStore.user).toBeNull()
    })

    it('should set the user', () => {
      authStore.setUser({
        id: ID,
        username: USERNAME,
        email: EMAIL,
      })

      expect(localStorage.getItem('user')).toBe(
        JSON.stringify({ id: ID, username: USERNAME, email: EMAIL }),
      )
      expect(authStore.user).toBeDefined()
    })

    it('should remove the user', () => {
      authStore.setUser(null)

      expect(localStorage.getItem('user')).toBeNull()
      expect(authStore.user).toBeNull()
    })
  })

  describe('Register', () => {
    it('should register a user', async () => {
      await authStore.handleRegister({
        username: USERNAME,
        email: EMAIL,
        password: PASSWORD,
        password_confirmation: PASSWORD,
      })

      expect(registerMock).toHaveBeenCalledWith(EMAIL, USERNAME, PASSWORD, PASSWORD)
    })

    it('should throw an error if the user is not registered', async () => {
      registerMock.mockRejectedValueOnce(new Error('Failed to register user'))

      await expect(
        authStore.handleRegister({
          username: USERNAME,
          email: EMAIL,
          password: PASSWORD,
          password_confirmation: PASSWORD,
        }),
      ).rejects.toThrow('Failed to register user')
    })
  })

  describe('Login', () => {
    it('should login a user', async () => {
      await authStore.handleLogin({
        email: EMAIL,
        password: PASSWORD,
      })

      expect(loginMock).toHaveBeenCalledWith(EMAIL, PASSWORD)
      expect(authStore.user).toStrictEqual({
        id: ID,
        email: EMAIL,
        username: USERNAME,
      })
    })

    it('should throw an error if the user is not logged in', async () => {
      loginMock.mockRejectedValueOnce(new Error('Failed to login user'))

      await expect(
        authStore.handleLogin({
          email: EMAIL,
          password: PASSWORD,
        }),
      ).rejects.toThrow('Failed to login user')
    })
  })

  describe('Logout', () => {
    it('should logout a user', async () => {
      await authStore.handleLogout()

      expect(logoutMock).toHaveBeenCalled()
      expect(authStore.user).toBeNull()
    })

    it('should throw an error if the user is not logged out', async () => {
      logoutMock.mockRejectedValueOnce(new Error('Failed to logout user'))
      await authStore.handleLogin({
        email: EMAIL,
        password: PASSWORD,
      })

      await expect(authStore.handleLogout()).rejects.toThrow('Failed to logout user')
      expect(authStore.user).toStrictEqual({
        id: ID,
        email: EMAIL,
        username: USERNAME,
      })
    })
  })
})
