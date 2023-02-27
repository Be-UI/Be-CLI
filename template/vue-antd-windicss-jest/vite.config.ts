import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import progress from 'vite-plugin-progress'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import viteCompression from 'vite-plugin-compression'
import { viteImgCompress } from 'unplugin-img-compress'
import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    WindiCSS(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    progress(),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        'vue-vendor': ['vue'],
      },
    }),
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
