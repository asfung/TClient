<template>
  <div class="header dark:bg-black dark:text-white bg-gray-100 text-gray-900 shadow-md py-4 px-6 flex items-center justify-between backdrop-blur-md bg-opacity-20 dark:backdrop-blur-md dark:bg-opacity-50">
    <!-- left -->
    <div class="flex items-center">
      <!-- <v-img :src="logoImage" class="h-8 w-auto"></v-img> -->
      <img :src="logoImage" class="h-8 w-auto" />
      <!-- {{ logoImage }} -->
    </div>

    <!-- center -->
    <div class="flex space-x-4">
      <a href="#" class="hover:underline hover:decoration-blue-600">For you</a>
      <div class="w-px h-6 bg-gray-400"></div>
      <a href="#" class="hover:underline hover:decoration-blue-600">Following</a>
    </div>

    <!-- right -->
    <div>
      <button @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')" class="ml-4">
        <svg v-if="$colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    logoImage() {
      return "/images/TALKER_TRANSPARENT.png";
    },
  },

  methods: {
    setColorTheme(newTheme) {
      console.log(newTheme);
      useColorMode().preference = newTheme;
    },
  },
};
</script>