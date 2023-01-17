import { createApp } from 'vue'
import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言

import '../src/assets/styles/index.scss' // global css

// 注册指令

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '../src/components/SvgIcon/index.vue'
import elementIcons from '../src/components/SvgIcon/svgicon'

// 分页组件
import Pagination from '../src/components/Pagination/index.vue'

import {
  addDateRange,
  handleTree,
  parseTime,
  resetForm,
  selectDictLabel,
  selectDictLabels,
} from './utils/tool-func'
import plugins from './plugins' // plugins
import router from './router'
import store from './store'
import App from './App.vue'

const app = createApp(App)
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('Pagination', Pagination)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('SvgIcon', SvgIcon)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default',
})

app.mount('#app')
