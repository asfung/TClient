<template>

  <div class="flex flex-col md:flex-row justify-between items-start md:mx-6 lg:mx-48">
    <div v-if="$isBreakpoint(['md', 'lg', 'xl'])" class="w-full md:w-2/4 sticky top-14 p-0 border border-gray-300 dark:text-white rounded mr-4 md:mr-8 ">
      <SideBar />
    </div>
    <div class="w-full md:w-4/4 p-0 dark:text-white rounded border border-gray-300">
      <!-- <p>{{ $screen }}</p> -->
       <!-- <v-infinite-scroll @load="postStore.loadMoreData"> -->
      <p class="text-white">{{ token }} </p>
       <!-- <keep-alive> -->
          <Post />
       <!-- </keep-alive> -->
      <!-- </v-infinite-scroll> -->
    </div>
    <div v-if="$isBreakpoint(['md', 'lg', 'xl'])" class="w-full md:w-2/4 sticky top-14 border border-gray-300 dark:text-white rounded ml-4 md:ml-8">
      <Trends />
    </div>
  </div>


</template>

<script setup>
import { createPinia } from 'pinia'
import { useAuthStore } from '~/stores/Auth'
import { usePostStore } from '~/stores/Post'

// const pinia = createPinia()

// const nuxtApp = useNuxtApp()
// nuxtApp.vueApp.use(pinia)

// const authStore = useAuthStore()
// const postStore = usePostStore()

// const token = computed(() => authStore.getToken())
// const posts = computed(() => postStore.posts)

// onMounted(() => {
//   postStore.loadMoreData()
// })




</script>

