import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import progress from 'vite-plugin-progress'
import viteCompression from 'vite-plugin-compression'
// IMPORT_FLAG

export default defineConfig({
  plugins: [
    react(),
    // PLUGINS_FLAG
    progress(),
    viteCompression(),
  ],
  envDir: './env',
  css: {
    postcss: 'postcss.config.cjs',
  },
  build: {
    minify: true,
    cssCodeSplit: true,
    commonjsOptions: {
      ignoreTryCatch: false,
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
