import {ILibOption, libTemplateName, RUNENVTYPE, templatePath} from "../../../utils";
import ora from 'ora'
import fs from 'fs-extra'
import chalk from 'chalk'
import readdirp from 'readdirp';
import {addBaseUnitTest} from "../add-unit-test";
import {readPackageJson, writePackageJson} from "../read-write-package";
export const runRuntimeLib = async (option: ILibOption) => {

    const {
        projectName,
        projectPath,
        buildLibType,
        envType,
    } = option
    const spinner = ora('Loading').start()
    try {
        // 复制模板项目到目标路径
        spinner.color = 'blue'
        await fs.copySync(templatePath[buildLibType as keyof typeof templatePath], projectPath)
        const templateName = libTemplateName[buildLibType as keyof typeof libTemplateName]

        // 读取 package.json
        let packageJson = await readPackageJson(option)
        // 修改名称
        let packageJsonStr = JSON.stringify(packageJson).replaceAll(templateName,projectName)
        packageJson = JSON.parse(packageJsonStr)

        // 添加浏览器环境play
        if(envType === RUNENVTYPE.BROWSER){
            const libTemplatePath = templatePath[envType as keyof typeof templatePath]
            // 1.移删除node下dist的play
            await fs.removeSync(`${projectPath}/play`)
            // 2.移动browser的play到dist
            await fs.copySync(libTemplatePath, `${projectPath}/play`)
            // 3.修改主仓库 package.json dev指令为play的dev指令
            packageJson.scripts.dev = `pnpm run --filter @${projectName}/play dev`
        }

        // 添加单元测试
        await addBaseUnitTest(packageJson,option,'Lib')

        for await (const entry of readdirp(projectPath,{fileFilter:['!.DS_Store']})) {
            const { fullPath } = entry
            let context = await fs.readFile(`${fullPath}`)
            let contextStr = context.toString().replaceAll(templateName,projectName)
            await fs.outputFileSync(`${fullPath}`, contextStr)
        }
        // 修改 play 的子仓库名
        for await (const entry of readdirp(`${projectPath}/play`,{fileFilter:['!.DS_Store']})) {
            const { fullPath } = entry
            let context = await fs.readFile(`${fullPath}`)
            let contextStr = context.toString().replaceAll('template-play',projectName)
            await fs.outputFileSync(`${fullPath}`, contextStr)
        }

        // 写入package.json
        await writePackageJson(projectPath,packageJson)

        spinner.text = chalk.greenBright.bold(`\ncreate project <${projectName}> success !`)
        spinner.succeed()

    }catch (e) {
        spinner.fail()
        console.log(chalk.redBright.bold(e))
    }

}
