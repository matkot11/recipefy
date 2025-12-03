import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'

import type { RenderResultWithUser } from '@/__tests__/setup/typings'
import DefaultNavigation from '@/layout/DefaultNavigation.vue'
import { PATHS } from '@/router/paths'

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
          path: PATHS.authenticate,
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
    { path: PATHS.authenticate, text: 'Authenticate' },
  ])('should redirect user to $path', async ({ path, text }) => {
    wrapper = renderComponent()

    await wrapper.user.click(wrapper.getByText(text))

    expect(router.currentRoute.value.path).toBe(path)
  })
})
