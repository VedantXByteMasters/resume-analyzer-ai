import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['test/setupTests.js'],
    threads: false,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    testTimeout: 10000
  }
});
