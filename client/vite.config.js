import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/pages",
      assets: "/src/assets",
      layout: "/src/layout",
      utils: "/src/utils",
      styles: "/src/assets/styles",
      images: "/src/assets/images",
      svg: "/src/assets/svg",
    },
  },
})
