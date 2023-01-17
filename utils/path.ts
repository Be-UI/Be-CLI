import * as path from 'path'
import { fileURLToPath } from 'url'
import { cwd } from 'node:process'

const __filenameNew: string = fileURLToPath(import.meta.url)
export const __dirnameNew = path.dirname(__filenameNew)

export const templatePath = {
  element: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/element'),
  antd: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/antd'),
  antdReact: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/react-vite/antd'),
  windicss: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/windicss'),
  unocss: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/unocss'),
  vitest: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/vitest-vue'),
  vitestReact: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/vitest-react'),
  vitestLib: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/vitest-lib'),
  jest: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/jest-vue'),
  jestReact: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/jest-react'),
  jestLib: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/jest-lib'),
  tsup: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/lib-template/gulp-tsup'),
  rollup: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/lib-template/gulp-rollup'),
  browser: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/lib-play'),
  bms: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/other/bms'),
}
export const libTemplateName = {
  tsup: 'template-node-tsup',
  rollup: 'template-node-rollup',
}

const cliPackageFilePath = process.env.ENV === 'BECLIDEV' ? 'package.json' : '../package.json'
export const cliPackagePath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, cliPackageFilePath)
