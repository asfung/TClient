<template>
  <div class="h-screen">
    <div class="grid justify-start">
      <button @click="checkTokenEvent()">Check Token</button>
      <button @click="signOutEvent()">Sign Out</button>
      <!-- <pre>{{ user }}</pre>
      <button @click="changeLocalStorage">change user credentials</button>
      <p class="break-all">{{ token }}</p> -->
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  // middleware: ['auth-middleware'],
})
import { useAuthStore } from "~/stores/Auth"
import { Credentials } from "~/enums/Credentials"

const authStore = useAuthStore()

const user = computed(() => authStore.getCredentials(Credentials.USER))
const token = computed(() => authStore.getCredentials(Credentials.TOKEN))

const signOutEvent = async () => {
  try{
    const fetch = await authStore.signOut()
    if(fetch.status === 200){
      window.location.href = '/'
    }
  }catch(e){
    console.log(e)
  }
}

const changeLocalStorage = () => {
  authStore.setCredentialBy(Credentials.USER, {
    name: 'CHANGED',
    email: 'CHANGED',
    profile_image: 'CHANGED'
  })
}

const checkTokenEvent = () => {
  authStore.checkToken()
}


</script>

