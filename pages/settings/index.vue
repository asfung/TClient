<template>
  <!-- <div class="h-screen flex flex-col justify-between"> -->
  <div class="flex flex-col justify-between">
    <!-- Top content (optional) -->
    <div class="p-4">
      <div>
        GK TAU MAU TEMPAT APA DISINI
      </div>
    </div>

    <div class="p-4">
      <button 
        class="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        @click="signOutEvent"
      >
        Sign Out
      </button>
    </div>

    <div class="p-4">
      <button 
        class="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        @click="showSimpleToast"
      >
        Test Toast
      </button>
    </div>
    <ToastSnackbar />
  </div>
  <!-- <button @click="checkTokenEvent()">Check Token</button>
  <button @click="signOutEvent()" >Sign Out </button>
  <pre>{{ user }}</pre>
  <button @click="changeLocalStorage">change user credentials</button>
  <p class="break-all">{{ token }}</p> -->
</template>

<script setup>
definePageMeta({
  // middleware: ['auth-middleware'],
})
import { useAuthStore } from "~/stores/Auth"
import { Credentials } from "~/enums/Credentials"
import { useTalkerToast } from "~/composables/useTalkerToast"

const showToast = useTalkerToast()

const authStore = useAuthStore()

const user = computed(() => authStore.getCredentials(Credentials.USER))
const token = computed(() => authStore.getCredentials(Credentials.TOKEN))

const signOutEvent = async () => {
  try {
    const fetch = await authStore.signOut()
    if (fetch.status === 200) {
      window.location.href = '/'
    }
  } catch (e) {
    console.log(e)
  }
}

const showSimpleToast = () => {
  showToast({
    message: 'Post deleted.',
    color: 'info',
    // actionLabel: 'dsadsa',
    onAction: () => {
      console.log('Undo clicked!')
    }
  })

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
