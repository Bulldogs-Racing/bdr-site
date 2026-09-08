import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// The site is served from a custom apex domain (bulldogsracing.com) via GitHub
// Pages, so the base path is '/'. If you ever drop the custom domain and serve
// from <org>.github.io/bdr-site/, change this to '/bdr-site/' and nothing else
// needs to move -- every internal link goes through react-router, not raw hrefs.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Fail the build rather than silently shipping a huge bundle. If this trips,
    // find out what got pulled in before raising it.
    chunkSizeWarningLimit: 700,
  },
})
