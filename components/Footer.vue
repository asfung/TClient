<template>
  <div>
    <!-- <div class="footer dark:bg-black dark:text-white bg-gray-100 text-gray-900 shadow-md py-4 px-6 flex justify-between backdrop-blur-md bg-opacity-20 dark:backdrop-blur-md dark:bg-opacity-50">
    </div> -->
    <div v-if="$isBreakpoint(['xs', 'sm'])" class="">
      <v-layout class="overflow-visible" style="height: 56px">
        <v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
          <v-btn>
            <v-icon>mdi mdi-home-variant</v-icon>

            <span>Home</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi mdi-magnify</v-icon>

            <span>Search</span>
          </v-btn>

          <v-btn>
            <v-icon>mdi mdi-bookmark</v-icon>

            <span>Bookmark</span>
          </v-btn>

          <v-btn>
            <v-icon v-if="isBtnicon" @click="Notif()">mdi-bell</v-icon>
            <v-icon v-else @click="Notif()">mdi-bell-outline</v-icon>
            <span>Notification</span>
          </v-btn>
        </v-bottom-navigation>
      </v-layout>
    </div>
    <DialogTextArea :dialog="postDialog" @close-dialog="closeReplyDialog" />
  </div>
</template>

<script setup>
const value = ref(1)
const isBtnicon = ref(false)
const postDialog = ref(false)
const color = computed(() => {
  switch (value) {
    case 0:
      return "blue-grey";
    case 1:
      return "teal";
    case 2:
      return "brown";
    case 3:
      return "indigo";
    default:
      return "blue-grey";
  }
});

const Notif = () => {
  isBtnicon.value = !isBtnicon.value;
};

const closeReplyDialog = () => {
  postDialog.value = false
}
</script>

<!-- <style>
.footer {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style> -->
