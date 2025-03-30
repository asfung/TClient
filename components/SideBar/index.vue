<template>
  <div class="h-96 dark:bg-black dark:text-white p-7 rounded-lg">
    <div class="dark:text-white dark:bg-black -mx-7 space-y-3">
      <div v-for="(item, i) in items" :key="i" :value="item" class="">
        <nuxt-link :to="item.name !== 'profile' ? {name: `${item.name}`} : `/@${userCredentials.username}`" class="flex items-center space-x-2 hover:bg-primaryLight dark:hover:bg-primaryDark hover:bg-opacity-70 dark:hover:bg-opacity-30 hover:text-neutral-light p-2 rounded-lg"
            :class="{ 'dark:bg-primaryDark bg-primaryLight dark:bg-opacity-20' : isActive(item) }"
            >
          <v-icon :icon="isActive(item) ? item.icon : item.iconOutline" :class="{'text-neutral-light dark:text-primaryDark' : isActive(item) }"></v-icon>
          <p 
            :class="{ 'font-base-bold text-neutral-light dark:text-primaryDark': isActive(item) }"
          >{{ item.text }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/Auth';
import { usePostStore } from '~/stores/Post';
import { Credentials } from '~/enums/Credentials'

const authStore = useAuthStore()
const postStore = usePostStore()

const route = useRoute()

const userCredentials = authStore.getCredentials(Credentials.USER)

onMounted(() => {
  // console.log(userCredentials)
})

const items = ref([
  { text: "Home", icon: "mdi-home-variant", iconOutline: "mdi-home-variant-outline", name: "index" },
  { text: "Search", icon: "mdi-magnify", iconOutline: "mdi-magnify", name: "search" },
  { text: "Bookmark", icon: "mdi-bookmark", iconOutline: "mdi-bookmark-outline", name: "bookmark" },
  { text: "Notification", icon: "mdi-bell", iconOutline: "mdi-bell-outline", name: "notification" },
  { text: "Profile", icon: "mdi-account", iconOutline: "mdi-account-outline", name: "profile" },
  { text: "Settings", icon: "mdi-cog", iconOutline: "mdi-cog-outline", name: "settings" },
])

const setActiveTab = (tab) => {
  postStore.activeTab = tab;
};

const isActive = (item) => {
  if (item.name === route.name) {
    // console.log(item.name)
    // setActiveTab(item.name)
    return true
  }
  if (item.name === 'profile') {
    // setActiveTab('profile')
    const normalizedPath = route.path.toLowerCase()
    const normalizedUsername = `/@${userCredentials.username}`.toLowerCase()
    return normalizedPath === normalizedUsername
  }
  return false
}
</script>

