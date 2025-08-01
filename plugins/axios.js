import axios from 'axios'
import { useAuthStore } from '~/stores/Auth'
import { Credentials } from '~/enums/Credentials'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.public.baseUrl,
  })

  let isRefreshing = false
  let failedRequests = []

  axiosInstance.interceptors.request.use(
    (config) => {
      const userStore = useAuthStore()
      const token = userStore.getCredentials(Credentials.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const authStore = useAuthStore()
      const originalRequest = error.config

      // If 401 and not retrying, try refreshing the token, jsut added "error.response.data.key === 'refresh-token'"
      if (error.response && error.response.data.key === 'refresh-token' && error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          console.log('refreshing ')
          return new Promise((resolve, reject) => {
            failedRequests.push({ resolve, reject })
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return axiosInstance(originalRequest)
            })
            .catch((err) => {
              return Promise.reject(err)
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          /*
          This mechanism need to evaluated cause when response return 401(Unauthorize) status code it always refresh the token,
          sometimes is good but, the right way is catch the key from api (AccessController::class) middleware then refresh the token, or
          request CheckToken api if its expired then RefreshToken
          --------------------------
          on AccessControll::class, there has key = 'refresh-token' so that we can use that solution
          */
          // const response = 
          // if(response.dataV)
          if(error.response.data.key === 'refresh-token') {
            const response = await axios.post(
              `${runtimeConfig.public.baseUrl}/RefreshToken`, 
              {},
              {
                headers: {
                  Authorization: `Bearer ${authStore.getCredentials(Credentials.TOKEN)}`,
                },
              }
            )
            const newCredentials = authStore.formattedCredentials(response.data)
            const newToken = authStore.getCredentials(Credentials.TOKEN)
            authStore.setCredentials(newCredentials)
            console.log(authStore.credentialsJson)

            isRefreshing = false
            failedRequests.forEach((req) => req.resolve(newToken))
            failedRequests = []

            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return axiosInstance(originalRequest)
          }else{
            // temporary
            authStore.userLogout()
            window.location.href = '/'
          }
        } catch (err) {
          isRefreshing = false
          failedRequests.forEach((req) => req.reject(err))
          failedRequests = []
          authStore.userLogout()
          return Promise.reject(err)
        }
      }

      return Promise.reject(error)
    }
  )

  nuxtApp.hook('app:mounted', () => {
    console.log('Axios PLugin ✅')
  })

  return {
    provide: { axios: axiosInstance },
  }
})
