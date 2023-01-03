import { defineConfig } from 'vitest/config'

export default defineConfig({
  define: {
    __DEV__: true,
    __TEST__: true,
    __BROWSER__: true,
  },
  test: {
    include: ['./tests/**/*.test.ts'],
    globals: true,
    reporters: 'dot',
    isolate: true,
  },
})