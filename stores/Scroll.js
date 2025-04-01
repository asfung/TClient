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
    setScrollYscrollYPostsMyself(scrollY){
      this.scrollYPostsMyself = scrollY
    },
    setScrollYscrollYPostsRepliesMyself(scrollY){
      this.scrollYPostsRepliesMyself = scrollY
    },
    setScrollYscrollYPostsLikesMyself(scrollY){
      this.scrollYPostsLikesMyself = scrollY
    },
    setScrollYBookmarks(scrollY){
      this.scrollYBookmarks = scrollY
    },
  },
});