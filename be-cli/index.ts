/**
 * @author baiwusanyu
 * @description 执行commander入口
 */

import * as path from 'path'
import process from 'process'
import { Command } from 'commander'
import { cac } from 'cac'

import {
  PROJECTTYPE,
  buildLibTypeOptions,
  cssLibTypeOptions,
  envTypeOptions,
  getConfigFile,
  otherTypeOptions,
  projectNameOptions,
  projectTypeOptions,
  promptsRun,
  uiLibTypeOptions,
  uiLibTypeReactOptions,
  unitTestTypeOptions,
} from './utils'
import { run as runtimeStart } from './runtime/runtime'

export function BeCLIRun() {
// 获取package 文件配置信息
  const configInfo = getConfigFile()

  const program = new Command()
  program
    .name(configInfo.name)
    .description(configInfo.description)
    .version(configInfo.version)

  program.action(async() => {
    // 输入项目名称
    const nameRes = await promptsRun(projectNameOptions)
    // 选择项目模板类型
    const typeRes = await promptsRun(projectTypeOptions)

    let componentUiRes = {}
    let cssUiRes = {}
    let buildRes = {}
    let runEnvRes = {}
    let otherRes = {}
    if (typeRes.projectType === PROJECTTYPE.LIB) {
      // 选择使用那个打包库
      buildRes = await promptsRun(buildLibTypeOptions)
      // 选择使用那个运行环境
      runEnvRes = await promptsRun(envTypeOptions)
    } else if (typeRes.projectType === PROJECTTYPE.OTHER) {
      otherRes = await promptsRun(otherTypeOptions)
    } else {
      // 选择使用那个组件库
      componentUiRes = await promptsRun(
        typeRes.projectType === PROJECTTYPE.REACT ? uiLibTypeReactOptions : uiLibTypeOptions)
      // 选择使用那个css原子样式库
      cssUiRes = await promptsRun(cssLibTypeOptions)
    }

    // 选择使用单元测试
    let unitTestRes = {}
    if (typeRes.projectType !== PROJECTTYPE.OTHER)
      unitTestRes = await promptsRun(unitTestTypeOptions)

    // 项目存储路径
    const rootPath = process.cwd()
    const projectPath = path.resolve(rootPath, nameRes.projectName)
    // 组装配置对象
    const options = {
      projectPath,
      ...componentUiRes,
      ...cssUiRes,
      ...buildRes,
      ...runEnvRes,
      ...nameRes,
      ...typeRes,
      ...unitTestRes,
      ...otherRes,
    } as any
    // 开始运行命令
    await runtimeStart(options)
  })

  program.parse()
}

export const run = async() => {
  const pkg = getConfigFile()
  const cli = cac('be-ui-cli')
  cli.command('create', 'Select template project').action(async() => {
    await BeCLIRun()
  })
  cli.help()
  cli.version(pkg.version)
  cli.parse()
}
