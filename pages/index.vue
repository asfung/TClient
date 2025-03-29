<template>
  <div>
    <Post 
      :input-post="true"
      :current-page="pagesHandler"
      :has-next-page="hasNextPageHandler"
      @load-more="loadMore"
      :posts="postsHandler"
    />
  </div>

</template>

<script setup>
import { createPinia } from 'pinia'
import { useAuthStore } from '~/stores/Auth'
import { usePostStore } from '~/stores/Post'
// import { useScrollStore } from '~/stores/Scroll'

definePageMeta({
  scrollToTop: false,
  // middleware: ['auth-middleware'],
})

const scrollStore = useScrollStore()
const postStore = usePostStore()

const scrollYForYou = computed(()=> scrollStore.scrollYForYou)
const scrollYFollowing = computed(()=> scrollStore.scrollYFollowing)
const scrollY = computed((() => scrollStore.scrollY))
const activeTab = computed(() => postStore.activeTab)

const posts = computed(() => postStore.posts)
const postsPage = computed(() => postStore.postsPage)
const hasNextPage = computed(() => postStore.postsHasNextPage)

const postsFollowing = computed(() => postStore.postsFollowing)
const postsFollowingPage = computed(() => postStore.postsFollowingPage)
const hasNextPageFollowing = computed(() => postStore.postsFollowingHasNextPage)

onMounted(() => {
  // console.log("masuk ke page index")
  if(activeTab.value === 'forYou'){
    window.scrollTo(0, scrollYForYou.value)
  }else{
    window.scrollTo(0, scrollYFollowing.value)
  }
  // console.log('scrollY pada halaman index: ', scrollY.value)

  // if(process.client && window){
  //   window.history.scrollRestoration = 'auto'
  // }
})

const postsHandler = computed(() => {
  if (activeTab.value === 'forYou') {
    return posts.value
  } else {
    return postsFollowing.value
  }
})

const pagesHandler = computed(() => {
  if (activeTab.value === 'forYou') {
    return postsPage.value
  } else {
    return postsFollowingPage.value
  }
})

const hasNextPageHandler = computed(() => {
  if (activeTab.value === 'forYou') {
    return hasNextPage.value
  } else {
    return hasNextPageFollowing.value
  }
})

const loadMore = async (page) => {
  await postStore.getPost({
    type: activeTab.value === 'forYou' ? 'foryou' : 'following',
    page: activeTab.value === 'forYou' ? postsPage.value : postsFollowingPage.value,
  })
  if (activeTab.value === 'forYou') {
    postStore.postsPage = page; 
  } else {
    postStore.postsFollowingPage = page;
  }
}

watch(activeTab, async (newTab) => {
  if(activeTab.value === 'forYou'){
    scrollStore.scrollYForYou = window.scrollY
    window.scrollTo(0, scrollYForYou.value)
  }else{
    scrollStore.scrollYFollowing = window.scrollY
    window.scrollTo(0, scrollYFollowing.value)
  }
  if(posts.value.length < 0 && postsFollowing.value.length < 0){
    await loadMore()
  }
});

onBeforeRouteLeave((to, from, next) => {
  // scrollStore.updateScrollY(window.scrollY)
  // console.log('pindah dengan scrollY : ', window.scrollY)
  if(activeTab.value === 'forYou'){
    scrollStore.scrollYForYou = window.scrollY
  }else{
    scrollStore.scrollYFollowing = window.scrollY
  }
  next()
})


</script>

