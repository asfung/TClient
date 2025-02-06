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

definePageMeta({
  scrollToTop: false,
})

const scrollStore = useScrollStore()
const scrollY = computed((() => scrollStore.scrollY))

onMounted(() => {
  // console.log("masuk ke page index")
  window.scrollTo(0, scrollY.value)
  // console.log('scrollY pada halaman index: ', scrollY.value)

  // if(process.client && window){
  //   window.history.scrollRestoration = 'auto'
  // }
})

onBeforeRouteLeave((to, from, next) => {
  scrollStore.updateScrollY(window.scrollY)
  console.log('pindah dengan scrollY : ', window.scrollY)
  next()
})


</script>

