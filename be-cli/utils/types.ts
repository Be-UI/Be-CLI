export interface IPackageInfo {
  name: string
  version: string
  description: string
  author: string
}
export interface IViteProjOption extends ICliOption{
  uiLibType: string
  cssLibType: string
  unitTestLibType: string
}

export interface ILibOption{
  templateDir: string
  projectName: string
  projectPath: string
}

export type IOtherOption = {
  templateDir: string
  projectName: string
  projectPath: string
}

export interface ICliOption {
  projectType: string
  projectName: string
  projectPath: string
}

export interface ISpawnOptions {
  cwd?: string
  env?: object
  argv0?: string
  stdio?: string
  detach?: boolean
  uid?: number
  gid?: number
  shell?: boolean | string
  timeout?: number
}
