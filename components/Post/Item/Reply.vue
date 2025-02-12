<template>
  <div class="">
    <!-- <div class="flex flex-shrink-0 p-8 pb-0">
      <ol class="relative border-timeline">
        <li class="ms-8 -mt-6"> -->
          <span
            class="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-5 ring-8 ring-white dark:ring-black dark:bg-blue-900">
            <img class="rounded-full shadow-lg"
              src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="Bonnie image" />
          </span>
          <div class="">
            <div class="">
              <p class="text-base leading-6 font-medium">
                Sonali Hirave {{ item.id }}
                <span
                  class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @{{ item.username }} . 16 April </span>
              </p>
            </div>
            <PostContentText class="max-w-[475px]" :content="item.contentData" />

            <div class="pl-0 mb-2">
              <UCarousel v-slot="{ item }" :items="item.media"
                :ui="{ item: 'mx-1', container: 'pr-5 snap-none scroll-smooth' }">
                <img :src="item" width="200" height="300" draggable="true"
                  class="rounded-lg cursor-pointer duration-200 active:scale-95" />
              </UCarousel>
            </div>


            <div class="flex">
              <div class="">
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
                      <svg :class="likeClass" fill="none" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                        </path>
                      </svg>
                    </a>
                  </div>

                  <div class="flex-1 text-center py-2 m-2" @click="toggleBookmark">
                    <a
                      class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-highlight hover:bg-opacity-10 hover:text-highlight">
                      <svg :class="bookmarkClass" fill="none" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
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
          </div>
        <!-- </li>
      </ol>



    </div> -->
    <!-- <PostItemReply :item="item" /> -->

  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    required: true
  },
})

</script>