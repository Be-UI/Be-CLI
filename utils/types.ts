export interface IPackageInfo {
  name: string
  version: string
  description: string
  author: string
}
export interface IViteVueOption {
  projectName: string
  projectPath: string
  uiLibType: string
  cssLibType: string
  unitTestLibType: string
}

export interface ICliOption extends IViteVueOption {
  projectType: string
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
