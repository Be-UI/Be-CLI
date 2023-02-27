export interface IPackageInfo {
  name: string
  version: string
  description: string
  author: string
}
export interface IProjOption {
  templateDir: string
  projectName: string
  projectPath: string
}

export interface ICliOption {
  projectType: string
  projectName: string
  projectPath: string
  uiLibType: string
  cssLibType: string
  unitTestLibType: string
  envType: string
  buildLibType: string
  otherType: string
}
