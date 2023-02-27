
import fs from 'fs-extra'
import prompts from 'prompts'
import { cliPackagePath } from './path'
import type { IPackageInfo } from './types'
export const getConfigFile = (): IPackageInfo => {
  const content = fs.readFileSync(cliPackagePath, 'utf-8')
  return JSON.parse(content) as IPackageInfo
}

export const promptsRun = async(option: prompts.PromptObject[]) => {
  const res = await prompts(option)
  return { ...res }
}
export const filterFile = (src: string) => {
  if ((src.includes('auto-imports.d')
      || src.includes('components.d')
      || src.includes('.git')
      || src.includes('.idea')) && src.includes('.gitignore'))
    return false

  return true
}
