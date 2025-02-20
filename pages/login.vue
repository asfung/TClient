<template>
  <div class="flex items-center ">
    <div class="max-w-[280px] mx-auto ">
      <div class="flex flex-col items-center mt-[10vh]">
        <button @click="setColorTheme($colorMode.preference === 'dark' ? 'light' : 'dark')" class="ml-4">
          <svg v-if="$colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-50"
            viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd" />
          </svg>
        </button>
        <h2 class="mb-5 text-gray-900 dark:text-neutral-light font-mono font-bold text-xl">Log In</h2>
        <form>
          <input type="text" class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium " placeholder="Email"
            value="" />
          <input type="password" class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium "
            placeholder="Password" value="" />
          <button
            class="bg-primaryLight hover:bg-primaryDark dark:bg-primaryDark dark:hover:bg-primaryLight text-white rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">Log
            In</button>
        </form>
        <p class="text-center mt-3 text-[14px]">Don&#x27;t have an account?
          <NuxtLink to="/register" class="text-gray-600">Create one</NuxtLink>
        </p>
        <!-- <p class="text-center mt-3 text-[14px]">By clicking continue, you agree to our
        <a href="/terms" class="text-gray-600">Terms of Service</a> and <a href="/privacy" class="text-gray-600">Privacy
          Policy</a>.
      </p> -->
      </div>
      <!-- <div class="my-48">
        dsalkmdas
      </div> -->
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'none',
})
const setColorTheme = (newTheme) => {
  console.log(newTheme);
  useColorMode().preference = newTheme;
}
</script>

<style scoped>
.border-input {
  border: 1px solid rgb(71 85 105);
}
</style>
