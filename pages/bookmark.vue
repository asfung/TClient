<template>
  <div class="border-default rounded-lg">
    <div v-for="(item, index) in posts" :key="index">
      <PostItem :item="item" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  scrollToTop: false,
  // middleware: ['auth-middleware'],
})

import { usePostStore } from '~/stores/Post';

const postStore = usePostStore()
const posts = computed(() => postStore.posts);

</script>