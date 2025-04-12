<template>
  <!-- <div class="h-screen flex flex-col justify-between"> -->
  <div class="flex flex-col h-screen">
    <div class="p-4">
      <div>
        <div class="text-primaryLight dark:text-primaryDark font-base-bold">Account</div>
        <v-divider class="mb-3"></v-divider>
        <div 
          class="flex justify-between py-3 rounded-lg hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 dark:hover:bg-opacity-10 " 
          @click="showChangePassDialog = !showChangePassDialog"
          >
          <p class="px-1">Change Password</p>
          <p class="text-primaryLight dark:text-primaryDark mr-2">
            <v-icon>mdi-chevron-right</v-icon>
          </p>
        </div>
      </div>
    </div>

    <div class="p-4">
      <div class="text-primaryLight dark:text-primaryDark font-base-bold">Theme</div>
      <v-divider class="mb-3"></v-divider>
      <SelectionTheme />
    </div>

    <div class="p-4">
      <button 
        class="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        @click="signOutEvent"
        >
        Sign Out
      </button>
    </div>
    
    <DialogChangePassword
      :dialog="showChangePassDialog"
      @password-changed="handlePasswordChange"
      @close-dialog="showChangePassDialog = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  // middleware: ['auth-middleware'],
})
import { useAuthStore } from "~/stores/Auth"
import { Credentials } from "~/enums/Credentials"
import { useTalkerToast } from "~/composables/useTalkerToast"

const { $share, $copyText } = useNuxtApp()
const showToast = useTalkerToast()
const authStore = useAuthStore()

const showChangePassDialog = ref(false);
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

const handlePasswordChange = async (payload) => {
  try {
    const fetch = await authStore.changePassword({
      old_password: payload.current_password,
      new_password: payload.new_password,
    })
    console.log(fetch.message)
    if(fetch.status === 200){
      showToast({
        message: 'Password Changed',
        color: 'success',
      })
      showChangePassDialog.value = false 
    }else{
      showToast({
        message: fetch.message,
        color: 'error',
      })
    }
  } catch (e) {
    console.log(e)
  }
};


// just testing function, MAKE GARBAGE GREAT AGAIN
const handleTest = async () => {
  $share({
    title: 'Talker',
    text: 'Share Link Talk',
    url: await $copyText(location.href)
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
