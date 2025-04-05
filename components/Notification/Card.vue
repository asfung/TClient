<template>
  <div>
    <!-- <div v-for="(item, index) in notifications" :key="index" :ref="(el) => registerObserver(el, item)"> -->
    <div v-for="(item, index) in props.notifications" :key="index">
      <NotificationItem :item="item" />
    </div>

  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { faker } from '@faker-js/faker'
import { useNotificationStore } from '~/stores/Notifications'
import { useScrollStore } from '~/stores/Scroll'

const notificationStore = useNotificationStore()
const scrollStore = useScrollStore()

const props = defineProps({
  notifications: {
    required: true,
  }
})

// const notifications = reactive([]);
const visibleNotifications = ref(new Set());

const registerObserver = (el, item) => {
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(`Notification from ${item.from} is visible.`);
          item.read = true; 
          visibleNotifications.value.add(item.id); 
        } else {
          visibleNotifications.value.delete(item.id); 
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(el);
};


onMounted(() => {
});
</script>
