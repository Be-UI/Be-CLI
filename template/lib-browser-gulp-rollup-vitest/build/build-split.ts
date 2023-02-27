import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import replace from 'rollup-plugin-replace'
import { build } from './utils'
import type { OutputOptions } from 'rollup'

const config = {
  input: '../packages/entry/index.ts',
  external: [
    'chalk',
    '@be-ui-cli/t-node-rollup-vitest-utils',
    '@be-ui-cli/t-node-rollup-vitest-runtime',
  ],
  output: [],
  plugins: [],
}
const plugins = [
  // 引入的插件在这里配置
  resolve(),
  typescript(),
  replace({
    'process.env.CURRENT_ENV': '`web`',
  }),
  babel({
    presets: ['@babel/preset-env'],
    exclude: '**/node_modules/**',
    babelHelpers: 'runtime',
  }),
  commonjs(),
  cleanup({ comments: 'none' }),
  terser(),
]
const entry = {
  index: { entry: '../packages/entry/index.ts', output: '../dist/index' },
  runtime: { entry: '../packages/runtime/index.ts', output: '../dist/runtime/index' },
  utils: { entry: '../utils/index.ts', output: '../dist/utils/index' },
}

const typeConfig = {
  input: '../packages/entry/index.ts', // 必须，入口文件
  plugins: [],
}

const typePlugins = [
  resolve(),
  typescript(),
  dts(),
]
const createBuildOption = (config, plugins, isType?: boolean) => {
  const option = []
  for (const entryKey in entry) {
    const inputConfig = JSON.parse(JSON.stringify(config))
    inputConfig.input = entry[entryKey].entry
    inputConfig.plugins = plugins
    let outputConfig = []
    if (isType) {
      outputConfig = [
        {
          file: `${entry[entryKey].output}.d.ts`,
          format: 'es',
        },
      ]
    } else {
      outputConfig = [
        {
          file: `${entry[entryKey].output}.js`,
          format: 'es',
          inlineDynamicImports: true,
          name: 'index',
        },
        {
          file: `${entry[entryKey].output}.cjs`,
          format: 'cjs',
          inlineDynamicImports: true,
          name: 'index',
        },
      ] as OutputOptions[]
    }
    option.push(async() => {
      const res = await build(inputConfig, outputConfig)
      return res
    })
  }
  return option
}

// 打包处理
const buildPackages = () => {
  const buildList = createBuildOption(config, plugins)
  const buildTypeList = createBuildOption(typeConfig, typePlugins, true)
  return [...buildList, ...buildTypeList]
}
export default buildPackages()
