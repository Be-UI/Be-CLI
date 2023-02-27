import { defineStore } from 'pinia'
import { login } from '../../api/login'
const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
  }),
  actions: {
    // 登录
    login(userInfo: any) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res: any) => {
            this.token = res.token
            resolve('')
          })
          .catch((error: Error) => {
            reject(error)
          })
      })
    },
  },
})

export default useUserStore
