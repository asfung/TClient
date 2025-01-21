<template>
  <div class="h-96 dark:bg-black dark:text-white p-7 rounded-lg dark:border dark:border-white">
    <v-list class="dark:text-white dark:bg-black -mx-5">
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" :active="item.name === $route.name" class="sidebar-item hover:bg-blue-400">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- <ul v-for="(item, i) in items" :key="i" :value="item"> -->
    <!--     <li class="hover:bg-blue-400 hover:rounded-full"> -->
    <!--         <p class="m-10">{{item.text}}</p> -->
    <!--     </li> -->
    <!-- </ul> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "Home", icon: "mdi-home-variant", name: "index" },
      { text: "Search", icon: "mdi-magnify", name: "search" },
      { text: "Bookmark", icon: "mdi-bookmark", name: "bookmark" },
      { text: "Notification", icon: "mdi-bell", name: "notification" },
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
</style>
