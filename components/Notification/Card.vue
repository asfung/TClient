<template>
  <div>
    <div v-for="(item, index) in notifications" :key="index" :ref="(el) => registerObserver(el, item)">
      <NotificationItem :item="item" />
    </div>

    <div id="checkpoint-section"></div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { faker } from '@faker-js/faker';

const notifications = reactive([]);
let page = 1;
const pageSize = 20;
let hasNextPage = true;
const visibleNotifications = ref(new Set());

const generateFakeNotifications = (count = pageSize) => {
  for (let i = 0; i < count; i++) {
    notifications.push({
      photo: faker.image.avatar(),
      from: faker.person.fullName(),
      content: faker.lorem.sentence(),
      time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      // read: faker.datatype.boolean(),
      read: false, 
    });
  }
};

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


const loadMoreData = () => {
  if (hasNextPage) {
    page++;
    generateFakeNotifications();
    if (page >= 5) hasNextPage = false;
  }
};

const observeSentinel = () => {
  const sentinel = document.getElementById("checkpoint-section");
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        loadMoreData();
      }
    },
    { threshold: 1.0 }
  );
  
  observer.observe(sentinel);
};

onMounted(() => {
  generateFakeNotifications();
  observeSentinel();
});
</script>
