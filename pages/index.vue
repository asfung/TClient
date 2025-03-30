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
import { nextTick } from 'vue'

definePageMeta({
  scrollToTop: false,
})

const scrollStore = useScrollStore()
const postStore = usePostStore()

const activeTab = computed(() => postStore.activeTab)

const posts = computed(() => postStore.posts)
const postsPage = computed(() => postStore.postsPage)
const hasNextPage = computed(() => postStore.postsHasNextPage)

const postsFollowing = computed(() => postStore.postsFollowing)
const postsFollowingPage = computed(() => postStore.postsFollowingPage)
const hasNextPageFollowing = computed(() => postStore.postsFollowingHasNextPage)

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, activeTab.value === 'forYou' 
      ? scrollStore.scrollYForYou 
      : scrollStore.scrollYFollowing)
  })
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  if (activeTab.value === 'forYou') {
    scrollStore.scrollYForYou = window.scrollY
    // scrollStore.setScrollYForYou(window.scrollY)
  } else {
    scrollStore.scrollYFollowing = window.scrollY
    // scrollStore.setScrollYFollowing(window.scrollY)
  }
}

watch(activeTab, async (newTab, oldTab) => {
  if (oldTab === 'forYou') {
    scrollStore.setScrollYForYou(window.scrollY)
  } else {
    scrollStore.setScrollYFollowing(window.scrollY)
  }

  await nextTick()
  window.scrollTo(0, newTab === 'forYou' ? scrollStore.scrollYForYou : scrollStore.scrollYFollowing)
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
