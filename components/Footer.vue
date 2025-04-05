<template>
  <div>
    <div v-if="$isBreakpoint(['xs', 'sm'])">
      <v-layout class="overflow-visible" >
        <v-bottom-navigation 
          v-model="navValue" 
          :bg-color="null" 
          mode="shift" 
          class="glass"
          >
          <v-btn v-for="(item, index) in navItems" :key="index" @click="navigateTo(item)" :active="isActive(item)">
            <v-icon :icon="isActive(item) ? item.icon : item.iconOutline"></v-icon>
            <span>{{ item.text }}</span>
          </v-btn>
        </v-bottom-navigation>

        <!-- Floating Post Button -->
        <div class="absolute inset-x-0 bottom-16 flex justify-end z-10 mr-3">
          <button
            @click="openPostDialog"
            class="bg-primaryLight dark:bg-primaryDark text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-black hover:scale-105 transition"
          >
            <v-icon size="32">mdi-pencil</v-icon>
          </button>
        </div>
      </v-layout>
    </div>

    <DialogTextArea :dialog="postDialog" @close-dialog="closeReplyDialog" />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/Auth'
import { Credentials } from '~/enums/Credentials'

const navValue = ref(0)
const postDialog = ref(false)

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const userCredentials = authStore.getCredentials(Credentials.USER)

const navItems = [
  { text: "Home", icon: "mdi-home-variant", iconOutline: "mdi-home-variant-outline", name: "index" },
  { text: "Search", icon: "mdi-magnify", iconOutline: "mdi-magnify", name: "search" },
  { text: "Bookmark", icon: "mdi-bookmark", iconOutline: "mdi-bookmark-outline", name: "bookmark" },
  { text: "Notification", icon: "mdi-bell", iconOutline: "mdi-bell-outline", name: "notification" },
  { text: "Profile", icon: "mdi-account", iconOutline: "mdi-account-outline", name: "profile" },
]

const color = computed(() => {
  switch (route.name) {
    case 'index':
      return 'blue-grey'
    case 'search':
      return 'teal'
    case 'bookmark':
      return 'brown'
    case 'notification':
      return 'indigo'
    default:
      return 'blue-grey'
  }
})

const navigateTo = (item) => {
  if (item.name === 'profile') {
    router.push(`/@${userCredentials.username}`)
  } else {
    router.push({ name: item.name })
  }
}

const isActive = (item) => {
  if (item.name === 'profile') {
    return route.path.toLowerCase() === `/@${userCredentials.username}`.toLowerCase()
  }
  return route.name === item.name
}

const openPostDialog = () => {
  postDialog.value = true
}

const closeReplyDialog = () => {
  postDialog.value = false
}
</script>

<style scoped>
.footer {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.glass {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px 20px 0px 0px;
  /* margin-bottom: 20px; */
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

.dark .glass {
  background-color: rgba(0, 0, 0, 0.25);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>