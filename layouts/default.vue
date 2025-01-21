<template>
  <!-- <div>
    <Header />
      <NuxtPage />
    <Footer />
  </div> -->

  <div class="wrapper dark:bg-black selection:bg-purple-400">
    <Header class="header-top" />
      <NuxtPage />
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
  font-family: 'IA Writer Quattro S';
}
</style>
