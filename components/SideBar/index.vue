<template>
  <div class="h-96 dark:bg-black dark:text-white p-7 rounded-lg">
    <!-- <v-list class="dark:text-white dark:bg-black -mx-7">
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" class="sidebar-item" :active="false" :ripple="false">
        <nuxt-link :to="item.name !== 'profile' ? {name: `${item.name}`} : `/@${userCredentials.username}`" class="flex items-center space-x-2 hover:bg-primaryLight dark:hover:bg-primaryDark hover:bg-opacity-70 dark:hover:bg-opacity-30 hover:text-neutral-light p-2 rounded-lg"
            :class="{ 'dark:bg-primaryDark bg-primaryLight dark:bg-opacity-20' : item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) }"
            >
          <v-icon :icon="item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) ? item.icon : item.iconOutline" :class="{'text-neutral-light dark:text-primaryDark' : item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) }"></v-icon>
          <v-list-item-title 
            :class="{ 'font-base-bold text-neutral-light dark:text-primaryDark': item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) }"
          >{{ item.text }}</v-list-item-title>
        </nuxt-link>
      </v-list-item>
    </v-list> -->

    <div class="dark:text-white dark:bg-black -mx-7 space-y-3">
      <div v-for="(item, i) in items" :key="i" :value="item" class="">
        <nuxt-link :to="item.name !== 'profile' ? {name: `${item.name}`} : `/@${userCredentials.username}`" class="flex items-center space-x-2 hover:bg-primaryLight dark:hover:bg-primaryDark hover:bg-opacity-70 dark:hover:bg-opacity-30 hover:text-neutral-light p-2 rounded-lg"
            :class="{ 'dark:bg-primaryDark bg-primaryLight dark:bg-opacity-20' : item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) }"
            >
          <v-icon :icon="item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) ? item.icon : item.iconOutline" :class="{'text-neutral-light dark:text-primaryDark' : item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) }"></v-icon>
          <p 
            :class="{ 'font-base-bold text-neutral-light dark:text-primaryDark': item.name === $route.name || (item.name === 'profile' && $route.path === `/@${userCredentials.username}`) }"
          >{{ item.text }}</p>
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/Auth';
import { Credentials } from '~/enums/Credentials'

const authStore = useAuthStore()

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

</script>

