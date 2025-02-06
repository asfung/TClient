<template>

  <div>
    <p class="text-white">{{ token }} </p>
    <Post />
  </div>


</template>

<script setup>
import { createPinia } from 'pinia'
import { useAuthStore } from '~/stores/Auth'
import { usePostStore } from '~/stores/Post'
// import { useScrollStore } from '~/stores/Scroll'


const scrollStore = useScrollStore()
const scrollY = computed((() => scrollStore.scrollY))
// const pinia = createPinia()

onMounted(() => {
  console.log("masuk ke page index")
  window.scrollTo(0, scrollY.value)
  console.log('scrollY pada halaman index: ', scrollY.value)
})

// const nuxtApp = useNuxtApp()
// nuxtApp.vueApp.use(pinia)

// const authStore = useAuthStore()
// const postStore = usePostStore()

// const token = computed(() => authStore.getToken())
// const posts = computed(() => postStore.posts)

// onMounted(() => {
//   postStore.loadMoreData()
// })

onBeforeRouteLeave((to, from, next) => {
  scrollStore.updateScrollY(window.scrollY)
  console.log('pindah dengan scrollY : ', window.scrollY)
  next()
})


</script>

