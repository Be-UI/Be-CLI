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
  // 模版复制时过滤的文件
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

    // 读取 package.json ，修改名称
    console.log(chalk.bgBlueBright.bold('\nstart creating package.json ...'))
    await fs.ensureDirSync(projectPath)
    const packageJson = await fs.readJsonSync(`${projectPath}/package.json`)
    packageJson.name = projectName

    if (cssLibType === 'windicss') {
      console.log(chalk.bgBlueBright.bold('\nstart setting windicss ...'))

      // package.json添加依赖
      packageJson.devDependencies['vite-plugin-windicss'] = '^1.8.7'

      // 添加 windicss.config
      await fs.copySync(templatePath[cssLibType as keyof typeof templatePath], projectPath)
      await fs.ensureDirSync(projectPath)

      // 修改 main.ts
      const mainContext = await fs.readFile(`${projectPath}/src/main.ts`)
      await fs.outputFileSync(
          `${projectPath}/src/main.ts`,
          `import 'virtual:windi.css'\n${mainContext.toString()}`)

      // 修改 vite.config.ts
      const importWindicss = 'import WindiCSS from \'vite-plugin-windicss\''
      const pluginWindicss = 'WindiCSS(),'
      const viteConfigContext = await fs.readFile(`${projectPath}/vite.config.ts`)
      let viteCongfiRes = viteConfigContext.toString()
      viteCongfiRes = viteCongfiRes.replace('// IMPORT_FLAG', importWindicss)
      viteCongfiRes = viteCongfiRes.replace('// PLUGINS_FLAG', pluginWindicss)
      await fs.outputFileSync(`${projectPath}/vite.config.ts`, viteCongfiRes)
      console.log(chalk.bgGreenBright.bold('\nset windicss success !'))
    }

    if (cssLibType === 'unocss') {
      console.log(chalk.bgBlueBright.bold('\nstart setting unocss ...'))
      console.log(chalk.bgGreenBright.bold('\nset unocss success !'))
    }

    // 写入package.json
    await fs.writeJsonSync(`${projectPath}/package.json`, packageJson, { spaces: 2 })
    console.log(chalk.bgGreenBright.bold('\ncreate package.json success !'))

    spinner.text = chalk.bgGreenBright.bold(`\ncreate project <${projectName}> success !`)
    spinner.succeed()
  }
  catch (e) {
    spinner.fail()
    console.log(chalk.bgRedBright.bold(e))
  }
}
