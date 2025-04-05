import { defineStore } from "pinia";

export const useScrollStore = defineStore('ScrollStore', {
  state: () => {
    return {
      scrollYForYou: 0,
      scrollYFollowing: 0,
      scrollYPostsMyself: 0,
      scrollYPostsRepliesMyself: 0,
      scrollYPostsLikesMyself: 0,
      scrollYBookmarks: 0,
      scrollYSearch: 0,
      scrollYNotification: 0,
      scrollY: 0,
      scrollX: 0,
    };
  },
  actions: {
    updateScrollY(scrollY) {
      this.scrollY = scrollY;
    },
    updateScrollX(scrollX) {
      this.scrollX = scrollX;
    },
    setScrollYForYou(scrollY) {
      this.scrollYForYou = scrollY;
    },
    setScrollYFollowing(scrollY) {
      this.scrollYFollowing = scrollY;
    },

    // user profile
    setScrollYPostsMyself(scrollY){
      this.scrollYPostsMyself = scrollY
    },
    setScrollYPostsRepliesMyself(scrollY){
      this.scrollYPostsRepliesMyself = scrollY
    },
    setScrollYPostsLikesMyself(scrollY){
      this.scrollYPostsLikesMyself = scrollY
    },
    // bookmarks
    setScrollYBookmarks(scrollY){
      this.scrollYBookmarks = scrollY
    },
    // search
    setScrollYBookmarks(scrollY){
      this.scrollYSearch = scrollY
    },
    //  notification
    setScrollYNotication(scrollY){
      this.scrollYNotification = scrollY
    },
  },
});