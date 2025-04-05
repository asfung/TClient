<template>
  <div>
    <div v-if="$isBreakpoint(['xs', 'sm'])">
      <v-layout class="overflow-visible" >
        <v-bottom-navigation v-model="navValue" :bg-color="null" mode="shift" class=" dark:bg-black dark:text-white bg-gray-100 text-gray-900 shadow-md flex justify-between backdrop-blur-md bg-opacity-20 dark:backdrop-blur-md dark:bg-opacity-50">
        <!-- <v-bottom-navigation v-model="navValue" :bg-color="null" mode="shift" class=" backdrop-blur-md bg-/20 dark:bg-black/30 border-t border-white/20 dark:border-white/10 shadow-md rounded-t-2xl"> -->
          <v-btn v-for="(item, index) in navItems" :key="item.name" @click="navigateTo(item)" :active="isActive(item)">
            <v-icon :icon="isActive(item) ? item.icon : item.iconOutline"></v-icon>
            <span>{{ item.text }}</span>
          </v-btn>
        </v-bottom-navigation>

        <!-- Floating Post Button -->
        <div class="absolute inset-x-0 bottom-4 flex justify-center z-10">
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
.glass {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px 16px 0 0;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

.dark .glass {
  background-color: rgba(0, 0, 0, 0.25);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-post {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

</style>