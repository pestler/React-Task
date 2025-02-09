import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'c8',
      all: true,
      include: ['src/**/*.tsx'],
      exclude: ['src/App.tsx'],
      reporter: ['text', 'lcov'],
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
});
