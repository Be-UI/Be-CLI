import * as components from '@element-plus/icons-vue'
import type { App } from 'vue'
export default {
  install: (app: App) => {
    for (const key in components) {
      /* eslint import/namespace: ['error', { allowComputed: true }] */
      const componentConfig = components[key as keyof typeof components]
      app.component(componentConfig.name, componentConfig)
    }
  },
}
