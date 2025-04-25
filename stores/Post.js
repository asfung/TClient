import { defineStore } from "pinia";
import { fakerEN as faker } from '@faker-js/faker'

export const usePostStore = defineStore('PostStore', {
  state: () => {
    return {
      isLoading: false,
      hasNextPage: true,
      activeTab: "forYou", 
      post: [],
      // ForYou type
      posts: [],
      postsPage: 1,
      postsHasNextPage: true,
      // Following type
      postsFollowing: [],
      postsFollowingPage: 1,
      postsFollowingHasNextPage: true,
      // Bookmarks type
      postsBookmark: [],
      postsBookmarkPage: 1,
      postsBookmarkHasNextPage: true,
      // Search type
      postsSearch: [],
      postsSearchPage: 1,
      postsSearchHasNextPage: true,
      // Post Myself
      postsMyself: [],
      postsMyselfPage: 1,
      postsMyselfHasNextPage: true,
      // Post Replies Myself
      postsRepliesMyself: [],
      postsRepliesMyselfPage: 1,
      postsRepliesMyselfHasNextPage: true,
      // Post Like Myself
      postsLikeMyself: [],
      postsLikeMyselfPage: 1,
      postsLikeMyselfHasNextPage: true,
      // Post Repost Myself
      postsRepostMyself: [],
      postsRepostMyselfPage: 1,
      postsRepostMyselfHasNextPage: true,

      // POST DETAILS
      postDetails: {
        parent: [
          // POST
        ],
        replies: [
          // {        // this causing zero data that still cant displayed 
            // POST
            // replies: [] 
          // },
        ],
      },
      postsDetailsRepliesPage: 0, // no other way, i decided to make it 0 instead of 1
      postsDetailsRepliesHasNextPage: true,

    }
  },
  actions: {
    async getPost(payload) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get('/post', {
          params: payload, 
        });
        const data = response.data.data;
        if (response.status === 200) {
          if (payload.type === 'foryou') {
            this.posts = payload.page === 1 ? data : [...this.posts, ...data];
            this.postsPage = payload.page;
            this.postsHasNextPage = data.length === (payload.per_page || 10);
          } else if (payload.type === 'following') {
            this.postsFollowing = payload.page === 1 ? data : [...this.postsFollowing, ...data];
            this.postsFollowingPage = payload.page;
            this.postsFollowingHasNextPage = data.length === (payload.per_page || 10);
          } else if (!payload.type && !payload.page && payload.post_id) {
            // this.postDetails.parent = data;
          } else if (payload.type === 'bookmarks') {
            this.postsBookmark = payload.page === 1 ? data : [...this.postsBookmark, ...data];
            this.postsBookmarkPage = payload.page;
            this.postsBookmarkHasNextPage = data.length === (payload.per_page || 10);
          } else if (payload.type === 'posts') {
            this.postsMyself = payload.page === 1 ? data : [...this.postsMyself, ...data];
            this.postsMyselfPage = payload.page;
            this.postsMyselfHasNextPage = data.length === (payload.per_page || 10);
          } else if (payload.type === 'replies') {
            this.postsRepliesMyself = payload.page === 1 ? data : [...this.postsRepliesMyself, ...data];
            this.postsRepliesMyselfPage = payload.page;
            this.postsRepliesMyselfHasNextPage = data.length === (payload.per_page || 10);
          } else if (payload.type === 'likes') {
            this.postsLikeMyself = payload.page === 1 ? data : [...this.postsLikeMyself, ...data];
            this.postsLikeMyselfPage = payload.page;
            this.postsLikeMyselfHasNextPage = data.length === (payload.per_page || 10);
          } else if (payload.type === 'repost') {
            this.postsRepostMyself = payload.page === 1 ? data : [...this.postsRepostMyself, ...data];
            this.postsRepostMyselfPage = payload.page;
            this.postsRepostMyselfHasNextPage = data.length === (payload.per_page || 10);
          } else if (!payload.type && payload.q) {
            this.postsSearch = payload.page === 1 ? data : [...this.postsSearch, ...data];
            this.postsSearchPage = payload.page;
            this.postsSearchHasNextPage = data.length === (payload.per_page || 10);
          }
          this.hasNextPage = data.length === (payload.per_page || 10); 
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
            // hasNextPage: data.length === (payload.per_page || 10),
            meta: response.data.meta
          };
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred',
        };
      }
    },
    pushPostForYou(newPost){
      this.posts.push(newPost);
    },
    pushPostFollowing(newPost){
      this.postsFollowing.push(newPost);
    },
    pushNewPost(newPost){
      this.posts.unshift(newPost);
    },
    async createPost(payload){
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/CreatePost', payload);
        const data = response.data.data
        if(response.status === 201){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message
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
    async updatePost(payload){
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/UpdatePost', payload);
        const data = response.data.data
        if(response.status === 201){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message
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
    async deletePost(payload){
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/DeletePost', payload);
        const data = response.data.data
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
            state: data.state,
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
    async uploadMedia(payload){
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/media/Upload', payload);
        const data = response.data.data
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message
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
    async editMediaPostId(payload){
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/media/MediaPostIdEdit', payload);
        const data = response.data.data
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message
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
    async deleteMedia(payload){
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/media/MediaDelete', payload);
        const data = response.data.data
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message
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
    async getReplies(payload){
      try{
        const { $axios } = useNuxtApp();
        const response = await $axios.get('/post/Replies', {
          params: payload, 
        });
        const data = response.data.data;
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
            hasNextPage: data.length === (payload.per_page || 10)
          }
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async toggleLike(payload){
      try{
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/like/Like', payload);
        const data = response.data.data;
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
            state: data.state,
          }
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async toggleBookmark(payload){
      try{
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/bookmark/ToggleBookmark', payload);
        const data = response.data.data;
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
            state: data.state,
          }
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    async toggleRepost(payload){
      try{
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/post/repost/RepostToggle', payload);
        const data = response.data.data;
        if(response.status === 200){
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
            state: data.state,
          }
        }
      } catch (e) {
        return {
          status: e.response?.status || 500,
          data: null,
          message: e.response?.data?.message || e.message || 'An error occurred'
        };
      }
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  getters: {
  },
})