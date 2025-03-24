import { defineStore } from "pinia"
import { useAuthStore } from "~/stores/Auth";

const { setItem, getItem } = useCryptoLocalStorage()
export const useResourceStore = defineStore('ResourceStore', {
  state: () => {
    return{
      resources: getItem('resources') || null,
      roles: [],
      resourcesAll: [],
      permissionsAll: []
    }
  },
  getters: {
    resourcesResource: () => {
      // const resources = getItem('resources')
      // const resourcesResource = resources.resources
      // return resourcesResource
      return this.resources?.resources || null;
    },
    resourcesPermission: () => {
      // const resources = getItem('resources')
      // const resourcesPermissions = resources.permissions
      // return resourcesPermissions
      return this.resources?.permissions || null;
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
        const response = await $axios.post('/permissions/All', payload);
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
    async toggleRoleResource(roleId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/resources/roles/resource/${roleId}/Toggle`, payload);
        const data = response.data.data
        if(response.status === 200){
          this.getResourcesResources({
            roleId: data.role_id,
            mode: 'all'
          })
        }
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
    async toggleRolePermission(resourceId, roleId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/permissions/roles/permission/${roleId}/Toggle`, payload);
        const data = response.data.data
        if(response.status === 200){
          this.getResourcesPermissions({
            roleId: roleId,
            resourceId: resourceId
          })
        }
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
    async createResource(roleId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/resources/Create`, payload);
        const data = response.data.data
        if(response.status === 201){
          console.log(data)
          this.getResourcesResources({
            roleId: roleId,
            mode: 'all'
          })
        }
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
    async updateResource(roleId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/resources/Update`, payload);
        const data = response.data.data
        if(response.status === 200){
          console.log(data)
          this.getResourcesResources({
            roleId: roleId,
            mode: 'all'
          })
        }
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
    async deleteResource(roleId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/resources/Delete`, payload);
        const data = response.data.data
        if(response.status === 200){
          console.log(data)
          this.getResourcesResources({
            roleId: roleId,
            mode: 'all'
          })
        }
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
    async createPermission(resourceId, roleId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/permissions/${resourceId}/Create`, payload);
        const data = response.data.data
        if(response.status === 201){
          this.getResourcesPermissions({
            roleId: roleId,
            resourceId: resourceId
          })
        }
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
    async updatePermission(roleId, resourceId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/permissions/Update`, payload);
        const data = response.data.data
        if(response.status === 200){
          console.log(data)
          this.getResourcesPermissions({
            roleId: roleId,
            resourceId: resourceId
          })
        }
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
    async deletePermission(roleId, resourceId, payload) {
      try {
        const authStore = useAuthStore()
        const { $axios } = useNuxtApp();
        const response = await $axios.post(`/permissions/Delete`, payload);
        const data = response.data.data
        if(response.status === 200){
          console.log(data)
          this.getResourcesPermissions({
            roleId: roleId,
            resourceId: resourceId
          })
        }
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