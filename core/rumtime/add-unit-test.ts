import {ILibOption, IViteProjOption, templatePath} from "../../utils";
import fs from 'fs-extra'
import chalk from 'chalk'


export async function addBaseUnitTest(packageJson:any,option: ILibOption | IViteProjOption,type:string){
    const {
        projectPath,
        unitTestLibType,
    } = option

    // 添加单元测试 vitest
    if (unitTestLibType === 'vitest') {
        console.log(chalk.blueBright.bold('\nstart setting vitest ...'))

        // package.json添加依赖
        packageJson.devDependencies['@vitest/coverage-c8'] = '^0.22.1'
        packageJson.devDependencies['@vitest/ui'] = '0.22.1'
        packageJson.devDependencies.vitest = '0.22.1'
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
