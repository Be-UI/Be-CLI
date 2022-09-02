import {ICliOption} from '../../utils'
import { runViteVue } from "./vite-vue";
import chalk from 'chalk'
export async function run(option:ICliOption){
    const {
        projectName,
        projectType,
        projectPath,
        uiLibType,
    } = option

    if(projectType === 'vue'){
        console.log(chalk.bgBlueBright.bold( `\nstart creating project <${projectName}> ...`))
        let viteVueOption = {
            projectName,
            projectPath,
            uiLibType
        }
        await runViteVue(viteVueOption)
    }
}
