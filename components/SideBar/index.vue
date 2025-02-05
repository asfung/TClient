<template>
  <div class="h-96 dark:bg-black dark:text-white p-7 rounded-lg border-default">
    <v-list class="dark:text-white dark:bg-black -mx-7">
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" class="sidebar-item" :active="false" :ripple="false">
        <div class="flex items-center space-x-2 hover:bg-primaryLight dark:hover:bg-primaryDark hover:text-neutral-light p-2 rounded"
            :class="{'dark:bg-primaryDark bg-primaryLight' : item.name === $route.name}"
            >
          <v-icon :icon="item.name === $route.name ? item.icon : item.iconOutline"></v-icon>
          <v-list-item-title 
            :class="{ 'font-base-bold text-white': item.name === $route.name }"
          >{{ item.text }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>
<!-- <div :class="isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'"> -->
<!-- <div :class="`${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} ${additionalClass}`"> -->

<script>
export default {
  data: () => ({
    items: [
      { text: "Home", icon: "mdi-home-variant", iconOutline: "mdi-home-variant-outline", name: "index" },
      { text: "Search", icon: "mdi-magnify", iconOutline: "mdi-magnify", name: "search" },
      { text: "Bookmark", icon: "mdi-bookmark", iconOutline: "mdi-bookmark-outline", name: "bookmark" },
      { text: "Notification", icon: "mdi-bell", iconOutline: "mdi-bell-outline", name: "notification" },
    ],
  }),
};
</script>

<style>
.profile-section {
  /* background-color: rgb(185, 81, 81); */
  border-radius: 10px;
  /* padding: 7px; */
  /* margin: 5px; */
  height: 35vh;
  /* border: 1px solid #ddd; */
  border-radius: 5px;
}

/* .dark .sidebar-item{ */
/*     border: 1px solid gray; */
/* } */

.dark .sidebar-main{
    border: 1px solid gray; 
}
</style>
