
import { IViteVueOption } from '../../../utils'
import ora from 'ora'
import * as fs from "fs-extra";
import {cliRunPath,packagePath,viteConfigPath} from '../../../utils'
import * as chalk from "chalk";
export const runViteVue = async (option:IViteVueOption) =>{
    const {
        projectName,
        projectPath,
        uiLibType,
    } = option
    const filterFile = (src) => {
        if(
            src.indexOf('node_modules') >= 0
            || src.indexOf('auto-imports.d') >= 0
            || src.indexOf('components.d') >= 0
            || src.indexOf('.git') >= 0
            || src.indexOf('.idea') >= 0 ){
            return false
        }
        return true
    }
    try {
        const spinner = ora('Loading').start()
        spinner.color = 'blue'
        await fs.copySync(cliRunPath, projectPath, { filter: filterFile })
        // 根据 uiLibType 选择不同的 package.json 文件路径
        console.log(chalk.bgBlueBright.bold( `\nstart creating package.json ...`))
        await fs.ensureDirSync(projectPath)
        // 读取 package.json ，修改名称并存储
        const packageJsonPath = `${packagePath}/package-${uiLibType}.json`
        const packageJson = await fs.readJsonSync(packageJsonPath)
        packageJson.name = projectName
        await fs.writeJsonSync(`${projectPath}/package.json`, packageJson,{ spaces: 2 })
        console.log(chalk.bgGreenBright.bold( `\ncreate package.json success !`))

        // 根据 uiLibType 选择不同的 vite.config.ts 文件路径
        console.log(chalk.bgBlueBright.bold( `\nstart creating vite.config.ts ...`))
        // 读取 vite.config.ts ，修改名称并存储
        const viteConfigFilePath = `${viteConfigPath}/vite.config-${uiLibType}.ts`
        const viteConfigFileContext = await fs.readFile(viteConfigFilePath)
        await fs.outputFileSync(`${projectPath}/vite.config.ts`, viteConfigFileContext.toString())
        console.log(chalk.bgGreenBright.bold( `\ncreate vite.config.ts success !`))
        spinner.text = chalk.bgGreenBright.bold( `\ncreate project <${projectName}> success !`)
        spinner.succeed()
    } catch (e){
        console.log(chalk.bgRedBright.bold(e))
    }

}
