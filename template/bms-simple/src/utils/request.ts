import axios from 'axios'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import errorCode from './errorCode'
import cache from '../plugins/cache'
import { tansParams } from './tool-func'

// 是否显示重新登录
export const isRelogin = { show: false }

// @ts-expect-error 字面量赋值
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 30000,
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    // if (getToken() && !isToken) {
    //   config.headers && (config.headers['Authorization'] = `Bearer ${getToken()}`) // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = `${config.url}?${tansParams(config.params)}`
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      }
      const sessionObj = cache.session.getJSON('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj)
      } else {
        const sUrl = sessionObj.url // 请求地址
        const sData = sessionObj.data // 请求数据
        const sTime = sessionObj.time // 请求时间
        const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
        if (
          !(config.params && config.params.complicating)
          && sData === requestObj.data
          && requestObj.time - sTime < interval
          && sUrl === requestObj.url
        ) {
          const message = '数据正在处理，请勿重复提交'
          console.warn(`[${sUrl}]: ${message}`)
          return Promise.reject(new Error(message))
        } else {
          cache.session.setJSON('sessionObj', requestObj)
        }
      }
    }
    return config
  },
  (error) => {
    console.error(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorCode[code as keyof typeof errorCode] || res.data.msg || errorCode.default
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer')
      return res.data

    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            isRelogin.show = false
            // 退出登录。。。跳转登录页
          })
          .catch(() => {
            isRelogin.show = false
          })
      }
      return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
    } else if (code === 500) {
      ElMessage({
        message: msg,
        type: 'error',
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      ElNotification.error({
        title: msg,
      })
      return Promise.reject(new Error('error'))
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    console.error(`err${error}`)
    let { message } = error
    if (message === 'Network Error')
      message = '后端接口连接异常'
    else if (message.includes('timeout'))
      message = '系统接口请求超时'
    else if (message.includes('Request failed with status code'))
      message = `系统接口${message.substr(message.length - 3)}异常`

    ElMessage({
      message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export default service
