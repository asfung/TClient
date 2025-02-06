import { defineStore } from "pinia";

export const useScrollStore = defineStore('ScrollStore', {
    state: () => {
        return {
            scrollY: 0,
            scrollX: 0,
            offsetTop: 0,
        }
    },
    actions: {
        updateScrollY(scrollY) {
            this.scrollY = scrollY;
        },
        updateScrollX(scrollX) {
            this.scrollX = scrollX;
        },
        updateOffsetTop(offsetTop) {
            this.offsetTop = offsetTop;
        }
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
