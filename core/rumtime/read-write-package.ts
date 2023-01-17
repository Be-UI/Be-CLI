
import fs from 'fs-extra'
import chalk from 'chalk'
import type {ILibOption, IOtherOption, IViteProjOption} from '../../utils'

export async function readPackageJson(option: ILibOption | IViteProjOption | IOtherOption) {
  const { projectPath } = option
  console.log(chalk.blueBright.bold('\nstart creating package.json ...'))
  await fs.ensureDirSync(projectPath)
  const pkgContent = await fs.readJsonSync(`${projectPath}/package.json`)
  return pkgContent
}

export async function writePackageJson(projectPath: string, packageJson: any) {
  await fs.writeJsonSync(`${projectPath}/package.json`, packageJson, { spaces: 2 })
  console.log(chalk.greenBright.bold('\ncreate package.json success !'))
}
