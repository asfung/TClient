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
    logout() {
      this.token = null
    },
    getToken(){
      return this.token
    }
  },
})

// export default useAuthStore 