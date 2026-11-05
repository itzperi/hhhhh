import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Match Next.js: components use the automatic JSX runtime and do not import React.
  esbuild: { jsx: 'automatic' },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
