<template>
  <div class="border-default rounded-lg">
    <div v-if="postsBookmark && postsBookmark.length > 0">
      <v-virtual-scroll :items="postsBookmark">
        <template v-slot:default="{ item, index }">
          <PostItem :item="item" :index="index" />
        </template>
      </v-virtual-scroll>
    </div>

    <div v-else class="flex items-center justify-center h-screen">
      <div v-if="isFetching" class="flex items-center justify-center py-4">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </div>
      <p v-else class="text-gray-500">Bookmark Empty</p>
    </div>

    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
definePageMeta({
  scrollToTop: false,
  // middleware: ['auth-middleware'],
})

import { usePostStore } from '~/stores/Post'
import { useScrollStore } from '~/stores/Scroll'

const postStore = usePostStore()
const scrollStore = useScrollStore()

const scrollYBookmarks = computed(() => scrollStore.scrollYBookmarks)
const postsBookmark = computed(() => postStore.postsBookmark)
const postsBookmarkPage = computed(() => postStore.postsBookmarkPage)
const postsBookmarkHasNextPage = computed(() => postStore.postsBookmarkHasNextPage)

const isFetching = ref(false)

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, scrollYBookmarks.value)
    if (
      postsBookmark.value.length < 5 &&
      postsBookmarkHasNextPage.value &&
      !isFetching.value
    ) {
      bookmarksFetch(postsBookmarkPage.value + 1)
    }
  })
  window.addEventListener('scroll', handleScroll)
  observeSentinel()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  scrollStore.scrollYBookmarks = window.scrollY
}

const bookmarksFetch = async (page) => {
  if (isFetching.value) return
  isFetching.value = true

  try{
    const response = await postStore.getPost({
      type: 'bookmarks',
      page: postsBookmarkPage.value,
      per_page: 5, // for now it just 5
    })
    // postsBookmarkPage.value = page // not reactive cause it using computed(), hell nawhhhh chattt
    postStore.postsBookmarkPage = page
    // TODO: using current_page, last_page do not using data.lenght on Post.js
    // "meta": {
    //       "current_page": 2,
    //       "last_page": 2,
    //       "per_page": 5,
    //       "total": 10
    //   },
    // console.log(response.meta)
    if(response.status === 404 || response.meta.current_page === response.meta.last_page){
      postStore.postsBookmarkHasNextPage = false
    }
  }catch(e){}finally{
    setTimeout(() => {
      isFetching.value = false 
    }, 1000) 
  }
}

const observeSentinel = () => {
  if(postsBookmarkHasNextPage.value === false) return;
  const sentinel = document.getElementById("checkpoint-section")
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && postsBookmarkHasNextPage.value && !isFetching.value) {
        const nextPage = postsBookmarkPage.value + 1
        bookmarksFetch(nextPage)
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel)
};

</script>