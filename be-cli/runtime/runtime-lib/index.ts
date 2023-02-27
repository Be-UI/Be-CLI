import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import readdirp from 'readdirp'
import { readPackageJson, writePackageJson } from '../read-write-package'

import type { IProjOption } from '../../utils'
export const runRuntimeLib = async(option: IProjOption) => {
  const {
    projectName,
    projectPath,
    templateDir,
  } = option
  const spinner = ora('Loading').start()
  try {
    // 复制模板项目到目标路径
    spinner.color = 'blue'
    await fs.copySync(templateDir, projectPath)

    // 读取 package.json
    let packageJson = await readPackageJson(option)
    const name = packageJson.name
    // 修改模板名称为用户输入名称名称
    const packageJsonStr = JSON.stringify(packageJson).replaceAll(name, projectName)
    packageJson = JSON.parse(packageJsonStr)
    // 修改引用名称
    for await (const entry of readdirp(projectPath, { fileFilter: ['!.DS_Store'] })) {
      const { fullPath } = entry
      const context = await fs.readFile(`${fullPath}`)
      const contextStr = context.toString().replaceAll(name, projectName)
      await fs.outputFileSync(`${fullPath}`, contextStr)
    }
    // 修改 play 的子仓库名
    for await (const entry of readdirp(`${projectPath}/play`, { fileFilter: ['!.DS_Store'] })) {
      const { fullPath } = entry
      const context = await fs.readFile(`${fullPath}`)
      const contextStr = context.toString().replaceAll(`@be-ui-cli/${name}-play`, projectName)
      await fs.outputFileSync(`${fullPath}`, contextStr)
    }

    // 写入package.json
    await writePackageJson(projectPath, packageJson)

    spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
    spinner.succeed()
  } catch (e) {
    spinner.fail()
    console.log(chalk.redBright.bold(e))
  }
}
