import { defineStore } from "pinia"
import { useAuthStore } from "~/stores/Auth";

const { setItem, getItem } = useCryptoLocalStorage()
export const useResourceStore = defineStore('ResourceStore', {
  state: () => {
    return{
      resources: getItem('resources'),
      roles: [],
      resourcesAll: [],
      permissionsAll: []
    }
  },
  getters: {
    resourcesResource: () => {
      const resources = getItem('resources')
      const resourcesResource = resources.resources
      return resourcesResource
    },
    resourcesPermission: () => {
      const resources = getItem('resources')
      const resourcesPermissions = resources.permissions
      return resourcesPermissions
    }
  },
  actions: {
    async getResources(payload, keyType = null) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/permissions/User?groupBy=key', {
          // groupBy: keyType ? 'key' : null
        });
        const data = response.data.data
        setItem('resources', data)
        return {
          response: response,
          status: response.status,
          data: response.data,
          message: 'Success'
        };
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async getResourcesResources(payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/resources/All', payload);
        const data = response.data.data
        this.resourcesAll = data
        
        return {
          response: response,
          status: response.status,
          data: response.data,
          message: 'Success'
        };
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async getResourcesPermissions(payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/permissions/All', {
          payload
        });
        const data = response.data.data
        this.permissionsAll =  data
        
        return {
          response: response,
          status: response.status,
          data: response.data,
          message: 'Success'
        };
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async getRoles() {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/role/All');
        const data = response.data.data
        this.roles = data
        return {
          response: response,
          status: response.status,
          data: response.data,
          message: 'Success'
        };
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
  },
})