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
import { usePostStore } from '~/stores/Post'
import { useScrollStore } from '~/stores/Scroll'

definePageMeta({
  scrollToTop: false,
})

const scrollStore = useScrollStore()
const postStore = usePostStore()

const scrollYForYou = computed(() => scrollStore.scrollYForYou)
const scrollYFollowing = computed(() => scrollStore.scrollYFollowing)
const activeTab = computed(() => postStore.activeTab)

const posts = computed(() => postStore.posts)
const postsPage = computed(() => postStore.postsPage)
const hasNextPage = computed(() => postStore.postsHasNextPage)

const postsFollowing = computed(() => postStore.postsFollowing)
const postsFollowingPage = computed(() => postStore.postsFollowingPage)
const hasNextPageFollowing = computed(() => postStore.postsFollowingHasNextPage)

onMounted(() => {
  window.scrollTo(0, activeTab.value === 'forYou' 
    ? scrollStore.scrollYForYou 
    : scrollStore.scrollYFollowing)
  
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  if (activeTab.value === 'forYou') {
    scrollStore.scrollYForYou = window.scrollY
  } else {
    scrollStore.scrollYFollowing = window.scrollY
  }
}

watch(activeTab, (newTab, oldTab) => {
  if (oldTab === 'forYou') {
    scrollStore.scrollYForYou = window.scrollY
    window.scrollTo(0, scrollStore.scrollYFollowing)
  } else {
    scrollStore.scrollYFollowing = window.scrollY
    window.scrollTo(0, scrollStore.scrollYForYou)
  }
})

const postsHandler = computed(() => {
  return activeTab.value === 'forYou' ? posts.value : postsFollowing.value
})

const pagesHandler = computed(() => {
  return activeTab.value === 'forYou' ? postsPage.value : postsFollowingPage.value
})

const hasNextPageHandler = computed(() => {
  return activeTab.value === 'forYou' ? hasNextPage.value : hasNextPageFollowing.value
})

const loadMore = async (page) => {
  await postStore.getPost({
    type: activeTab.value === 'forYou' ? 'foryou' : 'following',
    page: activeTab.value === 'forYou' ? postsPage.value : postsFollowingPage.value,
  })
  if (activeTab.value === 'forYou') {
    postStore.postsPage = page
  } else {
    postStore.postsFollowingPage = page
  }
}
</script>