import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl()],
  server: {
    host: true, // Expose to all network interfaces
    https: true,
  },
  base: process.env.NODE_ENV === 'production' ? '/web-nfc-read-demo/' : '/', // Add base URL for GitHub Pages
})
