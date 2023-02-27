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

export interface ILibOption extends ICliOption{
  unitTestLibType: string
  envType: string
  buildLibType: string
}

export interface IOtherOption extends ICliOption{
  unitTestLibType: string
  otherType: string
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
