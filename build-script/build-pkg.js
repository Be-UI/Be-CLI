import fs from 'fs-extra'
async function buildPkg() {
  const pkg = await fs.readJson('./package.json')
  const content = JSON.parse(JSON.stringify(pkg))
  Reflect.deleteProperty(content.scripts, 'prepare')
  Reflect.deleteProperty(content.scripts, 'husky:step1')
  Reflect.deleteProperty(content.scripts, 'husky:step2')
  await fs.writeJson('./dist/package.json', content, { spaces: 2 })
}
buildPkg()
