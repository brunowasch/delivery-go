import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/delivery-go/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://apifakedelivery.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
