import { defineStore } from "pinia";

export const useUserStore = defineStore('UserStore', {
  state: () => {
    return {
      userProfileData: null,
      userSearch: [] || null,
    }
  },
  actions: {
    async userProfile(username) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get(`/user/${username}`);
        const data = response.data.data
        if (response.status === 200) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success'
          };
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async searchUser(payload) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get(`/user`, {
          params: payload
        });
        const data = response.data.data
        if (response.status === 200) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success'
          };
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
  }
})