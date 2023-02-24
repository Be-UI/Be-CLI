import resolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import { parallel } from 'gulp'
import replace from 'rollup-plugin-replace'
import { build } from './utils'

const config = {
  input: '../packages/entry/index.ts', // 必须，入口文件
  external: ['chalk'],
  plugins: [
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
  ],
}

const buildConfig = [
  {
    file: '../dist/index.js',
    format: 'es',
    inlineDynamicImports: true,
    name: 'index',
  },
  {
    file: '../dist/index.cjs',
    format: 'cjs',
    inlineDynamicImports: true,
    name: 'index',
  },
]

const typeConfig = {
  input: '../packages/entry/index.ts', // 必须，入口文件
  plugins: [
    resolve(),
    typescript(),
    dts(),
  ],
}
const buildTypeConfig = [
  {
    file: '../dist/index.d.ts',
    format: 'es',
  },
]

// 打包处理
export const buildPackages = () => {
  return parallel(() => build(config, buildConfig), () => build(typeConfig, buildTypeConfig))
}
export default buildPackages()
