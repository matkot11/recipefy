import type { UserEvent } from '@testing-library/user-event'
import type { RenderResult } from '@testing-library/vue'

export type RenderResultWithUser = RenderResult & {
  user: UserEvent
}
