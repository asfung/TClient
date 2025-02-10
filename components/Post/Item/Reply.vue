<!-- <template>
    <div class="">
    <div class="flex flex-shrink-0 p-4 pb-0">
      <a href="#" class="flex-shrink-0 group block">
        <div class="flex items-center">
          <div>
            <img class="inline-block h-10 w-10 rounded-full"
              src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
          </div>
          <div class="ml-3">
            <p class="text-base leading-6 font-medium">
              Sonali Hirave {{ item.id }}
              <span
                class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @{{ item.username }} . 16 April </span>
            </p>
          </div>
        </div>
      </a>
    </div>
  
      <div class="">
        <PostContentText class="pl-16 " :content="item.contentData" />
  
        <div class="pl-0 mb-2">
          <UCarousel v-slot="{ item }" :items="item.media"
            :ui="{ item: 'mx-1', container: 'pl-16 pr-5 snap-none scroll-smooth' }">
            <img :src="item" width="200" height="300" draggable="true"
              class="rounded-lg cursor-pointer duration-200 active:scale-95" />
          </UCarousel>
        </div>
  
  
        <div class="flex pl-16">
          <div class="w-full">
            <div class="flex items-center">
              <div class="flex-1 text-center">
                <a href="#"
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-primaryLight hover:bg-opacity-10 hover:text-primaryLight ">
                  <svg class="text-center h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                    </path>
                  </svg>
                </a>
              </div>
  
              <div class="flex-1 text-center py-2 m-2">
                <a href="#"
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-success hover:bg-opacity-10 hover:text-success">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </a>
              </div>
  
              <div class="flex-1 text-center py-2 m-2" @click="toggleLike">
                <a
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-accent hover:bg-opacity-10 hover:text-accent">
                  <svg :class="likeClass" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                    </path>
                  </svg>
                </a>
              </div>
  
              <div class="flex-1 text-center py-2 m-2" @click="toggleBookmark">
                <a
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-highlight hover:bg-opacity-10 hover:text-highlight">
                  <svg :class="bookmarkClass" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3v18l7-5 7 5V3z"></path>
                  </svg>
                </a>
              </div>
  
              <div class="flex-1 text-center py-2 m-2">
                <a href="#"
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
      
    </div>
  </template>
  
  
  <script setup>
  import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
  
  const isBookmarked = ref(false)
  const isLiked = ref(false)
  
  const props = defineProps({
    item: {
      required: true
    },
  })
  
  const bookmarkClass = computed(() => {
    return isBookmarked.value ? 'text-center h-7 w-6 fill-current text-highlight' : 'text-center h-7 w-6';
  });
  
  const likeClass = computed(() => {
    return isLiked.value ? 'text-center h-7 w-6 fill-current text-accent' : 'text-center h-7 w-6';
  });
  
  const toggleBookmark = () => {
    console.log('before ', isBookmarked.value)
    isBookmarked.value = !isBookmarked.value
    console.log('after ', isBookmarked.value)
  }
  
  const toggleLike = () => {
    console.log('before ', isLiked.value)
    isLiked.value = !isLiked.value
    console.log('after ', isLiked.value)
  }
  
  const clickPostItem = () => {
    console.log(props.item);
    // i want to navigate to the post page /post/:id
    useNuxtApp().$router.push(`/post/${props.item.id}`)
  }
  
  
  </script>

   -->

<template>
    <div>
        <div class="flex flex-shrink-0 p-5 pb-0">
            <ol class="relative border-s border-gray-200 dark:border-gray-700">
                <li class="mb-10 ms-6 ">
                    <span
                        class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-black dark:bg-blue-900">
                        <img class="rounded-full shadow-lg"
                            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                            alt="Bonnie image" />
                    </span>
                    <div
                        class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex dark:bg-gray-700 dark:border-gray-600">
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
                        <div class="text-sm font-normal text-gray-500 dark:text-gray-300">Bonnie moved <a href="#"
                                class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Jese Leos</a> to
                            <span
                                class="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">Funny
                                Group</span></div>
                    </div>
                </li>
                <li class="mb-10 ms-6">
                    <span
                        class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-black dark:bg-blue-900">
                        <img class="rounded-full shadow-lg"
                            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                            alt="Thomas Lean image" />
                    </span>
                    <div
                        class="p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600">
                        <div class="items-center justify-between mb-3 sm:flex">
                            <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours
                                ago</time>
                            <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">Thomas Lean commented
                                on <a href="#"
                                    class="font-semibold text-gray-900 dark:text-white hover:underline">Flowbite Pro</a>
                            </div>
                        </div>
                        <div
                            class="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                            Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure
                            your design system! This is the second session of our new webinar series on #DesignSystems
                            discussions where we'll be speaking about Measurement.</div>
                    </div>
                </li>
                <li class="ms-6">
                    <span
                        class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-black dark:bg-blue-900">
                        <img class="rounded-full shadow-lg"
                            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                            alt="Jese Leos image" />
                    </span>
                    <div
                        class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs sm:flex dark:bg-gray-700 dark:border-gray-600">
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">1 day ago</time>
                        <div class="text-sm font-normal text-gray-500 lex dark:text-gray-300">Jese Leos has changed <a
                                href="#" class="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Pricing
                                page</a> task status to <span
                                class="font-semibold text-gray-900 dark:text-white">Finished</span></div>
                    </div>
                </li>
            </ol>



        </div>

    </div>
</template>