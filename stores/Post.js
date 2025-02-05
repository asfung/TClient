import { defineStore } from "pinia";

export const usePostStore = defineStore('PostStore', {
  state: () => {
    return {
      isLoading: false,
      hasNextPage: true,
      post: [],
      posts: Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        username: `user ${i + 1}`,
        title: `selekences ${i + 1}`,
        subtitle: `selekencess cessss ${i + 1}`,
        description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${i + 1}`,
        // content: this.contentData,
        contentData: "https://www.trpkovski.com/2024/03/24/is-it-possible-to-use-nuxt-link-in-content-rendered-with-v-html @Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie ",
        show: false,
        liked: false,
      })),
      // posts: [], // this state will stiil be empty even i redirect to another page
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
      }));
  
      console.log(`before fetch: ${this.posts.length}`);
      this.posts.push(...newData);
      // this.post.push(...newData);
      console.log(`after fetch: ${this.posts.length}`);
  
      this.isLoading = false
      this.hasNextPage = newData.length === 10;
      console.log(this.hasNextPage);
    }
  },
  getters: {
  },
})