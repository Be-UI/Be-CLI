import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import type { IViteProjOption } from '../../../utils'
import { templatePath } from '../../../utils'
import {addUnitTest} from "../add-unit-test";
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

    // 设置windicss 或 unocss
    if (cssLibType === 'windicss') {
      console.log(chalk.blueBright.bold('\nstart setting windicss ...'))

      // package.json添加依赖
      packageJson.devDependencies['vite-plugin-windicss'] = '^1.8.7'
      packageJson.devDependencies['windicss'] = '^3.5.6'

      // 添加 windicss.config
      await fs.copySync(templatePath[cssLibType as keyof typeof templatePath], projectPath)

      // 修改 main.ts
      await fs.ensureDirSync(projectPath)
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
      console.log(chalk.greenBright.bold('\nset windicss success !'))
    }

    if (cssLibType === 'unocss') {
      console.log(chalk.blueBright.bold('\nstart setting unocss ...'))

      // package.json添加依赖
      packageJson.devDependencies.unocss = '^0.45.6'
      packageJson.devDependencies['@unocss/preset-icons'] = '^0.45.6'
      packageJson.devDependencies['@unocss/reset'] = '^0.45.6'
      packageJson.devDependencies['@iconify-json/ph'] = '^1.1.2'

      // 添加 unocss.config
      await fs.copySync(templatePath[cssLibType as keyof typeof templatePath], projectPath)

      // 修改 main.ts
      await fs.ensureDirSync(projectPath)
      const mainContext = await fs.readFile(`${projectPath}/src/main.ts`)
      await fs.outputFileSync(
          `${projectPath}/src/main.ts`,
          `import '@unocss/reset/tailwind.css'\nimport 'uno.css'\n${mainContext.toString()}`)
      // 修改 vite.config.ts
      const importWindicss = 'import Unocss from \'unocss/vite\''
      const pluginWindicss = 'Unocss(),'
      const viteConfigContext = await fs.readFile(`${projectPath}/vite.config.ts`)
      let viteCongfiRes = viteConfigContext.toString()
      viteCongfiRes = viteCongfiRes.replace('// IMPORT_FLAG', importWindicss)
      viteCongfiRes = viteCongfiRes.replace('// PLUGINS_FLAG', pluginWindicss)
      await fs.outputFileSync(`${projectPath}/vite.config.ts`, viteCongfiRes)
      console.log(chalk.greenBright.bold('\nset unocss success !'))
    }

    // 添加单元测试
    await addUnitTest(packageJson,option)
    packageJson.devDependencies['@vue/test-utils'] = '^2.0.2'
    packageJson.devDependencies['@vue/babel-plugin-jsx'] = '^1.1.1'

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
