import axios from 'axios'
import { useAuthStore } from '~/stores/Auth'
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.public.baseUrl,
  })
  axiosInstance.interceptors.request.use(
    (config) => {
      // Modify request config before sending the request
      const userStore = useAuthStore()
      const token = userStore.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      // Handle request error
      return Promise.reject(error)
    },
  )
  axiosInstance.interceptors.response.use(
    (response) => {
      // Handle successful response
      return response
    },
    (error) => {
      // Handle response error
      if (error.response && error.response.status === 401) {
        useAuthStore().logout()
      }
      return Promise.reject(error)
    },
  )

  nuxtApp.hook('app:mounted', () => {
    console.log('Nuxt app is mounted and axios is ready')
  })

  return {
    provide: { axios: axiosInstance },
  }
})
