import {BUILDLIBTYPE, ILibOption, templatePath} from "../../../utils";
import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'

export const runRuntimeLib = async (option: ILibOption) => {
    const {
        projectName,
        projectPath,
        projectType,
        buildLibType,
        envType,
        unitTestLibType,
    } = option
    const spinner = ora('Loading').start()
    try {
        // 复制模板项目到目标路径
        spinner.color = 'blue'
        await fs.copySync(templatePath[buildLibType as keyof typeof templatePath], projectPath)
        // 添加浏览器环境play
        // 1.移删除node下dist
        // 2.移动browser到play到dist
        // 3.修改package.json dev指令为play的dev指令

        // 添加单元测试

        // 处理monorepo文件名
        spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
        spinner.succeed()

    }catch (e) {
        spinner.fail()
        console.log(chalk.redBright.bold(e))
    }

}
