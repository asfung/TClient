import { defineStore } from "pinia";

export const useNotificationStore = defineStore('NotificationStore', {
  state: () => {
    return {
      notifications: [],
      notificationPage:  1,
      notificationHasNextPage: true
    }
  },
  actions: {
    async getNotifications(payload){
      try{
        const { $axios } = useNuxtApp();
        const response = await $axios.get('/notifications/All', {
          params: payload, 
        });
        const data = response.data.data;
        if(response.status === 200){
          this.notifications = payload.page === 1 ? data : [...this.notifications, ...data];
          this.notificationPage = payload.page
          this.notificationHasNextPage = data.length === (payload.per_page || 15)
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
            hasNextPage: data.length === (payload.per_page || 15)
          }
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    }
  },
})