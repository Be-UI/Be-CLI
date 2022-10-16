
import fs from 'fs-extra'
import chalk from 'chalk'
import {ILibOption,IViteProjOption} from "../../utils";

export async function readPackageJson(option: ILibOption | IViteProjOption){
    const {
        projectPath,
    } = option
    console.log(chalk.blueBright.bold('\nstart creating package.json ...'))
    await fs.ensureDirSync(projectPath)
    return await fs.readJsonSync(`${projectPath}/package.json`)
}

export async function writePackageJson(projectPath:string, packageJson:any){
    await fs.writeJsonSync(`${projectPath}/package.json`, packageJson, { spaces: 2 })
    console.log(chalk.greenBright.bold('\ncreate package.json success !'))
}

