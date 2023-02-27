import chalk from 'chalk'
import {getTemplateDir, PROJECTTYPE} from '../utils'
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
    const templateDir= `${getTemplateDir()}/${templatePathName}`
    console.log(templateDir)
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
    const templateDir= `${getTemplateDir()}/${templatePathName}`
    console.log(templateDir)
    /* const viteVueOption = {
      projectName,
      projectPath,
      uiLibType,
      cssLibType,
      projectType,
      unitTestLibType,
    }
    await runRuntimeVue(viteVueOption) */
  }

  // lib project template runtime
  if (projectType === PROJECTTYPE.LIB) {
    const templatePathName = `${projectType}-${envType}-gulp-${buildLibType}-${unitTestLibType}`
    const templateDir= `${getTemplateDir()}/${templatePathName}`
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
    const templatePathName = otherType === 'bms' ? 'bms-simple'
      : otherType === 'puvue' ? 'pure-vue' : 'pure-react'
    const templateDir= `${getTemplateDir()}/${templatePathName}`
     const otherOption = {
      projectName,
      projectPath,
      templateDir,
    }
    await runRuntimeOther(otherOption)
  }
}
