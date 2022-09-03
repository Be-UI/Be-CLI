import * as path from "path";
import { fileURLToPath,resolve } from 'url'
import {cwd} from "node:process";

const __filenameNew:string = fileURLToPath(import.meta.url)
export const __dirnameNew = path.dirname(__filenameNew)

export const templatePath = {
    'element': path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,'template/vue-vite/element'),
    'antd': path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,'template/vue-vite/antd'),
    'windicss': path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,'template/vue-vite/windicss'),
    'unocss': path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,'template/vue-vite/unocss'),
}

const cliPackageFilePath = process.env.ENV === 'BECLIDEV' ? 'package.json' : '../package.json'
export const cliPackagePath = path.resolve(process.env.ENV === 'BECLIDEV' ? cwd() : __dirnameNew,cliPackageFilePath)

