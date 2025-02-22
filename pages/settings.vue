<template>
  <div class="">
    <div>
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

}

</script>

