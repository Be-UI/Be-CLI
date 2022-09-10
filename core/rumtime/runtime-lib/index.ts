import {BUILDLIBTYPE, ILibOption, RUNENVTYPE, templatePath} from "../../../utils";
import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'

export const runRuntimeLib = async (option: ILibOption) => {
    console.log(option)
    const {
        projectName,
        projectPath,
        projectType,
        buildLibType,
        envType,
        unitTestLibType,
    } = option
    const spinner = ora('Loading').start()
    try {
        // 复制模板项目到目标路径
        spinner.color = 'blue'
        await fs.copySync(templatePath[buildLibType as keyof typeof templatePath], projectPath)

        // 读取 package.json
        console.log(chalk.blueBright.bold('\nstart creating package.json ...'))
        await fs.ensureDirSync(projectPath)
        const packageJson = await fs.readJsonSync(`${projectPath}/package.json`)

        // 添加浏览器环境play
        if(envType === RUNENVTYPE.BROWSER){
            // 1.移删除node下dist
            await fs.removeSync(`${projectPath}/play`)
            // 2.移动browser到play到dist
            await fs.copySync(templatePath[envType as keyof typeof templatePath], `${projectPath}/play`)
            // 3.修改package.json dev指令为play的dev指令
            packageJson.scripts.dev = 'pnpm run --filter @template-node-tsup/play dev'
        }
        // 添加单元测试
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
            await fs.copySync(templatePath[`${unitTestLibType}Lib` as keyof typeof templatePath], projectPath)
            console.log(chalk.greenBright.bold('\nset vitest success !'))
        }

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
            await fs.copySync(templatePath[`${unitTestLibType}Lib` as keyof typeof templatePath], projectPath)
            console.log(chalk.greenBright.bold('\nset jest success !'))
        }

        // TODO:处理monorepo文件名
        packageJson.name = projectName

        // 写入package.json
        await fs.writeJsonSync(`${projectPath}/package.json`, packageJson, { spaces: 2 })
        console.log(chalk.greenBright.bold('\ncreate package.json success !'))
        spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
        spinner.succeed()

    }catch (e) {
        spinner.fail()
        console.log(chalk.redBright.bold(e))
    }

}
