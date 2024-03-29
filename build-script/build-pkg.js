import fs from 'fs-extra'

async function buildPkg() {
  const pkg = await fs.readJson('./package.json')
  const content = JSON.parse(JSON.stringify(pkg))
  Reflect.deleteProperty(content.scripts, 'prepare')
  Reflect.deleteProperty(content.scripts, 'husky:step1')
  Reflect.deleteProperty(content.scripts, 'husky:step2')
  await fs.writeJson('./dist/package.json', content, { spaces: 2 })
}

async function buildBin() {
  const file = await fs.readFile('./be-cli/bin/index.ts')
  file.toString().replace('index', 'index.js')
  const contextStr = file.toString().replace('index', 'index.js')
  await fs.outputFileSync('./dist/bin/index.js', contextStr)
}

const run = async() => {
  await buildPkg()
  await buildBin()
}
run()
