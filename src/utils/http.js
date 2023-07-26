// axios基础的封装
import axios from "axios";
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

import {useUserStore} from '@/stores/userStore'
import router from '@/router'

const httpInstance =  axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 请求拦截器携带token
  // 1.从pinia中获取token数据
  const userStore = useUserStore()
  // 2.按照后端要求拼接token数据
  const token = userStore.userInfo.token
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, e => Promise.reject(e))

// axios响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()

  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })

  // 登录一段时间后，若对页面不处理，会出现401token失效问题,这是需重新进行登录
  // 1.清除本地用户数据
  // 2.跳转到登录页
  if(e.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }

  return Promise.reject(e)
})

export default httpInstance