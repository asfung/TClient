<template>
  <div class="border-default rounded-lg">
    {{ message }}
    <NotificationCard />
  </div>
</template>

<script setup>

definePageMeta({
  scrollToTop: false,
  // middleware: ['auth-middleware'],
})
const { $encryptUserId, $listen } = useNuxtApp()
const { getItem } = useCryptoLocalStorage()

const scrollY = computed(() => sessionStorage.getItem('notification-scrollY'))
const message = ref([])
const user = getItem('credentials')

const channel = '_notifications.' + user.id
const event = 'PostNotificationEvent'

const socketListen = () => {
  $listen(channel, event, (data) => {
    console.log(data)
    message.value.push(data.message)
  })
}

onMounted(() => {
  window.scrollTo(0, scrollY)
  console.log(channel)
  socketListen()
})

watch(message, (oldVal, newVal) => {
  console.log('da;slmlkdsamldmlkm')
})

onBeforeRouteLeave((to, from, next) => {
  // sometime this is bad idea 
  sessionStorage.setItem('notification-scrollY', window.scrollY)
  console.log('pindah dengan scrollY : ', window.scrollY)
  next()
})
</script>