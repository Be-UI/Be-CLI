import * as path from "path";
import { fileURLToPath,resolve } from 'url'
import {cwd} from "node:process";

const __filenameNew:string = fileURLToPath(import.meta.url)
export const __dirnameNew = path.dirname(__filenameNew)

export const cliRunPath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,'template/vue-vite/project')
export const packagePath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,'template/vue-vite/package-json')
export const viteConfigPath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,'template/vue-vite/vite-config')
const cliPackageFilePath = process.env.ENV === 'BECLIDEV' ? 'package.json' : '../package.json'
export const cliPackagePath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,cliPackageFilePath)

