import '@testing-library/jest-dom/vitest'

// Polyfill ResizeObserver for jsdom environment
global.ResizeObserver = class ResizeObserver {
  observe() {
    // noop
  }
  unobserve() {
    // noop
  }
  disconnect() {
    // noop
  }
}
