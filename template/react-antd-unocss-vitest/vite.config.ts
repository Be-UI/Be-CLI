import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import progress from 'vite-plugin-progress'
import viteCompression from 'vite-plugin-compression'
import { viteImgCompress } from 'unplugin-img-compress'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    react(),
    Unocss(),
    progress(),
    viteCompression(),
    viteImgCompress({
      APIKey: 'kZgn8pxfdjQjKFmf2StLq7CY4TqMgs0T',
      dir: '', // runtime = build 时无用，图片直接从钩子里取, 这里直接传空
      runtime: 'build',
      mode: 'once',
    }),
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
