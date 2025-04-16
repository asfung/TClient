<template>
  <div class="border-default rounded-lg">
    <!-- <div v-if="notifications.length > 0"> -->
      <NotificationCard :notifications="notifications" />
    <!-- </div> -->
    <!-- <div v-else class="flex items-center justify-center h-screen"> -->
      <!-- <p class="text-gray-500">Notifications Empty</p> -->
    <!-- </div> -->
    
    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '~/stores/Notifications'
import { useScrollStore } from '~/stores/Scroll'

definePageMeta({
  scrollToTop: false,
  // middleware: ['auth-middleware'],
})

const notficationStore = useNotificationStore()
const scrollStore = useScrollStore()

const { $listen, $hashSha256 } = useNuxtApp()
const { getItem } = useCryptoLocalStorage()

const isFetching = ref(false); 

const {
  notifications,
  notificationPage,
  notificationHasNextPage
} = storeToRefs(notficationStore)

// const notifications = computed(() => notficationStore.notifications)
// const notificationPage = computed(() => notficationStore.page)
// const hasNextPage = computed(() => notficationStore.hasNextPage)

const scrollY = computed(() => scrollStore.scrollYNotification)
const user = getItem('credentials')

const channelName = '_notifications.' + user.id
const channelNameHashed = $hashSha256(channelName)
const event = 'PostNotificationEvent'

const socketListen = () => {
  $listen(channelNameHashed, event, (data) => {
    console.log(data)
    notifications.value.unshift(data)
  })
}

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, scrollY.value)
  })
  window.addEventListener('scroll', handleScroll)
  socketListen()
  observeSentinel()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  scrollStore.scrollYNotification = window.scrollY
}

const notificationsFetch = async (page) => {
  try{
    const fetch = await notficationStore.getNotifications({
      page: notificationPage.value,
    })
    notificationPage.value = page
  }catch(e){console.log(e)}finally{

  }
};

const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && notificationHasNextPage.value && !isFetching.value) {
        const currentPage = notificationPage.value + 1
        console.log(currentPage)
        notificationsFetch(currentPage);

        setTimeout(() => {
          isFetching.value = false; 
        }, 2000); // unstable code tho
      }
    },
    { threshold: 1.0 }
  );
  
  observer.observe(sentinel);
};


// onBeforeRouteLeave((to, from, next) => {
//   // sometime this is bad idea 
//   sessionStorage.setItem('notification-scrollY', window.scrollY)
//   console.log('pindah dengan scrollY : ', window.scrollY)
//   next()
// })
</script>
