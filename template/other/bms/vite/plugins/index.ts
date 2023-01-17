import vue from '@vitejs/plugin-vue'
import createImgCompress from './img-compress'
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [
    vue(),
    createAutoImport(),
    createSetupExtend(),
    createSvgIcon(isBuild),
    createImgCompress(),

  ]
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
