import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory, type Router } from 'vue-router'

import type { RenderResultWithUser } from '@/__tests__/setup/typings'
import DefaultNavigation from '@/layout/DefaultNavigation.vue'
import { PATHS } from '@/router/paths'
import { useAuthStore } from '@/store/authStore'

describe('DefaultNavigation', () => {
  let wrapper: RenderResultWithUser
  let router: Router

  const renderComponent = () => {
    const user = userEvent.setup()
    const renderResult = render(DefaultNavigation, {
      global: {
        plugins: [router],
      },
    })

    return { ...renderResult, user }
  }

  beforeEach(async () => {
    setActivePinia(createPinia())

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: PATHS.main,
          component: {},
        },
        {
          path: PATHS.myRecipes,
          component: {},
        },
        {
          path: PATHS.allRecipes,
          component: {},
        },
        {
          path: PATHS.addRecipe,
          component: {},
        },
        {
          path: PATHS.register,
          component: {},
        },
      ],
    })

    await router.push(PATHS.main)
  })

  it.each([
    { path: PATHS.addRecipe, text: 'Add Recipe' },
    { path: PATHS.myRecipes, text: 'My Recipes' },
    { path: PATHS.allRecipes, text: 'All Recipes' },
    { path: PATHS.register, text: 'Authenticate' },
  ])('should redirect user to $path', async ({ path, text }) => {
    wrapper = renderComponent()

    await wrapper.user.click(wrapper.getByText(text))

    expect(router.currentRoute.value.path).toBe(path)
  })

  it('should display the logout button if the user is logged in', async () => {
    const authStore = useAuthStore()
    authStore.user = {
      id: 1,
      username: 'test',
      email: 'test@test.com',
    }

    wrapper = renderComponent()

    expect(wrapper.getByRole('button', { name: 'Logout' })).toBeVisible()
    expect(wrapper.queryByRole('link', { name: 'Authenticate' })).not.toBeInTheDocument()
  })
})
