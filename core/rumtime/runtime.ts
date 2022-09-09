import chalk from 'chalk'
import { runRuntimeVue } from './runtime-vue'
import {ILibOption, IViteVueOption, PROJECTTYPE} from "../../utils";
import {runRuntimeLib} from "./runtime-lib";
export async function run(option: IViteVueOption & ILibOption) {
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

  if(projectType === PROJECTTYPE.LIB){
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
