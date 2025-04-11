<template>
  <div 
    class="header dark:bg-black dark:text-white bg-gray-100 text-gray-900 shadow-md py-4 px-6 flex items-center justify-between backdrop-blur-md bg-opacity-20 dark:backdrop-blur-md dark:bg-opacity-50"
    >
    <!-- left -->
    <div v-if="($isBreakpoint(['xs', 'sm', 'md', 'lg', 'xl']) && showCenter)" class="flex items-center">
      <!-- <v-img :src="logoImage" class="h-8 w-auto"></v-img> -->
      <img :src="logoImage" class="h-8 w-auto" />
      <!-- {{ logoImage }} -->
    </div>

    <!-- center -->
    <div class="flex space-x-4">
      <div
        v-if="showCenter"
        class="flex space-x-4"
        >
        <NuxtLink
          to="/"
          :class="activeTab === 'forYou' ? 'text-primaryLight dark:text-primaryDark font-base-bold' : ''"
          @click.prevent="debouncedSetActiveTab('forYou')"
          >For you
          <div :class="{'h-1 bg-primaryLight dark:bg-primaryDark rounded-md' : activeTab === 'forYou'}"></div>
        </NuxtLink>

        <NuxtLink
          to="/"
          :class="activeTab === 'following' ? 'text-primaryLight dark:text-primaryDark font-base-bold' : ''"
          @click.prevent="debouncedSetActiveTab('following')"
          >Following
          <div :class="{'h-1 bg-primaryLight dark:bg-primaryDark rounded-md' : activeTab === 'following'}"></div>
        </NuxtLink>
      </div>
    </div>

    <!-- right -->
    <div v-if="($isBreakpoint(['xs', 'sm', 'md', 'lg', 'xl']) && showCenter)">
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

    <transition name="fade">
      <div v-if="showWarning" class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md">
        Please slow down! You're clicking too fast.
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify';
import { usePostStore } from '~/stores/Post';

const postStore = usePostStore();
const route = useRoute()
const colorMode = useColorMode()
const theme = useTheme()

const logoImage = "/images/TALKER_TRANSPARENT.png"
const activeTab = computed(() => postStore.activeTab)
const showCenter = ref(true);
const lastScrollPosition = ref(0);

const showWarning = ref(false);
let clickTimeout = null;
let lastClickTime = 0;
const CLICK_DELAY = 500; 

const setActiveTab = (tab) => {
  postStore.activeTab = tab;
};

const setColorTheme = (newTheme) => {
  // console.log(newTheme);
  useColorMode().preference = newTheme;
};

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  const isProfilePage = /^\/@[^/]+$/.test(route.path);
  if (isProfilePage) {
    if(currentScrollPosition > 0){
      showCenter.value = false;
    }
    if (currentScrollPosition < 242) {
      showCenter.value = true;
    }
  }
  lastScrollPosition.value = currentScrollPosition;
};

// in the future it will be composable 
const debouncedSetActiveTab = (tab) => {
  const currentTime = Date.now();
  if (currentTime - lastClickTime < CLICK_DELAY) {
    showWarning.value = true;
    // clear timeout
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    // hide warning in 2 sec 
    clickTimeout = setTimeout(() => {
      showWarning.value = false;
    }, 2000);
    
    return;
  }
  
  lastClickTime = currentTime;
  setActiveTab(tab);
};

watch(() => route.path, (newPath, oldPath) => {
  if (/^\/@[^/]+$/.test(oldPath) && !/^\/@[^/]+$/.test(newPath)) {
    showCenter.value = true;
  }
});

watch(() => colorMode.value, (newMode) => {
  theme.global.name.value = newMode
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>