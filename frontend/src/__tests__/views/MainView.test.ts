import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'

import type { RenderResultWithUser } from '@/__tests__/setup/typings'
import { PATHS } from '@/router/paths'
import MainView from '@/views/MainView.vue'

vi.mock('animejs', () => ({
  default: {
    splitText: vi.fn(() => ({ chars: [] })),
    animate: vi.fn(),
    stagger: vi.fn((delay: number) => delay),
  },
  splitText: vi.fn(() => ({ chars: [] })),
  animate: vi.fn(),
  stagger: vi.fn((delay: number) => delay),
}))

describe('MainView', () => {
  let wrapper: RenderResultWithUser
  let router: Router

  const renderComponent = () => {
    const user = userEvent.setup()
    const renderResult = render(MainView, {
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
          path: PATHS.allRecipes,
          component: {},
        },
        {
          path: PATHS.addRecipe,
          component: {},
        },
      ],
    })

    await router.push(PATHS.main)
  })

  it.each([
    { path: PATHS.addRecipe, text: 'Add Recipe' },
    { path: PATHS.allRecipes, text: 'Browse Recipes' },
  ])('should redirect user to $path', async ({ path, text }) => {
    wrapper = renderComponent()

    await wrapper.user.click(wrapper.getByRole('link', { name: text }))

    expect(router.currentRoute.value.path).toBe(path)
  })
})
