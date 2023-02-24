import fs from 'fs-extra'
import chalk from 'chalk'
import { templatePath } from '../utils'
import type { ILibOption, IOtherOption, IViteProjOption } from '../utils'

export async function addBaseUnitTest(
  packageJson: any,
  option: ILibOption | IViteProjOption | IOtherOption,
  type: string) {
  const {
    projectPath,
    unitTestLibType,
  } = option

  // 添加单元测试 vitest
  if (unitTestLibType === 'vitest') {
    console.log(chalk.blueBright.bold('\nstart setting vitest ...'))

    // package.json添加依赖
    packageJson.devDependencies['@vitest/coverage-c8'] = '^0.23.4'
    packageJson.devDependencies['@vitest/ui'] = '^0.23.4'
    packageJson.devDependencies.vitest = '^0.23.4'
    packageJson.devDependencies.jsdom = '^20.0.0'

    // package.json添加指令
    packageJson.scripts.test = 'vitest'
    packageJson.scripts['test:update'] = 'vitest -u'
    packageJson.scripts['test:coverage'] = 'vitest --coverage'

    // 移动处理vitest.config.ts
    await fs.copySync(templatePath[`${unitTestLibType}${type}` as keyof typeof templatePath], projectPath)
    console.log(chalk.greenBright.bold('\nset vitest success !'))
  }
  // 添加单元测试 jest
  if (unitTestLibType === 'jest') {
    console.log(chalk.blueBright.bold('\nstart setting jest ...'))

    // package.json添加依赖
    packageJson.devDependencies.jest = '^27.5.1'
    packageJson.devDependencies['jest-environment-jsdom'] = '^27.5.1'
    packageJson.devDependencies['ts-jest'] = '27.1.4'
    packageJson.devDependencies['babel-jest'] = '^27.5.1'
    packageJson.devDependencies['@types/jest'] = '^27.5.1'
    packageJson.devDependencies['@testing-library/jest-dom'] = '^5.16.4'
    packageJson.devDependencies['@babel/preset-env'] = '^7.17.10'
    packageJson.devDependencies['@babel/preset-typescript'] = '^7.16.7'

    // package.json添加指令
    packageJson.scripts.test = 'jest'
    packageJson.scripts['test:coverage'] = 'jest --coverage'
    // 移动处理 jest.config.cjs
    await fs.copySync(templatePath[`${unitTestLibType}${type}` as keyof typeof templatePath], projectPath)
    console.log(chalk.greenBright.bold('\nset jest success !'))
  }
}

export function addUnitTestDeps(
  packageJson: any,
  option: ILibOption | IViteProjOption | IOtherOption,
  type: string) {
  const { unitTestLibType } = option
  if (type === 'React') {
    if (unitTestLibType === 'vitest') {
      packageJson.devDependencies['@testing-library/react'] = '^12.0.0'
      packageJson.devDependencies['@testing-library/user-event'] = '^14.4.2'
    }

    if (unitTestLibType === 'jest') {
      packageJson.devDependencies['@testing-library/react'] = '^12.0.0'
      packageJson.devDependencies['@testing-library/user-event'] = '^14.4.2'
      packageJson.devDependencies['@babel/preset-react'] = '^7.18.6'
    }
  }

  if (type === 'Vue') {
    if (unitTestLibType === 'vitest')
      packageJson.devDependencies['@vue/test-utils'] = '^2.2.7'

    if (unitTestLibType === 'jest') {
      packageJson.devDependencies['@vue/test-utils'] = '^2.2.7'
      packageJson.devDependencies['@vue/babel-plugin-jsx'] = '^1.1.1'
    }
  }

  return packageJson
}
