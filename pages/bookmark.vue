<template>
  <div class="border-default rounded-lg">
    <div v-for="(item, index) in postsBookmark" :key="index">
      <PostItem :item="item" :index="index" />
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

const posts = computed(() => postStore.posts);

const scrollYBookmarks = computed(() => scrollStore.scrollYBookmarks)
const postsBookmark = computed(() => postStore.postsBookmark)
const postsBookmarkPage = computed(() => postStore.postsBookmarkPage)
const postsBookmarkHasNextPage = computed(() => postStore.postsBookmarkHasNextPage)

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, scrollYBookmarks.value)
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
  console.log(postsBookmarkPage.value)
  await postStore.getPost({
    type: 'bookmarks',
    page: postsBookmarkPage.value,
    per_page: 5, // for now it just 5
  })
  // postsBookmarkPage.value = page
  postStore.postsBookmarkPage = page
}

const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section")
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && postsBookmarkHasNextPage.value) {
        const nextPage = postsBookmarkPage.value + 1
        bookmarksFetch(nextPage)
      }
    },
    { threshold: 1.0 }
  );
  observer.observe(sentinel)
};

</script>