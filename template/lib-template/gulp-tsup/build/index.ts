import * as process from 'process'
import { defineConfig } from 'tsup'
let entry = {}
const buildMode = process.env.BUILD_MODE
const baseConfig = {
  entry: {},
  external: ['ora', 'chalk', 'fs-extra'],
  format: ['cjs', 'esm'],
  clean: true,
  minify: false,
  dts: true,
  outDir: '../dist',
}
const configOptions = []

// All scripts are packaged to the same file
if (buildMode === 'all') {
  baseConfig.entry = {
    index: '../packages/entry/index.ts',
  }
  configOptions.push(baseConfig)
}

// You can output packaged products according to your desired folder structure
if (buildMode === 'split') {
  entry = {
    index: '../packages/entry/index.ts',
    runtime: '../packages/runtime/index.ts',
    utils: '../utils/index.ts',
  }
  for (const entryKey in entry) {
    const config = JSON.parse(JSON.stringify(baseConfig))
    config.entry = [entry[entryKey]]
    config.outDir = entryKey === 'index' ? './dist' : `./dist/${entryKey}`

    configOptions.push(config)
  }
}

export default defineConfig(configOptions)
