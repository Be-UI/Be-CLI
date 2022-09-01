/**
 * @author baiwusanyu
 * @description 执行commander入口
 */

import * as path from 'path'
import { Command } from 'commander'
import {run} from "./rumtime/runtime";

import {
  cssLibTypeOptions,
  getConfigFile,
  projectNameOptions,
  projectTypeOptions,
  promptsRun,
  uiLibTypeOptions, uiTypeOptions,
} from '../utils'

// 获取package 文件配置信息
const configInfo = getConfigFile()

const program = new Command()
program
  .name(configInfo.name)
  .description(configInfo.description)
  .version(configInfo.version)

program.action(async () => {
  // 输入项目名称
  const nameRes = await promptsRun(projectNameOptions)
  // 选择项目模板类型
  const typeRes = await promptsRun(projectTypeOptions)
  // 选择使用ui组件库还是css原子样式库
  const uiRes = await promptsRun(uiTypeOptions)
  // 根据uiRes选择使用那个组件库或css原子样式库
  let cssUiRes = null
  if (uiRes.uiType === 'ui')
    cssUiRes = await promptsRun(uiLibTypeOptions)

  if (uiRes.uiType === 'css')
    cssUiRes = await promptsRun(cssLibTypeOptions)

  // 项目存储路径
  const rootPath = process.cwd()
  const projectPath = path.resolve(rootPath, nameRes.projectName)
  // 组装配置对象
  const options = { ...nameRes, ...typeRes, projectPath, ...cssUiRes } as any
  // 开始运行命令
  await run(options)
})

program.parse()
