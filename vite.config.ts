import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative paths for assets to work correctly when deployed to a subfolder on GitHub pages.
  base: '/zenflow-dashboard/',
})
