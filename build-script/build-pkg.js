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

async function buildTemplate() {
  const filterFile = (src) => {
    if ((src.includes('auto-imports.d')
        || src.includes('components.d')
        || src.includes('.git')
        || src.includes('node_modules')
        || src.includes('.idea')) && src.includes('.gitignore'))
      return false

    return true
  }
  await fs.copySync('./template', './dist/template', { filter: filterFile })
  // 删除 node_modules
  await fs.readdir('./dist/template', (err, files) => {
    if (err)
      throw err

    files.forEach((val) => {
      val !== '.DS_Store' && fs.remove(`./dist/template/${val}/node_modules`)
    })
  })
}

const run = async() => {
  await buildTemplate()
  await buildPkg()
  await buildBin()
}
run()
