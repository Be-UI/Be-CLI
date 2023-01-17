import chalk from 'chalk'
import { PROJECTTYPE} from '../../utils'
import { runRuntimeVue } from './runtime-vue'
import { runRuntimeLib } from './runtime-lib'
import { runRuntimeReact } from './runtime-react'
import { runRuntimeOther } from './runtime-other'
import type { ILibOption, IViteProjOption, IOtherOption } from '../../utils'
export async function run(option: IViteProjOption & ILibOption & IOtherOption) {
  const {
    projectName,
    projectType,
    projectPath,
    uiLibType,
    cssLibType,
    unitTestLibType,
    envType,
    buildLibType,
    otherType,
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

  if (projectType === PROJECTTYPE.OTHER) {
    const otherOption = {
      projectName,
      projectPath,
      projectType,
      unitTestLibType,
      otherType,
    }
    await runRuntimeOther(otherOption)
  }
}
