import chalk from 'chalk'
import { PROJECTTYPE } from '../../utils'
import { runRuntimeVue } from './runtime-vue'
import { runRuntimeLib } from './runtime-lib'
import { runRuntimeReact } from './runtime-react'
import type { ILibOption, IViteProjOption } from '../../utils'
export async function run(option: IViteProjOption & ILibOption) {
  const {
    projectName,
    projectType,
    projectPath,
    uiLibType,
    cssLibType,
    unitTestLibType,
    envType,
    buildLibType,
  } = option

  console.log(chalk.blueBright.bold(`\nstart creating project <${projectName}> ...`))

  // react project template runtime
  if (projectType === PROJECTTYPE.REACT) {
    const viteReactOption = {
      projectName,
      projectPath,
      uiLibType,
      cssLibType,
      projectType,
      unitTestLibType,
    }
    await runRuntimeReact(viteReactOption)
    return
  }

  // vue project template runtime
  if (projectType === PROJECTTYPE.VUE) {
    const viteVueOption = {
      projectName,
      projectPath,
      uiLibType,
      cssLibType,
      projectType,
      unitTestLibType,
    }
    await runRuntimeVue(viteVueOption)
    return
  }

  // lib project template runtime
  if (projectType === PROJECTTYPE.LIB) {
    const libOption = {
      projectName,
      projectPath,
      projectType,
      unitTestLibType,
      envType,
      buildLibType,
    }
    await runRuntimeLib(libOption)
  }
}
