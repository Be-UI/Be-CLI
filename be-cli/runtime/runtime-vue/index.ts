import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import { filterFile, templatePath } from '../../utils'
import { addBaseUnitTest, addUnitTestDeps } from '../add-unit-test'
import { addAtomCss } from '../add-atom-css'
import { readPackageJson, writePackageJson } from '../read-write-package'
import type { IViteProjOption } from '../../utils'
export const runRuntimeVue = async(option: IViteProjOption) => {
  const {
    projectName,
    projectPath,
    uiLibType,
  } = option

  const spinner = ora('Loading').start()
  try {
    // 复制模板项目到目标路径（vue -> element-plus / antd vue ）
    spinner.color = 'blue'
    await fs.copySync(templatePath[uiLibType as keyof typeof templatePath], projectPath, { filter: filterFile })

    // 读取 package.json ，修改名称
    let packageJson = await readPackageJson(option)
    packageJson.name = projectName

    // 设置原子css
    await addAtomCss(packageJson, option, 'ts')

    // 添加单元测试
    await addBaseUnitTest(packageJson, option, '')
    packageJson = addUnitTestDeps(packageJson, option, 'Vue')

    // 写入package.json
    await writePackageJson(projectPath, packageJson)

    spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
    spinner.succeed()
  } catch (e) {
    spinner.fail()
    console.log(chalk.redBright.bold(e))
  }
}