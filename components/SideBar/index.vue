<template>
  <!-- <div class="profile-section"> -->
  <div class="h-96 dark:bg-black dark:text-white p-7 rounded-lg dark:border dark:border-white">
    <!-- <h1>Side Bar</h1>
    sidebar selesai -->
    <!-- Profile -->
    <!-- <v-card class="mx-auto" max-width="300"> -->
    <v-list class="dark:text-white dark:bg-black -mx-5">
      <!-- <v-list-subheader>REPORTS</v-list-subheader> -->

      <v-list-item v-for="(item, i) in items" :key="i" :value="item">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- </v-card> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "Home", icon: "mdi-home-variant" },
      { text: "Search", icon: "mdi-magnify" },
      { text: "Bookmark", icon: "mdi-bookmark" },
      { text: "Notification", icon: "mdi-bell" },
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
