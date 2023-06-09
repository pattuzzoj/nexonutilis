import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    open: '/',
    port: 3000,
    proxy: {
      '/menu': {
        target: "https://nexonutilis.vercel.app",
      }
    }
  },
  build: {
    target: 'esnext',
  },
});