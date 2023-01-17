import modal from './modal'
import type { App } from 'vue'
export default function installPlugins(app: App) {
  // 模态框对象
  app.config.globalProperties.$modal = modal
}
