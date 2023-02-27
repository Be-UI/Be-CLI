import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import readdirp from 'readdirp'
import { addBaseUnitTest } from '../add-unit-test'
import { readPackageJson, writePackageJson } from '../read-write-package'
import { RUNENVTYPE, libTemplateName, templatePath } from '../../utils'

import type { ILibOption } from '../../utils'
export const runRuntimeLib = async(option: ILibOption) => {
  const {
    projectName,
    projectPath,
    buildLibType,
    envType,
  } = option
  const spinner = ora('Loading').start()
  try {
    // 复制模板项目到目标路径
    spinner.color = 'blue'
    await fs.copySync(templatePath[buildLibType as keyof typeof templatePath], projectPath)

    // TODO: 读取模板名称
    const templateName = libTemplateName[buildLibType as keyof typeof libTemplateName]
    // TODO: 读取 package.json
    let packageJson = await readPackageJson(option)
    // TODO: 修改模板名称为用户输入名称名称
    const packageJsonStr = JSON.stringify(packageJson).replaceAll(templateName, projectName)
    packageJson = JSON.parse(packageJsonStr)
    // TODO: 修改引用名称
    for await (const entry of readdirp(projectPath, { fileFilter: ['!.DS_Store'] })) {
      const { fullPath } = entry
      const context = await fs.readFile(`${fullPath}`)
      const contextStr = context.toString().replaceAll(templateName, projectName)
      await fs.outputFileSync(`${fullPath}`, contextStr)
    }
    // TODO: 修改 play 的子仓库名
    for await (const entry of readdirp(`${projectPath}/play`, { fileFilter: ['!.DS_Store'] })) {
      const { fullPath } = entry
      const context = await fs.readFile(`${fullPath}`)
      const contextStr = context.toString().replaceAll('template-play', projectName)
      await fs.outputFileSync(`${fullPath}`, contextStr)
    }

    // TODO: 写入package.json
    await writePackageJson(projectPath, packageJson)

    spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
    spinner.succeed()
  } catch (e) {
    spinner.fail()
    console.log(chalk.redBright.bold(e))
  }
}
