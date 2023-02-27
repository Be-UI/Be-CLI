import chalk from 'chalk'
import { PROJECTTYPE } from '../utils'
import { runRuntimeVue } from './runtime-vue'
import { runRuntimeLib } from './runtime-lib'
import { runRuntimeReact } from './runtime-react'
import { runRuntimeOther } from './runtime-other'
import type { ILibOption, IOtherOption, IViteProjOption } from '../utils'
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
    const uiLib = uiLibType === 'element' ? 'ep' : 'antd'
    const templatePathName = `${projectType}-${uiLib}-${cssLibType}-${unitTestLibType}`
    console.log(templatePathName)
    /* const viteReactOption = {
      projectName,
      projectPath,
      uiLibType,
      cssLibType,
      projectType,
      unitTestLibType,
    }
    await runRuntimeReact(viteReactOption)
    return */
  }

  // vue project template runtime
  if (projectType === PROJECTTYPE.VUE) {
    const uiLib = uiLibType === 'element' ? 'ep' : 'antd'
    const templatePathName = `${projectType}-${uiLib}-${cssLibType}-${unitTestLibType}`
    /* const viteVueOption = {
      projectName,
      projectPath,
      uiLibType,
      cssLibType,
      projectType,
      unitTestLibType,
    }
    await runRuntimeVue(viteVueOption) */
    console.log(templatePathName)
  }

  // lib project template runtime
  if (projectType === PROJECTTYPE.LIB) {
    const templatePathName = `${projectType}-${envType}-gulp-${buildLibType}-${unitTestLibType}`
    /* const libOption = {
      projectName,
      projectPath,
      projectType,
      unitTestLibType,
      envType,
      buildLibType,
    }
    await runRuntimeLib(libOption) */
    console.log(templatePathName)
  }

  if (projectType === PROJECTTYPE.OTHER) {
    const templatePathName = otherType === 'bms' ? 'bms-simple'
      : otherType === 'puvue' ? 'pure-vue' : 'pure-react'
    /* const otherOption = {
      projectName,
      projectPath,
      projectType,
      unitTestLibType,
      otherType,
    }
    await runRuntimeOther(otherOption) */
    console.log(templatePathName)
  }
}
