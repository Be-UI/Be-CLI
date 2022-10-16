import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import type { IViteProjOption } from '../../../utils'
import { templatePath } from '../../../utils'
import {addBaseUnitTest} from "../add-unit-test";
import {addAtomCss} from "../add-atom-css";
export const runRuntimeVue = async (option: IViteProjOption) => {
  const {
    projectName,
    projectPath,
    uiLibType,
    cssLibType,
    unitTestLibType,
  } = option
  // 模版复制时过滤的文件
  const filterFile = (src: string) => {
    if ((src.includes('auto-imports.d')
            || src.includes('components.d')
            || src.includes('.git')
            || src.includes('.idea')) && src.includes('.gitignore'))
      return false

    return true
  }
  const spinner = ora('Loading').start()
  try {
    // 复制模板项目到目标路径（vue -> element-plus / antd vue ）
    spinner.color = 'blue'
    await fs.copySync(templatePath[uiLibType as keyof typeof templatePath], projectPath, { filter: filterFile })

    // 读取 package.json ，修改名称
    console.log(chalk.blueBright.bold('\nstart creating package.json ...'))
    await fs.ensureDirSync(projectPath)
    const packageJson = await fs.readJsonSync(`${projectPath}/package.json`)
    packageJson.name = projectName

    // 设置原子css
    await addAtomCss(packageJson,option,'ts')

    // 添加单元测试
    await addBaseUnitTest(packageJson,option,'')
    if (unitTestLibType === 'vitest') {
      packageJson.devDependencies['@vue/test-utils'] = '^2.0.2'
    }
    if (unitTestLibType === 'jest') {
      packageJson.devDependencies['@vue/test-utils'] = '^2.0.2'
      packageJson.devDependencies['@vue/babel-plugin-jsx'] = '^1.1.1'
    }

    // 写入package.json
    await fs.writeJsonSync(`${projectPath}/package.json`, packageJson, { spaces: 2 })
    console.log(chalk.greenBright.bold('\ncreate package.json success !'))

    spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
    spinner.succeed()
  }
  catch (e) {
    spinner.fail()
    console.log(chalk.redBright.bold(e))
  }
}
