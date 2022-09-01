import * as path from 'path'
import fs from 'fs-extra'
// @ts-ignore
import prompts from 'prompts'
import type { IPackageInfo } from './types'
const cp = require('child_process')
import {ISpawnOptions} from "./types";
export const getConfigFile = (): IPackageInfo => {
  const readPath = path.resolve(__dirname, '../package.json')
  const content = fs.readFileSync(readPath, 'utf-8')
  return JSON.parse(content) as IPackageInfo
}

export const promptsRun = async (option) => {
  const res = await prompts(option)
  return { ...res }
}

const runCommand = (
    command: string,
    args: string[],
    options: ISpawnOptions = {}
): Promise<any> =>
    new Promise((resolve, reject) => {
      const executedCommand = cp.spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        ...options
      })

      // fail
      executedCommand.on('error', (error: string | undefined) => {
        reject(new Error(error))
        console.log(error)
        process.exit(1)
      })

      // success
      executedCommand.on('exit', (code: number, ...args: any) => {
        if (code === 0) {
          resolve('')
        } else {
          reject(new Error(''))
        }
      })
    })
