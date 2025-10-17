import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        // Dependencies
        'node_modules/',

        // Tests
        'tests/',
        'src/**/*.test.{js,jsx}',
        'src/**/*.spec.{js,jsx}',

        // Config files
        '*.config.js',
        'postcss.config.js',
        'tailwind.config.js',

        // Build output
        'dist/',

        // Entry points and root components (similar to backend's server.js and app.js)
        'src/main.jsx', // Entry point - bootstrapping only
        'src/App.jsx', // Root component - routing setup only
        'src/App.css', // Styles
        'src/index.css', // Global styles
      ],
      thresholds: {
        branches: 50, // 50% para branches
        functions: 60, // 60% para funciones
        lines: 60, // 60% para líneas
        statements: 60, // 60% para statements
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
