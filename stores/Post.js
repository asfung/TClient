import { defineStore } from "pinia";

export const usePostStore = defineStore('PostStore', {
  state: () => {
    return {
      isLoading: false,
      hasNextPage: true,
      post: [],
      posts: Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        username: `user${i + 1}`,
        title: `selekences ${i + 1}`,
        subtitle: `selekencess cessss ${i + 1}`,
        description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${i + 1}`,
        // content: this.contentData,
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
        ],
      })),
      // posts: [], // this state will stiil be empty even i redirect to another page, BOTCH I FORGOT WHAT IS THIS MEAN 
      // postsReply: Array.from({ length: 5 }, (_, i) => ({
      //   id: `${i + 1}`,
      //   username: `user${i + 1}`,
      //   title: `selekences ${i + 1}`,
      //   subtitle: `selekencess cessss ${i + 1}`,
      //   description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${i + 1}`,
      //   // content: this.contentData,
      //   contentData: "how great that was man  ",
      //   // contentData: "how great that was man  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      //   show: false,
      //   liked: false,
      //   media: [],
      // })),
      postReply: {
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
            // 'https://picsum.photos/600/800?random=1',
            // 'https://picsum.photos/600/800?random=2',
            // 'https://picsum.photos/600/800?random=3',
            // 'https://picsum.photos/600/800?random=4',
            // 'https://picsum.photos/600/800?random=5',
            // 'https://picsum.photos/600/800?random=6'
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
                // 'https://picsum.photos/600/800?random=1',
                // 'https://picsum.photos/600/800?random=2',
                // 'https://picsum.photos/600/800?random=3',
                // 'https://picsum.photos/600/800?random=4',
                // 'https://picsum.photos/600/800?random=5',
                // 'https://picsum.photos/600/800?random=6'
                ],
                replies: [
                  {
                    id: `1111`,
                    username: `Mark Sucker`,
                    title: `Sucker`,
                    subtitle: `good`,
                    description: `goodddddddddddddddddddddddddddddddddddddd`,
                    contentData: "kamu jawa yahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh?",
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
                        id: `111111`,
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
                  {
                    id: `1121`,
                    username: `Mark Sucker`,
                    title: `Sucker`,
                    subtitle: `good`,
                    description: `goodddddddddddddddddddddddddddddddddddddd`,
                    contentData: "kamu jawa yahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh?",
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
                        id: `112111`,
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
              }
            ],
          },
          
          {
            id: `22`,
            username: `Mark Sucker`,
            title: `Sucker`,
            subtitle: `good`,
            description: `goodddddddddddddddddddddddddddddddddddddd`,
            contentData: "kamu jawa yahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh?",
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
            contentData: "kamu jawa yahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh?",
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
            contentData: "kamu jawa yahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh?",
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
    loadMoreData(){
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: `${this.posts.length + i + 1}`,
        username: `user ${i + 1}`,
        title: `selekences ${this.posts.length + i + 1}`,
        subtitle: `selekencess cessss ${this.posts.length + i + 1}`,
        description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${this.posts.length + i + 1}`,
        contentData: "https://www.trpkovski.com/2024/03/24/is-it-possible-to-use-nuxt-link-in-content-rendered-with-v-html @Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie",
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
  },
  getters: {
  },
})