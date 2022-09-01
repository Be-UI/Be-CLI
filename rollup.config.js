/*
 * @rollup.config.js
 * @deprecated
 * @author czh
 * @update (czh 2022/4/29)
 */
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json';
const config = [
  {
    external: [id => /.test.js/.test(id)],
    input: './core/index.ts', // 必须，入口文件
    output: [

      {
        file: './dist/lib/be-ui.es.js',
        format: 'es',
        name: 'be-ui',

      },
      {
        file: './dist/lib/be-ui-cjs.js',
        format: 'cjs',
        name: 'be-ui',

      },
    ],
    plugins: [


      resolve(),
      typescript({
        check:false
      }),
      json(),
      babel({
        exclude: '**/node_modules/**',
      }),
      commonjs(),
      //terser(),
      cleanup({ comments: 'none' }),
    ],
  },


]

export default config
