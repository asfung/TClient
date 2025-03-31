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
          {
            // POST
            replies: []
          },
        ],
      },

      postReply: {
        parent: [
          {
            id: `1`,
            username: `Dylan Jabbowzz`,
            title: `Dylan`,
            subtitle: `good`,
            description: `goodddddddddddddddddddddddddddddddddddddd`,
            contentData: "https://www.trpkovski.com/2024/03/24/is-it-possible-to-use-nuxt-link-in-content-rendered-with-v-html @Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie ",
            show: false,
            liked: false,
            media: [
            'https://picsum.photos/600/800?random=1',
            'https://picsum.photos/600/800?random=2',
            'https://picsum.photos/600/800?random=3',
            'https://picsum.photos/600/800?random=4',
            'https://picsum.photos/600/800?random=5',
            'https://picsum.photos/600/800?random=6'
            ]
          },
          {
            id: `2`,
            username: `Sauki`,
            title: `Sauki`,
            subtitle: `good`,
            description: `goodddddddddddddddddddddddddddddddddddddd`,
            contentData: "https://www.trpkovski.com/2024/03/24/is-it-possible-to-use-nuxt-link-in-content-rendered-with-v-html @Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie ",
            show: false,
            liked: false,
            media: [
            'https://picsum.photos/600/800?random=1',
            'https://picsum.photos/600/800?random=2',
            'https://picsum.photos/600/800?random=3',
            'https://picsum.photos/600/800?random=4',
            'https://picsum.photos/600/800?random=5',
            'https://picsum.photos/600/800?random=6'
            ]
          },
        ],
        replies: [
          {
            id: `11`,
            username: `Mark Sucker`,
            title: `Sucker`,
            subtitle: `good`,
            description: `goodddddddddddddddddddddddddddddddddddddd`,
            contentData: "thats nice",
            show: false,
            liked: false,
            media: [
            ],
            replies: [
              {
                id: `111`,
                username: `Lean Wuu`,
                title: `Leannnn`,
                subtitle: `good`,
                description: `goodddddddddddddddddddddddddddddddddddddd`,
                contentData: "you right",
                show: false,
                liked: false,
                media: [
                ],
                replies: [
                ],
              },
              {
                id: `112`,
                username: `Lean Wuu`,
                title: `Leannnn`,
                subtitle: `good`,
                description: `goodddddddddddddddddddddddddddddddddddddd`,
                contentData: "iyahhhh",
                show: false,
                liked: false,
                media: [
                'https://picsum.photos/600/800?random=1',
                'https://picsum.photos/600/800?random=2',
                'https://picsum.photos/600/800?random=3',
                'https://picsum.photos/600/800?random=4',
                'https://picsum.photos/600/800?random=5',
                'https://picsum.photos/600/800?random=6'
                ],
                replies: [
                ],
              }
            ],
          },
          
          {
            id: `22`,
            username: `Mark Sucker`,
            title: `Sucker`,
            subtitle: `good`,
            description: `goodddddddddddddddddddddddddddddddddddddd`,
            contentData: "kamu jawa yahhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhh?",
            show: false,
            liked: false,
            media: [
            'https://picsum.photos/600/800?random=1',
            'https://picsum.photos/600/800?random=2',
            'https://picsum.photos/600/800?random=3',
            'https://picsum.photos/600/800?random=4',
            'https://picsum.photos/600/800?random=5',
            'https://picsum.photos/600/800?random=6'
            ],
            replies: [
              {
                id: `222`,
                username: `Lean Wuu`,
                title: `Leannnn`,
                subtitle: `good`,
                description: `goodddddddddddddddddddddddddddddddddddddd`,
                contentData: "iyahhhh",
                show: false,
                liked: false,
                media: [
                'https://picsum.photos/600/800?random=1',
                'https://picsum.photos/600/800?random=2',
                'https://picsum.photos/600/800?random=3',
                'https://picsum.photos/600/800?random=4',
                'https://picsum.photos/600/800?random=5',
                'https://picsum.photos/600/800?random=6'
                ],
                replies: [
        
                ],
              }
            ],
          },
          {
            id: `33`,
            username: `Mark Sucker`,
            title: `Sucker`,
            subtitle: `good`,
            description: `goodddddddddddddddddddddddddddddddddddddd`,
            contentData: "kamu jawa yahhhhhhhhhhhh hhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhh?",
            show: false,
            liked: false,
            media: [
            'https://picsum.photos/600/800?random=1',
            'https://picsum.photos/600/800?random=2',
            'https://picsum.photos/600/800?random=3',
            'https://picsum.photos/600/800?random=4',
            'https://picsum.photos/600/800?random=5',
            'https://picsum.photos/600/800?random=6'
            ],
            replies: [
              {
                id: `331`,
                username: `Lean Wuu`,
                title: `Leannnn`,
                subtitle: `good`,
                description: `goodddddddddddddddddddddddddddddddddddddd`,
                contentData: "iyahhhh",
                show: false,
                liked: false,
                media: [
                'https://picsum.photos/600/800?random=1',
                'https://picsum.photos/600/800?random=2',
                'https://picsum.photos/600/800?random=3',
                'https://picsum.photos/600/800?random=4',
                'https://picsum.photos/600/800?random=5',
                'https://picsum.photos/600/800?random=6'
                ],
                replies: [
                ],
              },
              {
                id: `332`,
                username: `Lean Wuu`,
                title: `Leannnn`,
                subtitle: `good`,
                description: `goodddddddddddddddddddddddddddddddddddddd`,
                contentData: "iyahhhh",
                show: false,
                liked: false,
                media: [
                'https://picsum.photos/600/800?random=1',
                'https://picsum.photos/600/800?random=2',
                'https://picsum.photos/600/800?random=3',
                'https://picsum.photos/600/800?random=4',
                'https://picsum.photos/600/800?random=5',
                'https://picsum.photos/600/800?random=6'
                ],
                replies: [
        
                ],
              }
            ],
          },
          {
            id: `44`,
            username: `Mark Sucker`,
            title: `Sucker`,
            subtitle: `good`,
            description: `goodddddddddddddddddddddddddddddddddddddd`,
            contentData: "kamu jawa yahhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhh?",
            show: false,
            liked: false,
            media: [
            'https://picsum.photos/600/800?random=1',
            'https://picsum.photos/600/800?random=2',
            'https://picsum.photos/600/800?random=3',
            'https://picsum.photos/600/800?random/4',
            'https://picsum.photos/600/800?random=5',
            'https://picsum.photos/600/800?random=6'
            ],
            replies: [
              {
                id: `441`,
                username: `Lean Wuu`,
                title: `Leannnn`,
                subtitle: `good`,
                description: `goodddddddddddddddddddddddddddddddddddddd`,
                contentData: "iyahhhh",
                show: false,
                liked: false,
                media: [
                'https://picsum.photos/600/800?random=1',
                'https://picsum.photos/600/800?random=2',
                'https://picsum.photos/600/800?random=3',
                'https://picsum.photos/600/800?random=4',
                'https://picsum.photos/600/800?random=5',
                'https://picsum.photos/600/800?random=6'
                ],
                replies: [
        
                ],
              }
            ],
          },
        ],
      },

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
            this.postsHasNextPage = data.length === (payload.limit || 10);
          } else if (payload.type === 'following') {
            this.postsFollowing = payload.page === 1 ? data : [...this.postsFollowing, ...data];
            this.postsFollowingPage = payload.page;
            this.postsFollowingHasNextPage = data.length === (payload.limit || 10);
          } else if (!payload.type && !payload.page && payload.post_id) {
            // this.postDetails.parent = data;
          } else if (payload.type === 'bookmarks') {
            this.postsBookmark = payload.page === 1 ? data : [...this.postsBookmark, ...data];
            this.postsBookmarkPage = payload.page;
            this.postsBookmarkHasNextPage = data.length === (payload.limit || 10);
          } else if (payload.type === 'post') {
            this.postsMyself = payload.page === 1 ? data : [...this.postsMyself, ...data];
            this.postsMyselfPage = payload.page;
            this.postsMyselfHasNextPage = data.length === (payload.limit || 10);
          } else if (payload.type === 'replies') {
            this.postsRepliesMyself = payload.page === 1 ? data : [...this.postsRepliesMyself, ...data];
            this.postsRepliesMyselfPage = payload.page;
            this.postsRepliesMyselfHasNextPage = data.length === (payload.limit || 10);
          } else if (payload.type === 'likes') {
            this.postsLikeMyself = payload.page === 1 ? data : [...this.postsLikeMyself, ...data];
            this.postsLikeMyselfPage = payload.page;
            this.postsLikeMyselfHasNextPage = data.length === (payload.limit || 10);
          } else if (payload.type === 'repost') {
            this.postsRepostMyself = payload.page === 1 ? data : [...this.postsRepostMyself, ...data];
            this.postsRepostMyselfPage = payload.page;
            this.postsRepostMyselfHasNextPage = data.length === (payload.limit || 10);
          } else if (!payload.type && payload.q) {
            this.postsSearch = payload.page === 1 ? data : [...this.postsSearch, ...data];
            this.postsSearchPage = payload.page;
            this.postsSearchHasNextPage = data.length === (payload.limit || 10);
          }
          this.hasNextPage = data.length === (payload.limit || 10); 
          return {
            response: response,
            status: response.status,
            data: data,
            message: data.message,
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
    loadMoreData(){
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: faker.string.uuid(),                    
        username: faker.internet.userName(),        
        profile_image: faker.image.url({ width: 100, height: 100 }), 
        display_name: faker.person.fullName(),      
        content: faker.lorem.sentences(2),          
        created_at: faker.date.recent().toISOString(),
        show: false,
        liked: false,
        // contentData: "https://www.trpkovski.com/2024/03/24/is-it-possible-to-use-nuxt-link-in-content-rendered-with-v-html @Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie",
        media: Array.from({ length: Math.floor(Math.random() * 6) + 1 }, () => 
          faker.image.url({ width: 600, height: 800 })
        ),
      }));
  
      // console.log(`before fetch: ${this.posts.length}`);
      this.posts.push(...newData);
      // this.post.push(...newData);
      // console.log(`after fetch: ${this.posts.length}`);
  
      this.isLoading = false
      this.hasNextPage = newData.length === 10;
      // console.log(this.hasNextPage);
    },
    getAllReplies(){
      let allReplies = [];

      function traverseReplies(replies) {
        replies.forEach(reply => {
          allReplies.push(reply);
          if (reply.replies && reply.replies.length > 0) {
            traverseReplies(reply.replies);
          }
        });
      }

      traverseReplies(this.postReply.replies);
      return allReplies;
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
            hasNextPage: data.length === (payload.limit || 10)
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