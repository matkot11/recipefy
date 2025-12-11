import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'

import type { RenderResultWithUser } from '@/__tests__/setup/typings'
import LoginView from '@/auth/components/LoginView.vue'
import router from '@/router'
import { PATHS } from '@/router/paths'

const EMAIL = 'test@test.com'
const PASSWORD = 'password'

const handleLoginMock = vi
  .fn()
  .mockResolvedValue({ data: { user: { id: 1, email: EMAIL, username: 'test' } } })
vi.mock('@/auth/store', () => ({
  useAuthStore: vi.fn(() => ({
    handleLogin: handleLoginMock,
  })),
}))

describe('LoginView', () => {
  let wrapper: RenderResultWithUser

  const renderComponent = () => {
    const user = userEvent.setup()
    const renderResult = render(LoginView, {
      global: {
        plugins: [router],
      },
    })
    return { ...renderResult, user }
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should move user to register page when clicking on the register link', async () => {
    wrapper = renderComponent()

    await wrapper.user.click(wrapper.getByText("Don't have an account? Click here to register"))

    await waitFor(() => {
      expect(router.currentRoute.value.path).toBe(PATHS.register)
    })
  })

  it('should display error messages when the form is submitted with empty fields', async () => {
    wrapper = renderComponent()

    await wrapper.user.click(wrapper.getByRole('button', { name: 'Login' }))

    expect(await wrapper.findByText('email is a required field')).toBeVisible()
    expect(await wrapper.findByText('password is a required field')).toBeVisible()
  })

  it('should display error message if email is invalid', async () => {
    wrapper = renderComponent()

    await wrapper.user.type(wrapper.getByPlaceholderText('Email'), 'invalid-email')
    await wrapper.user.click(wrapper.getByRole('button', { name: 'Login' }))

    expect(await wrapper.findByText('email must be a valid email')).toBeVisible()
  })

  it('should display error message if password is too short', async () => {
    wrapper = renderComponent()

    await wrapper.user.type(wrapper.getByPlaceholderText('Password'), 'short')
    await wrapper.user.click(wrapper.getByRole('button', { name: 'Login' }))

    expect(await wrapper.findByText('password must be at least 8 characters')).toBeVisible()
  })

  it('should login successfully', async () => {
    wrapper = renderComponent()

    await wrapper.user.type(wrapper.getByPlaceholderText('Email'), EMAIL)
    await wrapper.user.type(wrapper.getByPlaceholderText('Password'), PASSWORD)
    await wrapper.user.click(wrapper.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(handleLoginMock).toHaveBeenCalledWith({
        email: EMAIL,
        password: PASSWORD,
      })
      expect(router.currentRoute.value.path).toBe(PATHS.main)
    })
  })
})
