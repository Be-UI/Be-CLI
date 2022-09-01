import {cwd} from "node:process";
import * as path from "path";

export const cliRunPath = path.resolve(cwd(),'template/vue-vite/project')
export const packagePath = path.resolve(cwd(),'template/vue-vite/package-json')
export const viteConfigPath = path.resolve(cwd(),'template/vue-vite/vite-config')
