import axios from 'axios'
// import store from '@/store/store'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_PATH
})

/* http.interceptors.request.use(
  (config) => {
    let token = store.getters['auth/userToken']
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
) */

export default http
