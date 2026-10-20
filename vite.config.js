import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the same code run at a GitHub Pages project URL
// (https://<user>.github.io/Ariane-port/) and later at the root of a custom domain.
// The deploy workflow sets it automatically; locally it defaults to "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
