import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: [
        'node_modules',
        'dist',
        '**/App.tsx',
        '**/main.tsx',
        '**/index.tsx',
        '**/setupTests.ts',
        '**/setupTests.tsx',
        '**/react-app-env.d.ts',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
});
