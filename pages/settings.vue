<template>
  <div class="">
    <div class="grid justify-start">
      <button @click="checkTokenEvent()">Check Token</button>
      <button @click="signOutEvent()">Sign Out</button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth-middleware'],
})
import { useAuthStore } from "~/stores/Auth"

const authStore = useAuthStore()

const signOutEvent = () => {
  authStore.signOut()
  window.location.href = '/'
}

const checkTokenEvent = () => {
  authStore.checkToken()
}


</script>

