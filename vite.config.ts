import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api 경로는 rewrite 적용
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^/api/, ""),
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(dirname, 'src/components'),
      },
      {
        find: '@pages',
        replacement: path.resolve(dirname, 'src/pages'),
      },
    ],
  },
  define: {
    global: {},
  },
});
