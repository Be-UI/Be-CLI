// https://router.vuejs.org/zh/
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由，每个路由都需要映射到一个组件
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
  }, {
    path: '/system',
    name: 'mock',
    component: () => import('../views/system/index.vue'),
  },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

router.beforeEach((_to, _from, next) => {
  console.log('router beforeEach')
  next()
})

router.afterEach(() => {
  console.log('router afterEach')
})

export default router
