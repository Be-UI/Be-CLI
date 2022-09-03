import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import type { IViteVueOption } from '../../../utils'
import { templatePath } from '../../../utils'
export const runViteVue = async (option: IViteVueOption) => {
  const {
    projectName,
    projectPath,
    uiLibType,
    cssLibType,
  } = option
  const filterFile = (src: string) => {
    if (src.includes('auto-imports.d')
            || src.includes('components.d')
            || src.includes('.git')
            || src.includes('.idea'))
      return false

    return true
  }
  const spinner = ora('Loading').start()
  try {
    // 复制模板项目到目标路径
    spinner.color = 'blue'
    await fs.copySync(templatePath[uiLibType as keyof typeof templatePath], projectPath, { filter: filterFile })

    // 读取 package.json ，修改名称并存储
    console.log(chalk.bgBlueBright.bold('\nstart creating package.json ...'))

    await fs.ensureDirSync(projectPath)
    const packageJson = await fs.readJsonSync(`${projectPath}/package.json`)
    packageJson.name = projectName
    await fs.writeJsonSync(`${projectPath}/package.json`, packageJson, { spaces: 2 })
    console.log(chalk.bgGreenBright.bold('\ncreate package.json success !'))

    if (cssLibType === 'windicss') {
      console.log(chalk.bgBlueBright.bold('\nstart setting windicss ...'))
      console.log(chalk.bgGreenBright.bold('\nset windicss success !'))
    }

    if (cssLibType === 'unocss') {
      console.log(chalk.bgBlueBright.bold('\nstart setting unocss ...'))
      console.log(chalk.bgGreenBright.bold('\nset unocss success !'))
    }

    spinner.text = chalk.bgGreenBright.bold(`\ncreate project <${projectName}> success !`)
    spinner.succeed()
  }
  catch (e) {
    spinner.fail()
    console.log(chalk.bgRedBright.bold(e))
  }
}
