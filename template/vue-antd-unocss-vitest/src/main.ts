import { createApp } from 'vue'
import './assets/style/reset.scss'
import { createPinia } from 'pinia'
import App from './views/App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
  .use(createPinia())
app.mount('#app')
