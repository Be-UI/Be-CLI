import * as path from 'path'
import { fileURLToPath } from 'url'
import { cwd } from 'node:process'

const __filenameNew: string = fileURLToPath(import.meta.url)

export const __dirnameNew = path.dirname(__filenameNew)

export const getTemplateDir = () => path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'template')

export const cliPackagePath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew, 'package.json')
