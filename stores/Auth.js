import { defineStore } from "pinia";

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      token: null,
    }
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    saveTokenToLocalStorage(token) {
      localStorage.setItem(token)
    },
    logout() {
      this.token = null
    },
    getToken(){
      return this.token
    }, 

    async loginAction(payload){
      try{
        const { $axios } = useNuxtApp()
        // console.log($axios)
        const response = await $axios.post('/Login', payload, {
          headers: {
            // 'Content-Type': 'application/json',
          }
        })
        
        console.log(response.data)
        // return response.data
        if(response.status === 401 ||  response.status === 404){
          console.log('benar')
          return {
            status: response.status,
            data: response.data,
            message: response.data.message
          }
        }else{
          return {
            status: response.status,
            data: response.data,
            message: 'Berhasil Login'
          }
        }

      }catch(e){
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred',
          // message: e.message || 'An error occurred'
        }
      }
    },

    async registerAction(payload){
      try{
        const { $axios } = useNuxtApp()
        // console.log($axios)
        const response = await $axios.post('/Register', payload, {
          headers: {
            // 'Content-Type': 'application/json',
          }
        })
        
        console.log(response.data)
        // return response.data
        if(response.status === 500){
          // console.log('benar')
          return {
            status: response.status,
            data: response.data,
            message: response.data.error
          }
        }else{
          return {
            status: response.status,
            data: response.data,
            message: 'Berhasil Login'
          }
        }

      }catch(e){
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred',
          // message: e.message || 'An error occurred'
        }
      }
    },

    test(){
      return 'hello world '
    },


  },
})

// export default useAuthStore 