
import { IViteVueOption } from '../../../utils'
import ora from 'ora'
import fs from "fs-extra";
import {templatePath} from '../../../utils'
import chalk from "chalk";
export const runViteVue = async (option:IViteVueOption) =>{
    const {
        projectName,
        projectPath,
        uiLibType,
    } = option
    const filterFile = (src:string) => {
        if( src.indexOf('auto-imports.d') >= 0
            || src.indexOf('components.d') >= 0
            || src.indexOf('.git') >= 0
            || src.indexOf('.idea') >= 0 ){
            return false
        }
        return true
    }
    const spinner = ora('Loading').start()
    try {
        // 复制模板项目到目标路径
        spinner.color = 'blue'
        console.log(uiLibType)
        await fs.copySync(templatePath[uiLibType as keyof typeof templatePath], projectPath, { filter: filterFile })

        // 读取 package.json ，修改名称并存储
        console.log(chalk.bgBlueBright.bold( `\nstart creating package.json ...`))

        await fs.ensureDirSync(projectPath)
        const packageJson = await fs.readJsonSync(`${projectPath}/package.json`)
        packageJson.name = projectName
        await fs.writeJsonSync(`${projectPath}/package.json`, packageJson,{ spaces: 2 })

        console.log(chalk.bgGreenBright.bold( `\ncreate package.json success !`))
        spinner.text = chalk.bgGreenBright.bold( `\ncreate project <${projectName}> success !`)
        spinner.succeed()
    } catch (e){
        spinner.fail()
        console.log(chalk.bgRedBright.bold(e))
    }

}
