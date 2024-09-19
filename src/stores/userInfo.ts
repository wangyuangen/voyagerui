import { defineStore } from 'pinia'
import { AuthApi } from '/@/api/console/Auth'
import { merge } from 'lodash-es'
import { Local } from '/@/utils/storage'

export const adminTokenKey = 'admin-token'

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
  state: (): UserInfosState => ({
    userInfos: {
      token: Local.get(adminTokenKey) || '',
      realName: '',
      photo: '',
      roles:[],
      authApiList: [],
    },
  }),
  actions: {
    async setUserInfos() {
      const userInfos = <UserInfos>await this.getUserInfo().catch(() => {})
      merge(this.userInfos, userInfos)
    },
    setRealName(realName: string) {
      this.userInfos.realName = realName
    },
    setPhoto(photo: string) {
      this.userInfos.photo = photo
    },
    setToken(token: string) {
      this.userInfos.token = token
      Local.set(adminTokenKey, token)
    },
    getToken() {
      const token = Local.get(adminTokenKey)
      this.userInfos.token = token
      return token
    },
    removeToken() {
      this.userInfos.token = ''
      Local.remove(adminTokenKey)
    },
    clear() {
      this.userInfos.token = ''
      Local.remove(adminTokenKey)
      window.requests = []
      window.location.reload()
    },
    //查询用户信息
    async getUserInfo() {
      return new Promise((resolve, reject) => {
        Promise.all([new AuthApi().currentStaffInfo()])
          .then((res) => {
            if (res[0]?.success) {
              const user = res[0].data
              const userInfos = {
                realName:user?.userName,
                authApiList:user?.apiPermissionScope,
                photo:user?.avatarUrl,
                roles:[]
              }
              resolve(userInfos)
            } else {
              this.clear()
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
