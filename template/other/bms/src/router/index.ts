import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from '../utils/auth'
/* Layout */
import Layout from '../layout/index.vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('../views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
    hidden: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/error/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('../views/error/401.vue'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    key: 'home',
    children: [
      {
        path: '/index',
        component: () => import('../views/index.vue'),
        name: 'Index',
        meta: { title: '首页', icon: 'build', affix: true },
      },
      {
        path: '/demo',
        component: () => import('../views/demo/index.vue'),
        name: 'demo',
        meta: { title: 'demo', icon: 'build', affix: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory('/customer-data/'),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition)
      return savedPosition
    else
      return { top: 0 }
  },
})
const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token = getToken()
    const now = Number(new Date())
    if (token) {
      if (now - Number(token) > 86400000) {
        ElMessage({
          message: '登录过期',
          type: 'warning',
        })
        removeToken()
        next({ path: '/login' })
      }
      /* has token */
      if (to.path === '/login') {
        next({ path: '/' })
        return
      }
      next()
    } else {
      if (whiteList.includes(to.path)) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      }
    }
  },
)
export default router
