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
          } else if (payload.type === 'post') {
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
            // hasNextPage: data.length === (payload.per_page || 10)
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
    loadMoreReplies(replyId, amount = 5) {
      const generateReply = () => ({
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        title: faker.person.firstName(),
        subtitle: 'good',
        description: 'goodddddddddddddddddddddddddddddddddddddd',
        contentData: faker.lorem.sentence(),
        show: false,
        liked: false,
        media: Array.from({ length: Math.floor(Math.random() * 3) }, () => 
          faker.image.url({ width: 600, height: 800 })
        ),
        replies: []
      });

      function findAndAddReplies(repliesArray) {
        for (let reply of repliesArray) {
          if (reply.id === replyId) {
            const newReplies = Array.from({ length: amount }, () => generateReply());
            reply.replies.push(...newReplies);
            return true;
          }
          if (reply.replies && reply.replies.length > 0) {
            const found = findAndAddReplies(reply.replies);
            if (found) return true;
          }
        }
        return false;
      }
      findAndAddReplies(this.postReply.replies);
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  getters: {
  },
})