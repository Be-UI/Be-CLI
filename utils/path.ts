import * as path from 'path'
import { fileURLToPath } from 'url'
import { cwd } from 'node:process'

const __filenameNew: string = fileURLToPath(import.meta.url)
export const __dirnameNew = path.dirname(__filenameNew)

export const templatePath = {
  element: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/element'),
  antd: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/antd'),
  windicss: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/windicss'),
  unocss: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/vue-vite/unocss'),
  vitest: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/vitest'),
  jest: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/unit-test/jest'),
  tsup: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/lib-template/gulp-tsup'),
  browser: path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template/lib-play'),
}

const cliPackageFilePath = process.env.ENV === 'BECLIDEV' ? 'package.json' : '../package.json'
export const cliPackagePath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, cliPackageFilePath)

