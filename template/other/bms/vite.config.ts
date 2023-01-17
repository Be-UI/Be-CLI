import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins/index'
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, `${process.cwd()}/env`)
  return {
    base: '/customer-data/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    envDir: './env/',
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset')
                  atRule.remove()
              },
            },
          },
        ],
      },
    },
  }
})
