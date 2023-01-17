import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'
const config = [
  {
    external: [
      id => /.test.js/.test(id),
      'ora',
      'fs-extra',
      'chalk',
      'commander',
      'prompts',
      'readdirp',
    ],
    input: './core/index.ts', // 必须，入口文件
    output: [
      {
        file: './dist/index.js',
        format: 'es',

      },
    ],
    plugins: [
      typescript({
        check: false,
      }),
      json(),
      nodeResolve(),
      terser(),
      cleanup({ comments: 'none' }),
      copy({
        targets: [
          { src: 'template', dest: 'dist/' },
        ],
      }),
    ],
  },

]

export default config
