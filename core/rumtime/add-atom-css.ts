import {IViteProjOption, templatePath} from "../../utils";
import fs from 'fs-extra'
import chalk from 'chalk'
export async function addAtomCss(packageJson:any,option: IViteProjOption,fileType:string) {
    const {
        projectPath,
        cssLibType,
    } = option

    if (cssLibType === 'windicss') {
        console.log(chalk.blueBright.bold('\nstart setting windicss ...'))

        // package.json添加依赖
        packageJson.devDependencies['vite-plugin-windicss'] = '^1.8.7'
        packageJson.devDependencies['windicss'] = '^3.5.6'

        // 添加 windicss.config
        await fs.copySync(templatePath[cssLibType as keyof typeof templatePath], projectPath)

        // 修改 main.ts
        await fs.ensureDirSync(projectPath)
        const mainContext = await fs.readFile(`${projectPath}/src/main.${fileType}`)
        await fs.outputFileSync(
            `${projectPath}/src/main.${fileType}`,
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
        const mainContext = await fs.readFile(`${projectPath}/src/main.${fileType}`)
        await fs.outputFileSync(
            `${projectPath}/src/main.${fileType}`,
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
}
