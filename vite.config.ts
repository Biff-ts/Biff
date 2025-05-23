// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: 'src/ssr/renderToHtml.ts',
    outDir: 'dist/ssr'
  }
})
