import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import type { IViteProjOption } from '../../../utils'
import { templatePath, filterFile } from '../../../utils'
import {addBaseUnitTest} from "../add-unit-test";
import {addAtomCss} from "../add-atom-css";
import {readPackageJson, writePackageJson} from "../read-write-package";
export const runRuntimeReact = async (option: IViteProjOption) => {
    const {
        projectName,
        projectPath,
        uiLibType,
        unitTestLibType,
    } = option

    const spinner = ora('Loading').start()
    try {
        // 复制模板项目到目标路径
        spinner.color = 'blue'
        await fs.copySync(templatePath[`${uiLibType}React` as keyof typeof templatePath], projectPath, { filter: filterFile })

        // 读取 package.json ，修改名称
        const packageJson = await readPackageJson(option)
        packageJson.name = projectName

        // 设置原子css
        await addAtomCss(packageJson,option,'tsx')

        // 添加单元测试
        await addBaseUnitTest(packageJson,option,'React')
        if (unitTestLibType === 'vitest') {
            packageJson.devDependencies['@testing-library/react'] = '^12.0.0'
            packageJson.devDependencies['@testing-library/user-event'] = '^14.4.2'
        }

        if (unitTestLibType === 'jest') {
            packageJson.devDependencies['@testing-library/react'] = '^12.0.0'
            packageJson.devDependencies['@testing-library/user-event'] = '^14.4.2'
            packageJson.devDependencies['@babel/preset-react'] = "^7.18.6"
        }

        // 写入package.json
        await writePackageJson(projectPath,packageJson)

        spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
        spinner.succeed()
    }
    catch (e) {
        spinner.fail()
        console.log(chalk.redBright.bold(e))
    }
}
