import {BUILDLIBTYPE, ILibOption, RUNENVTYPE, templatePath} from "../../../utils";
import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'

export const runRuntimeLib = async (option: ILibOption) => {
    console.log(option)
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

        // 读取 package.json
        console.log(chalk.blueBright.bold('\nstart creating package.json ...'))
        await fs.ensureDirSync(projectPath)
        const packageJson = await fs.readJsonSync(`${projectPath}/package.json`)

        // 添加浏览器环境play
        if(envType === RUNENVTYPE.BROWSER){
            // 1.移删除node下dist
            await fs.removeSync(`${projectPath}/play`)
            // 2.移动browser到play到dist
            await fs.copySync(templatePath[envType as keyof typeof templatePath], `${projectPath}/play`)
            // 3.修改package.json dev指令为play的dev指令
            packageJson.scripts.dev = 'pnpm run --filter @template-node-tsup/play dev'
        }
        // 添加单元测试

        // 处理monorepo文件名
        packageJson.name = projectName

        // 写入package.json
        await fs.writeJsonSync(`${projectPath}/package.json`, packageJson, { spaces: 2 })
        console.log(chalk.greenBright.bold('\ncreate package.json success !'))
        spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
        spinner.succeed()

    }catch (e) {
        spinner.fail()
        console.log(chalk.redBright.bold(e))
    }

}
