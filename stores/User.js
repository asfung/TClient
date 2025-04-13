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
    async toggleFollow(payload) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/follow/FollowToggle`, payload);
        const data = response.data.data
        if (response.status === 200 || response.status == 201) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
            state: data.state
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
    async updateUser(payload) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/user/Update`, payload);
        const data = response.data.data
        if (response.status === 200) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
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


    async getUserPaginate(payload) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/user/admin`, payload);
        const data = response.data.data
        if (response.status === 200) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
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

    async getUserById(user_id) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/user/admin/Show/${user_id}`, payload);
        const data = response.data.data
        if (response.status === 200) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
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

    async createUser(payload) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/user/admin/Create`, payload);
        const data = response.data.data
        if (response.status === 201) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
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

    async updateUserTable(payload, user_id) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/user/admin/Update/${user_id}`, payload);
        const data = response.data.data
        if (response.status === 200) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
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

    async deleteUser(payload, user_id) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/user/admin/Delete/${user_id}`, payload);
        const data = response.data.data
        if (response.status === 200) {
          return {
            response: response,
            status: response.status,
            data: data,
            message: 'Success',
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