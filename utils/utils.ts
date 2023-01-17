// import { spawn } from 'child_process'
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

/* const runCommand = (
  command: string,
  args: string[],
  options: ISpawnOptions = {},
): Promise<any> =>
  new Promise((resolve, reject) => {
    const executedCommand = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    } as any)

    // fail
    executedCommand.on('error', (error: string | undefined) => {
      reject(new Error(error))
      console.log(error)
      process.exit(1)
    })

    // success
    executedCommand.on('exit', (code: number) => {
      if (code === 0)
        resolve('')
      else
        reject(new Error('err'))
    })
  }) */
