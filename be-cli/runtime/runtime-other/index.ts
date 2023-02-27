import ora from 'ora'
import chalk from 'chalk'
import fs from 'fs-extra'
import { filterFile } from '../../utils'
import { readPackageJson, writePackageJson } from '../read-write-package'
import type { IOtherOption } from '../../utils'

export async function runRuntimeOther(option: IOtherOption) {
  const {
    projectName,
    projectPath,
    templateDir,
  } = option
  const spinner = ora('Loading').start()
  try {
    spinner.color = 'blue'
    // 复制模板项目
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
