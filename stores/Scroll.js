import { defineStore } from "pinia";

export const useScrollStore = defineStore('ScrollStore', {
  state: () => {
    return {
      scrollY: 0,
      scrollX: 0,
    }
  },
  actions: {
    updateScrollY(scrollY) {
      this.scrollY = scrollY;
    },
    updateScrollX(scrollX) {
      this.scrollX = scrollX;
    },
  },
  getters: {
    getScrollY() {
      return this.scrollY;
    },
    getScrollX() {
      return this.scrollX;
    }
  }
})
