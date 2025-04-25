<template>
    <div class="wrapper">
      <Header class="header-top" :class="{ 'fixed-header': isScrolled }" />
      <NuxtPage />
      <Footer class="footer-bottom" />
    </div>
  </template>
  
  <script>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  export default {
    components: {
        Header,
        Footer
    },
    data() {
      return {
        isScrolled: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        const scrollPosition = window.scrollY
        if (scrollPosition > 0) {
          this.isScrolled = true
        } else {
          this.isScrolled = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .header-top {
    background-color: red;
    transition: background-color 0.3s;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    z-index: 1000;
    background-color: #fff;
  }
  .wrapper {
    min-height: 100vh;
  }
  </style>