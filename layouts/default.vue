<template>
  <!-- <div>
    <Header />
      <NuxtPage />
    <Footer />
  </div> -->

  <div class="wrapper dark:bg-black dark:selection:bg-primaryDark selection:bg-primaryLight font-base">
    <Header class="header-top" />
    <div class="flex flex-col md:flex-row justify-between items-start md:mx-6 lg:mx-96">
      <div v-if="$isBreakpoint(['md', 'lg', 'xl'])"
        class="w-full md:w-2/4 sticky top-14 p-0 dark:text-white rounded mr-4 md:mr-8 ">
        <SideBar />
        <div @click="postDialog = true" class="flex hover:cursor-pointer bg-primaryLight dark:bg-primaryDark dark:bg-opacity-30 dark:hover:bg-opacity-100 justify-center rounded-full">
          <p class="my-3 text-white ">New Post</p>
        </div>
      </div>
      <div class="w-full md:w-4/4 p-0 dark:text-white rounded border border-gray-300">
        <NuxtPage />
      </div>
      <div v-if="$isBreakpoint(['md', 'lg', 'xl'])"
        class="w-full md:w-2/4 sticky top-14 dark:text-white rounded ml-4 md:ml-8">
        <Trends />
      </div>
    </div>
    <Footer class="footer-bottom" />

    <DialogTextArea :dialog="postDialog" @close-dialog="closeReplyDialog" />
    <ToastContainer />
  </div>

  <!-- 
  
  TOO BIG FOR ME 
  sidebar is md:w-2/4
  content is md:w-4/4
  trends is md:w-2/4

  and also, this is the default before changes
  <div class="flex flex-col md:flex-row justify-between items-start md:mx-6 lg:mx-48">

  this is good too
  <div class="flex flex-col md:flex-row justify-between items-start md:mx-6 lg:mx-72"> 


  thats why it has changes

  
  -->


</template>

<script setup>
import { useTheme } from 'vuetify';

const theme = useTheme()
const colorMode = useColorMode()
const postDialog = ref(false)

const closeReplyDialog = () => {
  postDialog.value = false
}

onMounted(() => {
  theme.global.name.value = colorMode.preference
})
</script>


<style scoped>
.header-top {
  top: 0;
  /* position: sticky; */
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 45px;
}
.footer-bottom {
  /* height: 45px; */
  bottom: 0;
  position: fixed;
  /* position: sticky; */
  width: 100%;
}
.wrapper {
  min-height: 100vh;
  padding-top: 60px;
  /* padding-bottom: 60px; */
  /* font-family: 'IA Writer Quattro S'; */
}
</style>
