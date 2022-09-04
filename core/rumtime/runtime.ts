import chalk from 'chalk'
import type { ICliOption } from '../../utils'
import { runViteVue } from './vite-vue'
export async function run(option: ICliOption) {
  const {
    projectName,
    projectType,
    projectPath,
    uiLibType,
    cssLibType,
    unitTestLibType,
  } = option

  if (projectType === 'vue') {
    console.log(chalk.bgBlueBright.bold(`\nstart creating project <${projectName}> ...`))
    const viteVueOption = {
      projectName,
      projectPath,
      uiLibType,
      cssLibType,
      unitTestLibType,
    }
    await runViteVue(viteVueOption)
  }
}
