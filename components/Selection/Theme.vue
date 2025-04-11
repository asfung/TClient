<template>
  <div class="flex items-center gap-6">

    <!-- light mode  -->
    <div class="flex flex-col items-center">
      <div
        @click="setLightTheme"
        class="w-32 h-40 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col space-y-2 hover:cursor-pointer hover:ring-4 hover:ring-primaryDark"
        >
        <div class="w-full h-4 bg-gray-200 rounded"></div>
        <div class="w-full h-2 bg-gray-300 rounded"></div>
        <div class="w-full h-2 bg-gray-300 rounded"></div>
        <div class="w-full h-2 bg-gray-300 rounded"></div>
      </div>
      <div class="flex items-center space-x-1">
        <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Light Mode</span>
        <button
          @click="setLightTheme"
          aria-label="Switch to light mode"
          class="mt-2 w-6 h-6 bg-gray-400 rounded-full border-2 flex items-center justify-center focus:outline-none transition-all"
          >
          <span
            class="w-4 h-4 rounded-full"
            :class="isDarkMode ? 'bg-gray-400' : 'bg-gray-900'"
          ></span>
        </button>
      </div>
    </div>

    <!--dark mode -->
    <div class="flex flex-col items-center">
      <div
        @click="setDarkTheme"
        class="w-32 h-40 bg-gray-800 rounded-lg shadow-md p-4 flex flex-col space-y-2 hover:cursor-pointer hover:ring-4 hover:ring-primaryLight"
        >
        <div class="w-full h-4 bg-gray-600 rounded"></div>
        <div class="w-full h-2 bg-gray-500 rounded"></div>
        <div class="w-full h-2 bg-gray-500 rounded"></div>
        <div class="w-full h-2 bg-gray-500 rounded"></div>
      </div>
      <div class="flex items-center space-x-1">
        <span class="mt-2 text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
        <button
          @click="setDarkTheme"
          aria-label="Switch to dark mode"
          class="mt-2 w-6 h-6 bg-gray-400 rounded-full border-2 flex items-center justify-center focus:outline-none transition-all"
          >
          <span
            class="w-4 h-4 rounded-full"
            :class="isDarkMode ? 'bg-gray-900' : 'bg-gray-400'"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useTheme } from 'vuetify'

const colorMode = useColorMode()
const theme = useTheme()

const isDarkMode = computed(() => colorMode.preference === 'dark')

const setLightTheme = () => {
  colorMode.preference = 'light'
}

const setDarkTheme = () => {
  colorMode.preference = 'dark'
}

watch(() => colorMode.value, (newMode) => {
  theme.global.name.value = newMode
})
</script>
