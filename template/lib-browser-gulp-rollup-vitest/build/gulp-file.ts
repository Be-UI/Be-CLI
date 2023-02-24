import { series } from 'gulp'
import { rewritePath } from './rewirte-path'
import buildAllPackages from './build-all'
import buildSplitPackages from './build-split'

const buildMode = process.env.BUILD_MODE

let taskList = []
if (buildMode === 'all') {
  taskList = [
    buildAllPackages,
  ]
}

if (buildMode === 'split') {
  taskList = [
    ...buildSplitPackages,
    ...rewritePath(),
  ]
}

export default series(...taskList)
