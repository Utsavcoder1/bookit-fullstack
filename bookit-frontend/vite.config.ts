import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Remove the base: './' or change it to:
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})