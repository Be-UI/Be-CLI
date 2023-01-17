import request from '../utils/request'

// 登录方法
export function login(username: string, password: string) {
  const data = {
    username,
    password,
  }
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}
