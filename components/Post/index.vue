<template>
  <!-- <div class="dark:border-white dark:border dark:rounded"> -->
  <div class="dark:border dark:border-white rounded-lg">
    <div class="flex ">
      <div class="m-2 w-10 py-1">
        <img class="inline-block h-10 w-10 rounded-full"
          src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
      </div>
      <div class="flex-1 px-2 pt-2 mt-2">
        <textarea v-model="content" @input="handleInput" class="bg-transparent text-gray-400 font-medium text-lg w-full"
          rows="2" cols="50" placeholder="What's happening?"></textarea>
        <div class="flex">
          <div class="w-10"></div>

          <div class="px-2">

            <div class="flex items-center">
              <div class="flex-1 text-center px-1 py-1 m-2">
                <a href="#"
                  class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                    </path>
                  </svg>
                </a>
              </div>

              <!-- <div class="flex-1 text-center py-2 m-2">
                <a href="#"
                  class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z">
                    </path>
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </a>
              </div>

              <div class="flex-1 text-center py-2 m-2">
                <a href="#" class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </a>
              </div>

              <div class="flex-1 text-center py-2 m-2">
                <a href="#" class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </a>
              </div> -->
            </div>
          </div>

          <div class="flex-1">
            <button
              class="bg-blue-500 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-gray-600 dark:border-white" />

    <!-- after tweet -->
    <div class="flex flex-shrink-0 p-4 pb-0">
      <a href="#" class="flex-shrink-0 group block">
        <div class="flex items-center">
          <div>
            <img class="inline-block h-10 w-10 rounded-full"
              src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
          </div>
          <div class="ml-3">
            <p class="text-base leading-6 font-medium">
              Sonali Hirave
              <span
                class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                @ShonaDesign . 16 April </span>
            </p>
          </div>
        </div>
      </a>
    </div>
    <div class="pl-16">
      <p class="text-base width-auto font-medium flex-shrink" v-html="parseContent(content)">
      </p>

      <div class="flex">
        <div class="w-full">
          <div class="flex items-center">
            <div class="flex-1 text-center">
              <a href="#"
                class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
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
                class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                </svg>
              </a>
            </div>

            <div class="flex-1 text-center py-2 m-2" @click="like = true" v-if="like === false">
              <a
                class="w-12 cursor-pointer mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-pink-500 hover:text-pink-300">
                <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                  </path>
                </svg>
              </a>
            </div>


            <div class="flex-1 text-center py-2 m-2" @click="like = false" v-if="like === true">
              <a
                class="w-12 cursor-pointer mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-pink-100 hover:text-pink-300">
                <svg class="text-center h-7 w-6 fill-pink-500" fill="none" stroke-linecap="round"
                  stroke-linejoin="round" viewBox="0 0 24 24">
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                  </path>
                </svg>
              </a>
            </div>

            <div class="flex-1 text-center py-2 m-2">
              <a href="#"
                class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-500 hover:text-green-300">
                <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                </svg>
              </a>
            </div>
            <div class="flex-1 text-center py-2 m-2">
              <a href="#"
                class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
                  </path>
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


    <!-- data tweet -->
    <div v-for="(item, index) in feeds" :key="index">
      <hr class="border-gray-600 dark:border-white" />
      <div class="flex flex-shrink-0 p-4 pb-0">
        <a href="#" class="flex-shrink-0 group block">
          <div class="flex items-center">
            <div>
              <img class="inline-block h-10 w-10 rounded-full"
                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
            </div>
            <div class="ml-3">
              <p class="text-base leading-6 font-medium">
                Sonali Hirave
                <span
                  class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @ShonaDesign . 16 April </span>
              </p>
            </div>
          </div>
        </a>
      </div>

      <!-- <div class="pl-16"> -->
      <div class="">
        <p class="pl-16 text-base width-auto font-medium flex-shrink" v-html="parseContent(contentData)">
        </p>


        <div class="pl-0" >
          <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'mx-1', container: 'pl-16 pr-5 snap-none scroll-smooth' }">
            <img :src="item" width="200" height="300" draggable="true" class="rounded-lg cursor-pointer duration-200 active:scale-95" />
          </UCarousel>
        </div>


        <!-- <div class="md:flex-shrink pr-6 pt-3">
          <div class="rounded-xl overflow-hidden">

            <div class="grid grid-cols-2 gap-2">
              <div class="col-span-1">
                <img class="w-full h-auto"
                  src="https://img.freepik.com/free-photo/beautiful-strawberry-garden-sunrise-doi-ang-khang-chiang-mai-thailand_335224-762.jpg?t=st=1731473988~exp=1731477588~hmac=2348a33c7460dc326a903011013c38b3d3736896ab2f7fc11ce2422e2f9f4f6e&w=1380" />
              </div>

              <div class="col-span-1">
                <img class="w-full h-auto"
                  src="https://img.freepik.com/free-photo/beautiful-strawberry-garden-sunrise-doi-ang-khang-chiang-mai-thailand_335224-762.jpg?t=st=1731473988~exp=1731477588~hmac=2348a33c7460dc326a903011013c38b3d3736896ab2f7fc11ce2422e2f9f4f6e&w=1380" />
              </div>

              <div class="col-span-1">
                <img class="w-full h-auto"
                  src="https://img.freepik.com/free-photo/beautiful-strawberry-garden-sunrise-doi-ang-khang-chiang-mai-thailand_335224-762.jpg?t=st=1731473988~exp=1731477588~hmac=2348a33c7460dc326a903011013c38b3d3736896ab2f7fc11ce2422e2f9f4f6e&w=1380" />
              </div>

              <div class="col-span-1">
                <img class="w-full h-auto"
                  src="https://img.freepik.com/free-photo/beautiful-strawberry-garden-sunrise-doi-ang-khang-chiang-mai-thailand_335224-762.jpg?t=st=1731473988~exp=1731477588~hmac=2348a33c7460dc326a903011013c38b3d3736896ab2f7fc11ce2422e2f9f4f6e&w=1380" />
              </div>
            </div>

          </div>
        </div> -->

        <div class="flex pl-16">
          <div class="w-full">
            <div class="flex items-center">
              <div class="flex-1 text-center">
                <a href="#"
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
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
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                </a>
              </div>

              <div class="flex-1 text-center py-2 m-2" @click="item.liked = true" v-if="item.liked === false">
                <a
                  class="w-12 cursor-pointer mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-pink-500 hover:text-pink-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                    </path>
                  </svg>
                </a>
              </div>

              <div class="flex-1 text-center py-2 m-2" @click="item.liked = true" v-if="item.liked === true">
                <a
                  class="w-12 cursor-pointer mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-pink-100 hover:text-pink-300">
                  <svg class="text-center h-7 w-6 fill-pink-500" fill="none" stroke-linecap="round"
                    stroke-linejoin="round" viewBox="0 0 24 24">
                    <path
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                    </path>
                  </svg>
                </a>
              </div>

              <div class="flex-1 text-center py-2 m-2">
                <a href="#"
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-500 hover:text-green-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                </a>
              </div>
              <div class="flex-1 text-center py-2 m-2">
                <a href="#"
                  class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                  <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20">
                    </path>
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
    </div>

    <div id="checkpoint-section"></div>
  </div>

