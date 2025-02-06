<template>
  <div class="h-96 dark:bg-black dark:text-white p-7 rounded-lg border-default">
    <v-list class="dark:text-white dark:bg-black -mx-7">
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" class="sidebar-item" :active="false" :ripple="false">
        <nuxt-link :to="{name: `${item.name}`}" class="flex items-center space-x-2 hover:bg-primaryLight dark:hover:bg-primaryDark hover:bg-opacity-70 dark:hover:bg-opacity-30 hover:text-neutral-light p-2 rounded-lg"
            :class="{'dark:bg-primaryDark bg-primaryLight dark:bg-opacity-20' : item.name === $route.name}"
            >
          <v-icon :icon="item.name === $route.name ? item.icon : item.iconOutline"></v-icon>
          <v-list-item-title 
            :class="{ 'font-base-bold text-white': item.name === $route.name}"
          >{{ item.text }}</v-list-item-title>
        </nuxt-link>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>

const items = ref([
  { text: "Home", icon: "mdi-home-variant", iconOutline: "mdi-home-variant-outline", name: "index" },
  { text: "Search", icon: "mdi-magnify", iconOutline: "mdi-magnify", name: "search" },
  { text: "Bookmark", icon: "mdi-bookmark", iconOutline: "mdi-bookmark-outline", name: "bookmark" },
  { text: "Notification", icon: "mdi-bell", iconOutline: "mdi-bell-outline", name: "notification" },
])

</script>

