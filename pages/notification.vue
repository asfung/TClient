<template>
  <div class="border-default rounded-lg">
    <!-- <div v-for="(item, index) in 1000" :key="index">
      <p>notification</p>
    </div> -->
    <NotificationCard />
  </div>
</template>

<script setup>

definePageMeta({
  scrollToTop: false,
  middleware: ['auth-middleware'],
})

const scrollY = computed(() => sessionStorage.getItem('notification-scrollY'))

onMounted(() => {
  window.scrollTo(0, scrollY)
})

onBeforeRouteLeave((to, from, next) => {
  // sometime this is bad idea 
  sessionStorage.setItem('notification-scrollY', window.scrollY)
  console.log('pindah dengan scrollY : ', window.scrollY)
  next()
})
</script>