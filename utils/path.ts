import * as path from 'path'
import { cwd } from 'node:process'

export const templatePath = {
  element: path.resolve(cwd(), 'template/vue-vite/element'),
  antd: path.resolve(cwd(), 'template/vue-vite/antd'),
  antdReact: path.resolve(cwd(), 'template/react-vite/antd'),
  windicss: path.resolve(cwd(), 'template/vue-vite/windicss'),
  unocss: path.resolve(cwd(), 'template/vue-vite/unocss'),
  vitest: path.resolve(cwd(), 'template/unit-test/vitest-vue'),
  vitestReact: path.resolve(cwd(), 'template/unit-test/vitest-react'),
  vitestLib: path.resolve(cwd(), 'template/unit-test/vitest-lib'),
  jest: path.resolve(cwd(), 'template/unit-test/jest-vue'),
  jestReact: path.resolve(cwd(), 'template/unit-test/jest-react'),
  jestLib: path.resolve(cwd(), 'template/unit-test/jest-lib'),
  tsup: path.resolve(cwd(), 'template/lib-template/gulp-tsup'),
  rollup: path.resolve(cwd(), 'template/lib-template/gulp-rollup'),
  browser: path.resolve(cwd(), 'template/lib-play'),
  bms: path.resolve(cwd(), 'template/other/bms'),
  puvue: path.resolve(cwd(), 'template/other/pure-vue'),
  pureact: path.resolve(cwd(), 'template/other/pure-react'),
}
export const libTemplateName = {
  tsup: 'template-node-tsup',
  rollup: 'template-node-rollup',
}

export const cliPackagePath = path.resolve(cwd(), 'package.json')