</template>

<script>
// import DOMPurify from 'dompurify';
export default {
  mounted() {
    this.observeSentinel();
    // this.observeSentinelFlash()
  },
  methods: {
    observeSentinel() {
      const sentinel = document.getElementById("checkpoint-section");
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && this.hasNextPage) {
            this.loadMoreData();
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(sentinel);
    },
    // unused
    // observeSentinelFlash() {
    //   const sentinel = document.getElementById("checkpoint-section");
    //   const observer = new IntersectionObserver(
    //     (entries) => {
    //       if (entries[0].isIntersecting) {
    //         const scrollPosition = window.scrollY + window.innerHeight;
    //         const bottomPosition = document.body.offsetHeight;
    //         const threshold = 200;

    //         if (scrollPosition + threshold >= bottomPosition && this.hasNextPage) {
    //           this.loadMoreData();
    //         }
    //       }
    //     },
    //     { threshold: 1.0 }
    //   );
    //   observer.observe(sentinel);
    // },
    loadMoreData() {
      this.isLoading = true;
      console.log("waiting for laod new data");
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, i) => ({
          id: `${this.feeds.length + i + 1}`,
          username: `user ${i + 1}`,
          title: `selekences ${this.feeds.length + i + 1}`,
          subtitle: `selekencess cessss ${this.feeds.length + i + 1}`,
          description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${this.feeds.length + i + 1}`,
          show: false,
          liked: false,
        }));
        console.log(`before fetch: ${this.feeds.length}`);
        this.feeds.push(...newData);
        console.log(`after fetch: ${this.feeds.length}`);
        this.isLoading = false;
        this.hasNextPage = newData.length === 10;
        console.log(this.hasNextPage);
      }, 2000);
    },
    parseContent(content) {
      const hashtagRegex = /#\w+/g;
      const linkRegex = /https?:\/\/[^\s]+/g;
      const mentionRegex = /@\w+/g;

      const parsedContent = content
        .replace(/\n/g, '<br>') 
        .replace(linkRegex, (url) => `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`)
        .replace(hashtagRegex, (hashtag) => `<a href="/search?term=${hashtag.slice(1)}" class="text-blue-500 hover:underline">${hashtag}</a>`)
        .replace(mentionRegex, (mention) => `<a href="/@${mention.slice(1)}" class="text-blue-500 hover:underline">${mention}</a>`);

      return parsedContent;
      // return DOMPurify.sanitize(parsedContent);

    },
    handleInput(event) {
      const input = event.target.value;
      const lines = input.split('\n');
      const newLines = lines.map(line => {
        const chunks = [];
        for (let i = 0; i < line.length; i += this.maxCharsPerLine) {
          chunks.push(line.substring(i, i + this.maxCharsPerLine));
        }
        return chunks.join('\n');
      });
      this.content = newLines.join('\n');
    },


  },
  data() {
    return {
      like: false,
      isLoading: false,
      hasNextPage: true,
      maxCharsPerLine: 50, 
      content: null,
      contentData: "@Elon Day 07 of the challenge #100DaysOfCode I was wondering what I can do with #tailwindcss, so just started building Twitter UI using Tailwind and so far it looks so promising. I will post my code after completion. [07/100] #WomenWhoCode #CodeNewbie",
      // content: "Just completed my first project using #VueJS! 🎉 Check it out here: https://github.com/username/vue-project Big thanks to @developer123 for the guidance!  Also, don't forget to follow #WebDevelopment and #JavaScript for more updates!  Visit our site: https://www.example.com",
      content: 
        `our project on https://github.com/asfung/TClient appreciate to @rama and @perdi for the contributing!, 

        #Nuxt3 #Sigma`,
      feeds: Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        username: `user ${i + 1}`,
        title: `selekences ${i + 1}`,
        subtitle: `selekencess cessss ${i + 1}`,
        description: `kddlksamdlksamkdlmaslkdmsakmasdmsaklmsalkmsakldmsalkdmsalkmmaslkmdasl ${i + 1}`,
        show: false,
        liked: false,
      })),
    };
  },
  watch: {
    content: (oldVal, newValue) => {
      console.log(newValue)
    }
  },
};
</script>


<script setup>
import { computed } from 'vue';

const items = [
  'https://picsum.photos/600/800?random=1',
  'https://picsum.photos/600/800?random=2',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
  'https://picsum.photos/600/800?random=6'
]

const imageClass = computed(() => {
  const itemCount = this.items.length;
  const widthClass = itemCount <= 4 ? 'w-1/4' : itemCount <= 6 ? 'w-1/6' : 'w-1/8'; 
  return `${widthClass} flex-shrink-0`;

})


</script>
