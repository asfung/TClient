<template>
  <!-- <div>
    <Header />
      <NuxtPage />
    <Footer />
  </div> -->

  <div class="wrapper dark:bg-black dark:selection:bg-primaryDark selection:bg-primaryLight font-base">
    <Header class="header-top" />
    <div class="flex flex-col md:flex-row justify-between items-start md:mx-6 lg:mx-48">
      <div v-if="$isBreakpoint(['md', 'lg', 'xl'])"
        class="w-full md:w-2/4 sticky top-14 p-0 border border-gray-300 dark:text-white rounded mr-4 md:mr-8 ">
        <SideBar />
      </div>
      <div class="w-full md:w-4/4 p-0 dark:text-white rounded border border-gray-300">
        <NuxtPage />
      </div>
      <div v-if="$isBreakpoint(['md', 'lg', 'xl'])"
        class="w-full md:w-2/4 sticky top-14 border border-gray-300 dark:text-white rounded ml-4 md:ml-8">
        <Trends />
      </div>
    </div>
    <Footer class="footer-bottom" />
  </div>


</template>

<script>
// import Header from '~/components/Header.vue'
// import Footer from '~/components/Footer.vue'

export default{
  components: {
    // Header,
    // Footer
  }, 
}
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
  height: 45px;
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
