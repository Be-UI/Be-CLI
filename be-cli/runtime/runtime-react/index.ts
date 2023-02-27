import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import { filterFile } from '../../utils'
import { readPackageJson, writePackageJson } from '../read-write-package'
import type { IProjOption } from '../../utils'
export const runRuntimeReact = async(option: IProjOption) => {
  const {
    projectName,
    projectPath,
    templateDir,
  } = option

  const spinner = ora('Loading').start()
  try {
    // 复制模板项目到目标路径
    spinner.color = 'blue'
    await fs.copySync(templateDir, projectPath, { filter: filterFile })

    // 读取 package.json ，修改名称
    const packageJson = await readPackageJson(option)
    packageJson.name = projectName

    // 写入package.json
    await writePackageJson(projectPath, packageJson)

    spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
    spinner.succeed()
  } catch (e) {
    spinner.fail()
    console.log(chalk.redBright.bold(e))
  }
}
