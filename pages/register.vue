<template>
  <div class="flex items-center">
    <div class="max-w-[280px] mx-auto">
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
        <h2 class="mb-5 text-gray-900 dark:text-neutral-light font-mono font-bold text-xl">Sign Up</h2>
        <form @submit.prevent>
          <input v-model="displayName" type="text" class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium "
            placeholder="Display Name" value="" />
          <input v-model="username" type="text" class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium "
            placeholder="Username" value="" />
          <input v-model="email" type="text" class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium "
            placeholder="Email" value="" />
          <div class="relative w-full">
            <input v-model="password" :type="isPasswordVisible ? 'text' : 'password'"
              class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium pr-10" placeholder="Password" value="" />
            <button type="button" @click="isPasswordVisible = !isPasswordVisible"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg v-if="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.875 18.825a10.05 10.05 0 01-3.875.675C5.758 19.5 2 14 2 14s1.758-3.89 4.95-5.925a10.05 10.05 0 013.875-.675m7.1 3.4c.472.584.872 1.2 1.2 1.775M3 3l18 18" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9c-7.732 0-14 9-14 9s6.268 9 14 9 14-9 14-9-6.268-9-14-9z" />
              </svg>
            </button>
          </div>
          <div class="relative w-full">
            <input v-model="passwordConfirm" :type="isPasswordConfirmVisible ? 'text' : 'password'"
              class="w-full px-6 py-3 mb-2 border-input rounded-lg font-medium pr-10" placeholder="Confirm Password" value="" />
            <button type="button" @click="isPasswordConfirmVisible = !isPasswordConfirmVisible"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg v-if="!isPasswordConfirmVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.875 18.825a10.05 10.05 0 01-3.875.675C5.758 19.5 2 14 2 14s1.758-3.89 4.95-5.925a10.05 10.05 0 013.875-.675m7.1 3.4c.472.584.872 1.2 1.2 1.775M3 3l18 18" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3-9c-7.732 0-14 9-14 9s6.268 9 14 9 14-9 14-9-6.268-9-14-9z" />
              </svg>
            </button>
          </div>
          <button @click="registerEvent()"
            class="bg-primaryLight hover:bg-primaryDark dark:bg-primaryDark dark:hover:bg-primaryLight text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]">Register</button>
        </form>
        <p class="text-center mt-3 text-[14px]">Already have an account?
          <NuxtLink href="/login" class="text-gray-600">Log In</NuxtLInk>
        </p>
      </div>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error" variant="tonal" class="font-base font-base-bold">
      <p>{{ text }}</p>
    </v-snackbar>

  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/Auth';
definePageMeta({
  layout: 'none',
  // middleware: ['auth-middleware']
})

const authStore = useAuthStore()

const setColorTheme = (newTheme) => {
  console.log(newTheme);
  useColorMode().preference = newTheme;
}

const isPasswordVisible = ref(false);
const isPasswordConfirmVisible = ref(false)

const snackbar = ref(false)
const text = ref('')
const timeout = ref(2000)

const displayName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')



const registerEvent = async () => {
  try{

  if(password.value !== passwordConfirm.value){
    snackbar.value = true
    text.value = 'pasword must be match !'
    return;
  }

  const {status, data, message} = await authStore.registerAction({
    display_name: displayName.value,
    username: username.value,
    email: email.value, 
    password: password.value
  });
  if(status === 200){
    const credentials = authStore.formattedCredentials(data)
    authStore.setCredentials(credentials)
    window.location.href = '/'
  }
  if(status === 500){
    snackbar.value = true
    text.value = message
  }
  console.log(message)

  }catch(e){
    console.log(e)
  }
}

</script>

<style scoped>
.border-input{
  border: 1px solid rgb(71 85 105 );
}
</style>