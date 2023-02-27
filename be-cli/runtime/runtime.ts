import chalk from 'chalk'
import {getTemplateDir, ICliOption, PROJECTTYPE} from '../utils'
import { runRuntimeVue } from './runtime-vue'
import { runRuntimeLib } from './runtime-lib'
import { runRuntimeReact } from './runtime-react'
import { runRuntimeOther } from './runtime-other'
export async function run(option: ICliOption) {
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
     const viteReactOption = {
       projectName,
       projectPath,
       templateDir
    }
    await runRuntimeReact(viteReactOption)
    return
  }

  // vue project template runtime
  if (projectType === PROJECTTYPE.VUE) {
    const uiLib = uiLibType === 'element' ? 'ep' : 'antd'
    const templatePathName = `${projectType}-${uiLib}-${cssLibType}-${unitTestLibType}`
    const templateDir= `${getTemplateDir()}/${templatePathName}`
    const viteVueOption = {
      projectName,
      projectPath,
      templateDir
    }
    await runRuntimeVue(viteVueOption)
  }

  // lib project template runtime
  if (projectType === PROJECTTYPE.LIB) {
    const templatePathName = `${projectType}-${envType}-gulp-${buildLibType}-${unitTestLibType}`
    const templateDir= `${getTemplateDir()}/${templatePathName}`
    const libOption = {
      projectName,
      projectPath,
      templateDir
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
