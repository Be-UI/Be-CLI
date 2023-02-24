import ora from 'ora'
import chalk from 'chalk'
import fs from 'fs-extra'
import { OTHERTYPE, filterFile, templatePath } from '../../../utils'
import { readPackageJson, writePackageJson } from '../read-write-package'
import { addBaseUnitTest, addUnitTestDeps } from '../add-unit-test'
import type { IOtherOption } from '../../../utils'

export async function runRuntimeOther(option: IOtherOption) {
  const {
    projectName,
    projectPath,
    otherType,
  } = option
  const spinner = ora('Loading').start()
  try {
    spinner.color = 'blue'
    await fs.copySync(templatePath[otherType as keyof typeof templatePath], projectPath, { filter: filterFile })

    // 读取 package.json ，修改名称
    let packageJson = await readPackageJson(option)
    packageJson.name = projectName

    // 添加单元测试
    await addBaseUnitTest(packageJson, option, otherType === OTHERTYPE.PUREACT ? 'React' : '')
    if (otherType === OTHERTYPE.PUREACT)
      packageJson = addUnitTestDeps(packageJson, option, 'React')
    else
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
