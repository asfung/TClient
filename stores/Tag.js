import { defineStore } from "pinia";

export const useTagStore = defineStore('TagStore', {
  state: () => {
    return {
      tags: null,
      mentions: null,
      hashtags: null,
    }
  },
  actions: {
    async getTags(payload) {
      if (this.tags && this.mentions && this.hashtags) {
        return;
      }
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get('/tags', payload);
        const data = response.data.data
        if (response.status === 200) {
          switch(payload?.type){
            case 'hashtag':
              this.hashtags = data
              break;
            case 'mention':
              this.mentions = data
              break;
            default:
              this.tags = data
              this.mentions = data.mention
              this.hashtags = data.hashtag
          }
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
  },
})