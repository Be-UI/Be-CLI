import {filterFile, IOtherOption, templatePath} from "../../../utils";
import ora from "ora";
import chalk from "chalk";
import fs from "fs-extra";
import {readPackageJson, writePackageJson} from "../read-write-package";
import {addBaseUnitTest} from "../add-unit-test";

export async function runRuntimeOther(option: IOtherOption){
  const {
    projectName,
    projectPath,
    unitTestLibType,
    otherType
  } = option
  const spinner = ora('Loading').start()
  try {
    spinner.color = 'blue'
    // TODO

    // 复制模板项目到目标路径（vue -> element-plus / antd vue ）
    spinner.color = 'blue'
    await fs.copySync(templatePath[otherType as keyof typeof templatePath], projectPath, { filter: filterFile })

    // 读取 package.json ，修改名称
    const packageJson = await readPackageJson(option)
    packageJson.name = projectName

    // 添加单元测试
    await addBaseUnitTest(packageJson, option, '')
    if (unitTestLibType === 'vitest')
      packageJson.devDependencies['@vue/test-utils'] = '^2.0.2'

    if (unitTestLibType === 'jest') {
      packageJson.devDependencies['@vue/test-utils'] = '^2.0.2'
      packageJson.devDependencies['@vue/babel-plugin-jsx'] = '^1.1.1'
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