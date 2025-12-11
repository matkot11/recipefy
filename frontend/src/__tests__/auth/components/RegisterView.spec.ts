import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'

import type { RenderResultWithUser } from '@/__tests__/setup/typings'
import RegisterView from '@/auth/components/RegisterView.vue'
import router from '@/router'
import { PATHS } from '@/router/paths'

const handleRegisterMock = vi
  .fn()
  .mockResolvedValue({ data: { detail: 'User registered successfully' } })
const handleLoginMock = vi
  .fn()
  .mockResolvedValue({ data: { detail: 'User logged in successfully' } })
vi.mock('@/auth/store', () => ({
  useAuthStore: vi.fn(() => ({
    handleRegister: handleRegisterMock,
    handleLogin: handleLoginMock,
  })),
}))

describe('RegisterView', () => {
  let wrapper: RenderResultWithUser

  const renderComponent = () => {
    const user = userEvent.setup()
    const renderResult = render(RegisterView, {
      global: {
        plugins: [router],
      },
    })
    return { ...renderResult, user }
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should move user to login page when clicking on the login link', async () => {
    wrapper = renderComponent()

    await wrapper.user.click(wrapper.getByText('Already have an account? Click here to login'))

    await waitFor(() => {
      expect(router.currentRoute.value.path).toBe(PATHS.login)
    })
  })

  it('should display error messages when the form is submitted with empty fields', async () => {
    wrapper = renderComponent()

    await wrapper.user.click(wrapper.getByRole('button', { name: 'Register' }))

    expect(await wrapper.findByText('username is a required field')).toBeVisible()
    expect(await wrapper.findByText('email is a required field')).toBeVisible()
    expect(await wrapper.findByText('password is a required field')).toBeVisible()
    expect(await wrapper.findByText('password_confirmation is a required field')).toBeVisible()
  })

  it('should display error message if email is invalid', async () => {
    wrapper = renderComponent()

    await wrapper.user.type(wrapper.getByPlaceholderText('Email'), 'invalid-email')
    await wrapper.user.click(wrapper.getByRole('button', { name: 'Register' }))

    expect(await wrapper.findByText('email must be a valid email')).toBeVisible()
  })

  it('should display error message if password is too short', async () => {
    wrapper = renderComponent()

    await wrapper.user.type(wrapper.getByPlaceholderText('Password'), 'short')
    await wrapper.user.click(wrapper.getByRole('button', { name: 'Register' }))

    expect(await wrapper.findByText('password must be at least 8 characters')).toBeVisible()
  })

  it('should display error message if passwords do not match', async () => {
    wrapper = renderComponent()

    await wrapper.user.type(wrapper.getByPlaceholderText('Password'), 'password')
    await wrapper.user.type(wrapper.getByPlaceholderText('Confirm Password'), 'password2')
    await wrapper.user.click(wrapper.getByRole('button', { name: 'Register' }))

    expect(await wrapper.findByText('Passwords do not match')).toBeVisible()
  })

  it('should register a user successfully', async () => {
    wrapper = renderComponent()

    await wrapper.user.type(wrapper.getByPlaceholderText('Username'), 'test')
    await wrapper.user.type(wrapper.getByPlaceholderText('Email'), 'test@test.com')
    await wrapper.user.type(wrapper.getByPlaceholderText('Password'), 'password')
    await wrapper.user.type(wrapper.getByPlaceholderText('Confirm Password'), 'password')

    await wrapper.user.click(wrapper.getByRole('button', { name: 'Register' }))

    await waitFor(() => {
      expect(handleRegisterMock).toHaveBeenCalledWith({
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        password_confirmation: 'password',
      })
      expect(handleLoginMock).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password',
      })
      expect(router.currentRoute.value.path).toBe(PATHS.main)
    })
  })
})
