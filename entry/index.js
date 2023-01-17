import fs from 'fs-extra'
import { BeCLIRun } from '../index.js'
async function start() {
  const pkg = await fs.readJson('../package.json')
  const argv = process.argv
  const len = argv.length
  if (argv[len - 1] === '--v')
    console.log(`Be ClI: v${pkg.version}`)
  else
    BeCLIRun()
}
start()
